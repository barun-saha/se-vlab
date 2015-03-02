/*
* activity_dia.js
*
* Contains logic for generating activity diagrams
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
    var edit_out_options = {
        'background-image': 'none',
        'padding-right': '0'
    };

    $('.editable, .editablePosition').live('mouseover', function() {
        $(this).css(edit_options);

    });
    $('.editable, .editablePosition').live('mouseout', function() {
         $(this).css(edit_out_options);
    });

    function isValidInput(text) {
        if (text.length == 0)  return false;
        return true;
    }

    function isValidActivity(list_id, from, to) {
        var flag = false;

        if ( $('#'+list_id+' option:selected').val() != 0 ) {
            if (from) {
                if ( $('#'+list_id+' option:selected').text() == 'FINAL_NODE' ) {
                    alert('No activity can follow from the FINAL_NODE! Please choose INITIAL_NODE instead.')
                }
                else
                    flag = true;
            }

            if (to) {
                if ( $('#'+list_id+' option:selected').text() == 'INITIAL_NODE' ) {
                    alert('No activity can lead to the INITIAL_NODE! Please choose FINAL_NODE instead.');
                }
                else
                    flag = true;
            }
        }

        return flag;
    }

    // Create a dictionary from a given list
    function dictFromList(selector) {
        var d = {};
        $(selector).each(function(i, e) {
            var val = $(e).val();
            //alert('' + i + e);
            if ( i != 0 ) {
                d[val] = $(this).text();
            }
        });
        return d;
    }


    var NODE_NONE = '_NONE_';
    $('select.activity-list')
    .append( $(document.createElement('option')).text('INITIAL_NODE').attr('value', '___initial___') )
    .append( $(document.createElement('option')).text('FINAL_NODE').attr('value', '___final___') );
    //.append( $(document.createElement('option')).text('- NONE -').attr('value', NODE_NONE) );

    /* Table #1: Add activity to all activity lists */
    $('#add-activity').click(function() {
       var newActivity = $.trim( $('#activity').val() );
       var newActivityID = newActivity.toLowerCase();

       if ( isValidInput(newActivity) ) {
           var alreadyPresent = false;
           $('select#cur-activity-seq option').each(function() {
                if ( $(this).val() == newActivityID ) {
                    alreadyPresent = true;
                    return;
                }
           });

           if ( ! alreadyPresent ) {
                $(document.createElement('option'))
                .attr({ value: newActivityID })
                .text(newActivity)
                .appendTo('select.activity-list');
                $('input#activity').val('');
                $('select.activity-list').parent().effect("highlight", {}, 2500);
           }
           else {
               alert('This activity already seems to be present. Please try a differnt name.')
           }
       }
    });

    /*
     * Table #2: Add simple sequential flows
     * To insert a row in table #3
     */
    $('#add-seq-flow').click(function() {
        if ( $('#cur-activity-seq option:selected').val() == 0 ) {
            alert('Please select current activity!')
            $('html, body').animate({scrollTop: $('#tbl-seq-flow').offset().top}, 'fast');
            $('#cur-activity-seq').parent().effect("highlight", {color: errorColor}, 2500);
            return;
        }
        if ( $('#nxt-activity-seq option:selected').val() == 0 ) {
            alert('Please select next activity!')
            $('html, body').animate({scrollTop: $('#tbl-seq-flow').offset().top}, 'fast');
            $('#nxt-activity-seq').parent().effect("highlight", {color: errorColor}, 2500);
            return;
        }
        if ( $('#cur-activity-seq option:selected').val() == $('#nxt-activity-seq option:selected').val() ) {
            alert('Please select two different activities as current and next!')
            $('html, body').animate({scrollTop: $('#tbl-seq-flow').offset().top}, 'fast');
            $('#nxt-activity-seq').parent().effect("highlight", {color: errorColor}, 2500);
            return;
        }
        /*
        if ( ( $('#cur-activity-seq option:selected').val() == NODE_NONE ) ||
             ( $('#nxt-activity-seq option:selected').val() == NODE_NONE ) ) {
            alert('\'- NONE -\' doesn\'t represnt any activity. Hence, no transition possible here.')
            $('html, body').animate({scrollTop: $('#tbl-seq-flow').offset().top}, 'fast');
            $('#nxt-activity-seq, #cur-activity-seq').parent().effect("highlight", {color: errorColor}, 2500);
            return;
        }
    */

        var row = $( document.createElement('tr') );
        var remove = $( document.createElement('img') );
        remove
        .attr( {src: removeImageURL, 'class': 'removeImage', alt: 'Remove', title: 'Remove this transition'} )
        .click(function() {
            $(this).parent().parent().remove();
        });

        if ( isValidActivity('cur-activity-seq', true, false) &&
             isValidActivity('nxt-activity-seq', false, true) ) {
            var cur_activity = $('#cur-activity-seq option:selected').text();
            $(row)
            .append( $(document.createElement('td')).text(cur_activity)
            )
            .append( $(document.createElement('td')).text( $('#nxt-activity-seq option:selected').text() )
            )
            .append( $(document.createElement('td')).text( $('#guard-condition').val() ) )
            .append( $(document.createElement('td')).append(remove) )
            .appendTo('#tbl-list-simple-transitions');
            $(row).effect("highlight", 2500);
            $('#guard-condition').val('');
        }
    });

    /* Table #4: Create fork points */
    $('.add-fork-point').click(function(event) {
        event.preventDefault();

        var textbox = $(document.createElement('input'));
        var button = $(document.createElement('input'));
        textbox
        .attr(
            { type: 'text', 'class': 'focus-box new-fork-point-label', title: 'Empty boxes would be ignored' }
        )

        button
        .attr(
            {type: 'button', id: 'add-new-fork-point', value: 'Done'}
        )
        .click(function() {
            // Append non-empty strings to fork-point lists
            var label = $.trim( $(this).prev().val() );
            if ( isValidInput(label) ) {
                $( document.createElement('option') )
                .text(label)
                .attr( 'value', label.toLowerCase().replace(/ /g, '_') )
                .appendTo('.synchronization-list')

                $('html, body').animate({scrollTop: $('#tbl-fork').offset().top}, 'fast');
                $('#fork-point').parent().effect("highlight", 2500);
            }
            $(this).prev().remove();
            $(this).remove();
        });

        $(this).parent().append(textbox).append(button);
    });

    /* Table #4: Create parallel activities */
    $('#add-activities-fork').click(function() {
        // A Fork point must be selected; otherwise nothing could be done
        var fork_point = $('#fork-point option:selected').val();

        if ( fork_point == 0 ) {
            alert('Please select a fork point! This label would help to recognize the fork point in future, and changes, if any required, could be made eaily.');
            $('html, body').animate({scrollTop: $('#tbl-fork').offset().top}, 'fast');
            $('#fork-point').parent().effect("highlight", {color: errorColor}, 2500);
            return;
        }

        // Current activity could be selected
        // or NOT, in case when two or more next activities have been selected
        // This will help in depicting the later half of forking
        var cur_activity_val = $('#cur-activity-parallel option:selected').val();
        var cur_activity_txt = $('#cur-activity-parallel option:selected').text();
        var items = [];

        var opt_flag = true;
        $('.fork-activity option:selected').each(function() {
            if ( $(this).val() != 0) {
                if ($(this).text() != 'INITIAL_NODE')
                    items.push( $(this).text() );
                else {
                    alert('No activity can lead to the INITIAL_NODE! Please choose FINAL_NODE instead.');
                    opt_flag = false;
                    return false;
                }
            }
        });
        if (! opt_flag)
            return;

        // When a current activity has been specified, verify that it has been not again
        // mentioned in list of parallel activities
        if (cur_activity_val != 0) {
            for (i = 0; i < items.length; i++) {
                if (items[i] == cur_activity_txt) {
                    alert('You have specified the parent activity also as a parallel activity, which is not possible! Please correct it.');
                    return;
                }
            }
        }
        // Consider only unique parallel activities
        if (items.length >= 2) {
            for (j = 0; j < items.length; j++) {
                for (k = 0; k < items.length; k++) {
                    if ( (j != k) && (items[j] == items[k]) ) {
                        alert('You have selected the activity \'' + items[j] + '\' at least twice! Please make sure you select only unique activities to be executed in parallel.');
                        return;
                    }
                }
            }
        }

        // Neither cur activity specified, nor nxt activities chosen
        if ( (cur_activity_val == 0 ) && (items.length < 2) ) {
            alert('Please select a current activity OR multiple parallel activities OR both!');
            $('html, body').animate({scrollTop: $('#tbl-fork').offset().top}, 'fast');
            $('#cur-activity-parallel').parent().effect("highlight", {color: errorColor}, 2500);
            $('#fork-activities-list').parent().effect("highlight", {color: errorColor}, 2500);
            return;
        }

        // Now update table #6
        var row = $( document.createElement('tr') );
        var remove_img = $(document.createElement('img'));

        var valid_activity = isValidActivity('cur-activity-parallel', true, false);

        if ( (cur_activity_val != 0) &&
             valid_activity &&
             (items.length >= 2) ) {

            var merge_activities = $( document.createElement('ul') );
            for (k = 0; k < items.length; k++) {
                $(document.createElement('li'))
                .text( items[k] )
                .appendTo( merge_activities );
            }

            row
            .append( $(document.createElement('td')).append( $('#cur-activity-parallel option:selected').text() )
            )
            .append( $(document.createElement('td')).append( $('#fork-point option:selected').val()) )
            .append( $(document.createElement('td')).append(merge_activities) )
            .append( $(document.createElement('td')) )
            .append( $(document.createElement('td')) )
            .append( $(document.createElement('td')).append(remove_img) )
            .appendTo( $('#tbl-list-parallel-activities') );
        }
        else if ( (cur_activity_val != 0) &&
             valid_activity &&
             (items.length < 2) ) {

            row
            .append( $(document.createElement('td')).append( $('#cur-activity-parallel option:selected').text() )
            )
            .append( $(document.createElement('td')).append( $('#fork-point option:selected').val()) )
            .append( $(document.createElement('td')) )
            .append( $(document.createElement('td')) )
            .append( $(document.createElement('td')) )
            .append( $(document.createElement('td')).append(remove_img) )
            .appendTo( $('#tbl-list-parallel-activities') );
        }
        else if ( (cur_activity_val == 0) &&
              (items.length >= 2) ) {
            var merge_activities = $( document.createElement('ul') );
            for (k = 0; k < items.length; k++) {
                $(document.createElement('li'))
                .text( items[k] )
                .appendTo( merge_activities );
            }

            row
            .append( $(document.createElement('td')) )
            .append( $(document.createElement('td')).append( $('#fork-point option:selected').val()) )
            .append( $(document.createElement('td')).append(merge_activities) )
            .append( $(document.createElement('td')) )
            .append( $(document.createElement('td')) )
            .append( $(document.createElement('td')).append(remove_img) )
            .appendTo( $('#tbl-list-parallel-activities') );
        }
        else
            return;

        $('html, body').animate({scrollTop: $('#tbl-list-parallel-activities').offset().top}, 'fast');
        $(row).effect("highlight", 2500);
        remove_img
        .attr( {src: removeImageURL, 'class': 'removeImage', alt: 'Remove'} )
        .click(function() {
            // Remove the row from this table
            $(this).parent().parent().remove();
        });

    });


    // Merge
    $('#add-activities-merge').click(function() {
        // A Fork point must be selected; otherwise nothing could be done
        var fork_point = $('#fork-point option:selected').val();

        if ( fork_point == 0 ) {
            alert('Please select a merge point! This label would help to recognize the fork point in future, and changes, if any required, could be made eaily.');
            $('html, body').animate({scrollTop: $('#tbl-fork').offset().top}, 'fast');
            $('#fork-point').parent().effect("highlight", {color: errorColor}, 2500);
            return;
        }

        // Next activity could be selected
        // or NOT, in case when two or more cur activities have been selected
        // This will help in depicting the former half of forking
        var nxt_activity_val = $('#nxt-activity-parallel option:selected').val();
        var nxt_activity_txt = $('#nxt-activity-parallel option:selected').text();
        var items = [];

        var opt_flag = true;
        $('.merge-activity option:selected').each(function() {
            if ( $(this).val() != 0) {
                if ( $(this).text() == 'INITIAL_NODE' ) {
                    alert('No activity can merge with the INITIAL_NODE!');
                    opt_flag = false;
                    return false;
                }
                else if ( $(this).text() == 'FINAL_NODE' ) {
                    alert('No activity can merge with the FINAL_NODE!');
                    opt_flag = false;
                    return false;
                }
                else {
                    items.push( $(this).text() );
                }
            }
        });

        if (! opt_flag)
            return;

        // When a next activity has been specified, verify that it has been not again
        // mentioned in list of parallel activities
        if (nxt_activity_val != 0) {
            for (i = 0; i < items.length; i++) {
                if (items[i] == nxt_activity_txt) {
                    alert('You have specified the parent activity also as a parallel activity, which is not possible! Please correct it.');
                    return;
                }
            }
        }
        // Consider only unique parallel activities
        if (items.length >= 2) {
            for (j = 0; j < items.length; j++) {
                for (k = 0; k < items.length; k++) {
                    if ( (j != k) && (items[j] == items[k]) ) {
                        alert('You have selected the activity \'' + items[j] + '\' at least twice! Please make sure you select only unique activities to be executed in parallel.');
                        return;
                    }
                }
            }
        }

        // Neither cur activity specified, nor nxt activities chosen
        if ( (nxt_activity_val == 0 ) && (items.length < 2) ) {
            alert('Please select multiple parallel activities OR a next activity OR both!');
            $('html, body').animate({scrollTop: $('#tbl-fork').offset().top}, 'fast');
            $('#nxt-activity-parallel').parent().effect("highlight", {color: errorColor}, 2500);
            $('#merge-activities-list').parent().effect("highlight", {color: errorColor}, 2500);
            return;
        }

        // Now update table #6
        var row = $( document.createElement('tr') );
        var remove_img = $(document.createElement('img'));

        var valid_activity = isValidActivity('nxt-activity-parallel', false, true);

        if ( (nxt_activity_val != 0) &&
             valid_activity &&
             (items.length >= 2) ) {
             // Present activities and next activity
             //alert('1');
            var merge_activities = $( document.createElement('ul') );
            for (k = 0; k < items.length; k++) {
                $(document.createElement('li'))
                .text( items[k] )
                .appendTo( merge_activities );
            }

            row
            .append( $(document.createElement('td')).append(merge_activities)
                .addClass('editablePosition')
                .editable({
                    type:   'select',
                    options:    dictFromList('#cur-activity-seq option')
                })
            )
            .append( $(document.createElement('td')) )
            .append( $(document.createElement('td')) )
            .append( $(document.createElement('td')).append( fork_point ) )
            .append( $(document.createElement('td')).append( nxt_activity_txt )
            )
            .append( $(document.createElement('td')).append(remove_img) )
            .appendTo( $('#tbl-list-parallel-activities') );
        }
        else if ( (nxt_activity_val != 0) &&
              valid_activity &&
              (items.length < 2) ) {
             // Next activity
             //alert('2');
            row
            .append( $(document.createElement('td')) )
            .append( $(document.createElement('td')) )
            .append( $(document.createElement('td')) )
            .append( $(document.createElement('td')).append( fork_point ) )
            .append( $(document.createElement('td')).append( nxt_activity_txt )
            )
            .append( $(document.createElement('td')).append(remove_img) )
            .appendTo( $('#tbl-list-parallel-activities') );
        }
        else if ( (nxt_activity_val == 0) &&
              (items.length >= 2) ) {
            // Present activities
            //alert('3');
            var merge_activities = $( document.createElement('ul') );
            for (k = 0; k < items.length; k++) {
                $(document.createElement('li'))
                .text( items[k] )
                .appendTo( merge_activities );
            }

            row
            .append( $(document.createElement('td')).append(merge_activities)
            )
            .append( $(document.createElement('td')) )
            .append( $(document.createElement('td')) )
            .append( $(document.createElement('td')).append( fork_point ) )
            .append( $(document.createElement('td')) )
            .append( $(document.createElement('td')).append(remove_img) )
            .appendTo( $('#tbl-list-parallel-activities') );
        }
        else
            return;

        $('html, body').animate({scrollTop: $('#tbl-list-parallel-activities').offset().top}, 'fast');
        $(row).effect("highlight", 2500);
        remove_img
        .attr( {src: removeImageURL, 'class': 'removeImage', alt: 'Remove'} )
        .click(function() {
            // Remove the row from this table
            $(this).parent().parent().remove();
        });

    });



    /* Table #6: Enable controls in 2nd col */
    // Enable drop down lists
    $('input[name=true-options]').change(function() {
        var component = $(this).val();
        var id = '#nxt-' + component + '-true';
        $('input[name=true-options]').each(function() {
            if ( component == $(this).val() ) {   // Value of the selected radio = value of cur radio
                $(id).removeAttr('disabled');
            }
            else {
                var cur_id = '#nxt-' + $(this).val() + '-true';
                $(cur_id).attr('disabled', 'disabled');
            }
        });
    });
    $('input[name=false-options]').change(function() {
        var component = $(this).val();
        var id = '#nxt-' + component + '-false';
        $('input[name=false-options]').each(function() {
            if (component == $(this).val()) {   // Value of the selected radio = value of cur radio
                $(id).removeAttr('disabled');
            }
            else {
                var cur_id = '#nxt-' + $(this).val() + '-false';
                $(cur_id).attr('disabled', 'disabled');
            }
        });
    });

    // Add button
    $('#add-conditional-activity').click(function() {
        var cur_activity = $('#cur-activity-conditional option:selected').val();
        if (cur_activity == 0) {
            alert('Please select an activity!');
            $('html, body').animate({scrollTop: $('#tbl-conditional-activities').offset().top}, 'fast');
            $('#cur-activity-conditional').parent().effect("highlight", {color: errorColor}, 2500);
            return;
        }

        if ( isValidActivity('cur-activity-conditional', true, false) ) {
            var condition = $.trim( $('#condition').val() );
            if ( ! isValidInput(condition) ) {
                alert('Please specify a condition to be checked!');
                $('html, body').animate({scrollTop: $('#tbl-conditional-activities').offset().top}, 'fast');
                $('#condition').effect("highlight", {color: errorColor}, 2500);
                return;
            }

            if ( $('input:radio[name="true-options"]:checked').length != 1 ) {
                alert('Please select an option specifying what should be done if the condition is TRUE!');
                $('html, body').animate({scrollTop: $('#tbl-conditional-activities').offset().top}, 'fast');
                $('#if-true').effect("highlight", {color: errorColor}, 2500);
                return;
            }
            if ( $('input:radio[name="false-options"]:checked').length != 1 ) {
                alert('Please select an option specifying what should be done if the condition is FALSE!');
                $('html, body').animate({scrollTop: $('#tbl-conditional-activities').offset().top}, 'fast');
                $('#if-false').effect("highlight", {color: errorColor}, 2500);
                return;
            }

            var true_option = $('input:radio[name="true-options"]:checked').val();
            var true_action = '';
            if (true_option == 'activity') {
                true_action = $('#nxt-activity-true option:selected').val();
                if (true_action == 0) {
                    alert('Please specify an action to be executed!');
                    $('html, body').animate({scrollTop: $('#tbl-conditional-activities').offset().top}, 'fast');
                    $('#nxt-activity-true').parent().effect("highlight", {color: errorColor}, 2500);
                    return;
                }
                if ( isValidActivity('nxt-activity-true', false, true) ) {
                    true_action = $('#nxt-activity-true option:selected').text();
                    if (true_action != 'FINAL_NODE')
                        true_action = '"' + true_action + '"';
                }
                else
                    return;
            }
            else if (true_option == 'fork-point') {
                true_action = $('#nxt-fork-point-true option:selected').val();
                if (true_action == 0) {
                    alert('Please specify a fork (synchronization) point!');
                    $('html, body').animate({scrollTop: $('#tbl-conditional-activities').offset().top}, 'fast');
                    $('#nxt-fork-point-true').parent().effect("highlight", {color: errorColor}, 2500);
                    return;
                }
                else {
                    true_action = '===' + $('#nxt-fork-point-true option:selected').val() + '===';
                }
            }
            else {
                true_action = $('#nxt-merge-point-true option:selected').val();
                if (true_action == 0) {
                    alert('Please specify a merge (synchronization) point!');
                    $('html, body').animate({scrollTop: $('#tbl-conditional-activities').offset().top}, 'fast');
                    $('#nxt-merge-point-true').parent().effect("highlight", {color: errorColor}, 2500);
                    return;
                }
                else {
                    true_action = '===' + $('#nxt-merge-point-true option:selected').val() + '===';
                }
            }

            var false_option = $('input:radio[name="false-options"]:checked').val();
            var false_action = '';
            if (false_option == 'activity') {
                false_action = $('#nxt-activity-false option:selected').val();
                if (false_action == 0) {
                    alert('Please specify an action to be executed!');
                    $('html, body').animate({scrollTop: $('#tbl-conditional-activities').offset().top}, 'fast');
                    $('#nxt-activity-false').parent().effect("highlight", {color: errorColor}, 2500);
                    return;
                }
                if ( isValidActivity('nxt-activity-false', false, true) ) {
                    false_action = $('#nxt-activity-false option:selected').text();
                    if (false_action != 'FINAL_NODE')
                        false_action = '"' + false_action + '"';
                }
                else
                    return;
            }
            else if (false_option == 'fork-point') {
                false_action = $('#nxt-fork-point-false option:selected').val();
                if (false_action == 0) {
                    alert('Please specify a fork (synchronization) point!');
                    $('html, body').animate({scrollTop: $('#tbl-conditional-activities').offset().top}, 'fast');
                    $('#nxt-fork-point-false').parent().effect("highlight", {color: errorColor}, 2500);
                    return;
                }
                else {
                    false_action = '===' + $('#nxt-fork-point-false option:selected').val() + '===';
                }
            }
            else {
                false_action = $('#nxt-merge-point-false option:selected').val();
                if (false_action == 0) {
                    alert('Please specify a merge (synchronization) point!');
                    $('html, body').animate({scrollTop: $('#tbl-conditional-activities').offset().top}, 'fast');
                    $('#nxt-merge-point-false').parent().effect("highlight", {color: errorColor}, 2500);
                    return;
                }
                else {
                    false_action = '===' + $('#nxt-merge-point-false option:selected').val() + '===';
                }
            }

            var true_guard = $.trim( $('#guard-true').val() );
            var false_guard = $.trim( $('#guard-false').val() );

            // Now append a row to table #7
            var row = $(document.createElement('tr'));
            var remove_img = $( document.createElement('img') );
            row
            .append( $(document.createElement('td')).append( $('#cur-activity-conditional option:selected').text() ) )
            .append( $(document.createElement('td')).append(condition) )
            .append( $(document.createElement('td')).append(true_action) )
            .append( $(document.createElement('td')).append(true_guard) )
            .append( $(document.createElement('td')).append(false_action) )
            .append( $(document.createElement('td')).append(false_guard) )
            .append( $(document.createElement('td')).append(remove_img) )
            .appendTo('#tbl-list-conditional-activities');

            remove_img
            .attr( {src: removeImageURL, 'class': 'removeImage', alt: 'Remove'} )
            .click(function() {
                // Remove the row from this table
                $(this).parent().parent().remove();
            });

            $('html, body').animate({scrollTop: $('#tbl-list-conditional-activities').offset().top}, 'fast');
            $(row).effect("highlight", 2500);
        }

    });


    /* Draw button */
    $('#draw-activity-diagram').click(function() {
        /*
            @startuml
            skinparam linetype ortho

            ' Initial & final node transition
            (*) --> "Checkout code"
            "Commit" -right-> (*)

            ' Other activities, forks and joins
            "Checkout code" --> "Make changes"
            "Make changes" --> ===Fork1===
            ===Join1=== --> "Generate patch"
            "Generate patch" --> "Apply patch"
            "Apply patch" --> "Commit"


            ' From forks
            ===Fork1=== --> "Test with FF"
            ===Fork1=== --> "Test with IE"


            ' Decisions
            "Test with FF" --> if "" then
            note left
             This note is on
             several lines
            end note
              -->[Successful] ===Join1===
            else
              -left->[Failed] "Make changes"
            endif

            "Test with IE" --> if "" then
              -->[Test successful] ===Join1===
            else
              -left->[Test failed] "Make changes"
            endif

            @enduml
         */

        var START   = '@startuml';
        var END     = '@enduml';
        var EOL     = '\n';
        var COLON   = ' : ';
        var ARROW   = ' --> ';
        var LARROW  = ' -left-> ';
        var RARROW  = ' -right-> ';
        var INITIAL_NODE = '(*)';
        var FINAL_NODE = '(*)';
        var SYNC_MARKER  = '===';

        var param = 'skinparam linetype ortho';
        var initial_node_found = false;
        var random_arrow = [ARROW, LARROW, RARROW];

        var simple_transitions = '';

        $('#tbl-list-simple-transitions tbody tr').each(function(index, row) {
            var cur_activity = $(row).children('td').eq(0).text();
            var nxt_activity = $(row).children('td').eq(1).text();
            var guard = $(row).children('td').eq(2).text();

            if (cur_activity == 'INITIAL_NODE' || cur_activity == 'FINAL_NODE')
                cur_activity = INITIAL_NODE;
            if (nxt_activity == 'INITIAL_NODE' || nxt_activity == 'FINAL_NODE')
                nxt_activity = INITIAL_NODE;

            if (cur_activity == INITIAL_NODE) {
                initial_node_found = true;
                simple_transitions += cur_activity + random_arrow[parseInt( Math.random()*3 )];
            }
            else {
                if (nxt_activity == 'FINAL_NODE')
                    simple_transitions += '"' + cur_activity + '"' + random_arrow[parseInt( Math.random()*3 )];
                else
                    simple_transitions += '"' + cur_activity + '"' + ARROW;
            }

            if ($.trim(guard).length > 0)
                simple_transitions += '[' + guard + '] ';

            if (nxt_activity == INITIAL_NODE) {
                simple_transitions += nxt_activity + EOL;
            }
            else {
                simple_transitions += '"' + nxt_activity + '"' + EOL;
            }
        });


        var parallel_activities = '';
        var fork_activities = '';
        var merge_activities = '';
        $('#tbl-list-parallel-activities tbody tr').each(function(index, row) {
            // If fork, fork point will be specified
            // Otherwise merge point will be specified
            var fork_point = SYNC_MARKER + $(row).children('td').eq(1).text() + SYNC_MARKER;
            var merge_point = SYNC_MARKER + $(row).children('td').eq(3).text() + SYNC_MARKER;
            var is_fork = false;
            //var is_merge = false;

            if (fork_point != (SYNC_MARKER + SYNC_MARKER) ) {
                //alert('Fork');
                is_fork = true;
            }
            //if (fork_point != (SYNC_MARKER + SYNC_MARKER) ) {
            else {
                //alert('Merge');
                //is_merge = true;
            }


            if ( is_fork ) {
                var cur_entity = $(row).children('td').eq(0);

                var cur_activity = $(cur_entity).text();
                if (cur_activity == 'INITIAL_NODE' || cur_activity == 'FINAL_NODE') {
                    cur_activity = INITIAL_NODE;
                    initial_node_found = true;
                    merge_activities += cur_activity + ARROW + fork_point + EOL;
                }
                else {
                    if (cur_activity.length > 0)
                        merge_activities += '"' + cur_activity + '"' + ARROW + fork_point + EOL;
                }


                $(row).children('td').eq(2).children('ul').eq(0).children('li').each(function(i, e) {
                    var activity = $(e).text();
                    if (activity == 'INITIAL_NODE' || activity == 'FINAL_NODE') {
                        activity = INITIAL_NODE;
                        merge_activities += fork_point + ARROW + activity + EOL;
                    }
                    else
                        if (activity.length > 0)
                            merge_activities += fork_point + ARROW + '"' + activity + '"' + EOL;
                });
            }
            else {
                // Merge
                var cur_act = $(row).children('td').eq(0);
                $(cur_act).children('ul').eq(0).children('li').each(function(i, e) {
                    var activity = $(e).text();
                    if (activity == 'INITIAL_NODE' || activity == 'FINAL_NODE') {
                        activity = INITIAL_NODE;
                        merge_activities += activity + ARROW + merge_point + EOL;
                    }
                    else {
                        if (activity.length > 0)
                            merge_activities += '"' + activity + '"' + ARROW + merge_point + EOL;
                    }
                });
                var nxt_activity = $(row).children('td').eq(4).text();
                //alert(nxt_activity);
                if (nxt_activity == 'INITIAL_NODE' || nxt_activity == 'FINAL_NODE') {
                    nxt_activity = INITIAL_NODE;
                    merge_activities += merge_point + ARROW + nxt_activity + EOL;
                }
                else {
                    if (nxt_activity.length > 0)
                        merge_activities += merge_point + ARROW + '"' + nxt_activity + '"' + EOL;
                }
            }

            //alert(merge_activities);
            parallel_activities = fork_activities + EOL + merge_activities + EOL;
        });


        var conditional_activities = '';
        $('#tbl-list-conditional-activities tbody tr').each(function(index, row) {
            var cur_activity = $(row).children('td').eq(0).text();
            var condition = $(row).children('td').eq(1).text();
            var if_true = $(row).children('td').eq(2).text();
            var guard_true = $(row).children('td').eq(3).text();
            var if_false = $(row).children('td').eq(4).text();
            var guard_false = $(row).children('td').eq(5).text();

            if (cur_activity == 'INITIAL_NODE' || cur_activity == 'FINAL_NODE') {
                cur_activity = INITIAL_NODE;
                initial_node_found = true;
                conditional_activities += cur_activity + random_arrow[parseInt( Math.random()*3 )] + ' if "' + condition + '" then ' + EOL;
            }
            else {
                conditional_activities += '"' + cur_activity + '"' + random_arrow[parseInt( Math.random()*3 )] + ' if "' + condition + '" then ' + EOL;
            }

            if (if_true == 'INITIAL_NODE' || if_true == 'FINAL_NODE') {
                if_true = INITIAL_NODE;
            }

            if ( $.trim(guard_true).length > 0 )
                conditional_activities += random_arrow[parseInt( Math.random()*3 )] + '[' + guard_true + '] ' + if_true + EOL;
            else
                conditional_activities += random_arrow[parseInt( Math.random()*3 )] + if_true + EOL;

            conditional_activities += 'else ' + EOL;

            if (if_false == 'INITIAL_NODE' || if_false == 'FINAL_NODE') {
                if_false = INITIAL_NODE;
            }

            if ( $.trim(guard_false).length > 0 )
                conditional_activities += random_arrow[parseInt( Math.random()*3 )] + '[' + guard_false + '] ' + if_false + EOL;
            else
                conditional_activities += random_arrow[parseInt( Math.random()*3 )] + if_false + EOL;

            conditional_activities += 'endif' + EOL;
        });

        if (! initial_node_found) {
            alert('Please add a transition from INITIAL_NODE to any activity that you have defined! This would make your diagram more readable.');
            return;
        }

        var strUML = START + EOL + param + EOL + simple_transitions + parallel_activities + EOL;
        strUML += conditional_activities + EOL + END;
        //alert(strUML);

        drawUmlDiagram(strUML);
    });
});
