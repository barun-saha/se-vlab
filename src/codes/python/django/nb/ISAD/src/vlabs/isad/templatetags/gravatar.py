# Reference: http://tomatohater.com/2008/08/16/implementing-gravatar-django/

import urllib, hashlib
from django import template

register = template.Library()

@register.inclusion_tag('templatetags/gravatar.html')
def show_gravatar(email, size=48):
    default = "/isad/v_media/images/new/open_id.jpg"

    url = "http://www.gravatar.com/avatar.php?d=identicon&"
    url += urllib.urlencode({
        'gravatar_id': hashlib.md5(email).hexdigest(),
        #'default': default,
        'size': str(size)
    })

    return {'gravatar': {'url': url, 'size': size}}
