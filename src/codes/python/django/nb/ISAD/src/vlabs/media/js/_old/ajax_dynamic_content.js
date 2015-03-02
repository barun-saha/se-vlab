var ajaxObjects = new Array();
var jsCache = new Array();
var cacheEnabled = true;

function ajaxLoadContent(divId, pathToFile) {
	if (cacheEnabled && jsCache[pathToFile]) {
		document.getElementById(divId).innerHTML = jsCache[pathToFile];
		return;
	}
	
	// If the file is not in cache
	var ajaxIndex = ajaxObjects.length;
	document.getElementById(divId).innerHTML = "Loading ...";
	ajaxObjects[ajaxIndex] = new sack();
	ajaxObjects[ajaxIndex].requestFile = pathToFile;
	
	ajaxObjects[ajaxIndex].onCompletion = function() {
		ajaxShowContent(divId, ajaxIndex, pathToFile);
	};
	
	ajaxObjects[ajaxIndex].runAJAX();
}

function ajaxShowContent(divId, ajaxIndex, pathToFile) {
	document.getElementById(divId).innerHTML = ajaxObjects[ajaxIndex].response;
	if (cacheEnabled) 
		jsCache[pathToFile] = ajaxObjects[ajaxIndex].response;
		
	// Remove the AJAX object from memory
	ajaxObjects[ajaxIndex] = false;
}