"""azure_project_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),

    path('photos/',views.list_photos, name="Liste des photos"),
    path('photos/',views.list_photos, name="filtre Liste des photos"),
    path('photo/<int:id>/',views.getPhoto , name="Photo"),
    path('add_photo/',views.create_photo , name="Ajouter une photo"),
    path('remove_photo/<int:id>/',views.delete_photo, name="Supprimer une photo"),
    path('update_photo/<int:id>/',views.update_photo, name="Modifier une photo"),
    path('random_photos/',views.random_photos, name="Liste des photos"),
    path('ten_photos/',views.ten_photos, name="Liste des photos"),



    path('tags-available/<int:max_tags>/', views.get_available_tags, name= "Liste des tags par occurence / poularité"),
    path('tags/',views.list_tags, name="Liste des tags"),
    path('tag/<int:id>/',views.getTag , name="Tag"),
    path('add_tag/',views.create_tag , name="Ajouter un tag"),
    path('remove_tag/<int:id>/',views.delete_tag, name="Supprimer un tag"),
    path('update_tag/<int:id>/',views.update_tag, name="Modifier un tag"),


    path('blobs/pictures/<str:blob_name>/',views.get_pictures, name="get pictures from Azure blob storage"),
    path('blobs/pictures/paths/<int:blob_number_max>/',views.get_pictures_blobs_path, name="get pictures path to render them from Azure blob storage"),
    path('blobs/pictures/',views.get_pictures_blobs, name="get pictures list from Azure blob storage"),
    path('upload/pictures/', views.upload_pictures, name='upload the picture given as parameters'),
    path('download/pictures/<str:UUID>/', views.download_pictures, name='upload the picture given as parameters'),

    path('computer-vision/analyze/<str:name>/', views.computer_vision_analyze, name='analyze the picture given as parametre and return tags found')
    



]
