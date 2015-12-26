$(document).ready(function() {
    
    $('textarea.resizable:not(.processed)').TextAreaResizer();

    // initialisation
    editAreaLoader.window_loaded();
    editAreaLoader.init({
        id: "code-base"	// id of the textarea to transform
        ,start_highlight: true	// if start with highlight
        ,allow_resize: "both"
        ,allow_toggle: false
        ,word_wrap: true
        ,language: "en"
        ,syntax: "js"
        ,replace_tab_by_spaces: 4
    });
        
    $('.editable').editable();
        
    var editImageURL = get_static('isad/images/new/icons/workspace/pencil2_16x16.png');
    var removeImageURL = get_static('isad/images/remove16x16.png');
        
    var edit_options = {
        'background-image': 'url('+editImageURL+')',
        'background-position': 'right',
        'background-repeat': 'no-repeat',
        'padding-right': '20px'
    };
    var edit_out_options = {
        'background-image': 'none',
        'padding-right': '0'
    };

    $('.editable').live('mouseover', function() {
        $(this).css(edit_options);

    });
    $('.editable').live('mouseout', function() {
        $(this).css(edit_out_options);
    });

    SyntaxHighlighter.config.clipboardSwf = get_static('isad/lib/SyntaxHighlighter/clipboard.swf');
    SyntaxHighlighter.all();

    var spreadsheet = '';
    // A dictionary to hold all test suites that are created;
    // Keys are test suite IDs, values are test suite objects
    var allTestSuites = {}; 

    var I_SUMMARY   = 0;
    var I_SCRIPT    = 1;
    var I_E_OUTPUT  = 2;
    //var I_RETURN_TYPE = 3;
    var I_A_OUTPUT  = 3;
    var I_MANUAL    = 4;
    var I_STATUS    = 5;


    /* Very important */
    $('#code-base').keydown(function(e) {            
        e.stopImmediatePropagation();
    });
                            
    /** TestSuite class */
    var TestSuite = $.Class({
        test_suite_status: ['Not Run', 'Pass', 'Fail', 'Partial Success'],

        prototype: {
            init:   function(options) {
                this.id = _.uniqueId('TS');
                this.title      = options.title || 'Default';
                this.summary    = options.summary || 'Default test suite';
                this.code_base  = options.code_base || '';
                this.test_cases = [];
            //alert('Init');
            },
            
            addTestCase:    function(test_case) {
                this.test_cases.push( test_case );
            },
            
            run:   function() {            
                for (var i = 0; i < this.test_cases.length; i++) {
                    alert( this.test_cases[i].toJSON()['id'] );
                }
            },
            
            toJSON:     function() {
                var self = {
                    'id':   this.id,
                    'title':    this.title,
                    'summary':  this.summary,
                    'code_base':  this.code_base,
                    'test_cases':    this.test_cases,                    
                    'status':   this.status
                };
                return self;
            },

            setCode:    function(code) {
                this.code_base = code;
            }
        }             
    });
    

    /** TestCase class */
    var TestCase = $.Class({
        test_case_status: ['Not Run', 'Pass', 'Fail'],

        prototype: {
            init:   function(options) {
                this.id = _.uniqueId('tc');
                this.summary    = options.summary || 'Default test case';
                this.expected_result = options.expected_result || '-';
                this.actual_result   = options.actual_result || '-';
                this.script = options.script || '';
                this.status = TestCase.test_case_status[0];                
            },
            
            run:    function() {},

            toJSON:     function() {
                var self = {
                    'id':   this.id,
                    'summary':  this.summary,
                    'expected_result':  this.expected_result,
                    'actual_result':    this.actual_result,
                    'script':   this.script,
                    'status':   this.status
                };
                return self;
            }           
        }        
    });


    var TestSuiteCreateView = $.Class({  
        element:    '#test-suite-create-dialog',
                
        prototype: {
            init:   function(options) { 
                this.template = options.template || "<div><h2>Add test suite</h2></div>";                        
                this.render(); 
            },

            buildTestSuite: function() {
                var options = {
                    'title': $('#ts-title').val(), 
                    'summary': $('#ts-summary').val()
                };
                return new TestSuite(options);
            },

            render: function() { 
                $(TestSuiteCreateView.element).empty();

                var curObj = this;      // Save the current object to be used in callbacks

                var container = $( document.createElement('div') ).css({
                    'margin': '10px'
                })
                .append( $( document.createElement('p') ) );
                
                var tlabel = $( document.createElement('label') )
                .attr({
                    'for': 'ts-title', 
                    'class': 'input-label'
                })
                .append('Title')
                .append( $(document.createElement('br')) );
                var ts_title = $( document.createElement('input') ).attr({
                    'type': 'text', 
                    'id': 'ts-title', 
                    'name': 'ts-title'
                });                
                $(container).append(tlabel).append(ts_title).append( $(document.createElement('br')) );

                tlabel = $( document.createElement('label') )
                .attr({
                    'for': 'ts-summary', 
                    'class': 'input-label'
                })
                .append('Summary')
                .append( $(document.createElement('br')) );
                var ts_summary = $( document.createElement('textarea') ).attr({
                    'id': 'ts-summary', 
                    'name': 'ts-summary', 
                    'rows': 10, 
                    'cols': 50
                });
                $(container).append(tlabel).append(ts_summary).append( $(document.createElement('br')) );

                var add_btn = $( document.createElement('a') )
                .attr({
                    'id': 'add-test-suite', 
                    'href': '#', 
                    'title': 'Add test suite'
                })                                        
                .text(' Add')  
                .addClass('primary-action-link')
                .click(function() {                        
                    // Create a new test suite and store it
                    var new_test_suite = curObj.buildTestSuite();
                    var ts_id = new_test_suite.toJSON()['id'];
                    //alert(ts_id);
                    allTestSuites[ ts_id ] = new_test_suite;
                            
                    // Display the newly created TS
                    new TestSuiteDisplayView({
                        'collection': [ new_test_suite ]
                    });

                    $('html, body').animate({
                        scrollTop: $('#tc-for-'+ts_id).parent().offset().top
                        }, 'fast');
                            
                    $(this).parent().parent().remove();
                });
                        
                var cancel_link = $( document.createElement('a') )
                .attr({
                    'href': '#', 
                    'title': 'Cancel this dialog'
                })
                .append('Cancel')
                .css('padding-left', '15px')
                .click(function(e) {
                    e.preventDefault();
                    $(this).parent().parent().remove();
                });
                        
                $(container)
                .append( 
                    $(document.createElement('p'))
                    .append(add_btn).append(cancel_link)
                    );
                $(TestSuiteCreateView.element).append(container);
                $('html, body').animate({
                    scrollTop: $('#test-suite-create-dialog').offset().top
                    }, 'fast');
                
                return this;
            }
        }
    });
            
    var TestSuiteDisplayView = $.Class({
        element: '#test-suite-display-dialog',
        prototype: {
            init:   function(options) { 
                this.collection = options.collection || [];

                this.render();
            },

            render: function() {
                var curObj = this;      // Save the current object to be used in callbacks
                        
                // Display each test suite
                for (var i = 0; i < this.collection.length; i++) {
                    var container = $( document.createElement('div') ).addClass('a-test-suite');
                    var tc_container = $( document.createElement('div') );
                    var obj = this.collection[i].toJSON();

                    // Link to add test cases for a test suite
                    var add_tc_link = $( document.createElement('a') )
                    .attr({
                        'href': '#', 
                        'title': 'Add test cases to this test suite'
                    })
                    .text(' Add test cases')
                    .addClass('add-tc-link')
                    .addClass('primary-action-link');
                            
                    $(add_tc_link).click(function(e) {                                                                                        
                               
                        var spreadsheet = $('#' + 'tc-for-' + obj['id']).sheet({
                            //buildSheet: $.sheet.makeTable.json( tc_initial_contents ),
                            urlGet: get_static('isad/static_html/test_case_template.html'),
                            autoAddCells: true,
                            editable: true,
                            autoFiller: true,
                            menu: '&nbsp;'
                        });                                       
                        $('html, body').animate({
                            scrollTop: $('#' + 'tc-for-' + obj['id']).offset().top
                            }, 'fast');                          
                    });

                    var btn_execute_test_suite = $( document.createElement('a') )
                    .attr({
                        'href': '#', 
                        'title': 'Execute test cases of this test suite'
                    })                            
                    .text(' Execute test suite') 
                    .addClass('btn-ts-exec')
                    .addClass('primary-action-link');
                            
                    $(container)
                    .append( $( document.createElement('div') ).addClass('dtls-ts-id').text( obj['id'] + ': ' ).css({
                        'display': 'inline'
                    }) )
                    .append( $( document.createElement('div') ).addClass('dtls-ts-title').text( obj['title'] ).css({
                        'display': 'inline'
                    }).addClass('editable').editable() )
                    .append( 
                        $( document.createElement('div') ).addClass('dtls-ts-summary').text( obj['summary'] )
                        .addClass('editable').editable() 
                        )
                    .append( 
                        $( document.createElement('div') )
                        .css({
                            'display': 'inline'
                        })
                        .append(
                            $( document.createElement('a') )
                            //.attr({'src': removeImageURL, 'alt': 'Delete', 'title': 'Delete this test suite' })
                            .attr({
                                'href': '#', 
                                'title': 'Delete this test suite'
                            })
                            .text(' [Remove]')                                
                            .click(function(e) { 
                                e.preventDefault();
                                if ( confirm('Are you sure you want to delete this test suite?') )
                                    $(container).remove();
                            })
                            )
                        )
                    .append( $( document.createElement('div') ).addClass('dtls-ts-border') )
                    .append( 
                        $(document.createElement('p')).append( add_tc_link )
                        )
                    .append( tc_container )
                    .append(
                        $(document.createElement('p')).append( btn_execute_test_suite )
                        )
                            
                    $( TestSuiteDisplayView.element ).append( container)
                                

                    $(container).addClass('test-suite-container');
                            
                    $(tc_container)
                    .attr({
                        'id': 'tc-for-' + obj['id']
                    })
                    .addClass('ts-spreadsheet')
                    .css({
                        'margin': '5px', 
                        'margin-bottom': '10px', 
                        'padding': '5px'
                    })                                                        
                            
                    $(btn_execute_test_suite)                                                        
                    .click(function() {                     

                        if (! $(this).parent().parent().children('div.ts-spreadsheet').attr('sheetinstance') ) {
                            alert('Please add at least one test case before trying to execute this test suite!');
                            return;
                        }
                        var cur_spreadsheet = $.sheet.instance[ $(this).parent().parent().children('div.ts-spreadsheet').attr('sheetinstance') ];

                        // Get the current TS #
                        var cur_ts_id = $(this).parent().parent().children('.dtls-ts-id').text(); //css('background-color', 'red');//parent().children('.dtls-ts-id').val();
                        // Trim whitespaces, if any, and remove the last ':'                                
                        cur_ts_id = $.trim( cur_ts_id ).substring( 0, cur_ts_id.length - 2 );                                
                                
                        // Set the code
                        var code = $.trim( editAreaLoader.getValue('code-base') );
                        if ( code.length == 0 ) {
                            alert('Please write the base code against which the test suite is to be executed!');
                            return;
                        }                                
                        allTestSuites[cur_ts_id].setCode( code );                              
                                                                                          
                        var cur_spreadsheet = $.sheet.instance[ $(this).parent().parent().children('div.ts-spreadsheet').attr('sheetinstance') ];
                        var contents = cur_spreadsheet.exportSheet.json();
                        var nrows = parseInt( contents[0]['metadata']['rows'] );
                        var ncols = parseInt( contents[0]['metadata']['columns'] );
                        var data = contents[0]['data'];
                        var all_test_cases = {};
                                
                        for ( var irow = 1; irow <= nrows; irow++ ) {    // Exclude 1st row == header
                            // Stop if summary (1st col) is not present
                            var summary = $.trim( data['r' + irow]['c0']['value'] );
                            if ( summary.length == 0 )
                                break;

                                    
                            //var script = $.trim( data['r' + irow]['c1']['value'] );
                            var u_script = cur_spreadsheet.spreadsheets[0][irow][I_SCRIPT].value;
                            var expected_output = cur_spreadsheet.spreadsheets[0][irow][I_E_OUTPUT].value;
                            //var actual_output = cur_spreadsheet.spreadsheets[0][irow][I_A_OUTPUT].value;
                            var is_manual = cur_spreadsheet.spreadsheets[0][irow][I_MANUAL].value;
                                    
                            if ( is_manual.length && is_manual.toLowerCase() == 'yes' ) {
                                // This test case will be manually executed by user
                                //alert('Manual');
                                continue;
                            }      

                            /** 
                                 * This model (embedding a function definition, and then calling it)
                                 * is not working with IE. So, merging definition and call together
                                 *
                            var script_element = $(document.createElement('script'));

                            if ( $.browser.msie ) {
                                // for ie
                                script_element.type = 'text/javascript';
                                script_element.text = code;
                                //script_element.appendTo( $(TestSuiteDisplayView.element) );
                                script_element.appendTo( $( 'head' ) );
                            } else {
                                // for others
                                script_element
                                .attr('type', 'text/javascript')
                                .text(code)
                                .appendTo( $(TestSuiteDisplayView.element) );
                            }
                                 */
									
                            var output;                                                                       

                            u_script = 'return  ' + u_script;
                                                                                                            
                            try {
                                var user_func = new Function( [code, u_script].join('\n') );                     
                                output = user_func();
                            } catch (e) {
                                alert('an error occured while executing your code ' + JSON.stringify(e) );
                            }

                            cur_spreadsheet.spreadsheets[0][irow][I_A_OUTPUT].value = '' + output;   
                            // If boolean, convert to string and compare
                            if ( typeof(output) == 'boolean') {
                                output = output.toString().toLowerCase();
                            }
                            if (output == expected_output)
                                cur_spreadsheet.spreadsheets[0][irow][I_STATUS].value = 'Pass';
                            else
                                cur_spreadsheet.spreadsheets[0][irow][I_STATUS].value = 'Fail';

                            cur_spreadsheet.updateCellValue(0, irow, I_A_OUTPUT);
                            cur_spreadsheet.updateCellValue(0, irow, I_STATUS);                                    
                        }                                
                        //cur_spreadsheet.kill();
                        curObj.displayResult(cur_ts_id);
                        $('html, body').animate({
                            scrollTop: $('#result-' + cur_ts_id).offset().top
                            }, 'fast');                                
                    });                                                                                                              
                }                        
            },

            displayResult:  function(ts_id) {
                var curObj = this;
                        
                var cur_spreadsheet_index = $(TestSuiteDisplayView.element).find('#tc-for-' + ts_id).attr('sheetinstance');                        
                var cur_spreadsheet = $.sheet.instance[ cur_spreadsheet_index ];
                var contents = cur_spreadsheet.exportSheet.json();
                var nrows = parseInt( contents[0]['metadata']['rows'] );
                var ncols = parseInt( contents[0]['metadata']['columns'] );

                var npassed = 0;
                var nfailed = 0;
                for ( var irow = 1; irow <= nrows; irow++ ) {    // Exclude 1st row == header
                    // Stop if summary (1st col) is not present
                    var summary = $.trim( cur_spreadsheet.spreadsheets[0][irow][I_SUMMARY].value );
                    if ( summary.length == 0 )
                        break;

                    var status = cur_spreadsheet.spreadsheets[0][irow][I_STATUS].value;
                    if ( status.length && status.toLowerCase() == 'pass' )
                        ++ npassed;
                    else if ( status.length && status.toLowerCase() != 'no run' )
                        ++ nfailed;
                }
                //alert(npassed + ', ' + nfailed);
                        
                var result_header = $(document.createElement('h3')).text( 'Test suite # ' + ts_id + ': Execution result' );                        
                var result_body = $(document.createElement('p')).css({
                    'padding-left': '25px'
                });
						
                result_body
                .addClass('ts-exec-result-body')
                .append( $(document.createElement('span')).text( '# of test cases passed: ' + npassed ).append( $(document.createElement('br')) ) )
                .append( $(document.createElement('span')).text( '# of test cases failed: ' + nfailed ).append( $(document.createElement('br')) ) )
                .append( $(document.createElement('span')).text( 'Total # of test cases: ' + (npassed + nfailed) ).append( $(document.createElement('br')) ) )
						
                var ts_status = '';
                var status_img = ''
                if (nfailed == 0 && npassed == 0) {
                    ts_status = 'No Run';
                } else if (nfailed == 0) {
                    ts_status = 'Passed';
                } else {
                    ts_status = 'Failed';
                }

                result_body
                .append( 
                    $(document.createElement('span'))
                    .text( 'Test suite status: ')
                    .append(
                        $(document.createElement('strong'))
                        .text(ts_status)                    
                        )
                    .append( $(document.createElement('br')) ) 
                    )
                                                    
                        
                $('#' + 'result-' + ts_id).remove();

                var result_div = $(document.createElement('div'))
                .attr({
                    id: 'result-' + ts_id
                    })
                .addClass('test-exec-result')                        
                .append(result_header)
                .append(result_body)
                .appendTo( $('#tc-for-' + ts_id).parent() )

                if (nfailed == 0) {
                    $(result_div).addClass('test-exec-result-pass');
                    $(result_div).removeClass('test-exec-result-fail');
                } else {
                    $(result_div).addClass('test-exec-result-fail');
                    $(result_div).removeClass('test-exec-result-pass');
                }                                                           

                $(document.createElement('a'))
                .attr({
                    'href': '#', 
                    'title': 'Refresh execution result'
                })
                .text('Refresh result')
                .addClass('refresh-result-link')
                .click(function(e) {
                    e.preventDefault();      
                    curObj.displayResult(ts_id);                      
                })
                .appendTo( $(result_div) )
            }
        }
    });
                
            
    $('a.create-ts-link').click(function(e) {
        e.preventDefault();
        new TestSuiteCreateView({});
    });              

});  
