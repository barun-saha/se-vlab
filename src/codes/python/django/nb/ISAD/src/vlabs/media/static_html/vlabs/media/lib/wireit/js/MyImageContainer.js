/*global YAHOO,WireIt */
/**
 * Container represented by an image, with a drop down list containing possible labels
 * Barun Saha, 29-Sep-2010
 * @class MyImageContainer
 * @extends WireIt.Container
 * @constructor
 * @param {Object} options
 * @param {WireIt.Layer} layer
 */
WireIt.MyImageContainer = function(options, layer) {
   WireIt.MyImageContainer.superclass.constructor.call(this, options, layer);
};

YAHOO.lang.extend(WireIt.MyImageContainer, WireIt.Container, {
	
	/** 
    * @property xtype
    * @description String representing this class for exporting as JSON
    * @default "WireIt.MyImageContainer"
    * @type String
    */
   xtype: "WireIt.MyImageContainer",
	
	/** 
    * @property resizable
    * @description boolean that makes the container resizable
    * @default false
    * @type Boolean
    */
	resizable: false,
	
	/** 
    * @property ddHandle
    * @description (only if draggable) boolean indicating we use a handle for drag'n drop
    * @default false
    * @type Boolean
    */
	ddHandle: false,
	
	/** 
    * @property className
    * @description CSS class name for the container element
    * @default ""WireIt-Container WireIt-MyImageContainer"
    * @type String
    */
	className: "WireIt-Container WireIt-MyImageContainer",
	
	/** 
    * @property image
    * @description image url
    * @default null
    * @type String
    */
	image: null,

	/** Added by Barun, 02-Oct-2010 */
	/**
	 * @property category
	 * @description The kind of object it represents 
	 * @default null
	 * @type string
	 */
	 category: null,
    /** End */
   
   /**
 	 * Add the image property as a background image for the container
    * @method render
    */
   render: function() {
      WireIt.MyImageContainer.superclass.render.call(this);
      YAHOO.util.Dom.setStyle(this.bodyEl, "background-image", "url("+this.image+")");

      // Modifications by Barun 29-Jun-2010
      // Include a place to add node number
      var titleDiv = WireIt.cn('div');
      this.labelField = new inputEx.InPlaceEdit({
          name: 'title',
          id: 'title',
          parentEl: titleDiv,
          type: 'inplaceedit',
          //value: this.title || 'Label',
          
          editorField: { 
            type: 'select', 
            name: 'Name',           
            choices: this.choices || ['Choice #1', 'Choice #2']
            //choices: ['Choice #1', 'Choice #2']
          }
          
       });
       this.el.appendChild(titleDiv);
	   //alert(this.el.nodeName + "," + titleDiv.nodeName + ",");

		var all_childs = "";
	   for (cln in titleDiv.childNodes) {
		   all_childs += cln + "\n";
	   }
	   //alert(all_childs);

	   var all_attrs = "";
	   for (attr in titleDiv.attributes) {
		   all_attrs += attr + "\n";
	   }
	   // End
   }
});
