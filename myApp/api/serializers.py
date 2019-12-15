from rest_framework import serializers
from myApp.models import *
from django.db.models import Q
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.db import transaction

from rest_framework.serializers import (
    ModelSerializer,
    SerializerMethodField,
    CharField,
    EmailField,
    ValidationError,
    HyperlinkedIdentityField,
    ListSerializer,
    )


class UserCreateSerializer(ModelSerializer):
    email = EmailField(label = 'Email')
    email2 = EmailField(label = 'Confirm Email')
    class Meta:
        model = User
        fields = [
            'username',
            'first_name',
            'last_name',
            'email',
            'email2',
            'password',
        ]
        extra_kwargs = {"password":
                            {"write_only":True}
                            }
    def validate(self, data):
        # email = data['email']
        # user_qs = User.objects.filter(email= email)
        # if user_qs.exists():
        #     raise ValidationError("this user has already registered.")
        return data

    def validate_email(self, value):
        data = self.get_initial()
        email1 = data.get("email2")
        email2 = value
        if email1 != email2:
            raise ValidationError("Emails must match")

        user_qs = User.objects.filter(email= email2)
        if user_qs.exists():
            raise ValidationError("this user has already registered.")


        return value

    def validate_email2(self, value):
        data = self.get_initial()
        email1 = data.get("email")
        email2 = value
        if email1 != email2:
            raise ValidationError("Emails must match")
        return value
    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']
        user_obj = User(
                username = username,
                email = email
        )
        user_obj.set_password(password)
        user_obj.save()
        return validated_data

class UserLoginSerializer(ModelSerializer):
    '''
        format of user login
        {
        "identifier": "admin",
        "password": "admin"
        }
    '''
    token = CharField(allow_blank=True, read_only=True)
    identifier = CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'identifier',
            'password',
            'token',
        ]
        extra_kwargs = {
            "password": {
                "write_only": True
            }
        }

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def validate(self, data):
        user = None
        user_obj = None
        identifier = data["identifier"]
        password = data["password"]

        if not identifier:
            raise ValidationError("A username or email is required to login.")

        user = User.objects.filter(Q(username = identifier) | Q(email = identifier)).distinct()

        if user.exists() and user.count() == 1:
            user_obj = user.first()
        else:
            raise ValidationError("This username/email is not valid.")

        if user_obj:
            if not user_obj.check_password(password):
                raise ValidationError("Incorrect credentials please try again.")

        return { 'token': self.get_token(user_obj) }

class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class AddressSerializer(ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


class EducationSerializer(ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

class WorkSerializer(ModelSerializer):
    class Meta:
        model = Work
        fields = '__all__'

class UserSerializer(ModelSerializer):
    work = WorkSerializer(many=True, required=False)
    education = EducationSerializer(required=False)
    address = AddressSerializer(required=False)
    profile = ProfileSerializer(required=False)
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'work',
            'education',
            'address',
            'profile'
        ]

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
