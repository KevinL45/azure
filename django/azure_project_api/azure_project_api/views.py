from rest_framework import status

from .pictures_service import PictureService
from .computer_vision_service import ComputerVision

from .serializer import *
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
import json

@api_view(['GET'])
def list_formats(request):
        format = Format.objects.all()
        serializer = FormatSerializer(format, many=True)
        return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def list_photos(request):
        photo = Photo.objects.all()
        serializer = PhotoSerializer(photo, many=True)
        return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def getPhoto(request,id):
        photo = Photo.objects.filter(id=id)
        serializer = PhotoSerializer(photo, many=True)
        return JsonResponse(serializer.data, safe=False)

@api_view(['GET','POST'])
def create_photo(request):
    if request.method == 'GET':
        photo = Photo.objects.all()
        photo_serializer = PhotoSerializer(photo, many=True)
        return JsonResponse(photo_serializer.data, safe=False)
    
    if request.method == 'POST':
        photo_data = JSONParser().parse(request)
        photo_serializer = PhotoSerializer(data=photo_data)
        if photo_serializer.is_valid():
            photo_serializer.save()
            return JsonResponse(photo_serializer.data, status=status.HTTP_201_CREATED, safe=False) 
        return JsonResponse(photo_serializer.errors, status=status.HTTP_400_BAD_REQUEST, safe=False)

@api_view(['PUT','GET'])
def update_photo(request,id):
    if request.method == 'GET':
        photo = Photo.objects.filter(id=id)
        serializer = PhotoSerializer(photo, many=True)
        return JsonResponse(serializer.data)
    if request.method == 'PUT':
        photo = Photo.objects.get(id=id)
        data = JSONParser().parse(request)
        serializer = PhotoSerializer(photo,data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED, safe=False) 
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST, safe=False)

@api_view(['DELETE','GET'])
def delete_photo(request,id):
    photo = Photo.objects.filter(id=id)
    if request.method == 'GET':
        photo_serializer = PhotoSerializer(photo, many=True)
        return JsonResponse(photo_serializer.data, safe=False)
    if request.method == 'DELETE':
        photo.delete()
        return JsonResponse({'message': 'Picture was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT, safe=False)



@api_view(['GET'])
def list_tags(request):
        tag = Tag.objects.all()
        serializer = TagSerializer(tag, many=True)
        return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def getTag(request,id):
        tag = Tag.objects.filter(id=id)
        serializer = TagSerializer(tag, many=True)
        return JsonResponse(serializer.data, safe=False)

@api_view(['GET','POST'])
def create_tag(request):
    if request.method == 'GET':
        tag = Tag.objects.all()
        serializer = TagSerializer(tag, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = TagSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED, safe=False) 
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST, safe=False)

@api_view(['DELETE','GET'])
def delete_tag(request,id):
    tag = Tag.objects.filter(id=id)
    if request.method == 'GET':
        serializer = TagSerializer(tag, many=True)
        return JsonResponse(serializer.data, safe=False)
    if request.method == 'DELETE':
        tag.delete()
        return JsonResponse({'message': 'Tag was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT, safe=False)

@api_view(['PUT','GET'])
def update_tag(request,id):
    if request.method == 'GET':
        tag = Tag.objects.filter(id=id)
        serializer = TagSerializer(tag, many=True)
        return JsonResponse(serializer.data, safe=False)
    if request.method == 'PUT':
        tag = Tag.objects.get(id=id)
        data = JSONParser().parse(request)
        serializer = TagSerializer(tag,data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED, safe=False) 
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST, safe=False)

# TO TEST WIP
@api_view(['GET'])
def get_pictures(request, blob_name):
        pictureService = PictureService()
        pictureService.download_blob(blob_name)
        return JsonResponse("hello", safe=False) 

@api_view(['POST'])
def upload_pictures(request):
    pictures_uploaded_UUIDs = []
    pictureService = PictureService()
    # local_path = "./data"
    print(len(request.FILES.getlist('files')))
    files = request.FILES.getlist('files')
    # for ile in files:
        # print(file.name)
    pictures_uploaded_UUIDs = pictureService.upload_files(files)
    return JsonResponse(pictures_uploaded_UUIDs, safe=False) 

@api_view(['POST'])
def download_pictures(request):
    pictures_uploaded = []
    pictureService = PictureService()
    # local_path = "./data"
    files = request.FILES['files']
    for file in files:
        print(file.name)
        picture_uploaded = pictureService.upload_blob(file.read(), file.name)
        pictures_uploaded.append(picture_uploaded)
        

# //OK
@api_view(['GET'])
def get_pictures_blobs(request):
        pictureService = PictureService()
        pictures_blob = pictureService.list_blobs()
        pictures_blob_stringified = json.dumps({"pictures_blob" : pictures_blob})
        return HttpResponse(pictures_blob_stringified, "application/json")

@api_view(['GET'])
def get_pictures_blobs_path(request, blob_number_max:int):
        pictureService = PictureService()
        pictures_blob = pictureService.get_blobs_paths(blob_number_max)
        pictures_blob_stringified = json.dumps({"pictures_blob" : pictures_blob})
        return HttpResponse(pictures_blob_stringified, "application/json")



@api_view(['GET'])
def computer_vision_analyze(request, name:str):
        pictureService = PictureService()
        url = pictureService.get_path(name)
        computer_vision = ComputerVision()
        picture_tags_analyzed = computer_vision.analyze_picture(url)
        print(picture_tags_analyzed)
        # pictures_tags_stringified = json.dumps({"pictures_tags" : picture_tags_analyzed})
        return HttpResponse(url, "application/json")
