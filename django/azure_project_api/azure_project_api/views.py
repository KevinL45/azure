from rest_framework.response import Response
from rest_framework import status
from .serializer import *
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser 




@api_view(['GET'])
def list_formats(request):
        format = Format.objects.all()
        serializer = FormatSerializer(format, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def list_photos(request):
        photo = Photo.objects.all()
        serializer = PhotoSerializer(photo, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def getPhoto(request,id):
        photo = Photo.objects.filter(id=id)
        serializer = PhotoSerializer(photo, many=True)
        return Response(serializer.data)

@api_view(['GET','POST'])
def create_photo(request):
    if request.method == 'GET':
        photo = Photo.objects.all()
        photo_serializer = PhotoSerializer(photo, many=True)
        return Response(photo_serializer.data)
    
    if request.method == 'POST':
        photo_data = JSONParser().parse(request)
        photo_serializer = PhotoSerializer(data=photo_data)
        if photo_serializer.is_valid():
            photo_serializer.save()
            return Response(photo_serializer.data, status=status.HTTP_201_CREATED) 
        return Response(photo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE','GET'])
def delete_photo(request,id):
    photo = Photo.objects.filter(id=id)
    if request.method == 'GET':
        photo_serializer = PhotoSerializer(photo, many=True)
        return Response(photo_serializer.data)
    if request.method == 'DELETE':
        photo.delete()
        return Response({'message': 'Tutorial was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)



@api_view(['GET'])
def list_tags(request):
        tag = Tag.objects.all()
        serializer = TagSerializer(tag, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def getTag(request,id):
        tag = Tag.objects.filter(id=id)
        serializer = TagSerializer(tag, many=True)
        return Response(serializer.data)

@api_view(['GET','POST'])
def create_tag(request):
    if request.method == 'GET':
        tag = Tag.objects.all()
        serializer = TagSerializer(tag, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = TagSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE','GET'])
def delete_tag(request,id):
    tag = Tag.objects.filter(id=id)
    if request.method == 'GET':
        serializer = TagSerializer(tag, many=True)
        return Response(serializer.data)
    if request.method == 'DELETE':
        tag.delete()
        return Response({'message': 'Tutorial was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT','GET'])
def update_tag(request,id,queryset=None):
    tag = Tag.objects.filter(id=id)
    if request.method == 'GET':
        serializer = TagSerializer(tag, many=True)
        return Response(serializer.data)
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = TagSerializer(tag,data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
