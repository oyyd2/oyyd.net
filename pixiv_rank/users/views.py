from django.shortcuts import render
from django.http import HttpResponse

from users.models import User

def response(request,pixiv_id,name,profile_img_url):    
    userInstance, created = User.objects.get_or_create(
        pixiv_id=pixiv_id,
        defaults={
            'name':name,
            'profile_img_url':profile_img_url,
        }
    )
    userInstance.save()
    response = "success"
    return HttpResponse(response)