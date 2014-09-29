from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'pixiv_statistic.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^pixiv/api/admin/', include(admin.site.urls)),
    url(r'^pixiv/api/rank/',include('ranks.urls')),
    url(r'^pixiv/api/user/',include('users.urls')),
    url(r'^pixiv/api/pic/',include('pics.urls')),
    url(r'^pixiv/api/service/',include('service.urls')),
)
