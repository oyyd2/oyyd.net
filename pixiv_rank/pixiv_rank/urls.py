from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'pixiv_statistic.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^pixiv/admin/', include(admin.site.urls)),
    url(r'^pixiv/rank/',include('ranks.urls')),
    url(r'^pixiv/user/',include('users.urls')),
    url(r'^pixiv/pic/',include('pics.urls')),
)
