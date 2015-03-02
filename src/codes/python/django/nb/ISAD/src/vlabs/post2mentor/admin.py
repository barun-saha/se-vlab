from vlabs.isad.models import *
from vlabs.post2mentor.models import *
from django.contrib import admin

class PostAnswerAdmin(admin.ModelAdmin):
    model = PostAnswer
    list_display = ('id', 'exercise', 'answer', 'comment', 'email', 'post_date', 'file',)
    ordering = ('id', 'exercise', 'post_date')

admin.site.register(PostAnswer, PostAnswerAdmin)