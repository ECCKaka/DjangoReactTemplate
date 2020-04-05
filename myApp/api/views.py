from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from myApp.models import *
from .serializers import *
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    RetrieveDestroyAPIView,
    RetrieveUpdateAPIView,
    CreateAPIView,
    DestroyAPIView,
)

class UserCreateAPIView(CreateAPIView, DestroyAPIView):
    serializer_class = UserCreateSerializer
    queryset = User.objects.all()
    permission_classes = [AllowAny]

class UserResetPasswordAPIView(RetrieveUpdateAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [AllowAny]
    lookup_field = 'email'
    def get_queryset(self):
        type_param = self.request.query_params.get('email')
        code = self.request.query_params.get('code')
        if type_param is not None:
            queryset = Verification.objects.filter(email=type_param).values()
            if code != queryset[0]['code']:
                raise ValidationError("The code are not matched")

            queryset = User.objects.filter(email=type_param).values()
            return queryset

class UserLoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid():
            new_data = serializer.data
            return Response(new_data, status=HTTP_200_OK)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class UserViewSet(ListAPIView):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class OneUserAPIView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ActiveUserAPIView(GenericAPIView, UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

class VerificationUpdateAPIView(CreateAPIView, DestroyAPIView):
    queryset = Verification.objects.all()
    serializer_class = VerificationSerializer
    # lookup_field = 'email'

class UserLookupAPIView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserTestSerializer
    lookup_field = 'email'


class VerificationAPIView(ListAPIView):
    # http://localhost:8000/api/verify/?email=zuofu@ualberta.ca&code=abc123
    serializer_class = UserSerializer
    def get_queryset(self):
        type_param = self.request.query_params.get('email')
        code = self.request.query_params.get('code')
        if type_param is not None:
            queryset = Verification.objects.filter(email=type_param).values()
            if code != queryset[0]['code']:
                raise ValidationError("The code are not matched")

            queryset = User.objects.filter(email=type_param).values()
            return queryset
