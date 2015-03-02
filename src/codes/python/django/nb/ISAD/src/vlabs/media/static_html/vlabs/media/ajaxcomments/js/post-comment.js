$(document).ready(function() {
    previewed = false;
    commentBusy = false;
});

function isBlank(text) {
    return (jQuery.trim(text).length == 0);
}
function isValidEmail(text) {
    return (text.search(/^[a-zA-Z0-9_\-\.]+?\@[a-zA-Z0-9_\-]+\.[a-zA-Z0-9_\-\.]+$/) == 0)
}

function removeWaitAnimation() {
    // Remove the wait animation and message
    $('.comment-ajax-loader').remove();
    $('div.comment-waiting').stop().remove();
}

function ajaxComment(args) {
    // TODO: if the media variable ends in a forward slash, remove it.
    var media = args.media;
    
    $('div.comment-error').remove();

    var fadeoutTime = 3000;
    var fadeinTime = 1500;
    
    if (commentBusy) {
        $('div.comment-form form').before('\
            <div class="comment-error">\
                Your comment is currently in the process of posting.\
            </div>\
        ');
        $('div.comment-error').fadeOut(fadeoutTime);
        
        return false;
    }
    
    comment = $('div.comment-form form').serialize();

   /** Added by Barun, 08-Dec-2010; Validate the entries */
   var uname = $('div.comment-form #id_name').val();
   var email = $('div.comment-form #id_email').val();
   var comment = $('div.comment-form #id_comment').val();
    
   if (isBlank(uname)) {
        $('div.comment-form form').before('\
            <div class="comment-error error">\
                Name cannot be blank!\
            </div>\
        ');
        $('div.comment-error').fadeOut(fadeoutTime);
        
        return false;
   }
    
   if (isBlank(email)) {
        $('div.comment-form form').before('\
            <div class="comment-error error">\
                Email address cannot be blank!\
            </div>\
        ');
        $('div.comment-error').fadeOut(fadeoutTime);
        
        return false;
   }

   if (! isValidEmail(email)) {
        $('div.comment-form form').before('\
            <div class="comment-error error">\
                Not a valid email address!\
            </div>\
        ');
        $('div.comment-error').fadeOut(fadeoutTime);
        
        return false;
   }

   if (isBlank(comment)) {
        $('div.comment-form form').before('\
            <div class="comment-error error">\
                Comment cannot be blank!\
            </div>\
        ');
        $('div.comment-error').fadeOut(fadeoutTime);
        
        return false;
   }
   
   // Verify reCAPTCHA code
   //var valid_recaptcha = false;

/** Disabling reCAPTCHA temporarily -- problem with URL resolution from AJAX
 *
   $.ajax({
       type:    'GET',
       url:     'http://virtual-labs.ac.in/cse08/isad/recaptchajaX/',
       data:    {'recaptcha_challenge_field': $('#recaptcha_challenge_field').val(), 'recaptcha_response_field': $('#recaptcha_response_field').val()},
       cache:   false,
       dataType:    'html',
       success: function(mesg, textStatus, XMLHttpRequest) {
           if (mesg == 'Ok') {               
               // Challenge successful
*/

                   // Add a wait animation
                $('div.comment-form form').before('\
                    <img src="' + media + '/img/ajax-wait.gif" alt="Please wait..."\
                        class="comment-ajax-loader" />\
                ');

                // Indicate that the comment is being posted
                $('div.comment-form form').before('\
                    <div class="comment-waiting" style="display: none;">\
                        One moment while the comment is posted. . .\
                    </div>\
                ');
                $('div.comment-waiting').fadeIn(fadeinTime);

                commentBusy = true;

                var url = $('div.comment-form form').attr('action');
                var contents = $('div.comment-form form').serialize();
                
                // Use AJAX to post the comment.
                $.ajax({
                    type: 'POST',
                    url: 'http://virtual-labs.ac.in/cse08/isad/isad/comments/post/',
                    data: contents,
                    cache: false,
                    success: function(mesg, textStatus, XMLHttpRequest) {
                        commentBusy = false;                        
                        removeWaitAnimation();
                        if (mesg.success == true) {
                            commentSuccess(mesg);
                        } else {
                            commentFailure(mesg);
                        }
                        //Recaptcha.reload();
                        //alert('Reloaded captcha...');
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert('Error: ' + textStatus + '; ' +  errorThrown + '; ' +  XMLHttpRequest.responseText);
                        commentBusy = false;
                        removeWaitAnimation();
                        $('div.comment-form form').unbind('submit');
                        $('div.comment-form form').submit();
                        //Recaptcha.reload();
                        //alert('Reloaded captcha...');
                    },
                    dataType: 'json'
                });
                return false;
/**
           }
           else {
               $('p#apologies').after(
                   $(document.createElement('div'))
                   .addClass('comment-error')
                   .addClass('error')
                   .text('Sorry, buddy, you failed to prove yourself as a human!')
               );
               $('div.comment-error').fadeOut(fadeoutTime);
               Recaptcha.reload();
               //alert('Reloaded captcha...');
           }                    
       },
       error: function(XMLHttpRequest, textStatus, errorThrown) {
           alert('Failed to verify reCAPTCHA!')
           Recaptcha.reload();           
       }
   });  
*/
    
}

function commentSuccess(data) {    
    var email = $('#id_email').val();
    var comment = $('#id_comment').val();
    var uname = $('#id_name').val();
        
    /** Commented by Barun, 08-Dec-2010; URL not being used here */
    // url = $('#id_url').val();
    
/*
    // Create an MD5 hash from the email address to use with Gravatar
    gravatar = 'http://www.gravatar.com/avatar.php' +
        '?default=&size=48&gravatar_id=' + $.md5(email);
    
    if ($('div#comments').children().length == 0) {
        $('div#comments').prepend(
            '<h2 class="comment-hd">1 comment so far:</h2>'
        )
    }
    
    comment_html = '\
        <div class="comment" style="display: none;">\
            <div class="comment-body">\
                <a href="http://www.gravatar.com">\
                    <img src="' + gravatar + '" /></a>\
                <p>' + comment + '</p>\
            </div>\
        <div class="clear"></div>\
        <p class="posted-by">Posted by <a href="' + url + '">' + 
            name + '</a> 0 minutes ago.</p></div>\
    ';
    
    $('#id_comment').val('');
    
    $('#comments').append(comment_html);
    $('div.comment:last').show('slow');
*/    
    $('div.comment-form form').before('\
        <div class="comment-thanks">\
            Thank you for your comment!\
        </div>\
    ');
    $('div.comment-thanks').fadeOut(3000);
    
    /** Added by Barun, 16-Dec-2010; Reload comments after posting a new one */
    $('div.comment-form #id_name').val('');
    $('div.comment-form #id_email').val('');
    $('#id_comment').val('');
    //myAjaxLoader('div.comments', $('#h_sbase').val() + $('#h_tid').val() + '/theory/load_comments/');
    $.ajax({
        url:    $('#h_sbase').val() + $('#h_tid').val() + '/theory/load_comments/',
        type:   'GET',
        cache:  false,
        dataType: 'html',
        success: function(mesg, textStatus, XMLHttpRequest) {
            $('div.comments').html(mesg);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $('div.comments').text('Failed to load the recent comments! Please refresh the page.');
        }
    });
    //Recaptcha.reload();
}

function commentFailure(data) {    
    for (var error in data.errors) {
        $('#id_' + error).parent().before(data.errors[error])
    }
}

