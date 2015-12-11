from django.contrib.syndication.feeds import Feed, FeedDoesNotExist
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.comments.models import Comment
from django.contrib.sites.models import Site


class CommentForTheory(Feed):
    current_site = Site.objects.get_current()

    def get_object(self, bits):
        if len(bits) != 1:
            raise ObjectDoesNotExist
        return Theory.objects.get(slug__exact=bits[0])

    def title(self, obj):
        return "Comments posted on the entry %s | %s" % (obj.title, current_site.name)

    def link(self, obj):
        if not obj:
            raise FeedDoesNotExist
        return obj.get_absolute_url()

    def description(self, obj):
        return "Comments posted on the entry %s" % obj.title

    def items(self, obj):
        return Comment.objects.for_model(obj).filter(is_public=True).order_by('-submit_date')[:5]