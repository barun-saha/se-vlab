# SE

from django.conf.urls import url, patterns
#from models import *
from django.conf import settings
#from . import views

urlpatterns = patterns('isad.views',
    url(r'^$',                                  'index',         name='index'),
    url(r'^(?P<object_id>\d+)/$',               'introduction',        name='introduction'),
    url(r'^(?P<object_id>\d+)/theory/$',        'theory',        name='theory'),
    url(r'^(?P<object_id>\d+)/procedure/$',     'procedure',        name='procedure'),
    url(r'^(?P<object_id>\d+)/simulation/$',    'simulation',    name='simulation'),
    url(r'^(?P<object_id>\d+)/self_evaluation/$',     'self_evaluation',      name='self_evaluation'),
    url(r'^(?P<object_id>\d+)/exercise/$',      'exercise',      name='exercise'),
    url(r'^(?P<object_id>\d+)/references/$',    'references',    name='references'),
    # (Rev #16: #1)
    url(r'^(?P<object_id>\d+)/case_study/$',    'case_study',     name='case_study'),
    url(r'^about_us/$',                         'about_us',       name='about_us'),
    url(r'^license/$',                         'license',             name='license'),
    url(r'^contact/$',                          'contact',        name='contact'),
    url(r'^thanks/$',                           'thanks',         name='thanks'),
    #url(r'^recaptcha/$',                        'recaptcha',         name='recaptcha'),
    url(r'^get_erd/$',                          'get_er_diagram',   name='erd'),
    url(r'^er/$',                               'er_page'),
    # Rev #12: #8
    url(r'^answer_posted/(?P<theory_id>\d+)/(?P<ref_id>\d+)/$',    'answer_posted', name='answer_posted_successfully'),
)

#urlpatterns = [
#    url(r'^$', views.index, name='index'),
#]

#urlpatterns += patterns('',
    #url(r'^comments/', include('django.contrib.comments.urls'),  name='comments'),
    #url(r'^(?P<object_id>\d+)/theory/load_comments/$', 'vlabs.isad.views.comments',  name='theory_comments'),
#)

# Ajax based request URLs
urlpatterns += patterns('isad.views',
    url(r'^load_exercise/(?P<exercise_id>\d+)/$',    'get_exercise_problem', name='get_exercise_problem'),
    url(r'^load_workspace/(?P<exercise_id>\d+)/(?P<object_id>\d+)/(?P<problem_id>\d+)/$',   'get_exercise_workspace', name='get_exercise_workspace'),
    url(r'^wireit/$',                               'wireit',),
    url(r'^answer/(?P<object_id>\d+)/(?P<exercise_id>\d+)/$',           'get_exercise_answer', name='get_exercise_answer'),
    url(r'^show_solution/(?P<exercise_id>\d+)/$',    'show_solution', name='show_solution'),
    # HTML based simulator
    url(r'^(?P<object_id>\d+)/html_sim/$',          'html_simulator', name='html_simulator'),
    # Rev #12: #8
    url(r'post_text_answer/(?P<exercise_id>\d+)/(?P<theory_id>\d+)/(?P<problem_id>\d+)/$',  'show_mentor'),
    url(r'hi_mentor/$',                             'show_mentor'),
    # (Rev #12: #3)
    url(r'post_uml/$',                             'test_uml'),
    #url(r'draw_uml/$',                             'draw_uml_diagram'),
    # (Rev #37: #5)
    url(r'uml/statechart/$',                       'multiple_workspaces', name='multiple_workspaces_statechart'),
    url(r'uml/activity/$',                         'multiple_workspaces', name='multiple_workspaces_activity'),
    # (Rev #39: #1)
    url(r'uml/class-dia/$',                       'multiple_workspaces', name='multiple_workspaces_class'),
    url(r'uml/sequence-dia/$',                         'multiple_workspaces', name='multiple_workspaces_sequence'),
    # (Rev #41: #3)
    url(r'recaptchajaX/$',                          'verify_recaptcha'),
    # (Rev #61: #4)
    url(r'experiments-list/$',                          'experiments_list', name='experiments_list'),
    url(r'get_static_url/$', 'get_static_url', name='get_static_url'),
)
#
# UML diagrams
urlpatterns += patterns('isad.diagrams',
    # (Rev #18: #1)
    url(r'class_diagram/$',                         'class_diagram', name='class_diagram'),
    url(r'sequence_diagram/$',                      'sequence_diagram', name='sequence_diagram'),
    # (Changes #27: #1)
    url(r'^uml_dia/$',                              'plantuml_diagram', name='uml_dia'),
    # (Rev #68: #1)
    url(r'cfg/$',                                   'generate_cfg', name='generate_cfg'),

    url(r'^graphviz/$',                          'graphviz_diagram', name='graphviz'),
)

#if settings.DEBUG:
#    urlpatterns += patterns('',
#        url(r'^v_media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
#        url(r'^xhr_test$',  'vlabs.isad.views.xhr_test'),
#        url(r'^ajax/$',     'vlabs.isad.views.ajax_test'),
#        url(r'^url_test/$',     'vlabs.isad.views.url_test'),
#   )
