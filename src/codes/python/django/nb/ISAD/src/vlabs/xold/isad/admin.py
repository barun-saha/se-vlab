# SE

from vlabs.isad.models import *
from django.contrib import admin

class TheoryAdmin(admin.ModelAdmin):
    model = Theory
    list_display = ('id', 'title',)
    ordering = ('id',)

class SimulationAdmin(admin.ModelAdmin):
    model = Simulation
    list_display = ('theory', 'type', 'video_url',)
    ordering = ('theory',)

class SelfEvaluationAdmin(admin.ModelAdmin):
    model = SelfEvaluation
    list_display = ('theory', 'question_num', 'question',)
    ordering = ('theory', 'question_num',)
    
class SolutionAdmin(admin.ModelAdmin):
    model = Solution
    ordering = ('exercise',)

class ReferenceAdmin(admin.ModelAdmin):
    model = Reference
    list_display = ('theory', 'book', 'url', 'url_desc',)
    ordering = ('theory',)

class ExerciseAdmin(admin.ModelAdmin):
    model = Exercise
    list_display = ('theory', 'problem_id', 'problem', 'workspace',)
    ordering = ('theory', 'problem_id',)


#class PollAdmin(admin.ModelAdmin):
#        # For display screen
#        list_display = ('question', 'pub_date', 'wasPublishedToday')
#        list_filter  = ['pub_date',]
#        search_fields= ['question',]
#
#        # For add / edit screen
#        fields = ['pub_date', 'question']
#        inlines = [ChoiceInline]

class ContactAdmin(admin.ModelAdmin):
    model = Contact
    list_display = ('name', 'email', 'subject', 'comment', 'organization', 'post_date',)
    ordering = ('post_date',)

# Rev #12, #7
# Commenting as per change #26: #3
#
#class PostAnswerAdmin(admin.ModelAdmin):
#    model = PostAnswer
#    list_display = ('exercise', 'email', 'post_date', 'has_replied',)
#    ordering = ('exercise', 'post_date', 'has_replied',)
#    list_filter = ['post_date',]

# (Rev #16: #1)
class CaseStudyAdmin(admin.ModelAdmin):
    model = CaseStudy
    list_display = ('theory', 'title', 'case', 'analysis',)
    ordering = ('theory',)


admin.site.register(Theory, TheoryAdmin)
admin.site.register(Procedure)
admin.site.register(Simulation, SimulationAdmin)
admin.site.register(SelfEvaluation, SelfEvaluationAdmin)
admin.site.register(Workspace)
admin.site.register(Exercise, ExerciseAdmin)
admin.site.register(Solution, SolutionAdmin)
admin.site.register(Book)
admin.site.register(Reference, ReferenceAdmin)
admin.site.register(Contact, ContactAdmin)
# Commenting as per change #26: #3
#admin.site.register(PostAnswer, PostAnswerAdmin)
admin.site.register(CaseStudy, CaseStudyAdmin)