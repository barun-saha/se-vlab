from django.db import models
from vlabs.isad import models as isad_models
from tinymce import models as tinymce_models
from vlabs.isad import globals
from django.core.files.storage import  FileSystemStorage

attachment_storage_path = FileSystemStorage(location=globals.UPLOAD_STORAGE_ROOT, base_url=globals.UPLOAD_BASE_URL)

class PostAnswer(models.Model):
    exercise    = models.ForeignKey(isad_models.Exercise)       # Exercise # for which there is an answer
    answer      = models.TextField()                # The answer
    # (Rev #38)
    #answer      = tinymce_models.HTMLField()                # The answer
    email       = models.EmailField(blank=False)    # Email address of the user
    comment     = models.TextField(null=True, blank=True)
    # (Rev #38)    
    #comment     = tinymce_models.HTMLField(null=True, blank=True)
    file        = models.ImageField(max_length=200, \
                    upload_to=globals.UPLOAD_TO, \
                    storage=attachment_storage_path, \
                    blank=True, \
                    null=True)
    post_date   = models.DateTimeField(null=False, auto_now_add=True)
    has_replied = models.BooleanField()

    def __unicode__(self):
        return "(%d, %d) %s" % (self.exercise.theory.id, self.exercise.problem_id, self.answer[:100])
