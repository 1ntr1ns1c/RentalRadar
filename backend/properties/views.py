from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from users.permissions import IsLandlordOrSuperUser
from .models import Property
from .serializers import PropertySerializer
from .filters import PropertyFilter


class PropertyViewSet(viewsets.ModelViewSet):
    serializer_class = PropertySerializer
    filterset_class = PropertyFilter

    def get_queryset(self):
        return Property.objects.select_related('created_by').all()

    def get_permissions(self):
        if self.action in ('list', 'retrieve'):
            return [AllowAny()]
        return [IsAuthenticated(), IsLandlordOrSuperUser()]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        return PropertySerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        if not self._can_modify(request, instance):
            return Response(
                {'message': 'You can only update your own properties.'},
                status=status.HTTP_403_FORBIDDEN
            )
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if not self._can_modify(request, instance):
            return Response(
                {'message': 'You can only delete your own properties.'},
                status=status.HTTP_403_FORBIDDEN
            )
        instance.delete()
        return Response({'message': 'Property deleted'}, status=status.HTTP_200_OK)

    def _can_modify(self, request, obj):
        if getattr(request.user, 'is_system_superuser', False):
            return True
        return obj.created_by_id == request.user.id
