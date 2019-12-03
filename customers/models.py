from django.db import models
from django.contrib.auth.models import User

# Create your models here.
# examples:
# class Actions(models.Model):
#     actionId = models.AutoField(primary_key=True)
#     time = models.DateTimeField(auto_now_add = False, null=True)
#     type = models.TextField(null=True)
#     # this is also used one to many relationship. because one user could have
#     # multiple actions.
#     user = models.ForeignKey(User, related_name = 'actions', on_delete=models.CASCADE,  db_column = "user")
#
#     class Meta:
#         verbose_name = "Actions"
#         db_table = "Actions"
#
# class Properties(models.Model):
#     propertiesId = models.AutoField(primary_key=True)
#     pageFrom = models.TextField(null=True)
#     pageTo = models.TextField(null=True)
#     viewedId = models.TextField(null=True)
#     locationX = models.IntegerField(null=True)
#     locationY = models.IntegerField(null=True)
#     # one action has one property
#     actionId = models.OneToOneField(Actions, on_delete=models.CASCADE, db_column = "actionId")
#
#     class Meta:
#         verbose_name = "Properties"
#         db_table = "Properties"
#
# class Session(models.Model):
#     id = models.AutoField(primary_key=True)
#     sessionId = models.TextField(null=True)
#     # I think 1 user could have multiple sessions, So I decided to
#     # make it one to many relationship.
#     userId = models.ForeignKey(User, related_name = 'session', on_delete=models.CASCADE, db_column = "userId")
#
#     class Meta:
#         verbose_name = "Session"
#         db_table = "Session"
