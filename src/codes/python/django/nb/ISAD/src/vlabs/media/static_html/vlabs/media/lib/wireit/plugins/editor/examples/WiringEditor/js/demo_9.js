//WireIt.Terminal.prototype.wireConfig = {
//                    label: 'Ouf !!',
//                    labelEditor: {type: 'string', value: "Testst"}
//            };
//            WireIt.Terminal.prototype.editingWireConfig = WireIt.Terminal.prototype.wireConfig;
            
var demoLanguage = {
	
	// Set a unique name for the language
	languageName: "meltingpotDemo",

	// inputEx fields for pipes properties
	propertiesFields: [
		// default fields (the "name" field is required by the WiringEditor):
		{"type": "string", inputParams: {"name": "name", label: "Title", typeInvite: "Enter a title" } },
		//{"type": "text", inputParams: {"name": "description", label: "Description", cols: 30} },
		
		// Additional fields
//		{"type": "boolean", inputParams: {"name": "isTest", value: true, label: "Test"}},
//		{"type": "select", inputParams: {"name": "category", label: "Category", selectValues: ["Demo", "Test", "Other"]} }
	],
	
	// List of node types definition
	modules: [	
            {
                "name":     "Node",
                "container": {
                    "xtype":    "WireIt.ImageContainer",
                    "className": "WireIt-Container WireIt-ImageContainer Bubble",
                    "icon":     "/isad/v_media/lib/wireit/plugins/editor/assets/color_wheel.png",
                    "image":    "/isad/v_media/lib/wireit/plugins/editor/assets/shapes/bubble.png",
                    "title":    "Bubble",
                    "terminals": [
                        { "direction": [-1, -1], "offsetPosition": { "left": 10, "top": -10 }, "name": "top" },
                        { "direction": [1, -1], "offsetPosition": { "left": 25, "top": 10 }, "name": "right" },
                        { "direction": [-1, 1], "offsetPosition": { "left": 10, "top": 25 }, "name": "bottom" },
                        { "direction": [1, 1], "offsetPosition": { "left": -10, "top": 10 }, "name": "left" }
                    ],
                    "label": "1",
                    "category": "Node"
                }
            },            
        ]
};
