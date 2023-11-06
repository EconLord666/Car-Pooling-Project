from django.db import models
from datetime import datetime


# Create your models here.
class CarpoolPost(models.Model):
    # id (primary key) is provided automatically
    title = models.CharField(max_length=200)
    description = models.TextField()
    author = models.CharField(max_length=30)
    date_posted = models.DateTimeField(auto_now_add=True)
    comments = models.IntegerField(default=0)


class CarpoolComment(models.Model):
    # Foreign Key to associate the comment to a specific post
    post = models.ForeignKey(CarpoolPost, on_delete=models.CASCADE)
    text = models.TextField()
    author = models.CharField(max_length=30)
    date_posted = models.DateTimeField(auto_now_add=True)


# credentials of the user
regular_user = {"username": "James@vt.edu", "password": "i<3Pizza"}
admin_user = {"username": "admin@vt.edu", "password": "admin"}
