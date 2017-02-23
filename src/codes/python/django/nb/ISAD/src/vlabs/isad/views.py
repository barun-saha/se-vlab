# SE

from .models import *
from django.core.context_processors import request
from django.shortcuts import render_to_response, get_object_or_404, get_list_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.template import RequestContext
from django.conf import settings
from django.template.loader import render_to_string
import datetime as dtt

from django.forms.models import modelformset_factory
from recaptcha.client import captcha

import pygraphviz as pgv
import time

from . import teacher
from . import graph_comparison as gc
import globals
import diagrams

import json

from django.views.decorators.csrf import ensure_csrf_cookie


# (Rev #46: #1)
allowed_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,]
block_list = ['',]

def index(request):
    '''
    Home page -- display the list of experiments
    '''
    #t = Theory.objects.all()
    t = Theory.objects.filter(id__in = allowed_list)
    return render_to_response(
        'isad/home.html',
        {'theory': t, 'reverse_proxy_url': settings.REVERSE_PROXY_URL},
        context_instance=RequestContext(request)
    )


def theory(request, object_id=9):
    '''
    Theory for the selected experiment
    '''
    # (Rev #46: #1)
    if object_id in block_list:
        return index(request)

    t = get_object_or_404(Theory, pk=object_id)
    t.content = t.content.replace('_STATIC_URL_', settings.STATIC_URL)
    context = RequestContext(request)
    # Required to differentiate between ISAD and ANT in post-comment.js
    #context['SITE_BASE'] = '/cse08/isad/'

    return render_to_response(
        'isad/theory.html',
        {
            'object_id':    object_id,
            'theory':       t,
            'reverse_proxy_url': settings.REVERSE_PROXY_URL
        },
        context_instance=context
    )


def introduction(request, object_id=1):
    # (Rev #46: #1)
    if object_id in block_list:
        return index(request)

    t = get_object_or_404(Theory, pk=object_id)
    return render_to_response(
        'isad/introduction.html',
        {
            'title':        t.title,
            'introduction':    t.extra,
            'object_id':    object_id,
            'reverse_proxy_url': settings.REVERSE_PROXY_URL
        },
        context_instance=RequestContext(request)
    )


def procedure(request, object_id=9):
    # (Rev #46: #1)
    if object_id in block_list:
        return index(request)

    # (Rev #58: #1)
    #t = get_object_or_404(Theory, pk=object_id)
    p = get_object_or_404(Procedure.objects.select_related(), theory=object_id)
    p.content = p.content.replace('_STATIC_URL_', settings.STATIC_URL)
    return render_to_response(
        'isad/procedure.html',
        {
            'title':        p.theory.title,
            'procedure':    p.content,
            'object_id':    object_id,
            'reverse_proxy_url': settings.REVERSE_PROXY_URL
        },
        context_instance=RequestContext(request)
    )

def simulation(request, object_id):
    # (Rev #46: #1)
    if object_id in block_list:
        return index(request)

    # (Rev #58: #1)
    #t = get_object_or_404(Theory, pk=object_id)
    s = get_object_or_404(Simulation.objects.select_related(), theory=object_id)
    return render_to_response(
        'isad/simulation.html',
        {
            'title':        s.theory.title,
            'object_id':    object_id,
            'simulation':   s,
            'reverse_proxy_url': settings.REVERSE_PROXY_URL
        },
        context_instance=RequestContext(request)
    )

def self_evaluation(request, object_id):
    # (Rev #46: #1)
    if object_id in block_list:
        return index(request)

    # (Rev #58: #1)
    #t = get_object_or_404(Theory, pk=object_id)
    se = get_list_or_404(SelfEvaluation.objects.select_related(), theory=object_id)
    def ss(a, b):
        return (a.question_num - b.question_num)

    se.sort(key=lambda e: e.question_num)

    return render_to_response(
        'isad/sevaluation.html',
        {
            'title':        se[0].theory.title,
            'object_id':    object_id,
            'sevaluation':  se,
            'reverse_proxy_url': settings.REVERSE_PROXY_URL
        },
        context_instance=RequestContext(request)
    )

def exercise(request, object_id):
    # (Rev #46: #1)
    if object_id in block_list:
        return index(request)


    # (Rev #58: #1)
    #t = get_object_or_404(Theory, pk=object_id)
    e = get_list_or_404(Exercise.objects.select_related(), theory=object_id)
    return render_to_response(
        'isad/exercise.html',
        {
            'title':        e[0].theory.title,
            'object_id':    object_id,
            'exercise':     e,
            'reverse_proxy_url': settings.REVERSE_PROXY_URL
        },
        context_instance=RequestContext(request)
    )

def references(request, object_id):
    # (Rev #46: #1)
    if object_id in block_list:
        return index(request)

    # (Rev #58: #1)
    #t = get_object_or_404(Theory, pk=object_id)
    r = get_list_or_404(Reference.objects.select_related(), theory=object_id)
    return render_to_response(
        'isad/reference.html',
        {
        'title':        r[0].theory.title,
        'object_id':    object_id,
        'reference':    r,
        'reverse_proxy_url': settings.REVERSE_PROXY_URL
        },
        context_instance=RequestContext(request)
    )

# (Rev #16: #1)
# Return all the case studies for a given experiment
def case_study(request, object_id):
    # (Rev #46: #1)
    if object_id in block_list:
        return index(request)

    # (Rev #58: #1)
    #theory = get_object_or_404(Theory, pk=object_id)
    case_studies = get_list_or_404(CaseStudy.objects.select_related(), theory=object_id)
    for case in case_studies:
        case.analysis = case.analysis.replace('_STATIC_URL_', settings.STATIC_URL)
    return render_to_response(
        'isad/case_study.html',
        {
            'title':        case_studies[0].theory.title,
            'object_id':    object_id,
            'case_list':    case_studies,
            'reverse_proxy_url': settings.REVERSE_PROXY_URL
        },
        context_instance=RequestContext(request)
    )


def about_us(request):
    return render_to_response(
        'isad/about_us.html',
        {},
        context_instance=RequestContext(request)
    )


def license(request):
    return render_to_response(
        'isad/license.html',
        {},
        context_instance=RequestContext(request)
    )


def contact(request):
    ContactFormSet = modelformset_factory(Contact, fields = ('name', 'email', 'website', 'organization', 'subject', 'comment',))
    managementFormData = {
        'form-TOTAL_FORMS':     u'1',
        'form-INITIAL_FORMS':   u'0',
        'form-MAX_NUM_FORMS':   u'1',
        'form-0-title':         u'Contact',
        'form-0-pub_date':      u'01 November 2010',
    }
    captcha_response = None
    #print 'Begin'
    if request.method == 'POST':                # The form has been already submitted
        #print 'Inside POST'
        formSet = ContactFormSet(request.POST, managementFormData)  # A form bound tot he POST data
        if formSet.is_valid():                  # All validation rules pass
            #print 'Inside is_valid'
            # Process the data
            name    = formSet.cleaned_data[0]['name']
            email   = formSet.cleaned_data[0]['email']
            website = formSet.cleaned_data[0]['website']
            organization = formSet.cleaned_data[0]['organization']
            subject = formSet.cleaned_data[0]['subject']
            comment = formSet.cleaned_data[0]['comment']
            #print 'Going for Captcha'
            # Talk to the reCAPTCHA service
            response = captcha.submit(
                request.POST.get('recaptcha_challenge_field'),
                request.POST.get('recaptcha_response_field'),
                settings.RECAPTCHA_PRIVATE_KEY,
                request.META['REMOTE_ADDR'],)

            # see if the user correctly entered CAPTCHA information
            # and handle it accordingly
            if response.is_valid:
                # Save the data
                formSet.save()
                # Redirect to another URL
                return HttpResponseRedirect('/isad/isad/thanks/')

            else:
                captcha_response = 'Please type in the two words exactly as shown below'

        else:
            #print 'Not valid'
            pass
    else:
        formSet =  ContactFormSet(managementFormData)             # An unbound form

    return render_to_response(
        'isad/contact.html',
        {
            'formSet': formSet,
            'captcha_response': captcha_response,
        },
        context_instance=RequestContext(request)
    )

def thanks(request):
    return render_to_response(
        'isad/thanks.html',
        {},
        context_instance=RequestContext(request)
    )

def recaptcha(request):
    from recaptcha.client import captcha
    from django import forms

    class EditForm(forms.Form):
        data_field = forms.CharField()

    if request.method == 'POST':
        edit_form = EditForm(request.POST)
        # talk to the reCAPTCHA service
        response = captcha.submit(
            request.POST.get('recaptcha_challenge_field'),
            request.POST.get('recaptcha_response_field'),
            settings.RECAPTCHA_PRIVATE_KEY,
            request.META['REMOTE_ADDR'],)

        # see if the user correctly entered CAPTCHA information
        # and handle it accordingly.
        if response.is_valid:
            captcha_response = "YOU ARE HUMAN: %(data)s" % {'data' :
		edit_form.data['data_field']}
        else:
            captcha_response = 'YOU MUST BE A ROBOT'

        return render_to_response(
            'isad/recaptcha.html',
            {
                'edit_form': edit_form,
                'captcha_response': captcha_response
            },
            context_instance=RequestContext(request)
        )
    else:
        edit_form = EditForm()
        return render_to_response(
            'isad/recaptcha.html',
            {'edit_form': edit_form},
            context_instance=RequestContext(request)
        )



#
# AJAX requests
#

# (Rev #61: #3)
def experiments_list(request):
    list = Theory.objects.all()
    output_list = []
    for t in list:
        #print t.id, t.title
        output_list.append( (t.title,) )

    #print output_list
    return HttpResponse( json.dumps(output_list) )


def html_simulator(request, object_id=2):
    template_file = 'isad/special/simulator_%s.html' % (object_id,)
    return render_to_response(
        template_file,
        {},
        context_instance = RequestContext(request)
    )

def get_exercise_problem(request, exercise_id):
    '''
    Return the problem statement for an exercise; problem_id is the PK
    of the Exercise table.
    '''
    ep = get_object_or_404(Exercise, id=exercise_id)

    return HttpResponse(ep.problem)


@ensure_csrf_cookie
def get_exercise_workspace(request, exercise_id, object_id, problem_id=1):
    '''
    Return the problem solving workspace for the selected exercise.
    object_id is required to select the workspace javascript file.
    '''
    ew = get_object_or_404(Exercise, id=exercise_id)
    request.session['theory_id'] = object_id
    request.session.modified = True

    if ew.workspace.wtype == 'Inline':
        workspace = get_inline_workspace(object_id, problem_id)
    elif ew.workspace.wtype == 'HelloMentor':
        # (Rev #12: #7, #8)
        #workspace = show_mentor(request, exercise_id, object_id, problem_id)
        # Change #26: #3
        return HttpResponseRedirect('/cse08/post2mentor/answer-form/%s/%s/%s/' % (object_id, problem_id, exercise_id,))
    else:
        workspace = ew.workspace.code

    #workspace = { 'workspace': workspace, }
    #return HttpResponse(json.dumps(workspace), content_type="application/json")
    return HttpResponse(workspace)

# An extremely simple, but very lengthy function
def get_inline_workspace(object_id, problem_id):
    entries = []
    object_id = int(object_id)
    problem_id = int(problem_id)
    #print object_id, problem_id

    # Contents of entries must be similar for all experiments
    if object_id == 1:
        if problem_id == 1:
            entries = [
                (
                    'Following are the ambiguities',            # Question
                    (
                        (0, 'None',),                           # Correct, option
                        (1, 'There\'s no specification when an auction gets over',),
                        (0, 'It doesn\'t say who are registered users',),
                        (0, 'No mention about what technology to be used for developing the application',),
                    ),
                ),
                (
                    'Following are the inconsistencies',
                    (
                        (0, 'None',),
                        (1, 'An item is said to be sold to the max bidder after auction is over; it can also be sold before the auction is over',),
                        (0, 'A registered user seems could be both buyer and seller'),
                    ),
                ),
                (
                    'The problem statement is incomplete because',
                    (
                        (0, 'None',),
                        (1, 'No mention of how a new user registers',),
                        (1, 'No mention of any dispute regarding the sold product',),
                        (1, 'No mention of what kind of products could be put on auction',),
                    ),
                ),
            ]
        elif problem_id == 2:
            entries = [
                (
                    'Following functional requirements could be obtained from the requirements specifications',
                    (
                        (1, 'Registration: New users have to register themselves online with the site and accept its terms & conditions',),
                        (1, 'User Login: A user has to login into the site using his correct user ID & password',),
                        (1, 'Upload Item for Auction: An authenticated user can upload an item into the site, which is to be put on auction subsequently',),
                        (1, 'Auction Item: User puts an item already uploaded by him ino the site on auction',),
                        (0, 'Balance Check: Bidder should have enough bank balance to bid',),
                        (1, 'Bid for Item: Any registered & authenticated user of the system could place a bid for an item on auction',),
                        (1, 'Win Auction: After the auction is over, the maximum bidder for the item owns the item post payment',),
                        (1, 'Ship Item: Seller of the item ships the item to the auction owner after he (seller) receives the payment',),
                        (0, 'Availability: The system should remain up & running before, during and after an auction',),
                        (1, 'Remove item: Owner removes an item after uploading it, and doesn\'t put on auction',),
                        (1, 'Remove auctioned item: System automatically removes an item from its inventory after it has been successfully auctioned', 1,),
                        (0, 'Site Support: Customer care for the website should provide 24x7 help over phone',),
                    ),
                ),
            ]
        elif problem_id == 3:
            entries = [
                (
                    'Following possible non-functional requirements could be identified from the requirements specifications',
                    (
                        (0, 'The system provides option for online registration of new users',),
                        (1, 'The system should remain up & running throughout it\'s working hours',),
                        (0, 'System automatially removes an item from its database after it has been successfully auctioned', 1,),
                        (1, 'Sessions of different users must not affect each other'),
                        (0, 'Customer care for the website should provide 24x7 help over phone',),
                        (1, 'System should maintain privacy of their users and should not leak their information to third parties',),
                        (1, 'System should be able to service 100 users simultaneously',),
                        (1, 'System could remain unavailable for upto 2 hours for maintenance once in a quarter with 36 hour prior notice',),
                    ),
                ),
            ]


    template = 'isad/workspace/inline_workspace_%d.html' % (object_id,)
    html = render_to_string(
        template,
        {
            'entries': entries,
            'MEDIA_URL': '/cse08/isad/v_media/',
            'object_id': object_id,
            'problem_id': problem_id,
        },
        #RequestContext(request)
    )
    #print html
    return html

def get_exercise_answer(request, object_id=9, exercise_id=1):
    #if not request.is_ajax():
    #    return HttpResponse("You can't view this page!", status=400)

    # To distinguish between problems where some input is being send from the client side (08-Jan-2011)
    require_input = (
        2,      # Exercise #2 (Halstead's metrics operators)
        #3,      # All (use case diagrams)
        9,      # All (CFG)
    )
    try:
        oid = int(object_id)
    except ValueError:
        oid = 9

    s = get_object_or_404(Solution, exercise=exercise_id)

    isCorrect = False
    user_solution = ''
    correct_solution = ''
    verify = {}
    if oid in require_input:
        user_solution = request.GET.get('graph')
        correct_solution = s.graph
    else:
        # Simply display the 'View Solution' button
        #verify[oid] = teacher.just_show_solution
        verify[oid] = lambda: (False, '',)

    # Solution verification functions to be called as per specific experiment numbers
    verify[2] = teacher.check_answer_2_2
    #verify[3] = gc.compare_use_case
    verify[9] = gc.compare_graphs

    # Now invoke the correct function to compare the solutions
    if oid in require_input:
        isCorrect = verify[oid](correct_solution, user_solution)
    else:
        isCorrect = verify[oid]()

    if isCorrect[0] == False:
        if oid in require_input:
            mesgToDisplay = '<p style="color: red;">Sorry, not correct! </p> <p>' + str(isCorrect[1]) + '</p>'
        else:
            mesgToDisplay = ''

        #
        # (Rev #47: #4)
        #mesgToDisplay += "<div class='centerAlign'> <input type='button' value='View Solution' "
        #mesgToDisplay += "onclick='confirm(\"Are you sure you dont want to give another try?\") ? window.open(\"/isad/isad/show_solution/%s/\", \"Solution\",\"width=430,height=290,resizable=yes,toolbar=no,linkbar=no,scrollbars=yes,location=0,directories=no,status=no,menubar=no,copyhistory=no\",false) : \"False\" ' />"
        #mesgToDisplay += "</div>"
        #mesgToDisplay = mesgToDisplay % (exercise_id,)
        #
        return HttpResponse(mesgToDisplay)
    else:
        return HttpResponse('<strong><em>Excellent!</em></strong>')


# (Rev #12: #7, #8)
# Display the answer posting form and handle the data submitted
def show_mentor(request, exercise_id, theory_id, problem_id):
    PostAnswerFormSet = modelformset_factory(PostAnswer, fields = ('answer', 'email', 'comment',))
    managementFormData = {
        'form-TOTAL_FORMS':     u'1',
        'form-INITIAL_FORMS':   u'0',
        'form-MAX_NUM_FORMS':   u'1',
        'form-0-title':         u'Hi Mentor!',
        'form-0-pub_date':      u'08 February 2011',
    }
    captcha_response = None
    if request.method == 'POST':                # The form has been already submitted
#        import time
#        time.sleep(2)

        formSet = PostAnswerFormSet(request.POST, managementFormData)  # A form bound tot he POST data

        if formSet.is_valid():                  # All validation rules pass
            #print 'Valid'
            new_post = formSet.save(commit=False)
            new_post[0].exercise = Exercise.objects.get(theory=theory_id, problem_id=problem_id)
            new_post[0].save()

            return HttpResponse(new_post[0].id)
        else:
            #print 'Not valid'
            pass
    else:
        # Display the form
        formSet =  PostAnswerFormSet(managementFormData)             # An unbound form
        return render_to_response(
            'isad/workspace/post_to_mentor.html',
            {
                'formSet': formSet,
                'exercise_id':  exercise_id,
                'object_id':    theory_id,
                'problem_id':   problem_id,
            },
            context_instance = RequestContext(request),
        )


# (Rev #12: #7, #8)
# Display message after answer is successfully posted
def answer_posted(request, theory_id, ref_id):
    return render_to_response(
        'isad/hi_mentor_ans_posted.html',
        {
            'theory_id':    theory_id,
            'reference_id': ref_id,
        },
        #request_context=RequestContext(request)
    )


def show_solution(request, object_id=9, exercise_id=1):
    s = get_object_or_404(Solution, exercise=exercise_id)
    s.other = s.other.replace('_STATIC_URL_', settings.STATIC_URL)
    context = RequestContext(request)
    return render_to_response(
        'isad/solution.html',
        {
            'solution_image':   s.image_url,
            'solution_text':    s.other,
        },
        context_instance=RequestContext(request),
    )

def wireit(request):
    '''
    Return the WireIt editor for drawing graphs
    '''

    if settings.DEBUG:
        theory_id = '3'
    else:
        theory_id = request.session['theory_id']

    edge_options = ''

    if theory_id == '9':
        edge_options = '''
            <select id="lstEdgeTypes" onchange="updateValue(this);">
            <option value="arrows" selected>Straight Arrow</option>
            <option value="leftSquareArrows">Left Square Arrow</option>
            <option value="rightSquareArrows">Right Square Arrow</option>
            </select>
        '''
    elif theory_id == '3':
        edge_options = '''
            <select id="lstEdgeTypes" onchange="updateValue(this);">
            <option value="straight">Association</option>
            <option value="arrows" selected>Generalization</option>
            <option value="dottedArrows">Extend/Include</option>
            </select>
        '''

    return render_to_response(
        'isad/wireit.html',
        {
            'theory_id':    theory_id,
            'edge_options': edge_options,
        },
        context_instance=RequestContext(request)
    )

def comments(request, object_id=1):
    theory = get_object_or_404(Theory, pk=object_id)

    return render_to_response(
        'comments/list.html',
        {
            'theory':   theory,
        },
        context_instance = RequestContext(request)
    )

def er_page(request):
    return render_to_response(
        'isad/workspace/inline_workspace_4.html',
        context_instance = RequestContext(request)
    )

def get_er_diagram(request):
    output = {}
    if request.method == 'POST':
        graph_string = request.POST.get('erd')
        #print graph_string


	#output['diagram_url'] = '/cse08/isad/v_media/images/ajax/8_8_transparent.png'
	output['diagram_url'] = settings.STATIC_URL + 'images/ajax/8_8_transparent.png'
        if not graph_string:
            #return HttpResponse('/cse08/isad/v_media/images/ajax/8_8_transparent.png', content_type="application/json")
            return HttpResponse(json.dumps(output), content_type="application/json")

        session_id = request.session.session_key
        fname = session_id # + str(time.time())
        file_name = globals.ERD_STORAGE_PATH + '/' + fname + '.png'

        graph = pgv.AGraph()
        graph.from_string(graph_string)
        graph.draw(file_name, prog='neato')

#        f = open('/var/vlabs/isad/erd.log', 'a')
#        import os
#        f.write('Path:')
#        f.write(os.getcwd())
#        f.close()

        #return HttpResponse('/cse08/isad/v_media/isad_erd/' + fname + '.png', content_type="application/json")
	output['diagram_url'] = settings.STATIC_URL + 'isad_erd/' + fname + '.png'
	#return HttpResponseRedirect(output['diagram_url'])
    	return HttpResponse(json.dumps(output), content_type="application/json")
    else:
        #return HttpResponse('/cse08/isad/v_media/images/ajax/8_8_transparent.png', content_type="application/json")
	output['diagram_url'] = settings.STATIC_URL + 'images/ajax/8_8_transparent.png'
    	return HttpResponse(json.dumps(output), content_type="application/json")


# (Rev #37: #5)
def multiple_workspaces(request):
    #print request
    template = ''
    page_url = request.path

    if page_url.endswith(r'/uml/statechart/'):
        template = 'isad/workspace/inline_workspace_6_statechart.html'
    elif request.path.endswith(r'/uml/activity/'):
        template = 'isad/workspace/inline_workspace_6_activity.html'
    elif request.path.endswith(r'/uml/class-dia/'):
        template = 'isad/workspace/inline_workspace_7_class.html'
    elif request.path.endswith(r'/uml/sequence-dia/'):
        template = 'isad/workspace/inline_workspace_7_sequence.html'
    else:
        msg = '''
        <h2>Error</h2>
        <p>
        No matching workspace was found for %s!!!
        </p>
        ''' % (page_url, )
        #print msg
        return HttpResponse(msg)

    #html = render_to_response(
    html = render_to_string(
        template,
        {
        },
        context_instance=RequestContext(request),
    )
    #return html
    tabs = { 'tabs': html, }
    return HttpResponse( json.dumps(tabs), content_type="application/json" )


# (Rev #41: #2)
def verify_recaptcha(request):
    response = captcha.submit(
        request.GET.get('recaptcha_challenge_field'),
        request.GET.get('recaptcha_response_field'),
        settings.RECAPTCHA_PRIVATE_KEY,
        request.META['REMOTE_ADDR'],
    )

    # See if the user correctly entered CAPTCHA information
    # and handle it accordingly
    if response.is_valid:
        # OK
        return HttpResponse('Ok')
    else:
        return HttpResponse('***Error***')


# (Rev #14: #3)
def draw_uml_diagram(request):
    return diagrams.uml_diagram(request)

def test_uml(request):
    return render_to_response (
        'isad/workspace/test_uml.html',
        {},
        context_instance=RequestContext(request),
    )

def verify_graph(request, user_graph=None):
    '''
    1. Retrieve the JSON representaion of the correct solution as stored in the database
    2. Convert it to a JSON object
    3. Convert user_graph to a JSON object
    4. Run verification algorith to check whether user has drawn correctly

    Properties of the graph object considered for comparison will depend on the type of the
    problem. For example, for verifying a CFG, it's sufficient to compare the node labels.
    However, for, say a use case diagram, label of an Actor should be comapred to label of
    another actor, not Use case.
    '''

    correct = False

    return correct


def url_test(request):
    pass


def ajax_test(request):
    e = get_list_or_404(Exercise, theory=9)
    return render_to_response(
        'test/jqry.html',
        {
            'exercise': e,
        },
        context_instance=RequestContext(request)
    )

def xhr_test(request):
    if request.is_ajax():
        message = "Hello, AJAX!"
    else:
        message = "Hello!"
    return HttpResponse(message)


def get_static_url(request):
    return HttpResponse( json.dumps({'url': settings.STATIC_URL}), content_type="application/json" )
