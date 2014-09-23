from django.conf.urls import url
from service import views

urlpatterns = [
  url(r'^most_ranked$',views.most_ranked,name='most_ranked'),
]