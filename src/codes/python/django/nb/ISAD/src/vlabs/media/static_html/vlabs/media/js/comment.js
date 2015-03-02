var media = '/cse08/isad/v_media/ajaxcomments';

$(document).ready(function() {
    $('#btnCmntPost').click(function() {
        // Customize the selector for your project
        $('div.comment-form form').submit(function(event) {
            event.preventDefault();
            ajaxComment({'media': media});
            return false;
        });
    });

    $('div.comment-form button#btnSubmit').click(function(){
        ajaxComment({'media': media});
    });

    $('div.comment-form button#btnReset').click(function(){
        $('#id_name').val('');
        $('#id_email').val('');
        $('#id_comment').val('');
        //Recaptcha.reload();
    });
});
