$(document).ready(function() {
    $('textarea.resizable:not(.processed)').TextAreaResizer();

    // initialisation
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

    $('div.ns2-form input#reset').click(function(event) {
        $('div.ns2-code textarea').text('');
        $('div.ns2-code-output').text('');
        $('div.ns2-code-trace').text('');
    });

    $('div.ns2-form form').submit(function(event) {
       event.preventDefault();
       var e_value = $("#ddlExercises option:selected").val();
       if (eval(e_value) > 0) {
           $("html, body").animate({scrollTop: $("h3#output").offset().top}, 790);

           $('div.ns2-code-output').text('');
           $('div.ns2-code-trace').text('');

           var contents = {'ns2code': editAreaLoader.getValue('ns2code')}; //$('div.ns2-form form').serialize();   // editAreaLoader.getValue('ns2code');
           $('div.ns2-code-output').text(contents);   // .replace(/\n/g, '<br />')

           var ajax_loading = "<img src='/ant/v_media/images/ajax/ajax_loader.gif' alt='Loading ...' style='width: auto; height: auto; border: 0; margin: 0; padding-left: 44.5%; padding-right: 44.5%; padding-top: 25px; padding-bottom: 25px;' />"
           $('div.ns2-code-output').html(ajax_loading);
           $('textarea.ns2-code-trace').html('Loading ...');

           // Use AJAX to post the comment.
            $.ajax({
                type: 'POST',
                url: '/ant/ant/ns2_test_submit/',
                data: contents,
                cache: false,
                success: function(mesg, textStatus, XMLHttpRequest) {
                    //$('div.ns2-code-output').html(mesg.replace(/\n/g, '<br />'));
                    resultObj = $.parseJSON(mesg);
                    $('div.ns2-code-output').html(resultObj['mesg'].replace(/\n/g, '<br />'));
                    //$('div.ns2-code-trace').html('<pre>'+resultObj['trace'].replace(/\n/g, '<br />')+'</pre>')
                    $('textarea.ns2-code-trace').text(resultObj['trace']);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    $('div.ns2-code-output').html('Error: ' + textStatus + '; ' +  errorThrown + '; ' +  XMLHttpRequest.responseText);
                },
                dataType: 'html'
            });
            return false;
       } else {
           alert('Please select a problem!');
       }
    });

    $('#expand').click(function(event) {
       event.preventDefault();
       if ($('#expand').attr('src') == '/ant/v_media/images/new/ant/sort_up_24.png') {
            $('div#traceVisible').css('visibility', 'hidden');
            $('#expand').attr('src', '/ant/v_media/images/new/ant/sort_down_24.png');
            $('textarea.ns2-code-trace').css('height', '0px');
       } else {
           $('div#traceVisible').css('visibility', 'visible');
           $('#expand').attr('src', '/ant/v_media/images/new/ant/sort_up_24.png');
           $('textarea.ns2-code-trace').css('height', '250px');
       }

    });
});
