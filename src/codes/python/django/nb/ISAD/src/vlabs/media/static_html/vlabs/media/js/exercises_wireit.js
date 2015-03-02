var ajax_loading_center = "<img src='/isad/v_media/images/ajax/8_8_transparent.png' alt='Loading ...' \n\
                                 style='width: 100%; \n\
                                 background-image: url(/isad/v_media/images/ajax/ajax-loader3.gif); \n\
                                 background-repeat: no-repeat;  \n\
                                 background-position: center center;\n\
                                 border: 0;' />";

// Update value of hidden field when selected item is changed -- Barun (28-Jun-2010)
function updateValue(obj) {
    $('#hEdgeType').val(obj.options[obj.selectedIndex].value);
    //alert('jQ: ' + $('#hEdgeType').val());
    //alert(document.getElementById('hEdgeType').value);
    //WireIt.Wire.prototype.defaultWireClass = "WireIt.DottedArrow";
}

        
$(document).ready(function() {
    $("#ddlExercises").prepend("<option value='0' selected>Select</option>");

    //$("#problem_statement").resizable();
    $("#ddlExercises").change(function() {
       e_text = $("#ddlExercises option:selected").text();
       e_value = $("#ddlExercises option:selected").val();
       if (eval(e_value) > 0) {
           $("#problem_statement").html(ajax_loading);
           $("#problem_statement").load(
                "/isad/isad/load_exercise/" + e_value + "/",
                "",
                function(responseText, textStatus, XMLHttpRequest) {
                    if(textStatus == 'error') {
                        $(this).html(ajax_error);
                    }
                    // This button would be disabled at certain portions of code
                    $('#btnSubmit').attr('disabled', false);

                    // Order is: exercise_id/object_id/problem_id/
                    //myAjaxLoader("#workspace", "/isad/load_workspace/" + e_value + "/" + $("#hObjId").val() + "/" + e_text + "/");
                    SyntaxHighlighter.highlight();
                },
                "html"
            );
       }
       $("#result_display").html("");
    });


    $("#btnSubmit").click(function() {
        $("#result_display").html(ajax_loading);
        $("html, body").animate({scrollTop: $("#contentBox").height()}, 790);

        /** Source: http://www.phpbuilder.com/board/showthread.php?t=10348450 */
        // Retrieve the iframe
        function getFrame(strID) {
           var oIframe = document.getElementById(strID);
           var oDoc = oIframe.contentWindow || oIframe.contentDocument;
           if (oDoc.document) {
               oDoc = oDoc.document;
           }
           return oDoc;
        }
        /** */

        //$("#divStoreGraphForServer").html(getFrame('ifWorkSpace').getElementById("divJSONGraph").innerHTML);
        
        //alert('Clicked! ' + $("#divJSONGraph").html());

        // Now send the exercise ID to server and obtain the correct solution
        // Compare with user's result to verify if he's drawn correctly
        e_value = $("#ddlExercises option:selected").val();
        //alert($("#hObjId").val() + ', ' + e_value);
           if (eval(e_value) > 0) {               
                $.get(
                    "/isad/isad/answer/" + $("#hObjId").val() + "/" + e_value + "/",
                    {
                     graph: $("#divJSONGraph").text()
                    },
                    function(data) {
                        $("#result_display").html(data);
                    },
                    ""
                );
           } else {
               alert('Please select a problem from the drop down list and then solve it!');
           }
    });
});