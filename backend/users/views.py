from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator

from .serializers import RegisterSerializer, LoginSerializer, UserSerializer, ChangePasswordSerializer

User = get_user_model()


def _token_response(user):
    refresh = RefreshToken.for_user(user)
    return {
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'role': user.role,
        'token': str(refresh.access_token),
        'refresh': str(refresh),
    }


class RegisterView(APIView):
    permission_classes = [AllowAny]

    @method_decorator(ratelimit(key='ip', rate='5/h', method='POST'))
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(_token_response(user), status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny]

    @method_decorator(ratelimit(key='ip', rate='10/h', method='POST'))
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = request.data.get('email', '').lower()
        password = request.data.get('password')
        user = User.objects.filter(email=email).first()
        if not user or not user.check_password(password):
            return Response(
                {'message': 'Invalid credentials.'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        if not user.is_active:
            return Response(
                {'message': 'Account is disabled.'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        return Response(_token_response(user))


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(
            data={
                'currentPassword': request.data.get('currentPassword'),
                'newPassword': request.data.get('newPassword'),
            },
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        request.user.set_password(serializer.validated_data['newPassword'])
        request.user.save()
        return Response({'message': 'Password changed successfully.'})
