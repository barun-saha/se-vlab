$(document).ready(function() {
    $('textarea.resizable:not(.processed)').TextAreaResizer();

    // initialisation
    editAreaLoader.window_loaded();
    editAreaLoader.init({
        id: "ns2code"	// id of the textarea to transform
        ,start_highlight: true	// if start with highlight
        ,allow_resize: "both"
        ,allow_toggle: false
        ,word_wrap: true
        ,language: "en"
        ,syntax: "php"
        ,replace_tab_by_spaces: 4
    });


    $('div.ns2-form button#clear').click(function(event) {
        $('div.ns2-code-output').text('');
        $('div.ns2-code-trace').text('');
    });

    $('div.ns2-form button#run').click(function(event) {
       event.preventDefault();

       $('div.ns2-code-output').text('');
       $('div.ns2-code-trace').text('');

       var contents = {'ns2code': editAreaLoader.getValue('ns2code')}; //$('div.ns2-form form').serialize();   // editAreaLoader.getValue('ns2code');
       $('div.ns2-code-output').text(contents);   

       var ajax_loading = "<img src='/ant/v_media/images/ajax/ajax_loader.gif' alt='Loading ...' style='width: auto; height: auto; border: 0; margin: 0; padding-left: 44.5%; padding-right: 44.5%; padding-top: 25px; padding-bottom: 25px;' />"
       $('div.ns2-code-output').html(ajax_loading);
       $('textarea.ns2-code-trace').html(ajax_loading);

       // Use AJAX to post the comment.
        $.ajax({
            type: 'POST',
            url: '/ant/ant/ns2_test_submit/',
            data: contents,
            cache: false,
            success: function(mesg, textStatus, XMLHttpRequest) {
                resultObj = $.parseJSON(mesg);
                $('div.ns2-code-output').html(resultObj['mesg'].replace(/\n/g, '<br />'));
                //$('div.ns2-code-trace-block a').addClass('trace-file-link-visible')
                $('div.ns2-code-trace-block a').attr('href', resultObj['trace']);
                if ($('div.ns2-code-trace-block a').attr('href') == '#') {
                    //alert('No trace file was created');
                } else {
                    $('div.ns2-code-trace-block ul').removeClass('invisible')
                    $('div.ns2-code-trace-block a').removeClass('invisible')
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $('div.ns2-code-output').html('Error: ' + textStatus + '; ' +  errorThrown + '; ' +  XMLHttpRequest.responseText);
            },
            dataType: 'html'
        });
        return false;
    });
});