$(document).ready(function() {
    
    var workspace_contents = '<table cellpadding="0" cellspacing="0" class="techno">\
        <thead>\
            <tr>\
                <th>Parameter</th>\
                <th>Value</th>\
        </thead>\
        <tbody style="font-size: 0.9em; text-align: left;">\
            <tr>\
                <td>Total # of operators</td>\
                <td><input type="text" id="total_op"></td>\
            </tr>\
            <tr class="alt">\
                <td>Total # of operands</td>\
                <td><input type="text" id="total_od"></td>\
            </tr>\
            <tr>\
                <td>Total # of unique operators</td>\
                <td><input type="text" id="unique_op"></td>\
            </tr>\
            <tr class="alt">\
                <td>Total # of unique operands</td>\
                <td><input type="text" id="unique_od"></td>\
            </tr>\
            <tr>\
                <td>Program length</td>\
                <td id="program_length"></td>\
            </tr>\
            <tr class="alt">\
                <td>Program vocabulary</td>\
                <td id="program_vocabulary"></td>\
            </tr>\
            <tr>\
                <td>Volume</td>\
                <td id="volume"></td>\
            </tr>\
            <tr class="alt">\
                <td>Difficulty</td>\
                <td id="difficulty"></td>\
            </tr>\
            <tr>\
                <td>Effort</td>\
                <td id="effort"></td>\
            </tr>\
            <tr class="alt">\
                <td>Time to implement (in seconds)</td>\
                <td id="time_implement"></td>\
            </tr>\
            <tr>\
                <td colspan="2"><input type="button" id="calculate" value="Calculate"></td>\
            </tr>\
        </tbody></table><br>';
    
    // Display the workspace
    $('#workspace_from_javascript').html(workspace_contents);
    
    $("#calculate").click(function() {
           
        var total_operators = parseFloat( $('#total_op').val() );
        if ( isNaN(total_operators) || (total_operators <= 0) ) {
            alert('Please enter a positive integer value for total # of operators!');
            return;
        }
        var total_operands = parseFloat( $('#total_od').val() );
        if ( isNaN(total_operands) || (total_operands <= 0) ) {
            alert('Please enter a positive integer value for total # of operands!');
            return;
        }
        var unique_operators = parseFloat( $('#unique_op').val() );
        if ( isNaN(unique_operators)  || (unique_operators <= 0) ) {
            alert('Please enter a positive integer value for unique # of operators!');
            return;
        }
        var unique_operands = parseFloat( $('#unique_od').val() );
        if ( isNaN(unique_operands)  || (unique_operands <= 0) ) {
            alert('Please enter a positive integer value for unique # of operands!');
            return;
        }

        var p_length = total_operators + total_operands;
        var p_vocabulary = unique_operators + unique_operands;
        var p_volume = Math.round(p_length * Math.log(p_vocabulary) * 100 /Math.LN2) / 100;  // Convert to log base 2
        var p_difficulty = Math.round(0.5 * unique_operators * total_operands * 100 / unique_operands) / 100;
        var effort = Math.round(p_volume * p_difficulty * 100) / 100;
        var time_to_implement = Math.round(effort * 100)/ 1800;

        $('#program_length').text(p_length);
        $('#program_vocabulary').text(p_vocabulary);
        $('#volume').text(p_volume);
        $('#difficulty').text(p_difficulty);
        $('#effort').text(effort);     
        $('#time_implement').text(time_to_implement);
    });
    
});



