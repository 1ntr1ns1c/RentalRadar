from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator

from .models import Inquiry
from .serializers import InquirySerializer, InquiryCreateSerializer, InquiryListSerializer
from properties.models import Property


class InquiryViewSet(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if getattr(user, 'is_system_superuser', False):
            return Inquiry.objects.select_related('listing', 'tenant').all()
        if user.role == 'landlord':
            return Inquiry.objects.filter(
                listing__created_by=user
            ).select_related('listing', 'tenant')
        return Inquiry.objects.filter(tenant=user).select_related('listing', 'tenant')

    def get_serializer_class(self):
        if self.action == 'create':
            return InquiryCreateSerializer
        if self.action in ('list', 'retrieve'):
            return InquiryListSerializer
        return InquirySerializer

    @method_decorator(ratelimit(key='user', rate='20/h', method='POST'))
    def create(self, request):
        serializer = InquiryCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if request.user.role not in ('tenant', 'landlord', 'superuser'):
            return Response(
                {'message': 'Only tenants can send inquiries.'},
                status=status.HTTP_403_FORBIDDEN
            )
        # Allow any authenticated user to send inquiry (tenant flow)
        inquiry = Inquiry.objects.create(
            listing_id=serializer.validated_data['listing_id'],
            tenant=request.user,
            message=serializer.validated_data['message'],
        )
        return Response(
            {
                'id': inquiry.id,
                'listing_id': inquiry.listing_id,
                'message': inquiry.message,
                'status': inquiry.status,
                'created_at': inquiry.created_at,
            },
            status=status.HTTP_201_CREATED
        )

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = InquiryListSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = InquiryListSerializer(instance)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], url_path='respond')
    def respond(self, request, pk=None):
        inquiry = self.get_object()
        user = request.user
        if user.role != 'landlord' and not getattr(user, 'is_system_superuser', False):
            return Response(
                {'message': 'Only landlords can respond to inquiries.'},
                status=status.HTTP_403_FORBIDDEN
            )
        if inquiry.listing.created_by_id != user.id and not getattr(user, 'is_system_superuser', False):
            return Response(
                {'message': 'Inquiry not found or not authorized.'},
                status=status.HTTP_404_NOT_FOUND
            )
        response_text = request.data.get('response')
        if not response_text or not str(response_text).strip():
            return Response(
                {'message': 'Response message is required.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        inquiry.landlord_response = response_text.strip()
        inquiry.status = Inquiry.Status.RESPONDED
        inquiry.save()
        return Response({'message': 'Response sent successfully.'})

    @action(detail=True, methods=['put'], url_path='status')
    def update_status(self, request, pk=None):
        inquiry = self.get_object()
        user = request.user
        if user.role != 'landlord' and not getattr(user, 'is_system_superuser', False):
            return Response(
                {'message': 'Only landlords can update inquiry status.'},
                status=status.HTTP_403_FORBIDDEN
            )
        if inquiry.listing.created_by_id != user.id and not getattr(user, 'is_system_superuser', False):
            return Response(
                {'message': 'Inquiry not found or not authorized.'},
                status=status.HTTP_404_NOT_FOUND
            )
        new_status = request.data.get('status')
        if new_status not in dict(Inquiry.Status.choices):
            return Response(
                {'message': 'Invalid status. Use: pending, viewed, responded.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        inquiry.status = new_status
        inquiry.save()
        return Response(InquiryListSerializer(inquiry).data)
