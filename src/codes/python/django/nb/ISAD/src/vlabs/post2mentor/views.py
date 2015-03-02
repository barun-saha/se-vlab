from vlabs.isad.models import Theory, Exercise
from vlabs.post2mentor.models import *

from django.core.context_processors import request
from django.shortcuts import render_to_response, get_object_or_404, get_list_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.template import RequestContext
from django.forms.models import modelformset_factory

import time
import json

def answer_form(request, theory_id, problem_id, exercise_id):
    PostAnswerFormSet = modelformset_factory(PostAnswer, fields = ('answer', 'email', 'comment', 'file',))
    managementFormData = {
        'form-TOTAL_FORMS':     u'1',
        'form-INITIAL_FORMS':   u'0',
        'form-MAX_NUM_FORMS':   u'1',
        'form-0-title':         u'Post Answer!',
        'form-0-pub_date':      u'04 May 2011',
    }
    captcha_response = None
    output = {}
    #output['id'] = 1234
    #return HttpResponse(json.dumps(output), mimetype="application/json")
    if request.method == 'POST':                # The form has been already submitted

        formSet = PostAnswerFormSet(request.POST, request.FILES, managementFormData)  # A form bound tot he POST data

        if formSet.is_valid():                  # All validation rules pass
            #print 'Valid'
            new_post = formSet.save(commit=False)
            new_post[0].exercise = Exercise.objects.get(theory=theory_id, problem_id=problem_id)
            #print '-', new_post[0].file.name, '-'
            if new_post[0].file.name:
                file_name = '%s_%s' % (request.session.session_key, time.time(),)
                new_post[0].file.name = file_name
            new_post[0].save()

	    output['id'] = new_post[0].id

	    # 01-Feb-2012
	    # Something fishy is going on here -- JSON
	    # returned to Firefox doesn't seem valid
            return HttpResponse(new_post[0].id)
            #return HttpResponse(json.dumps(output))
            #return HttpResponse(json.dumps(output), mimetype="application/json")
        else:
            mesg = 'Some entries in the form seem to be invalid! <br>' + \
                    'Remember, you can upload only an image file.'
	    output['mesg'] = mesg
            return HttpResponse(mesg)

    	#return HttpResponse(json.dumps(output), mimetype="application/json")

    else:
        # Display the form
        formSet =  PostAnswerFormSet(managementFormData)             # An unbound form
        return render_to_response(
            'post2mentor/answer_form.html',
            {
                'formSet': formSet,
                'exercise_id':  exercise_id,
                'object_id':    theory_id,
                'problem_id':   problem_id,
            },
            context_instance = RequestContext(request),
        )

