from rest_framework import serializers
from .models import *

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ("__all__")

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ("__all__")

class FormatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Format
        fields = ("__all__")