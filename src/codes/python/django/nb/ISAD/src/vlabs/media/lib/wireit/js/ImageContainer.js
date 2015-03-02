/*global YAHOO,WireIt */
/**
 * Container represented by an image
 * @class ImageContainer
 * @extends WireIt.Container
 * @constructor
 * @param {Object} options
 * @param {WireIt.Layer} layer
 */
WireIt.ImageContainer = function(options, layer) {
   WireIt.ImageContainer.superclass.constructor.call(this, options, layer);
};

YAHOO.lang.extend(WireIt.ImageContainer, WireIt.Container, {
	
	/** 
    * @property xtype
    * @description String representing this class for exporting as JSON
    * @default "WireIt.ImageContainer"
    * @type String
    */
   xtype: "WireIt.ImageContainer",
	
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
    * @default ""WireIt-Container WireIt-ImageContainer"
    * @type String
    */
	className: "WireIt-Container WireIt-ImageContainer",
	
	/** 
    * @property image
    * @description image url
    * @default null
    * @type String
    */
	image: null,
   
   /**
 	 * Add the image property as a background image for the container
    * @method render
    */
   render: function() {
      WireIt.ImageContainer.superclass.render.call(this);
      YAHOO.util.Dom.setStyle(this.bodyEl, "background-image", "url("+this.image+")");

      // Modifications by Barun 29-Jun-2010
      // Include a place to add node number
      var titleDiv = WireIt.cn('div');
      this.labelField = new inputEx.InPlaceEdit({
		  name: 'title',
		  id: 'title',
	      parentEl: titleDiv,
          value: this.title || 'Label',
          editorField: { type: 'string', inputParams: {} }
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
