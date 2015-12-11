$(document).ready(function() {

    var workspace_contents ='<table cellpadding="0" cellspacing="0" class="techno">\
                <thead>\
                    <tr>\
                        <th>Project Type</th>\
                        <th>a</th>\
                        <th>b</th>\
                        <th>c</th>\
                    </tr>\
                </thead>\
                <tbody style="font-size: 0.9em;">\
                    <tr>\
                        <td>\
                        <select id="project_type" name="ddlProjectType">\
                            <option selected value="1">Organic</option>\
                            <option value="2">Semi-detached</option>\
                            <option value="3">Embedded</option>\
                        </select>\
                        </td>\
                        <td id="param_a">2.4</td>\
                        <td id="param_b">1.05</td>\
                        <td id="param_c">0.38</td>\
                    </tr>\
                    <tr class="alt">\
                        <td style="text-align: left;">Project size (in KDSI)</td>\
                        <td colspan="3" style=" padding-left: 7px; padding-right: 7px;">\
                        <input type="text" id="kdsi">\
                        </td>\
                    </tr>\
                    <tr>\
                        <td style="text-align: left;">Effort (in PM)</td>\
                        <td colspan="3" id="effort"></td>\
                    </tr>\
                    <tr class="alt">\
                        <td style="text-align: left;">T<sub>dev</sub> (in month)</td>\
                        <td colspan="3" id="tdev"></td>\
                    </tr>\
                    <tr>\
                        <td style="text-align: left;">Effort Adjustment Factor (EAF)</td>\
                        <td colspan="3">\
                        <input type="text" id="eaf">\
                        </td>\
                    </tr>\
                    <tr class="alt">\
                        <td style="text-align: left;">Effort|<sub>corrected</sub> (in PM)</td>\
                        <td colspan="3" id="effort_corrected"></td>\
                    </tr>\
                    <tr>\
                        <td style="text-align: left;">T<sub>dev</sub>|<sub>corrected</sub> (in month)</td>\
                        <td colspan="3" id="tdev_corrected"></td>\
                    </tr>\
                    <tr class="alt">\
                        <td style="text-align: left;""># of developers</td>\
                        <td colspan="3" id="developers"></td>\
                    </tr>\
                    <tr>\
                        <td colspan="4" align="center">\
                        <input type="button" value="Calculate" id="cocomo_calculate">\
                        </td>\
                    </tr>\
                </tbody>\
            </table>\
            <br>';
    
    // Display the workspace
    $('#workspace_from_javascript').html(workspace_contents);
    
    
    $("#project_type").change(function() {
                 var project_cat = $("#project_type option:selected").val();

                 if (project_cat == 1) {
                     a = 2.4;
                     b = 1.05;
                     c = 0.38;
                     $("#param_a").text(a);
                     $("#param_b").text(b);
                     $("#param_c").text(c);                     
                 }
                 else if (project_cat == 2) {
                     a = 3.0;
                     b = 1.12;
                     c = 0.35;
                     $("#param_a").text(a);
                     $("#param_b").text(b);
                     $("#param_c").text(c);
                 }
                 else {
                     a = 3.6;
                     b = 1.2;
                     c = 0.32;
                     $("#param_a").text(a);
                     $("#param_b").text(b);
                     $("#param_c").text(c);
                 }
    });
              
    $("#cocomo_calculate").click(function() {                  
        var kdsi    = parseFloat( $('#kdsi').val() );
        if ( isNaN(kdsi) ) {
            alert("Please enter a numeric value for the project size!");
            return;
        }        
        
        var eaf     = parseFloat( $('#eaf').val() );
        if ( isNaN(eaf) ) {
            alert("Please enter a numeric value for the Effort Adjustment Factor!");
            return;
        }
        
        var aa = parseFloat( $("#param_a").text() );
        var bb = parseFloat( $("#param_b").text() );
        var cc = parseFloat( $("#param_c").text() );
        
        var effort  = Math.round(100 * aa * Math.pow(kdsi, bb))/100;
        var tdev    = Math.round(100 * 2.5 * Math.pow(effort, cc))/100;
        
        var effort_corrected    = Math.round(100 * effort * eaf)/100;
        var tdev_corrected      = Math.round(100 * 2.5 * Math.pow(effort_corrected, cc))/100;
        var min_dev = Math.ceil(effort_corrected / tdev_corrected);

        $('#effort').text(effort);
        $('#tdev').text(tdev);
        $('#effort_corrected').text(effort_corrected);
        $('#tdev_corrected').text(tdev_corrected);
        $('#developers').text(min_dev);
        
        //$("html, body").animate({scrollTop: $("#contentBox").height()}, 800);
        //$("#result_display").html('<strong><em>Excellent!</em></strong>');

});

});


