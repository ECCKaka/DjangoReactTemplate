from django.conf.urls import url
from django.contrib import admin

from .views import *

urlpatterns = [
    url(r'^users/$', UserViewSet.as_view(), name='users'),
    url(r'^user/(?P<pk>[0-9]+)/$', OneUserAPIView.as_view(), name='user-detail'),
]
