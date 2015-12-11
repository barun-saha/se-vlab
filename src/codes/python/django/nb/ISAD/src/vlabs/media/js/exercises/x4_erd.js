$(document).ready(function(){
    var s1 = '';
    var entityArr = [];
    var entityAttrArr = [];
    var removeImagePath = '/isad/v_media/images/remove16x16.png';


    $('a.removeAttribute').live('click', function(event) {
        event.preventDefault();
        $(this).parent().remove();
        return false;
    });

    $('a.removeEntity').live('click', function(event) {
        event.preventDefault();
        var ent = $(this).parent().text();
        $(this).parent().parent().remove();
        $('#' + ent).remove();
        $('#' + ent).remove();
        $('#' + ent).remove();
        $('#showRelationTable .tbody2 .' + ent + '_').parent().remove();
        $('#showRelationTable .tbody2 .' + '_' + ent).parent().remove();
        return false;

    });


    $('td.removeRelation').live('click', function(event) {
        event.preventDefault();
        $(this).parent().remove();
        return false;
    });


    function removeAttribute(object) {
    //alert(object);
    }
    function isBlank(text) {
        return jQuery.trim(text) == '';
    }
    $('#btnAddEntity').click(function() {

        var textEntity = $('#txtEntity').val();
        textEntity = jQuery.trim(textEntity);
        if (!textEntity.match(/^[a-zA-Z0-9_ -]+$/) )

        {
            alert("Please type in alphanumeric characters, blankspace or underscore only");
        }
        else
        {
            textEntity = textEntity.replace(/-/g, '_');
            textEntity = textEntity.replace(/ /g, '_');

            if (isBlank(textEntity))
            {
                alert("Write your Entity name in that adjacent TextBox");
            }
            else
            {
                var alreadyExistsEntity = 0;
                $('#showEntityTable .tbody1 tr td:nth-child(1)').each(function(index) {

                    var entTemp = $(this).text();
                    if (textEntity.toLowerCase() == entTemp.toLowerCase())
                    {
                        alreadyExistsEntity = 1;
                    }
                });
                $('#showEntityTable .tbody1 tr td:nth-child(1)').each(function(index) {

                    $('#attr_' + $(this).text() + ' li').each(function(index1) {

                        var entTemp = $(this).text();
                        if (textEntity.toLowerCase() == entTemp.toLowerCase())
                        {
                            alreadyExistsEntity = 1;
                        }
                    });
                });
                $('#showRelationTable .tbody2 tr td:nth-child(2)').each(function(index) {
                    var entTemp = $(this).text();
                    if (textEntity.toLowerCase() == entTemp.toLowerCase())
                    {
                        alreadyExistsEntity = 1;
                    }
                });

                if (alreadyExistsEntity == 1)
                {
                    alert("you have already enter that Entity");
                }
                else
                {
                    var ulid = 'attr_' + textEntity;
                    entityArr[entityArr.length] = textEntity;
                    entityAttrArr[entityAttrArr.length] = ulid;
                    $('#ent_attr').append($("<option id=" + textEntity + ">" + textEntity + "</option>"));
                    $('#ent_1').append($("<option id=" + textEntity + ">" + textEntity + "</option>"));
                    $('#ent_2').append($("<option id=" + textEntity + ">" + textEntity + "</option>"));
                    var weakOrStrongEntity;
                    if ($('#weakCheck').is(':checked'))
                    {
                        var wkClass = 'waekEntity';
                        weakOrStrongEntity = 'Yes';
                    }
                    else
                    {
                        var wkClass = '';
                        weakOrStrongEntity = 'No';
                    }

                    var re = '   REMOVE';
                    $('#showEntityTable .tbody1').append($("<tr id=" + textEntity + " class=" + wkClass + "> <td>" + textEntity +
                        "<a class='removeEntity' href='#'><img src='/isad/v_media/images/remove16x16.png' class='removeImage' /></a></td> <td> <ul id=" + ulid + //9th change
                        "> </ul> </td><td>" + weakOrStrongEntity + "</td></tr>"));
                }
            }
        }

        $("#weakCheck").attr('checked', false);
        $('#txtEntity').val('');
        return false;
    });


    $('#btnAddAttribute').click(function() {

        var textAttribute = $('#txtAttribute').val();
        textAttribute = jQuery.trim(textAttribute);
        if (!textAttribute.match(/^[a-zA-Z0-9_ -]+$/) )

        {
            alert("give alphanumaric characters, blankspace hyphen underscore only");
        }
        else
        {
            textAttribute = textAttribute.replace(/-/g, '_');
            textAttribute = textAttribute.replace(/ /g, '_');

            if (isBlank(textAttribute))
            {
                alert("Write informations in adjacent feilds");
            }
            else
            {
                var alreadyExistsAttribute = 0;

                var recentEntity = $("#ent_attr option:selected").val();

                $('#attr_' + recentEntity + ' li').each(function(index) {

                    var existingAttributeInRecentEntity = $(this).text();
                    if (textAttribute.toLowerCase() == existingAttributeInRecentEntity.toLowerCase())
                    {
                        alreadyExistsAttribute = 1;
                    }
                });

                $('#showEntityTable .tbody1 tr td:nth-child(1)').each(function(index) {
                    var entTemp = $(this).text();

                    if (textAttribute.toLowerCase() == entTemp.toLowerCase())
                    {
                        alreadyExistsAttribute = 1;
                    }
                });
                $('#showRelationTable .tbody2 tr td:nth-child(2)').each(function(index) {
                    var relationTemp = $(this).text();
                    if (textAttribute.toLowerCase() == relationTemp.toLowerCase())
                    {
                        alreadyExistsAttribute = 1;
                    }
                });



                if (alreadyExistsAttribute == 1)
                {
                    alert("alreadyExistsAttribute");
                }
                else
                {
                    entTotalInstance = [];
                    weakOrStrongEntityArrayInstance =[];
                    var selected = 'attr_' + $("#ent_attr option:selected").val();

                    $('#showEntityTable .tbody1 tr td:nth-child(1)').each(function(index) {
                        var entty = $(this).text();
                        entTotalInstance[entTotalInstance.length] = entty;
                    });

                    $('#showEntityTable .tbody1 tr td:nth-child(3)').each(function(index) {
                        var yOrN = $(this).text();
                        weakOrStrongEntityArrayInstance[weakOrStrongEntityArrayInstance.length] = yOrN;
                    });

                    if ($('#pkCheck').is(':checked'))
                    {
                        var pkClass = 'primaryKey';
                        $(entTotalInstance).each(function(index) {
                            if (entTotalInstance[index] == $("#ent_attr option:selected").val())
                            {
                                if (weakOrStrongEntityArrayInstance[index] == "Yes")
                                {
                                    alert("Be careful, weak entity does not contain primary key you may proceed setting it as non-primary attribute");
                                    pkClass = '';
                                }

                            }
                        });
                    }
                    else
                    {
                        var pkClass = '';
                    }

                    var Linktext = '   remove';
                    var newAttribute = $("<li class='" + pkClass + "'>" + textAttribute +
                        "<a class='removeAttribute' href='#'><img src='/isad/v_media/images/remove16x16.png' class='removeImage' /></a></li>");
                    $("#showEntityTable .tbody1 #" + selected).append(newAttribute);
                }
            }

        }
        $('#txtAttribute').val('');
        $("#pkCheck").attr('checked', false);
    //ENTITY ATTRIBUTE INSERTING END

    });    //BTN-ADD-ATTRIBUTE CLICK END


    $('#btnAddRelation').click(function() {

        var textRelation = $('#txtRelation').val();
        textRelation = jQuery.trim(textRelation);
        if (!textRelation.match(/^[a-zA-Z0-9_ -]+$/) )

        {
            alert("give alphanumaric characters, blankspace hyphen underscore only");
        }
        else
        {
            textRelation = textRelation.replace(/-/g, '_');
            textRelation = textRelation.replace(/ /g, '_');


            //MAKE SHOW_RELATION_TABLE
            if (isBlank(textRelation))
            {
                alert("Write informations in adjacent feilds");
            }
            else
            {

                var alreadyExistsRelation = 0;
                $('#showEntityTable .tbody1 tr td:nth-child(1)').each(function(index) {

                    var entTemp = $(this).text();
                    if (textRelation.toLowerCase() == entTemp.toLowerCase())
                    {
                        alreadyExistsRelation = 1;
                    }
                });
                $('#showEntityTable .tbody1 tr td:nth-child(1)').each(function(index) {

                    $('#attr_' + $(this).text() + ' li').each(function(index1) {

                        var entAttr = $(this).text();
                        if (textRelation.toLowerCase() == entAttr.toLowerCase())
                        {
                            alreadyExistsRelation = 1;
                        }
                    });
                });
                $('#showRelationTable .tbody2 tr td:nth-child(2)').each(function(index) {
                    var relationTemp = $(this).text();
                    if (textRelation.toLowerCase() == relationTemp.toLowerCase())
                    {
                        alreadyExistsRelation = 1;
                    }
                });
                if (alreadyExistsRelation == 1)
                {
                    alert("alreadyExistsRelation");
                }
                else
                {

                    $('#showRelationTable .tbody2').append($("<tr> <td class=" + $("#ent_1 option:selected").val() + '_' + ">" +
                        $("#ent_1 option:selected").val() + "</td> <td>" + textRelation +
                        "</td> <td class=" + '_' + $("#ent_2 option:selected").val() + ">" +
                        $("#ent_2 option:selected").val() +
                        "</td> <td class='relationConstraint'>" +$("#relation .relationConstraint option:selected").val() + "<td class='removeRelation' href='#'><img src='/isad/v_media/images/remove16x16.png' class='removeImage' /></td></tr>"));


                }
            }

        }
        $('#txtRelation').val('');
        return false;
    //TABLE MADE

    });  //BTN-ADD-RELATION CLICK END

    //CLICK FOR ER-DIAGRAM
    $('#btnERD').click(function() {
        //ARRAY INITIALIZATION
        var entr1 = [];
        var entr2 = [];
        var entrR = [];
        var entT = [];
        var relationConstraintArray = [];
        var weakOrStrongEntityArray = [];

        $('#showEntityTable .tbody1 tr td:nth-child(1)').each(function(index) {

            var ent = $(this).text();
            entT[entT.length] = ent;

        });
        $('#showEntityTable .tbody1 tr td:nth-child(3)').each(function(index) {

            var yesOrNo = $(this).text();

            weakOrStrongEntityArray[weakOrStrongEntityArray.length] = yesOrNo;

        });


        var totalAttributeCount = 0;
        var attributeList = [];
        var attributeParentEntityList = [];
        var attributeListUnique = [];
        var attributeParentEntityListUnique = [];
        var attributeListRepeated = [];
        var attributeParentEntityListRepeated = [];
        var attributeParentClass = [];
        var attributeParentUniqueClass = [];
        var attributeListRepeatedCount = [];

        $(entT).each(function(index) {

            $('#attr_' + entT[index] + ' li').each(function(index1) {
                attributeList[attributeList.length] = $(this).text();
                attributeParentEntityList[attributeParentEntityList.length] = entT[index];
                attributeParentClass[attributeParentClass.length] = $(this).attr('class');//
                totalAttributeCount++;
            });
        });

        $(attributeList).each(function(index) {
            var tempListItem = attributeList[index];
            var attributeOcuranceCount = 0;

            $(attributeList).each(function(index1) {
                if (tempListItem == attributeList[index1])
                {

                    attributeOcuranceCount++;

                }

            });

            if (attributeOcuranceCount == 1)
            {
                attributeListUnique[attributeListUnique.length] = tempListItem;
                //alert("count of " + tempListItem + "is one");
                attributeParentEntityListUnique[attributeParentEntityListUnique.length] = attributeParentEntityList[index];
                attributeParentUniqueClass[attributeParentUniqueClass.length] = attributeParentClass[index];
            }
            else
            {
                var repeatCheck = 0;
                $(attributeListRepeated).each(function(index2) {
                    if (tempListItem == attributeListRepeated[index2])
                    {
                        repeatCheck = 1;
                    }
                });
                if (repeatCheck == 0)
                {

                    attributeListRepeated[attributeListRepeated.length] = tempListItem;
                    //alert("count of " + tempListItem + "is" + attributeOcuranceCount + "times");
                    attributeListRepeatedCount[attributeListRepeatedCount.length] = attributeOcuranceCount;
                    attributeParentEntityListRepeated[attributeParentEntityListRepeated.length] = attributeParentEntityList[index];//??
                }
            }

        });



        //Ellipse node making
        var ellipseNodeInit = 'node [shape=ellipse]; ';
        var ellipseNodeDuplicateInit = '{node [label="';
        var repeatedNodeUnit = '';
        var repeatedGraphUnit = '';

        var tempEllipseNode = '';

        $(attributeListRepeated).each(function(index) {
            tempEllipseNode = attributeListRepeated[index];

            var tempParentEntity = [];
            var tempAttributeClass = [];
            $(entT).each(function(index2) {

                $('#attr_' + entT[index2] + ' li').each(function(index3) {

                    if (tempEllipseNode == $(this).text())
                    {
                        tempParentEntity[tempParentEntity.length] = entT[index2];
                        tempAttributeClass[tempAttributeClass.length] = $(this).attr('class');
                    }

                });

            });
            repeatedNodeUnit = repeatedNodeUnit.concat(ellipseNodeDuplicateInit);
            repeatedNodeUnit = repeatedNodeUnit.concat(tempEllipseNode + '"] ');
            var t =0;
            while (t<attributeListRepeatedCount[index]){
                if (tempAttributeClass[t] == '')
                {
                    repeatedNodeUnit = repeatedNodeUnit.concat(tempEllipseNode + t + '; ');
                    repeatedGraphUnit = repeatedGraphUnit.concat(tempParentEntity[t] + ' -- ' + tempEllipseNode + t + '; ');
                }
                else
                {

                    repeatedNodeUnit = repeatedNodeUnit.concat(tempEllipseNode + t + '[label="' + tempEllipseNode + '*"]; ');
                    repeatedGraphUnit = repeatedGraphUnit.concat(tempParentEntity[t] + ' -- ' + tempEllipseNode + t + '; ');
                }
                t++;
            }
            repeatedNodeUnit = repeatedNodeUnit.concat('} ');

        });
        //alert(repeatedNodeUnit);
        //alert(repeatedGraphUnit);

        //Graph & Ellipse Node making for repeated attributes
        var uniqueNodeUnit = '';
        var uniqueGraphUnit = '';
        $(attributeListUnique).each(function(index) {
            tempEllipseNode = attributeListUnique[index];
            if (attributeParentUniqueClass[index] != '')
            {
                uniqueNodeUnit = uniqueNodeUnit.concat(attributeListUnique[index] + '[label="' + attributeListUnique[index] + '*"]; ');
                uniqueGraphUnit = uniqueGraphUnit.concat(attributeParentEntityListUnique[index] + '--' + attributeListUnique[index] + '; ');
            }
            else
            {
                uniqueNodeUnit = uniqueNodeUnit.concat(attributeListUnique[index] + '; ');
                uniqueGraphUnit = uniqueGraphUnit.concat(attributeParentEntityListUnique[index] + '--' + attributeListUnique[index] + '; ');
            }


        //alert(uniqueNodeUnit);
        //alert(uniqueGraphUnit);
        });
        //alert(uniqueNodeUnit);
        //alert(uniqueGraphUnit);


        var sENInit = 'node [shape=ellipse]; ';

        var sENT = sENInit;
        var sEGInit = '';
        var sEGT = sEGInit;

        $(entT).each(function(index) {

            $('#attr_' + entT[index] + ' li').each(function(index1) {


                var className = $(this).attr('class');

                if (className != '')
                {
                    var temp1 = '"' + $(this).text() + '*";';
                    sEUnit = temp1;// + ' [color=salmon2]; ';
                    sENT = sENT.concat(sEUnit);
                }
                else
                {
                    var temp1 = $(this).text();

                    sEUnit = temp1 + '; ';
                    sENT = sENT.concat(sEUnit);
                }

                var sf = entT[index] + ' -- ' + temp1 + '; ';
                sEGT = sEGT.concat(sf);
            });
        });


        var sBNInit = 'node [shape=box]; '
        var sBNT = sBNInit;


        $(entT).each(function(index) {
            var s2 = '';
            if (weakOrStrongEntityArray[index] == "Yes")
            {
                s2 = entT[index] + '[peripheries=2]; ';
            }
            else
            {
                s2 = entT[index] + '; ';
            }
            sBNT = sBNT.concat(s2);
        });

        var sDNInit = 'node [shape=diamond,style=filled,color=lightgrey]; '
        var sDNT = sDNInit;

        $('#showRelationTable .tbody2 tr td:nth-child(2)').each(function(index) {
            entrR[entrR.length] = $(this).text();

            var s4 = '"' + $(this).text() + '"; ';
            sDNT = sDNT.concat(s4);

        });


        $('#showRelationTable .tbody2 tr td:nth-child(1)').each(function(index) {
            entr1[entr1.length] = $(this).text();

        });
        $('#showRelationTable .tbody2 tr td:nth-child(3)').each(function(index) {
            entr2[entr2.length] = $(this).text();
        });
        $('#showRelationTable .tbody2 tr td:nth-child(4)').each(function(index) {
            relationConstraintArray[relationConstraintArray.length] = $(this).text();
        });

        var sERGT = '';
        var i=0;
        while (i<entr2.length){

            if (relationConstraintArray[i] == "Many To Many")
            {
                var s5 = entr1[i] + ' -- "' + entrR[i] + '" [label="m"]; ';

                var s6 = '"' + entrR[i] + '" -- ' + entr2[i] + ' [label="n"]; ';

            }
            if (relationConstraintArray[i] == "One To Many")
            {
                var s5 = entrR[i] + ' -- "' + entr1[i] + '" [label="1"]; ';

                var s6 = '"' + entrR[i] + '" -- ' + entr2[i] + ' [label="n"]; ';

            }
            if (relationConstraintArray[i] == "Many To One")
            {
                var s5 = entr1[i] + ' -- "' + entrR[i] + '" [label="m"]; ';

                var s6 = '"' + entrR[i] + '" -- ' + entr2[i] + ' [label="1"]; ';

            }
            if (relationConstraintArray[i] == "One To One")
            {
                var s5 = entrR[i] + ' -- "' + entr1[i] + '" [label="1"]; ';

                var s6 = '"' + entrR[i] + '" -- ' + entr2[i] + ' [label="1"]; ';

            }

            sERGT = sERGT.concat(s5);
            sERGT = sERGT.concat(s6);
            i++;
        }



        /* Rev #13: #1 */
        var sEntrySec = 'graph ER { edge [len=2]; '
        var sRemainderSec = '}';
        var TotalNode = sBNT + sDNT + sENInit + repeatedNodeUnit + uniqueNodeUnit;
        var TotalGraph = sERGT + repeatedGraphUnit + uniqueGraphUnit;
        var stringForERDiagram = sEntrySec + TotalNode + TotalGraph + sRemainderSec;
        //alert(stringForERDiagram);


        $.ajax({
            type:    'POST' ,
            url:     '/isad/isad/get_erd/',
            data:    {
                'erd': stringForERDiagram
            },
            cache:   false,
	    dataType: 'json',
            success: function(mesg, txtStatus, XMLHttpRequest) {
                var ts = new Date().getTime();  // Required for forced loading of the image, instead from cache
		//alert(mesg)
                $('#er_diagram').attr('src', mesg['diagram_url']+'?t='+ts);
                highlight('#uml-diagram-container');
            },
            error:   function(XMLHttpRequest, txtStatus, errorThrown) {
                alert(errorThrown);
            }
            
        });


    });//CLICK FOR ER-DIAGRAM END

});  //DOCUMENT READY END
