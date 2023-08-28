
from rest_framework import status

from .pictures_service import PictureService
from .computer_vision_service import ComputerVision

from .serializer import *
from django.http import FileResponse, HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from django.db.models import Count
from django.db.models import Q

import json
from random import sample

from enum import Enum

class SEARCH_MODE(Enum):
     INCLUDE = "INCLUDE"
     EXCLUDE = "EXCLUDE"


@api_view(['GET'])
def ten_photos(request):
        photo = Photo.objects.all()[:8]
        serializer = PhotoSerializer(photo, many=True)
        return JsonResponse(serializer.data, safe=False)

# https://docs.djangoproject.com/fr/2.2/topics/db/examples/many_to_many/
# https://docs.djangoproject.com/fr/2.2/topics/db/examples/many_to_many/
@api_view(['GET'])
def list_photos(request, search_mode = SEARCH_MODE.INCLUDE):
        photo = Photo.objects.all()
        search_mode = request.query_params.get('search_mode', '')
        try:
            search_mode = SEARCH_MODE(search_mode.upper())
        except: 
            search_mode = SEARCH_MODE.INCLUDE
        print(search_mode.value)
        filters = request.query_params.get('filter', None)
        if filters != None:
            filters = filters.replace('"','').strip()
            # print(filters)
            filters_parsed = filters.split(",")
            filters_to_search = []
            if search_mode == SEARCH_MODE.INCLUDE:
                for filter_parsed in filters_parsed:
                    # print(filter_parsed)
                    filters_to_search.append(filter_parsed)
                photo = Photo.objects.filter(tags__name__in=filters_to_search)
            elif search_mode == SEARCH_MODE.EXCLUDE:
                try:
                    for filter_parsed in filters_parsed:
                        filters_to_search = []
                        filters_to_search.append(filter_parsed) 
                        photo = Photo.objects.filter(Q(name='Mihail') & Q(age=20)tags__name__in=filters_to_search)
                except Exception as error:
                    print(error)
                    photo = []
            # for filter_parsed in photo:
            #     print(filter_parsed)
        serializer = PhotoSerializer(photo, many=True)
        return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def random_photos(request):
        photos = Photo.objects.all()
        random_photos = sample(list(photos), 5)
        serializer = PhotoSerializer(random_photos, many=True)
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

@api_view(['GET'])
def get_available_tags(request, max_tags=10):
        tags: [] = []
        class TagOccurence:
            name =  "",
            occurence = 0

        try:
            tags_temp: [] = Tag.objects.values('name').distinct() \
                .annotate(occurence=Count('name')) \
                .order_by('-occurence')[:max_tags]
            for tag_temp in tags_temp:
                tags.append(tag_temp)
        except:
             print('error')
        
        return JsonResponse({'available-tags': tags}, safe=False)

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
    computerService = ComputerVision()

    print(len(request.FILES.getlist('files')))
    files = request.FILES.getlist('files')

    pictures_uploaded_UUIDs = pictureService.upload_files(files)

    for blob in pictures_uploaded_UUIDs:
        url_picture = pictureService.get_path(blob)
        tag_list = computerService.analyze_picture(url_picture)
        for tag in tag_list:
            Tag.objects.create(name=tag['name'], confidence=tag['confidence'])
        photo = Photo.objects.create(name=blob,picture=url_picture)
        for tag in tag_list:
            tags=Tag.objects.filter(name=tag['name'])
            if tags.exists():
                tag_id = tags.first().id
                photo.tags.add(tag_id)
    return JsonResponse(pictures_uploaded_UUIDs, safe=False) 

@api_view(['GET'])
def download_pictures(request, UUID):
    pictureService = PictureService()
    downloaded_pictures = pictureService.download_blob(UUID)
    response = FileResponse(downloaded_pictures, content_type="image/jpeg")
    response['Content-Disposition'] = 'attachment; filename="%s.jpg"'%UUID
    return response

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
        # print(picture_tags_analyzed)
        pictures_tags_stringified = json.dumps(picture_tags_analyzed)
        return HttpResponse(pictures_tags_stringified,"application/json")

