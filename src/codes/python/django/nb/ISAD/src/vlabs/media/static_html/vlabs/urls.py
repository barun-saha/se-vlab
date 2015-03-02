from django.conf.urls.defaults import *

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
#    (r'^isad/isad/isad/admin/', include(admin.site.urls)),
#    (r'^isad/isad/admin/', include(admin.site.urls)),
#    (r'^isad/admin/', include(admin.site.urls)),
#    (r'^admin/', include(admin.site.urls)),
    # Enable for Development
    #(r'^isad/isad/', include('vlabs.isad.urls')),
    # Production
    (r'^isad/post2mentor/', include('vlabs.post2mentor.urls')),
    (r'^isad/isad/isad/', include('vlabs.isad.urls')),
    (r'^isad/isad/', include('vlabs.isad.urls')),
    (r'^isad/', include('vlabs.isad.urls')),
)
