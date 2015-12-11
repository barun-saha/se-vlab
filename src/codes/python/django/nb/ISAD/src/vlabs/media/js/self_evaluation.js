$(document).ready(function() {
    function clearMark() {
        $("p[id^=option]").each(function (index, item) {
            $(this).removeClass('wrong correct');
        });

        $("div[id^=choices] p").removeClass("correct");
        $("div[id^=choices] p").removeClass("wrong");
        $("div[id^=choices] img").attr("src", "");
        $("div[id^=choices] img").removeClass("ansImageVisible");
        $("div[id^=choices] img").addClass("ansImageInvisible");
        $("div[id^=choices] img").addClass("ansImage");
    }

    $("div[id^=choices] img").addClass("ansImage");

    $("#btnClear").click(function() {
        clearMark();
    });

    $("#btnSubmit").click(function() {
        clearMark();

        var nQuestions = $("div[id^=choices]").length;
        var correct = new Array(nQuestions);
        var answers = new Array(nQuestions);
        var nCorrect = 0;

        for (var i = 1; i <= nQuestions; i++) {
            correct[i] = $("input:hidden[id=qa_" + i + "]").val();

            if ($("input:radio[name=q_" + i + "]:checked").val() > 0)
                answers[i] = $("input:radio[name=q_" + i + "]:checked").val();
            else
                answers[i] = -1;

            if (answers[i] != correct[i]) {
                $("div#question_" + i + " p#option" + i + "_" + answers[i]).addClass("wrong");
                $("div#question_" + i + " p#option" + i + "_" + answers[i] + " img").removeClass("ansImage");
                $("div#question_" + i + " p#option" + i + "_" + answers[i] + " img").removeClass("ansImageInvisible");
                $("div#question_" + i + " p#option" + i + "_" + answers[i] + " img").addClass("ansImageVisible");
                $("div#question_" + i + " p#option" + i + "_" + answers[i] + " img").attr("src", "/isad/v_media/images/exclamation.gif");
                $("div#question_" + i + " p#option" + i + "_" + answers[i] + " img").attr("height", "16");
                $("div#question_" + i + " p#option" + i + "_" + answers[i] + " img").attr("width", "16");
            }
            else {
                $("div#question_" + i + " p#option" + i + "_" + answers[i]).addClass("correct");
                $("div#question_" + i + " p#option" + i + "_" + answers[i] + " img").removeClass("ansImage");
                $("div#question_" + i + " p#option" + i + "_" + answers[i] + " img").removeClass("ansImageInvisible");
                $("div#question_" + i + " p#option" + i + "_" + answers[i] + " img").addClass("ansImageVisible");
                $("div#question_" + i + " p#option" + i + "_" + answers[i] + " img").attr("src", "/isad/v_media/images/accept.png");
                $("div#question_" + i + " p#option" + i + "_" + answers[i] + " img").attr("height", "16");
                $("div#question_" + i + " p#option" + i + "_" + answers[i] + " img").attr("width", "16");
                ++ nCorrect;
            }
            $("div#question_" + i + " p#option" + i + "_" + correct[i]).addClass("correct");
        }

        var mesg = "";
        if (nCorrect == nQuestions)
            mesg = "Congrats! All your answers are correct!"
        else if (nCorrect == 0)
            mesg = "All of your answers are, unfortunately, wrong! Please revise the topics."
        else
            mesg = "" + nCorrect + " answers out of " + nQuestions + " questions are correct!"
        alert(mesg);

    });
});
