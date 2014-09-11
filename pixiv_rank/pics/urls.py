from django.conf.urls import url
from pics import views

urlpatterns = [
    url(r'^user/(?P<user>[\w]+)/pic_id/(?P<pic_id>[\w]+)/title/(?P<title>.+)/view_count/(?P<view_count>[\d]+)/total_score/(?P<total_score>[\d]+)/url/(?P<url>.+)',views.response,name='response'),
]