import os
import sys

sys.path.append('/home/barun/codes/python/django/nb/ISAD/src')
sys.path.append('/home/barun/codes/python/django/nb/ISAD/src/vlabs')
os.environ['DJANGO_SETTINGS_MODULE'] = 'vlabs.settings'

import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()

