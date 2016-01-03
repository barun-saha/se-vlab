$(document).ready(function() {

    $('a.removeClasses').live('click', function(event) {
        event.preventDefault();
        var txt = $(this).parent().text();

        $("#selectClassForAttribute option").each(function(index){
            if (txt == $(this).text())
            {	$(this).remove();
            }
        });
        $("#selectClassForOperation option").each(function(index){
            if (txt == $(this).text())
            {	$(this).remove();
            }
        });
        $("#selectSuperClass option").each(function(index){
            if (txt == $(this).text())
            {	$(this).remove();
            }
        });
        $("#selectSubClass option").each(function(index){
            if (txt == $(this).text())
            {	$(this).remove();
            }
        });
        $("#selectClass1ForAssociation option").each(function(index){
            if (txt == $(this).text())
            {	$(this).remove();
            }
        });
        $("#selectClass2ForAssociation option").each(function(index){
            if (txt == $(this).text())
            {	$(this).remove();
            }
        });
        $('#tbodyAssociation tr td:nth-child(1)').each(function(index) {
			
            if (txt == $(this).text())
            {	
					
                $(this).parent().remove();}
        });
        $('#tbodyAssociation tr td:nth-child(8)').each(function(index) {
			
            if (txt == $(this).text())
            {	
					
                $(this).parent().remove();}
        });
	
        $('.tbodyInheritance tr td:nth-child(2) ul li').each(function(index) {
            if (txt == $(this).text())
            {
                var tmp = $(this).parent().attr('id');
                //alert(tmp);
                if ($('#' + tmp + ' li').size() == 1){
                    $(this).parent().parent().parent().remove();
                }else
                {$(this).remove();
                }
					
            }
        });

        $(this).parent().parent().remove();
        return false;
    });
    
    $('a.removeAttribute').live('click', function(event) {
        event.preventDefault();
        $(this).parent().remove();
        return false;
    });
    $('a.removeOperation').live('click', function(event) {
        event.preventDefault();
        $(this).parent().remove();
        return false;
    });
    $('a.removeSubClasses').live('click', function(event) {
        event.preventDefault();
        $(this).parent().parent().remove();
        return false;
    });
    $('a.removeSuperClasses').live('click', function(event) {
        event.preventDefault();
        var tmp = $(this).parent().parent().attr('id');
        //alert(tmp);
        if ($('#' + tmp + ' li').size() == 1)
        {$(this).parent().parent().parent().parent().remove();
        }else{
	
            $(this).parent().remove();
        }
        return false;
    });
    $('a.removeRelation').live('click', function(event) {
        event.preventDefault();
        $(this).parent().parent().remove();
        return false;
    });
    
    //Taking nouns from problem statement as Potential Objects 
    $('#btnAddClass').click(function() {
     
        var textClass = $('#textClass').val();
        textClass = jQuery.trim(textClass);
        if (textClass == '')
        {
            alert('Write class name in adjacent textbox of Table #1');
        }
        else if (!textClass.match(/^[a-zA-Z]+$/) ) 

        {
            alert("Write Class name again, you are allowed to use alphabets only");
        }
        else
        {
            //checking the class to be inserted is already inserted or not
            var alreadyExistClass = 0;
            $('.tbodyClassInformation tr td:nth-child(1)').each(function(index) {
                var temp = $(this).text();
                if (textClass.toLowerCase() == temp.toLowerCase())
                {
                    alreadyExistClass = 1;
                }
            });
	 
            //Insert new classes here  
            if (alreadyExistClass == 0)
            {
                $('#selectClassForAttribute').append($("<option>" + textClass + "</option>"));
                $('#selectClassForOperation').append($("<option>" + textClass + "</option>"));
                $('#selectSuperClass').append($("<option>" + textClass + "</option>"));
                $('#selectSubClass').append($("<option>" + textClass + "</option>"));
                $('#selectClass1ForAssociation').append($("<option>" + textClass + "</option>"));
                $('#selectClass2ForAssociation').append($("<option>" + textClass + "</option>"));
                $(".tbodyClassInformation").append($("<tr><td class='className'>" + textClass + "<a class='removeClasses' href='#'><img src='{% static 'isad/images/remove16x16.png' %}' width='16' height='16' border='0' /></a></td><td class='classAttributes'><ul id='attributeOf" + textClass + "'></ul></td><td class='classOperations'><ul id='operationOf" + textClass + "'></ul></td></tr>"));
                $('html, body').animate({scrollTop: $('.tbodyClassInformation').offset().top}, 'fast');
            }
            //Give proper message for already inserted Nouns 
            else
            {
                alert("You have already enter that Class");
            }
        }

        $('#textClass').val('');
	       
    });
    
    $('#btnAddAttribute').click(function() {
        var textClassId = $("#selectClassForAttribute option:selected").val();
        var con = $('#selectClassForAttribute option').size();
        //alert(con);
        var textAttribute = $('#textAttribute').val();
        var textType = $('#typeOfAttribute option:selected').val();
        textAttribute = jQuery.trim(textAttribute);
        if (con == 0)
        {
            alert("Add classes first");
        }
        else
        {
            if (textAttribute == '')
            {
                alert('Write attribute name in the textbox of Table #2');
            }		
            else if (!textAttribute.match(/^[a-zA-Z][a-zA-Z0-9]*$/) ) 

            {
                alert("Write name of the attribute again; you are allowed to use alphanumeric characters only beginning with an alphabet.");
            }
            else
            {
                //checking the noun to be inserted is already inserted or not
                var alreadyExistAttribute = 0;
                $('#attributeOf' + textClassId + ' li').each(function(index) {
                    var temp = $(this).text();//alert(temp);
                    var temp1 = temp.substr(temp.indexOf("  ") + 2);

                    if (textAttribute.toLowerCase() == temp1.toLowerCase())
                    {
                        alreadyExistAttribute = 1;
                    }
                });
	 
                if (alreadyExistAttribute == 0)
                {
                    $('#attributeOf' + textClassId).append($("<li><a>" + textType + '  ' + "</a>" + textAttribute + "<a class='removeAttribute' href='#'><img src='{% static 'isad/images/remove16x16.png' %}' width='16' height='16' border='0' /></li>"));
                    //effect
                    $('html, body').animate({scrollTop: $('.tbodyClassInformation').offset().top}, 'fast');
                }
                else
                {
                    alert("You have already added that attribute under the Class");
                }
            }
        }

        $('#textAttribute').val('');
    });


    $('#btnAddOperation').click(function() {
        var textClassId = $("#selectClassForOperation option:selected").val();
        var coun = $('#selectClassForOperation option').size();
        var textOperation = $('#textOperation').val();
        var returnType = $('#returnTypeOfOperation option:selected').val();
        textOperation = jQuery.trim(textOperation);
		
        if (coun == 0)
        {
            alert("Add classes first");
        }
        else
        {
            if (textOperation == '')
            {
                alert('Write function name in the textbox of Table #3');
            }
            else if (!textOperation.match(/^[a-zA-Z][a-zA-Z0-9]*$/) ) 

            {
                alert("Write name of the method again; you are allowed to use alphanumeric characters only beginning with an alphabet.");
            }
            else
            {
                //checking the noun to be inserted is already inserted or not
                var alreadyExistOperation = 0;
                $('#operationOf' + textClassId + ' li').each(function(index) {
                    var temp = $(this).text();
                    temp = temp.substr(temp.indexOf(" ") + 1);
                    //alert(temp);
                    if (textOperation.toLowerCase() == temp.toLowerCase())
                    {
                        alreadyExistOperation = 1;
                    }
                });
	 
                //Insert new Operations here  
                if (alreadyExistOperation == 0)
                {
                    returnType = returnType + ' ';
                    $('#operationOf' + textClassId).append($("<li>" + returnType + textOperation + "<a class='removeOperation' href='#'><img src='{% static 'isad/images/remove16x16.png' %}' width='16' height='16' border='0' /></li>"));
                    //effect
                    $('html, body').animate({scrollTop: $('.tbodyClassInformation').offset().top}, 'fast');
                }

                //Give proper message for already inserted operations 
                else
                {
                    alert("You have already added this mrthod under the Class");
                }
            }

        }

        $('#textOperation').val('');
    });
    

    $('#btnAddInheritance').click(function() {
        var textSubClass = $("#selectSubClass option:selected").val();
        var textSuperClass = $("#selectSuperClass option:selected").val();
        var consub = $('#selectSubClass option').size();
        if (consub == 0 )
        {
            alert("Add classes first");
        }
        else
        {
            if (textSubClass == textSuperClass)
            {
                alert("A class cannot be inherit itself!");
            }
            else
            {
                var alreadyExist = 0;
                $('.tbodyInheritance tr td:nth-child(1)').each(function(index) {
                    var temp = $(this).text();//alert(temp);
                    if (textSubClass.toLowerCase() == temp.toLowerCase())
                    {
                        alreadyExist = 1;
                    }
                });
                if (alreadyExist == 0)
                {
                    $('.tbodyInheritance').append($("<tr><td class='subClass'>" + textSubClass + "<a class='removeSubClasses' href='#'><img src='{% static 'isad/images/remove16x16.png' %}' width='16' height='16' border='0' /></a></td><td class='superClass'><ul id='superClassOf" + textSubClass + "'></ul></td></tr>"));
                }
                var alreadyInherited = 0;
                $('#superClassOf' + textSubClass + ' li').each(function(index) {
                    var temp = $(this).text();//alert(temp);
                    if (textSuperClass.toLowerCase() == temp.toLowerCase())
                    {
                        alreadyInherited = 1;
                    }
                });
                if (alreadyInherited == 0)
                {
                    $('#superClassOf' + textSubClass).append($("<li>" + textSuperClass + "<a class='removeSuperClasses' href='#'><img src='{% static 'isad/images/remove16x16.png' %}' width='16' height='16' border='0' /></li>"));
                    //effect
                    $('html, body').animate({scrollTop: $('.tbodyInheritance').offset().top}, 'fast');
                }
                else
                {
                    alert("You have already considered this inheritance relationship.");
                }
            }
        }
    });


    $('#btnAddAssociation').click(function() {
        var textClass1 = $("#selectClass1ForAssociation option:selected").val();
        var textMulFirst = $("#selectMultiplicityForClass1 option:selected").val();
        var textAssociationName = $('#textAssociationName').val();
        var selectAssociationType = $("#selectAssociationType option:selected").val();
        var selectMultiplicityForClass2 = $("#selectMultiplicityForClass2 option:selected").val();
        var selectClass2ForAssociation = $("#selectClass2ForAssociation option:selected").val();
        var selectDirection = $("#direction option:selected").val();

        var countsub = $('#selectSubClass option').size();
        if (countsub == 0)
        {
            alert("Add classes at first");
        }
        else {
            $('#tbodyAssociation').append($("<tr><td class='class1'>" + textClass1 + "<a class='removeRelation' href='#'><img src='{% static 'isad/images/remove16x16.png' %}' width='16' height='16' border='0' /></a></td><td class='multiplicity1'>" + textMulFirst + "</td><td class='rel-name'>" + textAssociationName + "</td><td class='rel-type'>" + selectAssociationType + "</td><td class='multiplicity2'>" + selectMultiplicityForClass2 + "</td><td class='class2'>" + selectClass2ForAssociation + "</td><td class='direction'>" + selectDirection + "</td></tr>"));
            
            $('html, body').animate({scrollTop: $('#tbodyAssociation').offset().top}, 'fast');
        }

        $('#textRole1').val('');
        $('#textAssociationName').val('');
        $('#textRole2').val('');

    });


    $('#btnClassDiagram').click(function() {

        var initGlobal = '\n /** \n * @opt operations \n* @opt attributes \n* @opt types \n* @hidden \n*/\n class UMLOptions {} \n';
        var init_header_class = '/**  \n';
        var init_remainder_class = ' */ \n';
        var init_each_class_header = ' * @';
        var each_class_header = '';
        var totalClass = '';
        var classList = [];

	
        // New formation of classList
        $('.tbodyClassInformation tr td:nth-child(1)').each(function(index) {
            var tempClass = $(this).text();
            var existClass = 0;
            $(classList).each(function(index1) {
                if (classList[index1] == tempClass)
                {
                    existClass = 1;
                }
            });
            if (existClass == 0)
            {
                classList[classList.length] = tempClass;
            }
						
        });

        var umlText = '@startuml\n';
        
        $('.tbodyClassInformation tr').each(function(index) {
            var className = $(this).find('td.className').text();
            var attributes = $(this).find('td.classAttributes ul li');
            var operations = $(this).find('td.classOperations ul li');

            umlText += 'class ';
            umlText += className
            umlText += ' {\n';
            $(attributes).each(function(index) {
                umlText += $(this).text() + '\n';
            });
            $(operations).each(function(index) {
                umlText += $(this).text() + '()\n';
            });
            umlText += '}\n\n';
        });
        
        $('.tbodyInheritance tr').each(function(index) {
            var superclass = $(this).find('td.superClass').text();
            var subclass = $(this).find('td.subClass').text();
            umlText += superclass + ' <|-- ' + subclass + '\n';
        });

        $('#tbodyAssociation tr').each(function(index1) {
            var class1 = $(this).find('td.class1').text();
            var class2 = $(this).find('td.class2').text();
            var role1 = $(this).find('td.role1').text();
            var role2 = $(this).find('td.role2').text();
            var multiplicity1 = $(this).find('td.multiplicity1').text();
            var multiplicity2 = $(this).find('td.multiplicity2').text();
            var relName = $(this).find('td.rel-name').text().trim();
            var relType = $(this).find('td.rel-type').text().trim();
            var direction = $(this).find('td.direction').text().trim();
            
            if (multiplicity1 == 'Not specified') {
                multiplicity1 = ' '; // Space
            }
            
            if (multiplicity2 == 'Not specified') {
                multiplicity2 = ' ';
            }
            
            var relSymbol = '';
            
            if (relType == 'Aggregation (of)') {
                relSymbol = '--o';
            } else if (relType == 'Simple association') {
                relSymbol = '--';
            } else if (relType == 'Navigation association (to)') {
                relSymbol = '-->';
            } else if (relType == 'Dependency (on)') {
                relSymbol = '..>';
            } else if (relType == 'Composition (of)') {
                relSymbol = '--*';
            }
            
            umlText += class1 + ' "' + multiplicity1 + '" ' + relSymbol;
            umlText += ' "' + multiplicity2 + '" ' + class2;
            
            if (relName.length > 0) {
                umlText += ' : ' + relName;
                
                if (direction == 'TO') {
                    umlText += ' >';
                } else if (direction == 'FROM') {
                    umlText += ' <';
                }
            }
            
            umlText += '\n';
        });
        
        umlText += '@enduml';
        drawUmlDiagram(umlText);
    });

});
