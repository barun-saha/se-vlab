from django.forms.widgets import Textarea
from django.forms.widgets import TextInput
from django.db import models
from django.forms import ModelForm, TextInput, Textarea
import re
import globals


class Theory(models.Model):
    title 	= models.CharField(max_length=100)
    content	= models.TextField()
    # Rev #12: #3
    objectives  = models.TextField(null=True, blank=True)
    time_required= models.DecimalField(max_digits=4, decimal_places=2) # xx.yy
    extra       = models.TextField(null=True, blank=True) # For future :)

    def __unicode__(self):
        return "%d. %s" % (self.id, self.title,)

    def tooltip(self):        
#        pattern = r'''
#            <(h2|h3)>           # Find the header element and store it in a group
#            (?P<header>.*?)     # Find the header text and store it in a named group
#            </\1>               # Use the backreference to close the HTML element
#        '''
          
        regexObj = re.compile(globals.TOOL_TIP_PATTERN, re.I|re.M)
        return ' | '.join([ item[1] for item in regexObj.findall(self.content) ])

class Procedure(models.Model):
    theory	= models.ForeignKey(Theory)
    content     = models.TextField(null=True, blank=True)

    def __unicode__(self):
        return "%d. %s" % (self.theory.id, self.content[:50],)

class SelfEvaluation(models.Model):
    ans_choices = (
        (1, 1,),
        (2, 2,),
        (3, 3,),
        (4, 4,),
    )
    theory      = models.ForeignKey(Theory)
    question_num = models.IntegerField(null=False, blank=False)
    question    = models.TextField(blank=False)
    option1     = models.CharField(max_length=100)
    option2     = models.CharField(max_length=100)
    option3     = models.CharField(max_length=100, null=True, blank=True)
    option4     = models.CharField(max_length=100, null=True, blank=True)
    answer      = models.IntegerField(choices=ans_choices)

    def __unicode__(self):
        return "(%d, %d) | %s" % (self.theory.id, self.question_num, self.question,)
    
class Simulation(models.Model):
    theory	= models.ForeignKey(Theory)
    problem     = models.TextField()
    video_url   = models.CharField(max_length=120, null=True, blank=True)
    discussion  = models.TextField(null=True, blank=True)
    # To include simulations created with HTML/Javascript -- 12 August 2010
    type        = models.CharField(max_length=6, blank=False, null=False)
    html_inline = models.CharField(max_length=120, null=True, blank=True)

    def __unicode__(self):
        return "(%d) | %s" % (self.theory.id, self.video_url,)

class Workspace(models.Model):
    wtype	= models.CharField(max_length=80)
    description = models.CharField(max_length=80)
    code	= models.TextField()

    def __unicode__(self):
        return "(%d) %s" % (self.id, self.wtype,)

class InlineWorkspace(models.Model):
    theory = models.ForeignKey(Theory)
    problem_id  = models.IntegerField()

    
class Exercise(models.Model):
    theory	= models.ForeignKey(Theory)
    workspace   = models.ForeignKey(Workspace)
    problem_id  = models.IntegerField()
    problem	= models.TextField()

    def __unicode__(self):
        return "(%d, %d) | %d | %s" % (self.theory.id, self.problem_id, self.id, self.problem[:50],)

class Solution(models.Model):
    exercise    = models.ForeignKey(Exercise)
    graph	= models.TextField(null=True, blank=True)
    image_url   = models.CharField(max_length=120, null=True, blank=True)
    other	= models.TextField(null=True, blank=True)

    def __unicode__(self):
        return "(%d, %s) %s" % (self.exercise.theory.id, self.exercise.problem_id, self.graph[:50])

class Book(models.Model):
    title       = models.CharField(max_length=100)
    author      = models.CharField(max_length=100)
    publisher   = models.CharField(max_length=25, null=True, blank=True)
    edition     = models.CharField(max_length=50, null=True, blank=True)

    def __unicode__(self):
        return "%s, %s, %s, %s" % (self.title, self.author, self.publisher, self.edition)

class Reference(models.Model):
    theory	= models.ForeignKey(Theory)
    url         = models.URLField(verify_exists=False, null=True, blank=True)
    url_desc    = models.TextField(null=True, blank=True)
    book        = models.ForeignKey(Book, null=True, blank=True)

    def __unicode__(self):
        return "(%d) %s | %s" %(self.theory.id, self.book, self.url)

class Contact(models.Model):
    name    = models.CharField(max_length=25, blank=False)
    email   = models.EmailField(blank=False)
    website = models.URLField(null=True, blank=True)
    organization = models.CharField(max_length=25, null=True, blank=True)
    subject = models.CharField(max_length=35, blank=False)
    comment = models.TextField(blank=False)
    post_date    = models.DateTimeField(null=False, auto_now_add=True)

    def __unicode__(self):
        return "%d. %s %s [%s]" % (self.id, self.name, self.email, self.comment[:50])

class ContactForm(ModelForm):
    class Meta:
        model = Contact
        fields = ('name', 'email', 'website', 'organization', 'subject', 'comment',)

# (Rev #12: #7)
# Commenting as per change #26: #3
#
# A class to hold answers to exercises submitted by students
class PostAnswer(models.Model):
    pass
#    exercise    = models.ForeignKey(Exercise)       # Exercise # for which there is an answer
#    answer      = models.TextField()                # The answer
#    email       = models.EmailField(blank=False)    # Email address of the user
#    comment     = models.TextField(null=True, blank=True)
#    post_date   = models.DateTimeField(null=False, auto_now_add=True)
#    has_replied = models.BooleanField()
#
#    def __unicode__(self):
#        return "(%d, %d) %s" % (self.exercise.theory.id, self.exercise.problem_id, self.answer[:100])

# (Rev #16: #1)
# Case study
class CaseStudy(models.Model):
    theory  = models.ForeignKey(Theory)
    title   = models.CharField(max_length=125, blank=True, null=True)
    case    = models.TextField(blank=True, null=True)    
    analysis  = models.TextField(blank=True, null=True)