from rest_framework import serializers
from myApp.models import *
from django.db.models import Q
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.db import transaction
import uuid
from django.utils import timezone
from django.core.mail import EmailMessage
from django.conf import settings
from django.contrib.auth.validators import UnicodeUsernameValidator
from rest_framework.serializers import (
    ModelSerializer,
    SerializerMethodField,
    CharField,
    EmailField,
    ValidationError,
    HyperlinkedIdentityField,
    ListSerializer,
    Serializer
)

class UserCreateSerializer(ModelSerializer):
    email = EmailField(label = 'Email')
    password2 = CharField(label='Confirm Password')
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'password',
            'password2',
        ]
        extra_kwargs = {
            'username':{
                'validators':[UnicodeUsernameValidator()],
            },
            "password": {"write_only":True},
            'password2': {'write_only': True}
        }


    def validate_username(self, value):
        username = value
        user_qs = User.objects.filter(username = username).values()

        if user_qs.exists():
            timeDifference = ((timezone.now()-user_qs[0]['date_joined']).total_seconds()/60)>2
            if user_qs[0]['is_active']==False and timeDifference:
                User.objects.filter(username = username, is_active=False).delete()
            elif not timeDifference:
                raise ValidationError("this username registered in two minutes")
            else:
                raise ValidationError("this username has already registered.")
        return value

    def validate_email(self, value):
        data = self.get_initial()
        email = value
        # needs to fix. if is_active == 0, need to delete the existing user and raise no error
        user_qs = User.objects.filter(email = email).values()
        if user_qs.exists():
            timeDifference = ((timezone.now()-user_qs[0]['date_joined']).total_seconds()/60)>2
            if user_qs[0]['is_active']==False and timeDifference:
                User.objects.filter(email = email, is_active=False).delete()
            elif not timeDifference:
                raise ValidationError("this email registered in two minutes")
            else:
                raise ValidationError("this email has already registered.")

        return value

    def validate_password(self, value):
        data = self.get_initial()
        password = data.get("password2")
        password2 = value
        if password != password2:
            raise ValidationError("Password must match")
        return value

    def validate_password2(self, value):
        data = self.get_initial()
        password = data.get("password")
        password2 = value
        if password != password2:
            raise ValidationError("Password must match")
        return value

    def create(self, validated_data):
        with transaction.atomic():
            username = validated_data['username']
            email = validated_data['email']
            password = validated_data['password']
            first_name = validated_data['first_name']
            last_name = validated_data['last_name']
            userFilter = User.objects.filter(username = username)
            user_obj = User(
                    username = username,
                    email = email,
                    last_name = last_name,
                    first_name = first_name,
                    is_active = False
            )
            user_obj.set_password(password)
            user_obj.save()
            subject = "Email Verification Code"
            verificationCode = uuid.uuid4().hex[:6].upper()
            message = "Your email verification code is: " + verificationCode

            recipient_list = [
                str(email)
            ]
            emailVerify = EmailMessage(subject, message, to=[recipient_list])
            emailVerify.send()
            Verification.objects.filter(email=email).delete()
            Verification.objects.create(email = email, code = verificationCode)
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

        user = User.objects.filter((Q(username = identifier) | Q(email = identifier)) & Q(is_active = 1)).distinct()

        if user.exists() and user.count() == 1:
            user_obj = user.first()
        else:
            raise ValidationError("This username/email is not valid.")

        if user_obj:
            if not user_obj.check_password(password):
                raise ValidationError("Incorrect credentials please try again.")

        return { 'token': self.get_token(user_obj) }

class UserSerializer(ModelSerializer):
    # work = WorkSerializer(many=True, required=False)
    # education = EducationSerializer(required=False)
    # address = AddressSerializer(required=False)
    # profile = ProfileSerializer(required=False)
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'is_active'
        ]

    # def update(self, instance, validated_data):
    #     with transaction.atomic():
    #         instance.is_active = validated_data.pop('is_active', False)
    #         instance.first_name = validated_data.pop('first_name', False)
    #         instance.last_name = validated_data.pop('last_name', False)
    #         instance.save()
    #         return instance

class UserTestSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'is_active'
        ]
        lookup_field = 'email'

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class VerificationSerializer(ModelSerializer):
    # is_my_object = serializers.SerializerMethodField('email')
    # pass
    email = serializers.CharField()
    class Meta:
        model = Verification
        fields = [
            'email',
            'code'
        ]
        # lookup_field = 'email'
        extra_kwargs = {
            "code": {
                "read_only": True,
                "required": False
                }
        }

    def create(self, validated_data):
        with transaction.atomic():
            email = validated_data['email']

            subject = "Email Verification Code"
            verificationCode = uuid.uuid4().hex[:6].upper()
            message = "Your email verification code is: " + verificationCode

            recipient_list = [
                str(email)
            ]
            emailVerify = EmailMessage(subject, message, to=[recipient_list])
            emailVerify.send()
            Verification.objects.filter(email=email).delete()
            Verification.objects.create(email = email, code = verificationCode)
            return validated_data

class ChangePasswordSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'email',
            'password'
        ]
        extra_kwargs = {
            "password": {"write_only":True}
        }

    def validate_email(self, value):
        data = self.get_initial()
        email = value
        # needs to fix. if is_active == 0, need to delete the existing user and raise no error
        user_qs = User.objects.filter(email = email).values()
        if not user_qs.exists():
            raise ValidationError("this email has not registered.")

        return value

    # def validate_password(self, value):
    #     data = self.get_initial()
    #     password = data.get("password2")
    #     password2 = value
    #     if password != password2:
    #         raise ValidationError("Password must match")
    #     return value

    def update(self, instance, validated_data):
        with transaction.atomic():
            email = validated_data.pop('email', False)
            password = validated_data.pop('password', False)

            user_obj = User.objects.get(email=email)
            user_obj.set_password(password)
            user_obj.save()
            return user_obj
