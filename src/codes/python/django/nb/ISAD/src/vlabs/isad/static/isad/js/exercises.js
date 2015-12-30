$(document).ready(function() {
    $(document.createElement('option'))
    .attr({'selected': 'selected', 'value': 0})
    .text('Exercise #')
    .prependTo("#ddlExercises");
    $("#ddlExercises").val('0');

    //$("#problem_statement").resizable();
    $("#ddlExercises").change(function() {
       e_text = $("#ddlExercises option:selected").text();
       e_value = $("#ddlExercises option:selected").val();
       if (eval(e_value) > 0) {
           $("#problem_statement").html(ajax_loading);
           $("#problem_statement").load(
                //"/load_exercise/" + e_value + "/",
                Urls.get_exercise_problem(e_value),
                "",
                function(responseText, textStatus, XMLHttpRequest) {
                    if(textStatus == 'error') {
                        $(this).html(ajax_error);
                    }
                    // This button would be disabled at certain portions of code
                    $('#btnSubmit').attr('disabled', false);

                    // Order is: exercise_id/object_id/problem_id/
                    //var target_url = "/load_workspace/" + e_value + "/" + $("#hObjId").val() + "/" + e_text + "/";
                    var target_url = Urls.get_exercise_workspace(e_value, $("#hObjId").val(), e_text);

                    $(document.createElement('img'))
                    .attr({'src': ajax_loading_image, 'alt': 'Loading ...'})
                    .css({'width': 'auto', 'height': 'auto', 'border': 0, 'margin': 0, 'padding-left': '44.5%', 'padding-right': '44.5%', 'padding-top': '25px', 'padding-bottom': '25px'})
                    .appendTo('#workspace');

                    $.ajax({
                        type: 'GET',
                        url: target_url,
                        dataType:   'html',
                        cache:  false,
                        success:    function(mesg, txtStatus, XmlHttpRequest) {
                            $('#workspace').empty();
                            $('#workspace').html(mesg);
                        },
                        error:      function(XmlHttpRequet, txtStatus, errorThrown) {
                            alert('Failed to load contents! Please report back this problem.');
                            $('#workspace').html(txtStatus + '\n' + errorThrown);
                        }
                    });
                    SyntaxHighlighter.highlight();
                },
                "html"
            );
       }
       $("#result_display").html("");
    });
});


$("#btnSubmit").click(function() {
    //$("#result_display").html(ajax_loading);
    $("html, body").animate({scrollTop: $("#contentBox").height()}, 790);

    /** Source: http://www.phpbuilder.com/board/showthread.php?t=10348450 */
    // Retrieve the iframe
    /*
    function getFrame(strID) {
       var oIframe = document.getElementById(strID);
       var oDoc = oIframe.contentWindow || oIframe.contentDocument;
       if (oDoc.document) {
           oDoc = oDoc.document;
       }
       return oDoc;
    }
    */
    /** */

    //$("#divStoreGraphForServer").html(getFrame('ifWorkSpace').getElementById("divJSONGraph").innerHTML);

    // Now send the exercise ID to server and obtain the correct solution
    // Compare with user's result to verify if he's drawn correctly
    e_value = $("#ddlExercises option:selected").val();
    if (eval(e_value) > 0) {
        // (Rev #47: #4)
        /**
         * 
        $.get(
            "/isad/isad/answer/" + $("#hObjId").val() + "/" + e_value + "/",
            {
             graph: $("#divStoreGraphForServer").text()
            },
            function(data) {
                $("#result_display").html(data);
            },
            ""
        );
        */
        var soln_url = Urls.show_solution(e_value);
        $('#view_solution').empty();
        $('#view_solution').append(
    $(document.createElement('input'))
            .attr({ 'type': 'button', 'value': 'View Solution', 'id': 'show_solution'})
            .click(function() {
                if (confirm("Are you sure you want to view the solution?"))
                    window.open(soln_url, "Solution","width=500,height=320,resizable=yes,toolbar=no,linkbar=no,scrollbars=yes,location=0,directories=no,status=no,menubar=no,copyhistory=no",false);

                return false;
            })
        );
    } else {
       $("#result_display").html('<h2>Please select an exercise from the dropdown list!</h2>');
    }
});


/*
 * For handling CSRF token while POSTing via AJAX
 * SOurce: https://docs.djangoproject.com/en/1.7/ref/contrib/csrf/
 */
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function sameOrigin(url) {
    // test that a given url is a same-origin URL
    // url could be relative or scheme relative or absolute
    var host = document.location.host; // host + port
    var protocol = document.location.protocol;
    var sr_origin = '//' + host;
    var origin = protocol + sr_origin;
    // Allow absolute or scheme relative URLs to same origin
    return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
        (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
        // or any other URL that isn't scheme relative or absolute i.e relative.
        !(/^(\/\/|http:|https:).*/.test(url));
}

function setUpCsrf() {
    var csrftoken = getCookie('csrftoken');
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                // Send the token to same-origin, relative URLs only.
                // Send the token only if the method warrants CSRF protection
                // Using the CSRFToken value acquired earlier
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
}
