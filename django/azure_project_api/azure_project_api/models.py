from djongo import models
from django.contrib import admin

class Format(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(max_length= 50, null=False)

class Tag(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(max_length= 50, null=False)

class Photo(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(max_length= 50, null=False,)
    picture = models.TextField(max_length= 255, null=False)
    description = models.TextField(max_length= 255, null=True)
    target_client = models.TextField(max_length= 255, null=True)
    logo = models.BooleanField(default=True, null=True)
    pictures_human = models.BooleanField(default=True)
    format_id = models.ForeignKey(Format, on_delete=models.CASCADE, null=True)
    tags = models.ManyToManyField(Tag)

