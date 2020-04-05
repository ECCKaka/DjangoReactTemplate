from django.db import models
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
import uuid
# Create your models here.
class Verification(models.Model):
    verificationId = models.AutoField(primary_key=True)
    email = models.TextField(editable=False)
    code = models.CharField(max_length=6, editable=False, unique=True)

    class Meta:
        verbose_name = "Verification"
        db_table = "Verification"


# examples:
# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     course = models.ManyToManyField('Course', through = 'Registration')
#     class Meta:
#         verbose_name = "Profile"
#         db_table = "Profile"
#
#
# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)
#
# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()
# class Course(models.Model):
#     subject = models.ForeignKey("Subject", on_delete=models.CASCADE,  db_column = "subject")
#     price = models.TextField()
#
#     description = models.TextField()
#
#     def __str__(self):
#         """Return a string representation of the model."""
#         return self.description
#
#     class Meta:
#         verbose_name = "course"
#         verbose_name_plural = "courses"
#         db_table = "courses"
#
#
# class Registration(models.Model):
#     """Represents a user's registration in a course. Each object is a unique relationship between a single user and a single course."""
#     user = models.ForeignKey(Profile, on_delete=models.CASCADE,  db_column = "user")
#     course = models.ForeignKey(Course, on_delete=models.CASCADE,  db_column = "course")
#
#
#     class Meta:
#         verbose_name = "registration"
#         verbose_name_plural = "registrations"
#         db_table = "registrations"
#
#         # Emulates having a primary key on both user and course.
#         # In other words, it ensures the the same user cannot register for the same course.
#         unique_together = (("user", "course"),)
#
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
#
# class Profile(models.Model):
#     profileId = models.AutoField(primary_key=True)
#     occupation = models.TextField(null=True)
#     description = models.TextField(null=True)
#     bio = models.TextField(null=True)
#     contactmessage = models.TextField(null=True)
#     website = models.TextField(null=True)
#     userId = models.OneToOneField(User, on_delete=models.CASCADE, db_column = "userId")
#
#
#     class Meta:
#         verbose_name = "Profile"
#         db_table = "Profile"
#
# class Address(models.Model):
#     addressId = models.AutoField(primary_key=True)
#     street = models.TextField(null=True)
#     city = models.TextField(null=True)
#     province = models.TextField(null=True)
#     zip = models.TextField(null=True)
#     # one action has one property
#     userId = models.OneToOneField(User, on_delete=models.CASCADE, db_column = "userId")
#
#     class Meta:
#         verbose_name = "Address"
#         db_table = "Address"
#
# class Education(models.Model):
#     educationId = models.AutoField(primary_key=True)
#     school = models.TextField(null=True)
#     degree = models.TextField(null=True)
#     graduated = models.TextField(null=True)
#     description = models.TextField(null=True)
#     # one action has one property
#     userId = models.OneToOneField(User, on_delete=models.CASCADE, db_column = "userId")
#
#     class Meta:
#         verbose_name = "Education"
#         db_table = "Education"
#
# class Work(models.Model):
#     workId = models.AutoField(primary_key=True)
#     company = models.TextField(null=True)
#     title = models.TextField(null=True)
#     years = models.TextField(null=True)
#     description = models.TextField(null=True)
#
#     userId = models.ForeignKey(User, related_name = 'work', on_delete=models.CASCADE, db_column = "userId")
#
#     class Meta:
#         verbose_name = "Work"
#         db_table = "Work"
#
# class Volunteer(models.Model):
#     volunteerId = models.AutoField(primary_key=True)
#     service = models.TextField(null=True)
#     jobs = models.TextField(null=True)
#     years = models.TextField(null=True)
#     description = models.TextField(null=True)
#
#     userId = models.ForeignKey(User, related_name = 'volunteer', on_delete=models.CASCADE, db_column = "userId")
#
#     class Meta:
#         verbose_name = "Volunteer"
#         db_table = "Volunteer"
#
# class Skill(models.Model):
#     skillId = models.AutoField(primary_key=True)
#     name = models.TextField(null=True)
#     level = models.TextField(null=True)
#
#     userId = models.ForeignKey(User, related_name = 'skill', on_delete=models.CASCADE, db_column = "userId")
#
#     class Meta:
#         verbose_name = "Skill"
#         db_table = "Skill"
