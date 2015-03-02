/*
* Functionalty of Exercises page for ANT
*/

var ajax_loading = "<img src='/ant/v_media/images/ajax/ajax_loader.gif' alt='Loading ...' \n\
                     style='width: auto; height: auto; border: 0; margin: 0;\n\
                     padding-left: 44.5%; padding-right: 44.5%; padding-top: 25px; padding-bottom: 25px;' />";

$(document).ready(function() {
    $("#ddlExercises").prepend("<option value='0' selected='0'>Exercise #</option>");
    $("#ddlExercises").val('0');
    SyntaxHighlighter.highlight();

    //$("#problem_statement").resizable();
    $("#ddlExercises").change(function() {
       e_text = $("#ddlExercises option:selected").text();
       e_value = $("#ddlExercises option:selected").val();
       if (eval(e_value) > 0) {
           $("#problem_statement").html(ajax_loading);
           $("#problem_statement").load(
                "/ant/ant/load_exercise/" + e_value + "/",
                "",
                function(responseText, textStatus, XMLHttpRequest) {
                    if(textStatus == 'error') {
                        $(this).html(ajax_error);
                    }
                    // This button would be disabled at certain portions of code
                    $('#btnSubmit').attr('disabled', false);

                    // Order is: exercise_id/object_id/problem_id/
                    /* Workspace is now fixed for ANT; Barun, 19-Jan-2011 */
                    myAjaxLoader("#workspace", "/ant/ant/load_workspace/" + e_value + "/" + $("#hObjId").val() + "/" + e_text + "/");
                },
                "html"
            );
       }
       $("#result_display").html("");
    });

    $('#viewSolution').click(function() {
       var e_value = $("#ddlExercises option:selected").val();
       if (eval(e_value) > 0) {
           if (confirm("Are you sure you dont want to give another try?"))
               window.open("/ant/ant/show_solution/" + e_value + '/', "ANT Solution", "width=800,height=600,resizable=yes,toolbar=no,linkbar=no,scrollbars=yes,location=0,directories=no,status=no,menubar=no,copyhistory=no",false);
       } else {
           alert('Please select a problem!');
       }
    });
});


$("#btnSubmit").click(function() {
    $("#result_display").html(ajax_loading);
    $("html, body").animate({scrollTop: $("#contentBox").height()}, 790);

    // Now send the exercise ID to server and obtain the correct solution
    // Compare with user's result to verify if he's drawn correctly
    e_value = $("#ddlExercises option:selected").val();
       if (eval(e_value) > 0) {
            $.get(
                "/ant/ant/answer/" + $("#hObjId").val() + "/" + e_value + "/",
                {
                 graph: $("#divStoreGraphForServer").text()
                },
                function(data) {
                    $("#result_display").html(data);
                },
                ""
            );
       } else {
           $("#result_display").html('<h2>Please select a problem!</h2>');
       }
});
