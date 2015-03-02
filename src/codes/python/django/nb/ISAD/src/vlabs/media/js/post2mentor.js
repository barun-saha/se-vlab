/*
 * post2mentor.js
 *
 * Barun Saha, 04-May-2011
 */

/*
 * ajax_common.js
 *
 * Contains common variables to be used while making AJAX calls
 * (To be included after jQuery)
 *
 * Barun Saha, 15-Mar-2011
 */

var ajaxFadeInTime = 1750;
var ajaxFadeOutTime = 850;

// AJAX loader image -- actual elements to be created on spot
var strAjaxLoaderImg = '<img src="/cse08/isad/v_media/images/ajax/ajax_loader.gif" alt="Please wait ..." \
                        class="ajax-loader center-align-image center-align" align="center" />';

// Divs to display success/error messages
var strAjaxSuccessDiv = '<div class="ajax-success-message center-align ajax-mesg-rounded-box" style="display: none;">\
                            <div class="ajax-message-close-icon">\
                                <img src="/cse08/isad/v_media/images/new/icons/no24x24.png" align="right" alt="[Close]" />\
                            </div>\
                            <div class="message"></div>\
                        </div>';

var strAjaxErrorDiv = '<div class="ajax-error-message center-align ajax-mesg-rounded-box" style="display: none;">\
                            <div class="ajax-message-close-icon">\
                                <img src="/cse08/isad/v_media/images/new/icons/no24x24.png" align="right" alt="[Close]" />\
                            </div>\
                            <div class="message"></div>\
                      </div>';

var ajaxSuccessDiv = $('<div class="ajax-success-message center-align ajax-mesg-rounded-box" style="display: none;">\
                            <div class="ajax-message-close-icon">\
                                <img src="/cse08/isad/v_media/images/new/icons/no24x24.png" align="right" alt="[Close]" />\
                            </div>\
                            <div class="message"></div>\
                        </div>');

var ajaxSuccessDiv = $(document.createElement('div'))
                     .addClass('ajax-success-message')
                     .addClass('ajax-mesg-rounded-box')
                     .addClass('center-align')
                     .css({'display': 'none'});

$(document.createElement('div'))
.addClass('ajax-message-close-icon') 
.append(
    $(document.createElement('img'))
    .attr({'src': '/cse08/isad/v_media/images/new/icons/no24x24.png', 'alt': '[Close]', 'align': 'right'})
)
.appendTo( ajaxSuccessDiv );
$(document.createElement('div')).addClass('message').appendTo( ajaxSuccessDiv );                                          
                       
var ajaxErrorDiv = $('<div class="ajax-error-message center-align ajax-mesg-rounded-box" style="display: none;">\
                            <div class="ajax-message-close-icon">\
                                <img src="/cse08/isad/v_media/images/new/icons/no24x24.png" align="right" alt="[Close]" />\
                            </div>\
                            <div class="message"></div>\
                      </div>');


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

function isValidForm() {
    var prefix = 'id_form-0-';
    var isValid = true;

    //var answer = tinyMCE.get('id_form-0-answer').getContent();
    var answer = $.trim($('#id_form-0-answer').val());
        
    if (answer.length < 15) {   // The content is HTML, so it will contain some tags
       highlightError('#c_answer', '#id_form-0-answer', "Please type in atleast 15 characters.");
       isValid = isValid && false;
    } else {
       hideError('#c_answer', '#id_form-0-answer');
    }

    var email = jQuery.trim($('#'+prefix+'email').val());
    if (isBlank(email)) {
       highlightError('#c_email', '#'+prefix+'email', 'Email address cannot be blank!');
       isValid = isValid && false;
    } else {
       hideError('#c_email', '#'+prefix+'email');
    }
    if (! isValidEmail(email)) {
       highlightError('#c_email', '#'+prefix+'email', 'A proper email address is required! Example: someone@somewhere.com');
       isValid = isValid && false;
    } else {
       hideError('#c_email', '#'+prefix+'email');
    }
    
    return isValid;
}

$(document).ready(function() {    
    // Pre-submit callback
    function validate(formData, jqForm, options) {        
        if (isValidForm()) {
            $('#btn-submit').attr('disabled', true);
            // Indicate that the answer is being posted
            $('div.post-answer form').after(strAjaxLoaderImg);
            $('div.ajax-success-message').remove();
            $('div.ajax-error-message').remove();
            $("html, body").filter(':not(:animated)').animate({scrollTop: $(document).height()}, 500);
	    //alert('Submitting');
            return true;
        }
        else {
            return false;
        }
    }
    // Post-submit callback
    function showResponse(responseText, statusText, xhr, $form)  {        
	// Output is HTML wrapped inside <p> -- no JSON
	//alert('Submitted');
        $('#btn-submit').attr('disabled', false);
        $('img.ajax-loader').fadeOut(function(){
           $(this).remove();
        });

	var start = responseText.indexOf('<p>'); 
	if (start == -1) // IE
		start = responseText.indexOf('<P>');
	var stop = responseText.indexOf('</p>'); 
	if (stop == -1) // IE
		stop = responseText.indexOf('</P>');
	// This is just a hack -- I don't know why it works!!
	var result = responseText.substr(start+3, stop-3); // len of <p> == 3
	//alert(start + ',' + stop);
	//alert(result);

        // If successful, only an integer would be returned (ref #)
        // Otherwise an error message would be returned
        if (responseText.split(' ').length > 1) { 
	//if (respJson['mesg']) {
            if ($.browser.msie) {
                // Sorry IE, fancy things are not for you
                //alert('An error has occured: ' + respJson['mesg']);
                alert('An error has occured: ' + result);
            }
            else {
                $('img.ajax-loader').after(ajaxErrorDiv);
                $('div.ajax-error-message').fadeIn(ajaxFadeInTime);
                $('div.ajax-error-message div.message').html('An error has occured: ' + result).fadeIn(ajaxFadeInTime);
                $('div.ajax-error-message div.message').addClass('center-align');
            }
        }
        else {            
            var dispMesg = 'Your answer has been successfully posted!  ' +
                            '<p style="text-align: center;"><strong>Reference #: ' + result + '</strong> </p>' +
                            'We will soon get back to you. In case of any query, \n\
                              kindly contact us and specify this reference number.';

            if ($.browser.msie) {
                $('.ie-message').remove();
                $( document.createElement('div') )
                .html(dispMesg)
                .addClass('ie-message')
                .css({'border': '1px solid green', 'margin-top': '35px', 'padding': '10px', 'width': 'auto', 'text-align': 'center'})
                .appendTo('div.form-footer');
            }
            else {
                $('img.ajax-loader').after(ajaxSuccessDiv);                        
                $('div.ajax-success-message').fadeIn(ajaxFadeInTime);
                $('div.ajax-success-message div.message').html(dispMesg);
                $('div.ajax-success-message div.message').addClass('center-align'); 
            }
        }       
    }
    
function serror(e) {
	alert('An error occured!' + e.toString());
}

    // Note: error call back function won't work in case of file upload -- that needs to be checked from within success
    var options = {
        url:            '/cse08/post2mentor/answer-form/'+$('#h_tid').val()+'/'+$('#h_pid').val()+'/'+$('#h_xid').val()+'/',
        beforeSubmit:   validate,
        success:        showResponse,
	error:		serror,
	dataType:	'html'
	//dataType:	'json'
    };
    $('#post-answer-form').ajaxForm(options);
    //$('#post-answer-form').ajaxify(options);
    
    $('#post-answer-form').submit(function() {
        return false;   // Disable normal function of the submit button
    });

    
 
    $('div.ajax-message-close-icon').live('click', function(){
        $(this).parent().fadeOut(ajaxFadeOutTime, function(){
            $(this).remove();
            $(this).parent().remove();
        });        
    });
});
