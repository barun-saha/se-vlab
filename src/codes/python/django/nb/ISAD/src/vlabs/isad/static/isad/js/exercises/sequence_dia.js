$(document).ready(function() {

    var removeImageURL = '/cse08/isad/v_media/images/remove16x16.png';
    //var editImageURL = '/cse08/isad/v_media/images/new/icons/workspace/pencil2_16x16.png';
    var errorColor = '#FF6666';

    $( "#message-list" ).sortable({ placeholder: "ui-state-highlight" });
    $( "#message-list" ).disableSelection();

    $('#add-object').click(function() {
        var objectName = $.trim( $('#object').val() );
        if ( objectName.length == 0 ) {                
            alert('Please specify the object name! No whitespaces are allowed.');                
            $('#object').parent().effect("highlight", {color: errorColor}, 2500);
        } else {
            if ( objectName.indexOf(' ') >= 0 )
                objectName.replace(' ', '_');

            var alreadyPresent = false;
            $('.object-list option').each(function() {
                if ( $(this).val() == objectName ) {
                    alreadyPresent = true;
                    return false;
                }
            });

            if ( alreadyPresent ) {
                alert('This object seems to be already present! Please try a different name.');
                $('#object').parent().effect("highlight", {color: errorColor}, 2500);
            } else {
                $('.object-list').append(
                    $( document.createElement('option') )
                    .attr({ value:  objectName })
                    .text(objectName)
                );
                $('#object').val('');
                $('.object-list').parent().effect("highlight", {}, 2500);
            }
        }
    });


    $('#add-message').click(function() {
        var sender = $('#sender option:selected').val();
        if ( sender == -1 ) {
            alert('Please select a sending object!');
            $('#sender').parent().effect("highlight", {color: errorColor}, 2500);
            return;
        }
        sender = ['"', sender, '"'].join('')

        var messageType = $('#message-type option:selected').val();            
        if ( messageType == -1 ) {
            alert('Please select a message type!');
            $('#message-type').parent().effect("highlight", {color: errorColor}, 2500);
            return;
        }

        var receiver = $('#receiver option:selected').val();
        if ( receiver == -1 ) {
            alert('Please select a receiving object!');
            $('#receiver').parent().effect("highlight", {color: errorColor}, 2500);
            return;
        }
        receiver = ['"', receiver, '"'].join('')

        var message = $.trim( $('#message').val() );            
        if ( message.length == 0 ) {
            alert('Please type in a message sent from source to target object!');
            $('#message').parent().effect("highlight", {color: errorColor}, 2500);
            return;
        }            

        var transition = $(document.createElement('div'));
        transition
        .addClass('a-transition')
        .append(
            $(document.createElement('span')).addClass('sender').text(sender)
        )
        .append(
            $(document.createElement('span')).addClass('separator').text('  -(')
        )
        .append(
            $(document.createElement('span')).addClass('message-type').text(messageType)
        )
        .append(
            $(document.createElement('span')).addClass('separator').text(') ')
        )
        .append(
            $(document.createElement('span')).addClass('message').text(message)
        )
        .append(
            $(document.createElement('span')).addClass('separator').text('->  ')
        )
        .append(
            $(document.createElement('span')).addClass('receiver').text(receiver)
        )
        .append(
            $(document.createElement('img'))
            .attr({
                'src': removeImageURL,
                'align': 'right',
                'alt': 'Remove',
                'title': 'Remove this event'
            })
            .css({ 'cursor': 'default' })
            .click(function() {
                $(this).parent().parent().remove()
            })
        )

        $('#message-list').append(
            $(document.createElement('li')).addClass('default-state').attr('title', 'Drag to reorder this event')                
            .append( $(transition) )
        )
        .effect("highlight", {}, 2500);                       

    });


    $('#draw-sequence-diagram').click(function() {
        var strUML = '';
        var START   = '@startuml';
        var END     = '@enduml';
        var EOL     = '\n';
        var transitions = '';

        $('#message-list li').each(function(idx, elm) {
            var idiv = $(elm).children('div.a-transition');
            var items = $(idiv).children();
            var sender = $(items[0]).text();
            var messageType = $(items[2]).text();
            var message = $(items[4]).text();
            var receiver = $(items[6]).text();

            var arrow = '';
            if ( messageType == 'SYNC' )
                arrow = '->'
            else if ( messageType == 'ASYNC' )
                arrow = '->>';
            else
                arrow = '-->';

            var aTransition = [sender, arrow, receiver, ':', message].join(' ');
            //alert(aTransition);
            transitions += aTransition + EOL;
        });

        strUML = START + EOL + transitions + EOL + END;
        //alert(strUML);
        drawUmlDiagram(strUML);
    });

});
