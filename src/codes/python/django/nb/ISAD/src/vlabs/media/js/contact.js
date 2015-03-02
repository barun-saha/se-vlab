/*
 * contact.js
 *
 * This file is used for both displaying the contact form as well as "Hello Mentor" exercises
 *
 * Barun Saha, 08-Feb-2011
 */

$(document).ready(function() {
    
    function highlightError(container, element, message) {
        $(container).removeClass('noError');
        $(container).addClass('error');
        $(element).tipsy({fade: true, gravity: 'w', fallback: message});
        $("html, body").filter(':not(:animated)').animate({scrollTop: $(container).offset().top}, 500);
    }
    function hideError(container, element) {
        $(container).removeClass('error');
        $(container).addClass('noError');
        $(element).tipsy({hide: 'true'});
    }

//    if ($('#h_reCAP_err').val() == '1')
//        $("html, body").filter(':not(:animated)').animate({scrollTop: $('#c_recaptcha').offset().top}, 500);

    $('#_btnSubmit').click(function() {
        //alert('Clicked!');
                    
        var prefix = 'id_form-0-';

        if ($('#'+prefix+'name').length) {  // This field exists
            var name = jQuery.trim($('#'+prefix+'name').val());
            if (isBlank(name)) {
               highlightError('#c_name', '#'+prefix+'name', 'Name cannot be empty!');
               return;
            } else {
               hideError('#c_name', '#'+prefix+'name');
            }
            if (name.search(/^[a-zA-Z\.\ ]+$/)) {
               highlightError('#c_name', '#'+prefix+'name', "Name consists of only alphabets and optionally a '.'");
               return;
            } else {
               hideError('#c_name', '#'+prefix+'name');
            }
        }

        if ($('#'+prefix+'answer').length) {  // This field exists
            var answer = jQuery.trim($('#'+prefix+'answer').val());
            if (answer.length< 15) {
               highlightError('#c_answer', '#'+prefix+'answer', "Please type in atleast 15 characters.");
               return;
            } else {
               hideError('#c_answer', '#'+prefix+'answer');
            }
        }

        if ($('#'+prefix+'email').length) {
            var email = jQuery.trim($('#'+prefix+'email').val());
            if (isBlank(email)) {
               highlightError('#c_email', '#'+prefix+'email', 'Email address cannot be blank!');
               return;
            } else {
               hideError('#c_email', '#'+prefix+'email');
            }
            if (! isValidEmail(email)) {
               highlightError('#c_email', '#'+prefix+'email', 'A proper email address is required! Example: someone@somewhere.com');
               return;
            } else {
               hideError('#c_email', '#'+prefix+'email');
            }
        }

        if ($('#'+prefix+'website').length) {
            var website = jQuery.trim($('#'+prefix+'website').val());
            if (! isBlank(website) && website.search(/^http[s]?:\/\/[a-zA-Z0-9~_\-\.\/\:\&\?]+?\.[a-zA-Z0-9~_\-\.\/\:&\?\=]+/)) {
               highlightError('#c_website', '#'+prefix+'website', "Type in a valid URL! For example: http://www.example.com");
               return;
            } else {
               hideError('#c_website', '#'+prefix+'website');
            }
        }

        if ($('#'+prefix+'subject').length) {
            var subject = jQuery.trim($('#'+prefix+'subject').val());
            if (isBlank(subject)) {
               highlightError('#c_subject', '#'+prefix+'subject', 'Subject cannot be blank!');
               return;
            } else {
               hideError('#c_subject', '#'+prefix+'subject');
            }
        }

        if ($('#'+prefix+'comment').length) {
            var comment = jQuery.trim($('#'+prefix+'comment').val());
            if (isBlank(comment)) {
               highlightError('#c_comment', '#'+prefix+'comment', 'Comment cannot be empty!');
               return;
            } else {
               hideError('#c_comment', '#'+prefix+'comment');
            }
        }
        
        $('#f_contact').submit();
    });

    $('#_btnReset').click(function() {
        var prefix = 'id_form-0-';
        hideError('#c_name', '#'+prefix+'name');
        hideError('#c_email', '#'+prefix+'email');
        hideError('#c_website', '#'+prefix+'website');
        hideError('#c_subject', '#'+prefix+'subject');
        hideError('#c_comment', '#'+prefix+'comment');
    });
});