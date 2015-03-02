# Django settings for the Software Engineering Virtual Lab (cse08)

from credentials import *

DEBUG = True
TEMPLATE_DEBUG = DEBUG

ADMINS = (
    ('Barun Saha', 'barun<DOT>saha04<AT>gmail<DOT>com'),
)

MANAGERS = ADMINS

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': app_credentials['db_name'],
        'USER': app_credentials['db_user'],
        'PASSWORD': app_credentials['db_password'],
        'HOST': app_credentials['db_host'],
        'PORT': app_credentials['db_port'],
	'OPTIONS': {
	    'init_command': 'SET storage_engine=INNODB'
	},
    }
}

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# On Unix systems, a value of None will cause Django to use the same
# timezone as the operating system.
# If running in a Windows environment this must be set to the same as your
# system time zone.
TIME_ZONE = 'Asia/Kolkata'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = False

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale
USE_L10N = True

# Absolute path to the directory that holds media.
# Example: "/home/media/media.lawrence.com/"

# Prod
MEDIA_ROOT = '/home/barun/codes/python/django/nb/ISAD/src/vlabs/media/'
# Dev
#MEDIA_ROOT = '/home/barun/codes/svn_chkout/isad/06Jun2011/vlabs/media/'

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash if there is a path component (optional in other cases).
# Examples: "http://media.lawrence.com", "http://example.com/media/"
MEDIA_URL = '/cse08/isad/v_media/'

# File upload permissions -- user r+w, group, other r
FILE_UPLOAD_PERMISSIONS = 0644

# URL prefix for admin media -- CSS, JavaScript and images. Make sure to use a
# trailing slash.
# Examples: "http://foo.com/media/", "/media/".
#ADMIN_MEDIA_PREFIX = '/media/'

# Make this unique, and don't share it with anybody.
SECRET_KEY = app_credentials['secret_key']

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
#     'django.template.loaders.eggs.Loader',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'maintenancemode.middleware.MaintenanceModeMiddleware',
)

ROOT_URLCONF = 'vlabs.urls'

TEMPLATE_DIRS = (
    # Put strings here, like "/home/html/django_templates" or "C:/www/django/templates".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.

    # Prod
    '/home/barun/codes/python/django/nb/ISAD/src/vlabs/templates',
    # Dev
    #'/home/barun/codes/svn_chkout/isad/06Jun2011/vlabs/templates',
)

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
#    'django.contrib.admin',
    #'django.contrib.comments',
    'vlabs.isad',
    'ajaxcomments',
    'vlabs.isad.templatetags',
    'vlabs.post2mentor',
)

SESSION_SAVE_EVERY_REQUEST = True


# TinyMCE
TINYMCE_JS_ROOT = MEDIA_ROOT + 'lib/tinymce_3.4.2/jscripts/tiny_mce'
TINYMCE_JS_URL = MEDIA_ROOT + 'lib/tinymce_3.4.2/jscripts/tiny_mce/tiny_mce.js'
TINYMCE_DEFAULT_CONFIG = {
    'theme': "advanced",
    'skin' : "o2k7",
    'plugins' : "autolink,lists,table,fullscreen,advhr,advimage,advlink,emotions,inlinepopups,insertdatetime,media,searchreplace,paste,directionality,noneditable,wordcount,advlist",

    'width': 700,
    'height': 400,

    'theme_advanced_buttons1' : "newdocument,|,bold,italic,underline,strikethrough,|,formatselect,fontselect,fontsizeselect,|,forecolor,backcolor",
    'theme_advanced_buttons2' : "cut,copy,paste,pastetext,pasteword,|,search,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,emotions,cleanup,help,code,|,insertdate,inserttime,|,fullscreen",
    'theme_advanced_toolbar_location' : "top",
    'theme_advanced_toolbar_align' : "left",
    'theme_advanced_statusbar_location' : "bottom",
    'theme_advanced_resizing' : True
}
TINYMCE_SPELLCHECKER = False
TINYMCE_COMPRESSOR = True


# Django maintenance mode
# Changes (#28 : #2)
MAINTENANCE_MODE = False
INTERNAL_IPS = ('127.0.0.1', )

### Identify environment -- custom settings variable
__ENV_PROD__ = True
###

FORCE_SCRIPT_NAME = ''
