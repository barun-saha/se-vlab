/*
 * statechart_dia.js
 *
 * Contains logic for generating statechart diagrams
 * (To be included after jQuery)
 *
 * Created on: 18-Aug-2011
 *
 * Copyright (C) Barun Saha, 2011
 *
 * Licence: GNU GPL v2
 */

$(document).ready(function() {

        $('.editable').editable();

        var removeImageURL = '/cse08/isad/v_media/images/remove16x16.png';
        var editImageURL = '/cse08/isad/v_media/images/new/icons/workspace/pencil2_16x16.png';
        var errorColor = '#FF6666';

        var edit_options = {
            'background-image': 'url('+editImageURL+')',
            'background-position': 'right',
            'background-repeat': 'no-repeat',
            'padding-right': '20px'
        };
        var edit_out_options = { 'background-image': 'none', 'padding-right': '0' };

        $('.editable, .editablePosition').live('mouseover', function() {
            $(this).css(edit_options);

        });
        $('.editable, .editablePosition').live('mouseout', function() {
             $(this).css(edit_out_options);
        });

        function isValidInput(text) {
            if (text.length == 0)
                return false;

            return true;
        }

        /* Table #1: Add a state */
        $('button#add-state').click(function() {
            var newState = $.trim( $('input#state-name').val() );
            var newStateId = newState.toLowerCase();

            if ( isValidInput(newState) ) {
                var stateAlreadyPresent = false;

                if (newState.toLowerCase() == 'initial') {
                    alert('You are not allowed to add Initial state -- it will get added automatically!');
                    return;
                }

                if (newState.toLowerCase() == 'final') {
                    alert('You are not allowed to add Final state -- it will get added automatically!');
                    return;
                }

                $('select#state-list option').each(function() {
                    if ( $(this).text().toLowerCase() == newState.toLowerCase()) {
                        stateAlreadyPresent = true;
                        return;
                    }
                });

                if (! stateAlreadyPresent) {
                    // Add to table #2
                    $(document.createElement('option'))
                    .attr({ value: newStateId })
                    .text(newState)
                    .appendTo('select.system-states');
                    $('input#state-name').val('');

                    //var parent = $('select#state-list').parent();
                    //$('html, body').animate({scrollTop: $(parent).offset().top}, 'slow');
                    $('select.system-states').parent().effect("highlight", {}, 2500);

                    // Add to table #4
                    var row = $(document.createElement('tr'));

                    $(document.createElement('td'))
                    .text(newState)
                    .appendTo(row);

                    var remove_img = $(document.createElement('img'));

                    row
                    .append($(document.createElement('td')))
                    .append($(document.createElement('td')))
                    .append($(document.createElement('td')))
                    .append(
                        $(document.createElement('td'))
                        .append( remove_img )
                    )
                    .appendTo($('#tbl-state-details'));

                    remove_img
                    .attr( {src: removeImageURL, 'class': 'removeImage', alt: 'Remove'} )
                    .click(function() {
                        // Remove the row from this table
                        $(this).parent().parent().remove();

                        // Remove from all lists of states
                        $('.system-states option').each(function(index, element) {
                            if ($(this).text() == newState) {
                                $(this).remove();
                            }
                        });

                        // Remove from transitions table
                        $('#tbl-state-transitions tbody tr').each(function(index, row) {
                            var cell_cur = $(row) .children('td').eq(0);
                            var cell_nxt = $(row) .children('td').eq(4);
                            if ((cell_cur.text() == newState) ||
                                (cell_nxt.text() == newState)) {
                                $(row).remove();
                            }
                        });
                    });
                    //$('.editable').editable();
                    $(row).effect("highlight", {}, 2500);
                }
                else {
                    alert('This state seems to be already present in the list! Please try a different name.\nState names are case insensitive.');
                }
            }
            else {
                alert('Please enter a valid state name! \nOnly alphanumeric, whitespace, underscore, and hypen are allowed.');
                $('html, body').animate({scrollTop: $('#tbl-add-state').offset().top}, 'fast');
                $('input#state-name').effect("highlight", {color: '#FF6666'}, 2500);
            }
        });


        /* Table #2: Add activities for state*/

        // Present a input box to define custom action label
        $('#action-labels').change(function() {
            if ( $(this).val() == 'other' ) {
                $(document.createElement('input'))
                .attr({
                    type:   'text',
                    id:     'action-label-other',
                    value:  'custom label'
                })
                .appendTo( $(this).parent() ); //.css('display', 'block')
            }
            else {
                $('#action-label-other').remove();
            }
        })

        $('button#add-activites').click(function() {

            if ($('select#state-list option:selected').attr('value') == 0) {
                alert("Please select a state from the dropdown list in table #2!");
                $('html, body').animate({scrollTop: $('#tbl-add-activity').offset().top}, 'fast');
                $('#state-list').parent().effect("highlight", {color: errorColor}, 2500);
                return;
            }

            // Activity is a concatenation of action label and action expression
            var label = $('select#action-labels option:selected').attr('value');
            if (label == '0') {
                alert('Please select an action label!');
                $('html, body').animate({scrollTop: $('#tbl-add-activity').offset().top}, 'fast');
                $('select#action-labels').parent().effect("highlight", {color: errorColor}, 2500);
                return;
            }
            else if (label == 'other')
                label = $.trim( $('input#action-label-other').val() );

            var expression = $.trim( $('input#action-expression').val() );
            if ( expression.length == 0) {
                alert('Please specify an action expression also!');
                $('html, body').animate({scrollTop: $('#tbl-add-activity').offset().top}, 'fast');
                $('input#action-expression').effect("highlight", {color: errorColor}, 2500);
                return;
            }

            var activity = label + ' / ' + expression;
            //alert(activity);

            var state = $('select#state-list option:selected').text();

            $('#tbl-state-details tbody tr').each(function(index, element) {

                // Comapre with first cell of current row (element)
                if ( $(element).children('td').eq(0).text() == state ) {
                    var cell = $(element).children('td').eq(1);
                    var current_activity = $.trim( cell.text() );

                    var item_to_append = $(document.createElement('li'))
                    .append(
                        $(document.createElement('span')).text(activity).addClass('editable').editable()
                    );

                    // Provide option to remove an activity
                    var remove_img = $(document.createElement('img'));
                    remove_img
                    .attr( {src: removeImageURL, 'class': 'removeImage', 'alt': 'Remove'} )
                    .click(function() {
                        $(this).parent().remove();
                    })
                    .appendTo(item_to_append);

                    // See if the current state already has some activity defined
                    if (current_activity.length == 0) {
                        // No activity defined

                        $(document.createElement('ul'))
                        .append( item_to_append )
                        .appendTo( cell );
                    }
                    else {
                        var list = $(cell).children('ul');
                        list.append( item_to_append )
                    }

                    $(element).effect("highlight", {}, 2500);

                    // We have added the activity, now we can break from this each() func
                    return false;
                }
            })
            //$('.editable').editable();
            $('input#action-expression').val('');
        });


        /* Table #3: Add a note */
        $('#add-note').click(function() {
            var state_val = $('select#state-list-note option:selected').attr('value'); // Option value
            if (state_val == 0) {
                alert('Please select a state to which a note is to be attached!');
                $('html, body').animate({scrollTop: $('#tbl-add-note').offset().top}, 'fast');
                $('select#state-list-note').parent().effect("highlight", {color: errorColor}, 2500);
                return;
            }
            var state_val = $('select#state-list-note option:selected').text(); // Option text

            var note = $.trim( $('#note').val() );
            if (note.length == 0) {
                alert('Please type in some text for your note!');
                $('html, body').animate({scrollTop: $('#tbl-add-note').offset().top}, 'fast');
                $('#note').parent().effect("highlight", {color: errorColor}, 2500);
                return;
            }

            var position = $('select#note-position option:selected').attr('value');
            if (position == 0) {
                alert('Please select a position of the note w.r.t the state!');
                $('html, body').animate({scrollTop: $('#tbl-add-note').offset().top}, 'fast');
                $('select#note-position').parent().effect("highlight", {color: errorColor}, 2500);
                return;
            }
            var position = $('select#note-position option:selected').text();

            $('#tbl-state-details tbody tr').each(function(index, row) {
                var state = $(row).children().eq(0).text();
                if (state == state_val) {
                    // We got the row
                    // Now get the cell pointing to Note

                    // Check if note already present -- in that case insert a new
                    if ($(row).children().eq(2).children('span').length == 0) {
                        var cell = $(row).children().eq(2);
                        $(cell)
                        .append (
                            $(document.createElement('span'))
                            .text(note)
                            .addClass('editable')
                            .editable()
                        );

                        $(row).children().eq(3)
                        .append (
                            $(document.createElement('span'))
                            .text(position)
                            .addClass('editablePosition')
                            .editable({
                                type:   'select',
                                options:    {'left': 'Left', 'right': 'Right', 'top': 'Top', 'bottom': 'Bottom'}
                            })
                        );

                        var remove_img = $(document.createElement('img'));
                        remove_img
                        .attr( {src: removeImageURL, 'class': 'removeImage', 'alt': 'Remove'} )
                        .click(function() {
                            $(this).parent().parent().children().eq(3).empty();
                            $(this).parent().empty();
                        })
                        .appendTo( $(cell) );
                    }
                    else {
                        // Otherwise update it
                        var cell = $(row).children().eq(2);
                        $(row).children().eq(2).children('span').text(note);
                        $(row).children().eq(3).children('span').text(position);
                    }

                    //$('.editable').editable();

                    return false;
                }
            });
            $('#note').val('');
        });


        /* Table #5: Add state transitions*/
        $('button#add-transition').click(function() {

            var cur_state_val = $('select#current-state option:selected').attr('value');
            var nxt_state_val = $('select#next-state option:selected').attr('value');

            if (cur_state_val == 0) {
                alert("Please select the present state from the first dropdown list in table #4.");
                $('html, body').animate({scrollTop: $('#tbl-add-transition').offset().top}, 'fast');
                $('select#current-state').parent().effect("highlight", {color: errorColor}, 2500);
                return;
            }
            if (nxt_state_val == 0) {
                alert("Please select the next state from the second dropdown list in table #4.");
                $('html, body').animate({scrollTop: $('#tbl-add-transition').offset().top}, 'fast');
                $('select#next-state').parent().effect("highlight", {color: errorColor}, 2500);
                return;
            }

            var transitionEvent = $.trim( $('input#transition-event').val() );
            if (cur_state_val == 'initial' && nxt_state_val == 'initial') {
                alert('Sorry, a system should not have any transition from initial to itself.')
                $('html, body').animate({scrollTop: $('#tbl-add-transition').offset().top}, 'fast');
                return;
            }
            if (cur_state_val == 'final' && nxt_state_val == 'final') {
                alert('Sorry, a system should not have any transition from final state to itself.')
                $('html, body').animate({scrollTop: $('#tbl-add-transition').offset().top}, 'fast');
                return;
            }
            if (cur_state_val == 'initial' && nxt_state_val == 'final') {
                alert('Sorry, a system should not have any transition from initial to final state.')
                $('html, body').animate({scrollTop: $('#tbl-add-transition').offset().top}, 'fast');
                return;
            }
            if (cur_state_val == 'final' && nxt_state_val == 'initial') {
                alert('Sorry, a system should not have any transition from final to initial state.')
                $('html, body').animate({scrollTop: $('#tbl-add-transition').offset().top}, 'fast');
                return;
            }

            if (transitionEvent.length == 0) {
                if (cur_state_val == 'initial' ||
                    cur_state_val == 'final' ||
                    nxt_state_val == 'initial' ||
                    nxt_state_val == 'final') {
                        // Ok, no event required
                }
                else {
                    alert('An event is necessary for a state transition to occur! Please specify it.');
                    $('html, body').animate({scrollTop: $('#tbl-add-transition').offset().top}, 'fast');
                    $('input#transition-event').effect('highlight', {color: errorColor}, 2500);
                    return;
                }
            }

            var transitionGuard = $.trim( $('input#transition-guard-condition').val() );
            var transitionAction = $.trim( $('input#transition-action').val() );


            // Provide option to remove an activity
            var remove_img = $(document.createElement('img'));
            remove_img
            .attr( {src: removeImageURL, 'class': 'removeImage', 'alt': 'Remove'} )
            .click(function() {
                $(this).parent().parent().remove();
            });

            var cur_state = $('select#current-state option:selected').text();
            var nxt_state = $('select#next-state option:selected').text();

            var row = $(document.createElement('tr'));
            row.append( $(document.createElement('td')).text(cur_state) );

            if (transitionEvent.length > 0) {
                row.append(
                    $(document.createElement('td'))
                    .append(
                        $(document.createElement('span'))
                        .text(transitionEvent)
                        .addClass('editable')
                        .editable()
                    )
                );
            }
            else {
                row.append( $(document.createElement('td')) );
            }

            if (transitionGuard.length > 0) {
                row.append(
                    $(document.createElement('td'))
                    .append(
                        $(document.createElement('span'))
                        .text(transitionGuard)
                        .addClass('editable')
                        .editable()
                    )
                );
            }
            else {
                row.append( $(document.createElement('td')) );
            }

            if (transitionAction.length > 0) {
                row.append(
                    $(document.createElement('td'))
                    .append(
                        $(document.createElement('span'))
                        .text(transitionAction)
                        .addClass('editable')
                        .editable()
                    )
                );
            }
            else {
                row.append( $(document.createElement('td')) );
            }

            row
            .append( $(document.createElement('td')).text(nxt_state) )
            .append( $(document.createElement('td')).append(remove_img) )
            .appendTo('#tbl-state-transitions tbody');

            $('input#transition-event').val('');
            $('input#transition-guard-condition').val('');
            $('input#transition-action').val('');

            //$('.editable').editable();
            $(row).effect("highlight", {color: '#fcfca8'}, 2500); // animate
        });


        /*
         * Draw the diagram
         */

        $('button#draw-state-diagram').click(function() {

            var START   = '@startuml';
            var END     = '@enduml';
            var EOL     = '\n';
            var COLON   = ' : ';
            var ARROW   = ' --> ';
            var LARROW  = ' -left-> ';
            var RARROW  = ' -right-> ';
            var INITIAL_STATE = ' [*] ';
            var FINAL_STATE = ' [*] ';

            //alert(START + EOL + END);


            /*
             * 'States & internal activities
             * ON : entry / glow()
             * ON : exit / stopGlowing()
             */

             var states = '';
             var param = 'skinparam linetype ortho';

             $('#tbl-state-details tbody tr').each(function(index, row) {
                var state = $(row).children('td').eq(0).text();

                // To find internal activites, we have to iterate over the list in the
                // 2nd col. If any state do not have any activity defined, ignore it.
                var activity_list = $(row).children('td').eq(1).children('ul').children('li').children('span');
                var activities = '';
                if (activity_list.length > 0) {
                    $(activity_list).each(function(index, item){
                         activities += state + COLON + $(item).text() + EOL;
                    });
                }
                states += activities;
             });
             //alert(states);

             /*
              * 'Notes
              * note left of ON : this is a short note
              */
             var notes = '';
             $('#tbl-state-details tbody tr').each(function(index, row) {
                var state = $(row).children('td').eq(0).text();
                var note = $(row).children('td').eq(2).children('span').text();
                var pos = $(row).children('td').eq(3).children('span').text();

                if (note.length > 0) {
                    notes += 'note ' + pos + ' of ' + state + ': ' + note + EOL;
                }
             });

             /*
              * ' Transitions
              * [*] -right-> OFF
              * OFF --> ON : Push switch up [Power is available]
              * ON --> OFF : Push switch down
              * ON --> OFF : Power cut
              */

             // IMP: Statechart dia must have an initial and a final state
             var initial_state_found = false;
             var final_state_found = false;

             var transitions = '';
             $('#tbl-state-transitions tbody tr').each(function(index, row) {
                // Retrieve contents from the five cells of the current row
                var cur_state = $(row).children().eq(0).text();
                var event = $(row).children().eq(1).children('span').text();
                var guard = $(row).children().eq(2).children('span').text();
                var action = $(row).children().eq(3).children('span').text();
                var nxt_state = $(row).children().eq(4).text();

                if (cur_state.toLowerCase() == 'final') {
                    alert('A transition from final state is not legal or logical!');
                    return;
                }

                if (cur_state.toLowerCase() == 'initial') {
                    cur_state = INITIAL_STATE;
                    initial_state_found = true;
                }

                if (nxt_state.toLowerCase() == 'initial')
                    nxt_state = INITIAL_STATE;
                else if (nxt_state.toLowerCase() == 'final') {
                    nxt_state = FINAL_STATE;
                    final_state_found = true;
                }

                if (guard.length > 0)
                    guard = ' [' + guard + '] ';

                if (action.length > 0)
                    action = ' / ' + action;

                if (event.length > 0) {
                    if (cur_state == INITIAL_STATE)
                        transitions += cur_state + RARROW + nxt_state + COLON + event + guard + action + EOL;
                    else
                        transitions += cur_state + ARROW + nxt_state + COLON + event + guard + action + EOL;
                }
                else {
                    if (nxt_state == FINAL_STATE)
                        transitions += cur_state + RARROW + nxt_state + EOL;
                    else
                        transitions += cur_state + ARROW + nxt_state + EOL;
                }
             });

             if ( !initial_state_found ) {
                 alert('Please add a transition from Initial state to one of the states in your system.')
                 $('html, body').animate({scrollTop: $('#tbl-add-transition').offset().top}, 'slow');
                 return;
             }
             if ( !final_state_found ) {
                 alert('Please add a transition from one of the states in your system to the Final state.')
                 $('html, body').animate({scrollTop: $('#tbl-add-transition').offset().top}, 'slow');
                 return;
             }
             //alert(transitions);

            /* Create a string describing the statechart diagram */

            var strUML = START +  EOL + param + EOL + states + EOL + notes + EOL + transitions + END;
            //alert(strUML);
            drawUmlDiagram(strUML);

            /*
            $.ajax({
                  type:     'POST',
                  url:      '/isad/isad/uml_dia/',
                  data:     { 'diagram': strUML },
                  dataType: 'html',
                  cache:    false,
                  success:    function(mesg, txtStatus, XmlHttpRequest) {
                      result = $.parseJSON(mesg);
                      if (result['error']) {
                          alert('An error was encountered: ' + result['error']);
                          $('img#uml-diagram').attr('src', '/cse08/isad/v_media/images/ajax/8_8_transparent.png');
                      }
                      else {
                          //alert(result['diagram_url']);
                          var timestamp = new Date().getTime();
                          $('img#uml-diagram').attr('src', result['diagram_url']+'?ts='+timestamp)
                          $('#uml-diagram-container').effect("highlight", {color: '#fcfca8'}, 2500);;
                      }
                  },
                  error:      function(XmlHttpRequet, txtStatus, errorThrown) {
                      alert('Failed to draw the UML diagram!!!\n' + errorThrown);
                      $('img#uml-diagram').attr('src', '/cse08/isad/v_media/images/ajax/8_8_transparent.png');
                  }
            });

        });
        */
    });
});
