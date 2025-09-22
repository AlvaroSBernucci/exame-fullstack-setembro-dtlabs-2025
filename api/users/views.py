from .serializers import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class CustomUserMeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user
            data = {
                "uuid": user.uuid,
                "username": user.username,
                "email": user.email
            }
            return Response(data)
        except AttributeError:
            return Response(
                {"detail": "Usuário não autenticado ou inválido"}
            )
        except Exception as e:
            return Response(
                {"detail": f"Erro Inesperado: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
