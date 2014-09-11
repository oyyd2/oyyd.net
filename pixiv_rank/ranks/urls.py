from django.conf.urls import url
from ranks import views

urlpatterns = [
    url(r'^(?P<rank>[1-9]{1})/user/(?P<user>[\w]+)/date/(?P<date>[\w-]+)$',views.response,name='response'),
]