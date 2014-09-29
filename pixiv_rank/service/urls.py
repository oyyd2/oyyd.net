from django.conf.urls import url
from service import views

urlpatterns = [
  url(r'^most_ranked$',views.most_ranked,name='most_ranked'),
  url(r'^most_ranked_users$',views.most_ranked_users,name='most_ranked_users'),
]