from django.http import JsonResponse
from ranks.models import Rank
from users.models import User
from pics.models import Pic

def most_ranked(request):
  top_10_rank = Pic.objects.order_by('-view_count')[0:10]  
  array = []
  for index in range(len(top_10_rank)):
    pic_detail = {
      'title':top_10_rank[index].title,
      'url':top_10_rank[index].url,
      'view_count':top_10_rank[index].view_count,
    }
    array.append(pic_detail)
  return JsonResponse({
    'top_10':array,
  })

def most_ranked_users(request):  
  most_ranked_10_user = User.objects.extra(
    select={'pic_count':'SELECT COUNT(*) FROM pics_pic WHERE pics_pic.user_id = users_user.id'},
    order_by=['-pic_count'],
  )[0:10]
  array = []
  for index in range(len(most_ranked_10_user)):    
    user_detail = {
      'name':most_ranked_10_user[index].name,
      'profile_img_url':most_ranked_10_user[index].profile_img_url,
      'pic_count':most_ranked_10_user[index].pic_count,
    }
    array.append(user_detail)
  return JsonResponse({
    'most_ranked_user':array
  })