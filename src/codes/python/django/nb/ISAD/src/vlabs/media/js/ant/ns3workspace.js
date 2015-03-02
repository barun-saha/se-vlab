$(document).ready(function() {
    $('textarea.resizable:not(.processed)').TextAreaResizer();

    // initialisation
    editAreaLoader.window_loaded();
    editAreaLoader.init({
        id: "ns3code"	// id of the textarea to transform
        ,start_highlight: true	// if start with highlight
        ,allow_resize: "both"
        ,allow_toggle: false
        ,word_wrap: true
        ,language: "en"
        ,syntax: "cpp"
        ,replace_tab_by_spaces: 4
    });


    $('div.ns3-form button#clear').click(function(event) {
        $('div.ns3-code-output').text('');
        $('div.ns3-code-trace').text('');
    });

    $('div.ns3-form button#run').click(function(event) {
       event.preventDefault();

       $('div.ns3-code-output').text('');
       $('div.ns3-code-trace').text('');

       var contents = {'ns3code': editAreaLoader.getValue('ns3code')}; //$('div.ns3-form form').serialize();   // editAreaLoader.getValue('ns3code');
       $('div.ns3-code-output').text(contents);   

       var ajax_loading = "<img src='/ant/v_media/images/ajax/ajax_loader.gif' alt='Loading ...' style='width: auto; height: auto; border: 0; margin: 0; padding-left: 44.5%; padding-right: 44.5%; padding-top: 25px; padding-bottom: 25px;' />"
       $('div.ns3-code-output').html(ajax_loading);
       $('textarea.ns3-code-trace').html(ajax_loading);

       // Use AJAX to submit the code
        $.ajax({
            type: 'POST',
            url: '/ant/ant/ns3_submit/',
            data: contents,
            cache: false,
            success: function(mesg, textStatus, XMLHttpRequest) {
                //$('div.ns3-code-output').html(mesg.replace(/\n/g, '<br />'));
                resultObj = $.parseJSON(mesg);
                $('div.ns3-code-output').html(resultObj['mesg'].replace(/\n/g, '<br />'));
                $('textarea.ns3-code-trace').text(resultObj['trace']);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $('div.ns3-code-output').html('Error: ' + textStatus + '; ' +  errorThrown + '; ' +  XMLHttpRequest.responseText);
            },
            dataType: 'html'
        });
        return false;
    });
});