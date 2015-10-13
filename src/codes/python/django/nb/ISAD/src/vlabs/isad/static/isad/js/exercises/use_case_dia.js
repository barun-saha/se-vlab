$(document).ready(function(){

    function relationAppend()
    {
        var LeftActorOrUC = $("#selectLeftActorOrUC option:selected").val();
        var RelationTypeName = $("#selectRelationType option:selected").val();
        var RightActorOrUC = $("#selectRightActorOrUC option:selected").val();
        var labelText = $('#textLabelName').val();
        //$('#dynamicMsgRow').remove();
        //alert(labelText);
        $('.tbodyRelationList').append($("<tr><td>" + LeftActorOrUC + "</td><td>" + RelationTypeName + "</td><td>" + RightActorOrUC + "</td><td>" + labelText + "</td><td><a class='removeRelation' href='#'><img src='/cse08/isad/v_media/images/remove16x16.png' width='16' height='16' border='0' /></a></td></tr>"));

        $('html, body').animate({
            scrollTop: $('.tbodyRelationList').offset().top
            }, 'fast');
    }

    // Logic area
    //Delete  removeActor
    $('a.removeUC').live('click', function(event) {
        var txt = $(this).parent().text();
        event.preventDefault();
        $(this).parent().remove();

        $("#selectRightActorOrUC option").each(function(index){
            if (txt == $(this).text())
            {
                $(this).remove();
            }
        });

        $("#selectLeftActorOrUC option").each(function(index){
            if (txt == $(this).text())
            {
                $(this).remove();
            }
        });
		

        $('.tbodyRelationList tr td:nth-child(1)').each(function(index) {
            //alert(txt);
            //alert($(this).text());
            if (txt == $(this).text())
            {	//alert(txt);
                $(this).parent().remove();
            }
        });
        $('.tbodyRelationList tr td:nth-child(3)').each(function(index) {
				
            if (txt == $(this).text())
            {	
                $(this).parent().remove();
            }
        });
        return false;
    });
    $('a.removeActor').live('click', function(event) {
        event.preventDefault();
        var txt = $(this).parent().text();
        $(this).parent().remove();

        $("#selectRightActorOrUC option").each(function(index){
            if (txt == $(this).text())
            {
                $(this).remove();
            }
        });

        $("#selectLeftActorOrUC option").each(function(index){
            if (txt == $(this).text())
            {
                $(this).remove();
            }
        });
        $('.tbodyRelationList tr td:nth-child(1)').each(function(index) {
				
            if (txt == $(this).text())
            {	
                $(this).parent().remove();
            }
        });
        $('.tbodyRelationList tr td:nth-child(3)').each(function(index) {
				
            if (txt == $(this).text())
            {	
                $(this).parent().remove();
            }
        });
        return false;
    });
    $('a.removeRelation').live('click', function(event) {
        event.preventDefault();
        $(this).parent().parent().remove();
        return false;
    });
	
    //Insert Actor
    $('#btnActorAdd').click(function() {
         
        var textActor = $('#textActor').val();
        textActor = jQuery.trim(textActor);
        //textEntity = textEntity.replace(/-/g, '_');
        textActor = textActor.replace(/\s+/g," ");//someText = someText.replace(/\s+/g," ");
		
        if (textActor == '')
        {
            alert('Write name of actor in adjacent textbox of Table#1');
        }
        else if (!textActor.match(/^[a-zA-Z0-9 ]+$/) ) 

        {
            alert("Write name of actor again, you are allowed to use  alphabets, numerics and white-space only");
        }
        else
        {
		 
			

            //checking the actor to be inserted is already inserted or not
            var alreadyExistActor = 0;
            $('#completeUCList li').each(function(index) {
                var temp = $(this).text();
                if (textActor.toLowerCase() == temp.toLowerCase())
                {
                    alreadyExistActor = 2;
                }
            });
            $('#completeActorList li').each(function(index) {
                var temp = $(this).text();
                if (textActor.toLowerCase() == temp.toLowerCase())
                {
                    alreadyExistActor = 1;
                }
            });
		 
            //Insert new actor here  
            if (alreadyExistActor == 0)
            {

                $('#selectLeftActorOrUC').append($("<option class='classActor'>" + textActor + "</option>"));
                $('#selectRightActorOrUC').append($("<option class='classActor'>" + textActor + "</option>"));
					
                $("#completeActorList").append($("<li>" + textActor + "<a class='removeActor' href='#'><img src='/cse08/isad/v_media/images/remove16x16.png' width='16' height='16' border='0' /></li>"));
                $('html, body').animate({
                    scrollTop: $('.tbodyActorAndUCList').offset().top
                    }, 'fast');
					
            }

            //Give proper message for already inserted actor 
            else if(alreadyExistActor == 1)
            {
                alert("You have already enter that actor");
            }
            else
            {
                alert("You have already enter a use case by the same name");
            }

			 
        }

        $('#textActor').val('');
		       
    });


    //Insert Use Case
    $('#btnUCAdd').click(function() {
         
        var textUC = $('#textUC').val();
        textUC = jQuery.trim(textUC);
        textUC = textUC.replace(/\s+/g, " ");
		
        if (textUC == '')
        {
            alert('Write name of the use case in adjacent textbox of Table#2');
        }
        else if (!textUC.match(/^[a-zA-Z0-9 ]+$/) ) 

        {
            alert("Write name of the use case again, you are allowed to use  alphabates, numarics and white space only");
        }
        else
        {
		 
			

            //checking the UC to be inserted is already inserted or not
            var alreadyExistUC = 0;
				
            $('#completeActorList li').each(function(index) {
                var temp = $(this).text();
                if (textUC.toLowerCase() == temp.toLowerCase())
                {
                    alreadyExistUC = 2;
                }
            });
            $('#completeUCList li').each(function(index) {
                var temp = $(this).text();
                if (textUC.toLowerCase() == temp.toLowerCase())
                {
                    alreadyExistUC = 1;
                }
            });
		 
            //Insert new UC here  
            if (alreadyExistUC == 0)
            {

                $('#selectLeftActorOrUC').append($("<option class='classUC'>" + textUC + "</option>"));
                $('#selectRightActorOrUC').append($("<option class='classUC'>" + textUC + "</option>"));
					
                $("#completeUCList").append($("<li>" + textUC + "<a class='removeUC' href='#'><img src='/cse08/isad/v_media/images/remove16x16.png' width='16' height='16' border='0' /></li>"));
                $('html, body').animate({
                    scrollTop: $('.tbodyActorAndUCList').offset().top
                    }, 'fast');
					
            }

            //Give proper message for already inserted UC
            else if(alreadyExistUC == 1)
            {
                alert("You have already enter that use case");
            }else{
                alert("You have already enter an actor by the same name");
            }
			 
        }

        $('#textUC').val('');
		       
    });


    //Insert Relation
    $('#btnRelationAdd').click(function() {
         
        var coun = $('#selectLeftActorOrUC option').size();
        var relation = $("#selectRelationType option:selected").val();
        var LeftActorOrUC = $("#selectLeftActorOrUC option:selected").val();
        var RightActorOrUC = $("#selectRightActorOrUC option:selected").val();
        var leftClass = $("#selectLeftActorOrUC option:selected").attr('class');
        //alert(leftClass);
        var rightClass = $("#selectRightActorOrUC option:selected").attr('class');
        //alert(rightClass);
        var textLabel = $('#textLabelName').val();
		
        if (coun == 0)
        {
            alert('Add actors and use cases from Table#1 and Table#2 respectively and then come to this step');
        }
		
        else
        {
            if (LeftActorOrUC == RightActorOrUC)
            {
                if (leftClass == 'classUC')
                {
                    alert('A use case can not be related with itself');
                }else{
                    alert('An actor can not be related with itself');
                }
            }
            else if ((leftClass != rightClass) && (relation != 'Association'))
            {
                alert(relation + ' is not possible between ' + LeftActorOrUC + ' and ' + RightActorOrUC);
            }
            else{
                // Association is not allowed between two use cases 
                if ((leftClass == 'classUC') && (rightClass == 'classUC') && (relation == 'Association'))
                {
                    alert('Association is not possible between two use cases');
                }
                // Only generalization is possible between two actors
                else if ((leftClass == 'classActor') && (rightClass == 'classActor') && (relation != 'Generalization'))
                {
                    alert('Only generalization is possible between two actors');
                }
                else
                {
                    /*check the relation is already taken between those elements or not*/
                    var alreadyExistRelation = 0;
                    $('.tbodyRelationList tr td:nth-child(1)').each(function(index) {
                        var rowIndex = parseInt(index, 10) + 1;
                        var leftTmp = $(this).text();
                        var rightTmp = $('.tbodyRelationList tr:nth-child(' + rowIndex + ') td:nth-child(3)').text();
                        if (((leftTmp == LeftActorOrUC) && (rightTmp == RightActorOrUC)) || ((leftTmp == RightActorOrUC) && (rightTmp == LeftActorOrUC)))
                        {
                            alreadyExistRelation = 1;
                        }
                    });
						
                    if (alreadyExistRelation == 1)
                    {
                        alert("You have already enter a relation between " + LeftActorOrUC + " and " + RightActorOrUC);
                    }else{
                        /* Handling the text of the label */
                        textLabel = jQuery.trim(textLabel);
                        textLabel = textLabel.replace(/\s+/g, " ");
                        //alert(textLabel.length);
                        if ((!textLabel.match(/^[a-zA-Z0-9 ]+$/)) && (textLabel.length > 0)){  // (textLabel.length > 0) check for null Label for a relation 
                            alert("Write the text of the label using  alphabates, numarics and white space only");
                        }else{
                            relationAppend();  // Relation add
                        }
                    }
                }
            }

        }
				
        /*

                                //checking the UC to be inserted is already inserted or not
                                var alreadyExistUC = 0;
                                /*$('.tbodyClassInformation tr td:nth-child(1)').each(function(index) {
                                        var temp = $(this).text();
                                        if (textClass.toLowerCase() == temp.toLowerCase())
                                        {
                                                alreadyExistClass = 1;
                                        }
                                });/*
		 
                                //Insert new UC here  
                                if (alreadyExistUC == 0)
                                {

                                        $('#selectLeftActorOrUC').append($("<option>" + textUC + "</option>"));
                                        $('#selectRightActorOrUC').append($("<option>" + textUC + "</option>"));
					
                                        $("#completeUCList").append($("<li>" + textUC + "<a class='removeAttribute' href='#'><img src='/cse08/isad/v_media/images/remove16x16.png' width='16' height='16' border='0' /></li>"));
                                        $('html, body').animate({scrollTop: $('.tbodyActorAndUCList').offset().top}, 'fast');
					
                                }

                                //Give proper message for already inserted UC
                                else
                                {
                                        alert("You have already enter that use case");
                                }

             */
			

        $('#textLabelName').val('');
		       
    });

    // Logic area  btnRelationAdd


    // Drawing area
    $('#btnUseCaseDiagram').click(function() {
		
		
        var draw = '';
        var start = '@startuml \n';
        var end = ' \n @enduml';
        var actorInit = ':';
        var actorEnd = ': \n';
        var UCInit = '(';
        var UCend = ') \n';
        var listActor = [];
        var listUC = [];
        var initialization = '';
        var midRelation = '';
        var assoc = '--';
        var genr = '--|>';
        var incld = '..>';
        var excld = '..>';
        var nextLine = '\n';
        var lblTxt = '';
		
        //alert(init2);
        //alert(init3);

        $('#completeActorList li').each(function(index) {
							
            listActor[listActor.length] = $(this).text();
            initialization = initialization + actorInit + $(this).text() + actorEnd;
        });

        $('#completeUCList li').each(function(index) {

            listUC[listUC.length] = $(this).text();
            initialization = initialization + UCInit + $(this).text() + UCend;

        });

        //alert(initialization);

		
		
        $('.tbodyRelationList tr td:nth-child(1)').each(function(index) {
            //Left
            var rowIndex = parseInt(index, 10) + 1;
            var leftTmp = $(this).text();
            if(jQuery.inArray(leftTmp,listActor) > -1)
            {
                leftTmp = ':' + leftTmp + ':';
            }
            else
            {
                leftTmp = '(' + leftTmp + ')';
            }
            //Right
            var rightTmp = $('.tbodyRelationList tr:nth-child(' + rowIndex + ') td:nth-child(3)').text();
            if(jQuery.inArray(rightTmp,listActor) > -1)
            {
                rightTmp = ':' + rightTmp + ':';
            }
            else
            {
                rightTmp = '(' + rightTmp + ')';
            }
            //alert(rightTmp);
            //Relation
            var relation = $('.tbodyRelationList tr:nth-child(' + rowIndex + ') td:nth-child(2)').text();
            var lblTxt = $('.tbodyRelationList tr:nth-child(' + rowIndex + ') td:nth-child(4)').text();
										
            /* lblTxt processing */
            var pos = lblTxt.indexOf(" ");
            var i;
            var j;
            i=0;
            while(pos > -1) {
                //document.write(pos + "<br />");
                i = i+1;
                //alert(i);
                j = i%2;
                //alert(j);
                if (j == 0)
                {
                    //alert("here to replace");
                    lblTxt = lblTxt.substr(0, pos + 1) + '\\n' + lblTxt.substr(pos + 1);
                //lblTxt = lblTxt.replace(lblTxt.charAt(pos), "\\n");
                }
                pos = lblTxt.indexOf(" ", pos+3);
            }
            /* lblTxt processing */


            if (relation == 'Association')
            {
                if (lblTxt.length == 0)
                {
                    midRelation = midRelation + leftTmp + assoc + rightTmp + '\n';
                }else{
                    midRelation = midRelation + leftTmp + assoc + rightTmp + ' : ' + lblTxt + '\n';
                }
            }else if (relation == 'Generalization')
            {
                if (lblTxt.length == 0)
                {
                    midRelation = midRelation + leftTmp + genr + rightTmp + '\n';
                }else
                {
                    midRelation = midRelation + leftTmp + genr + rightTmp + ' : ' + lblTxt + '\n';
                }
            }else if (relation == 'Include')
            {
                midRelation = midRelation + leftTmp + incld + rightTmp + ' : <<include>>' + '\\n ' + lblTxt + '\n';
            }else{
                midRelation = midRelation + leftTmp + excld + rightTmp + ' : <<extend>>' + '\\n ' + lblTxt + '\n';
            }
        //var lblTxt = $('.tbodyRelationList tr:nth-child(' + rowIndex + ') td:nth-child(4)').text();


        }); 
		
        draw = draw + start + initialization + midRelation + end;
        //alert(draw);
        drawUmlDiagram(draw);							
            
    });

});
