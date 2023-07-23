from djongo import models
from django.contrib import admin

class Tag(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(max_length= 50, null=False)
    confidence = models.DecimalField(max_digits=18, decimal_places=16, null=True)


class Photo(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(max_length= 50, null=False,)
    picture = models.TextField(max_length= 255, null=False)
    tags = models.ManyToManyField(Tag)

