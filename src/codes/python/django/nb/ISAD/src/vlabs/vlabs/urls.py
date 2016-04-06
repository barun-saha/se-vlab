from django.conf.urls import include, url

from django.conf import settings
reverse_proxy_pattern = r'^%s' % (settings.REVERSE_PROXY_PREFIX,)

# Serve URLs of both the apps from / (root) --
# as of now at least
urlpatterns = [
    #url(r'^isad/', include('isad.urls')),
    url(reverse_proxy_pattern, include('isad.urls')), 
    url(r'^', include('isad.urls')),
]
