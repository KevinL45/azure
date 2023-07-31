from rest_framework import serializers
from .models import *

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ("__all__")

class TagOcurrenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["name"]

class PhotoSerializer(serializers.ModelSerializer):

    tags = TagSerializer(many=True, read_only=True)
    class Meta:
        model = Photo
        fields = ("__all__")

