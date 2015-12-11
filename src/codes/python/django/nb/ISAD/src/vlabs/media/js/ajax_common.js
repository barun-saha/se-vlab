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
var strAjaxLoaderImg = '<img src="/isad/v_media/images/ajax/ajax_loader.gif" alt="Please wait ..." \n\
                        class="ajax-loader center-align-image center-align" align="center" />';

// Divs to display success/error messages
var strAjaxSuccessDiv = '<div class="ajax-success-message center-align" style="display: none;">\n\
                            <div class="ajax-message-close-icon">\n\
                                <img src="/isad/v_media/images/new/icons/no24x24.png" align="right" alt="[Close]" />\n\
                            </div>\n\
                            <div class="message"></div>\n\
                        </div>';

var strAjaxErrorDiv = '<div class="ajax-error-message center-align" style="display: none;">\n\\n\
                            <div class="ajax-message-close-icon">\n\
                                <img src="/isad/v_media/images/new/icons/no24x24.png" align="right" alt="[Close]" />\n\
                            </div>\n\
                            <div class="message"></div>\n\
                      </div>';

/* Functions */


/* Actions */

// Close message box created in response to AJAX call
