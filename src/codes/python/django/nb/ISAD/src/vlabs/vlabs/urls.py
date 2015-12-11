from django.conf.urls import include, url

#from django.contrib import admin
#admin.autodiscover()

urlpatterns = [
    #url(r'^isad/', include('isad.urls')),
    url(r'^', include('isad.urls')),
]
