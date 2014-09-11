from django.shortcuts import render
from django.http import HttpResponse
from ranks.models import Rank
from users.models import User
from django.core.exceptions import ObjectDoesNotExist

def response(request, rank, user, date):
    user_instance = User.objects.get(pixiv_id=user)
    rankInstance, created = Rank.objects.get_or_create(
        rank=rank, 
        date=date,
        defaults={'user_id':user_instance.id},
    )    
    rankInstance.save()
    response = 'success'
    return HttpResponse(response)
