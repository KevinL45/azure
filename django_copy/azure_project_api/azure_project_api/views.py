from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def getPhoto(request):
    photo = {"name":"star wars"} 
    return Response(photo)