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

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
