from django.conf.urls import url
from django.contrib import admin

from .views import *

urlpatterns = [
    url(r'^users/$', UserViewSet.as_view(), name='users'),
    # url(r'^login/$', UserLoginAPIView.as_view(), name='login'),
    # url(r'^register/$', UserCreateAPIView.as_view(), name='register'),
]
