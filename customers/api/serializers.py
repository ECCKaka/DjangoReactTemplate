from rest_framework import serializers
from customers.models import *

from django.contrib.auth.models import User, Group
from rest_framework import serializers

from rest_framework.serializers import (
    ModelSerializer,
    SerializerMethodField,
    CharField,
    EmailField,
    ValidationError,
    HyperlinkedIdentityField,
    ListSerializer,
    )

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
