from django.conf.urls import url
from users import views

urlpatterns = [
    url(ur'^pixiv_id/(?P<pixiv_id>[\w]+)/name/(?P<name>.+)/profile_img_url/(?P<profile_img_url>.+)$',views.response,name='response'),
]
