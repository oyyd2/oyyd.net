from django.shortcuts import render
from django.http import HttpResponse

from users.models import User
from pics.models import Pic

def response(request,user,pic_id,title,url,view_count,total_score):
    userInstance = User.objects.get(pixiv_id=user)
    picInstance, created = Pic.objects.get_or_create(
        pic_id=pic_id,
        defaults={
            'user_id':userInstance.id,
            'title':title,
            'url':url,
            'view_count':view_count,
            'total_score':total_score,
        },
    )    
    picInstance.save()
    response = "success"
    return HttpResponse(response)