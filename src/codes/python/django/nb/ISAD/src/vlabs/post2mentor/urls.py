from django.conf.urls.defaults import patterns
from django.conf.urls.defaults import *
from vlabs.isad.models import *
from vlabs.post2mentor.models import *
from django.conf import settings

urlpatterns = patterns('vlabs.post2mentor.views',
    url(r'^answer-form/(?P<theory_id>\d+)/(?P<problem_id>\d+)/(?P<exercise_id>\d+)/$', 'answer_form',  name='answer_form'),
    #url(r'^(?P<object_id>\d+)/theory/load_comments/$', 'a',  name='theory_comments'),
)