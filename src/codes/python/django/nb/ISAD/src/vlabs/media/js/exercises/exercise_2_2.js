$(document).ready(function() {
    
    var workspace_contents = '<p>\
            <strong>Note:</strong>\
            In cases where you\'ve to enter multiple values (for example, listing the operators\
            from a code snippet), please separate them with a comma\
            </p>\
            <table cellpadding="0" cellspacing="0" class="techno" style="width: 550px;">\
                <thead>\
                </thead>\
                <tbody style="font-size: 0.9em;">\
                    <tr>\
                        <td>Operators</td>\
                        <td style="text-align: left;">\
                            <input type="checkbox" id="op_int"> <label for="op_int">int &nbsp;</label>\
                            <input type="checkbox" id="op_main"> <label for="op_main">main &nbsp;</label>\
                            <input type="checkbox" id="op_argc"> <label for="op_argc">argc &nbsp;</label>\
                            <input type="checkbox" id="op_char"> <label for="op_char">char &nbsp;</label>\
                            <input type="checkbox" id="op_star"> <label for="op_star">* &nbsp;</label>\
                            <input type="checkbox" id="op_argv"> <label for="op_argv">argv &nbsp;</label>\
                            <br>\
                            <input type="checkbox" id="op_parentheses"> <label for="op_parentheses">() &nbsp;</label>\
                            <input type="checkbox" id="op_curly_braces"> <label for="op_curly_braces">{} &nbsp;</label>\
                            <br>\
                            <input type="checkbox" id="op_x"> <label for="op_x">x &nbsp;</label>\
                            <input type="checkbox" id="op_equals"> <label for="op_equals">= &nbsp;</label>\
                            <input type="checkbox" id="op_10"> <label for="op_10">10 &nbsp;</label>\
                            <input type="checkbox" id="op_semicolon"> <label for="op_semicolon">; &nbsp;</label>\
                            <input type="checkbox" id="op_y"> <label for="op_y">y &nbsp;</label>\
                            <input type="checkbox" id="op_20"> <label for="op_20">20 &nbsp;</label>\
                            <input type="checkbox" id="op_sum"> <label for="op_sum">sum &nbsp;</label>\
                            <input type="checkbox" id="op_plus"> <label for="op_plus">+ &nbsp;</label>\
                            <br>\
                            <input type="checkbox" id="op_printf"> <label for="op_printf">printf &nbsp;</label>\
                            <input type="checkbox" id="op_printf_arg"> <label for="op_printf_arg">"Sum of %d and %d is: %d\n" &nbsp;</label>\
                            <input type="checkbox" id="op_comma"> <label for="op_comma">, &nbsp;</label>\
                            <br>\
                            <input type="checkbox" id="op_return"> <label for="op_return">return &nbsp;</label>\
                            <input type="checkbox" id="op_zero"> <label for="op_zero">0 &nbsp;</label>\
                        </td>\
                  </tr>\
                  <tr class="alt">\
                        <td>Operands</td>\
                        <td style="text-align: left;">\
                            <input type="checkbox" id="od_int"><label for="od_int"> int &nbsp;</label>\
                            <input type="checkbox" id="od_main"><label for="od_main"> main &nbsp;</label>\
                            <input type="checkbox" id="od_argc"><label for="od_argc"> argc &nbsp;</label>\
                            <input type="checkbox" id="od_char"><label for="od_char"> char &nbsp;</label>\
                            <input type="checkbox" id="od_star"><label for="od_star"> * &nbsp;</label>\
                            <input type="checkbox" id="od_argv"><label for="od_argv"> argv &nbsp;</label>\
                            <br>\
                            <input type="checkbox" id="od_parentheses"><label for="od_parentheses"> () &nbsp;</label>\
                            <input type="checkbox" id="od_curly_braces"><label for="od_curly_braces"> {} &nbsp;</label>\
                            <br>\
                            <input type="checkbox" id="od_x"><label for="od_x"> x &nbsp;</label>\
                            <input type="checkbox" id="od_equals"><label for="od_equals"> = &nbsp;</label>\
                            <input type="checkbox" id="od_10"><label for="od_10"> 10 &nbsp;</label>\
                            <input type="checkbox" id="od_semicolon"><label for="od_semicolon"> ; &nbsp;</label>\
                            <input type="checkbox" id="od_y"><label for="od_y"> y &nbsp;</label>\
                            <input type="checkbox" id="od_20"><label for="od_20"> 20 &nbsp;</label>\
                            <input type="checkbox" id="od_sum"><label for="od_sum"> sum &nbsp;</label>\
                            <input type="checkbox" id="od_plus"><label for="od_plus"> + &nbsp;</label>\
                            <br>\
                            <input type="checkbox" id="od_printf"><label for="od_printf"> printf &nbsp;</label>\
                            <input type="checkbox" id="od_printf_arg"><label for="od_printf_arg"> &quot;Sum of %d and %d is: %d\n&quot; &nbsp;</label>\
                            <input type="checkbox" id="od_comma"><label for="od_comma"> , &nbsp;</label>\
                            <br>\
                            <input type="checkbox" id="od_return"><label for="od_return"> return &nbsp;</label>\
                            <input type="checkbox" id="od_zero"><label for="od_zero"> 0 &nbsp;</label>\
                        </td>\
                  </tr>\
                  <tr>\
                        <td colspan="2">\
                            <input type="button" id="halstead_compute" value="Check">\
                        </td>\
                  </tr>\
              </tbody>\
            </table>\
            <br>';
    
    // Display the workspace
    $('#workspace_from_javascript').html(workspace_contents);
    
    var operators = {
        "op_int": true,
        "op_main": true,
        "op_argc": false,
        "op_char": true,
        "op_star": true,
        "op_argv": false,
        "op_parentheses": true,
        "op_curly_braces": true,                        
        "op_x": false,
        "op_equals": true,
        "op_10": false,
        "op_semicolon": true, 
        "op_y": false,
        "op_20": false,
        "op_sum": false,
        "op_plus": true,
        "op_printf": true,
        "op_printf_arg": false,
        "op_comma": true,
        "op_return": true,
        "op_zero": false
    };
    
    $('#halstead_compute').click(function() {
        $("html, body").animate({scrollTop: $("#contentBox").height()}, 790);

        var operators_correct = true;
        var operands_correct = true;
        var msg = '';

        // Verify options selected as operators are correct
        $('input[id^=op_]').each(function(index) {
            var option_id = $(this).attr('id');
            if ( $('#'+option_id).attr('checked') && (operators[option_id] == false) ) {
                //alert(option_id + ', ' + $('#'+option_id).attr('checked'));
                operators_correct = false;
                return false;
            }
            if ( ! $('#'+option_id).attr('checked') && (operators[option_id] == true) ) {
                //alert(option_id + ', ' + $('#'+option_id).attr('checked'));
                operators_correct = false;
                return false;
            }
        })
        
        // Verify options selected as operands are correct
        $('input[id^=od_]').each(function(index) {
            var option_id = $(this).attr('id');
            var id_op = option_id.replace('od_', 'op_');
            if ( $('#'+option_id).attr('checked') && (operators[id_op] == true) ) {
                operands_correct = false;
                return false;
            }
            if ( ! $('#'+option_id).attr('checked') && (operators[id_op] == false) ) {
                operands_correct = false;
                return false;
            }
        })

        if ( operators_correct && operands_correct ) {
            msg = '<strong>Excellent!</strong>';
        }
        else {
            if (! operators_correct)
                msg = 'One or more operators have been missed or wrongly selected!';
            if (! operands_correct)
                msg += '<br> One or more operands have been missed or wrongly selected!';
        }
        $("#result_display")
        .empty()
        .append( $(document.createElement('p')).html(msg) );
    });
});

