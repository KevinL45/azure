from djongo import models

class Photo(models.Model):
    _id = models.ObjectIdField()
    name = models.TextField(max_length= 50, null=False, blank=False)
    picture = models.TextField(max_length= 255, null=False, blank=False)
    description = models.TextField(max_length= 255, null=False, blank=False)
    target_client = models.TextField(max_length= 255, null=False, blank=False)
    logo = models.BooleanField()
    pictures_human = models.BooleanField()

class Format(models.Model):
    _id = models.ObjectIdField()
    name = models.TextField(max_length= 50, null=False, blank=False)

class Tag(models.Model):
    _id = models.ObjectIdField()
    name = models.TextField(max_length= 50, null=False, blank=False)

class Photos_Tags(models.Model):
    _id_photo = models.ObjectIdField()
    _id_tag = models.ObjectIdField()

