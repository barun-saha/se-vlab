// For labeling wires
WireIt.Terminal.prototype.wireConfig = {
    label: 'Label',
    //labelEditor: {type: 'string', value: "Testst"},
    labelEditor: {type: 'select', name: "label", choices: [' ', '&lt;&lt;extend&gt;&gt;', '&lt;&lt;include&gt;&gt;']},
    xtype: "WireIt.Wire"
};
WireIt.Terminal.prototype.editingWireConfig = WireIt.Terminal.prototype.wireConfig;

var demoLanguage = {
	
	// Set a unique name for the language
	languageName: "meltingpotDemo",

	// inputEx fields for pipes properties
	propertiesFields: [
            // default fields (the "name" field is required by the WiringEditor):
            {"type": "string", inputParams: {"name": "name", label: "Title", typeInvite: "Enter a title" } },
            {"type": "text", inputParams: {"name": "description", label: "Description", cols: 30} },

            // Additional fields
            {"type": "boolean", inputParams: {"name": "isTest", value: true, label: "Test"}},
            {"type": "select", inputParams: {"name": "category", label: "Category", selectValues: ["Demo", "Test", "Other"]} }
	],
	
	// List of node types definition
	modules: [	            
            {
                "name":     "Actor",
                "container": {
                    "xtype":    "WireIt.MyImageContainer",
                    "className": "WireIt-Container WireIt-MyImageContainer StickFigure",                    
                    "icon":     "/isad/v_media/lib/wireit/plugins/editor/assets/color_wheel.png",
                    "image":    "/isad/v_media/lib/wireit/plugins/editor/assets/shapes/use-case-actor-stick.png",
                    "title":    "StickFigure",
                    "terminals": [
                        { "direction": [-1, -1], "offsetPosition": { "left": 12, "top": -10 }, "name": "top" },
                        { "direction": [1, -1], "offsetPosition": { "left": 38, "top": 14 }, "name": "right" },
                        { "direction": [1, 1], "offsetPosition": { "left": -10, "top": 14 }, "name": "left" }
                    ],
                    "label": "Role",
                    "choices": ['Administrator', 'Cashier', 'Customer', 'Librarian', 'Member', 'Travel Agent'],
                    "category": "Actor"
                }
            },
            {
                "name":     "Use case",
                "container": {
                    "xtype":    "WireIt.MyImageContainer",
                    "className": "WireIt-Container WireIt-MyImageContainer UseCase",                    
                    "icon":     "/isad/v_media/lib/wireit/plugins/editor/assets/color_wheel.png",
                    "image":    "/isad/v_media/lib/wireit/plugins/editor/assets/shapes/use-case.png",
                    "title":    "UseCase",
                    "terminals": [
                        { "direction": [-1, -1], "offsetPosition": { "left": 50, "top": -7 }, "name": "top" },
                        { "direction": [1, 1], "offsetPosition": { "left": -8, "top": 16 }, "name": "left" },
                        { "direction": [1, -1], "offsetPosition": { "left": 111, "top": 16 }, "name": "right" },
                        { "direction": [-1, 1], "offsetPosition": { "left": 50, "top": 50 }, "name": "bottom" },
                    ],
                    "label": "Usecase",
                    "choices": [
                        'Book flight',
                        'Book hotel',
                        'Cancel booking',
                        'Cancel flight',
                        'Cancel hotel',
                        'Issue book',   
                        'Make booking',                     
                        'Get address',
                        'Get journey details',
                        'Get refund',
                        'Make payment',
                        'Pay by card',
                        'Pay by cash',
                        'Return book',
                        'Verify credentials'
                    ],
                    "category": "UseCase"
                }
            }
        ]
};