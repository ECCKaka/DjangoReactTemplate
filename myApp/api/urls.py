from django.conf.urls import url
from django.contrib import admin

from .views import *

urlpatterns = [
    url(r'^register/$', UserCreateAPIView.as_view(), name='register'),
    url(r'^login/$', UserLoginAPIView.as_view(), name="login"),
    url(r'^users/$', UserViewSet.as_view(), name='users'),
    url(r'^user/(?P<pk>[0-9]+)/$', OneUserAPIView.as_view(), name='user-detail'),
    url(r'^user/update-partial/(?P<pk>[0-9]+)/$', ActiveUserAPIView.as_view(), name='user-active'),
    url(r'^verify/$', VerificationAPIView.as_view(), name='user-verify'),
    url(r'^user/(?P<email>[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})/$', UserLookupAPIView.as_view(), name='user-lookup'),
    url(r'^verify-update/$', VerificationUpdateAPIView.as_view(), name='user-update-verify'),
    url(r'^reset-password/(?P<email>[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})/', UserResetPasswordAPIView.as_view(), name='reset_password')
]
