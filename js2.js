/*
CIS166AA: Case Project
Author: Kevin Ward
Date: 11/30/2016
Filename: js2.js
*/


//	Define any variables I will need in my page.
var thHead = document.getElementsByName("websec");
var tdCell = document.getElementsByName("navi");


//	Array for Web Security table.
var webSecType = ["The name of the exposed DOM object:", "What the DOM object exposes to us:"];
var webSec = ["Web Browser name:", navigator.appName, 
			"Web browser version:", navigator.appVersion, 
			"User Agent used:", navigator.userAgent, 
			"Platform you're running:", navigator.platform, 
			"Your Online status:", navigator.onLine, 
			"Your Screen Resolution:", screen.width + " X " + screen.height, 
			"The Color Depth of your screen:", screen.colorDepth];


function webSecTitle() {
	var i = 0;
	while (i < webSecType.length) {
		thHead[i].innerHTML = webSecType[i];
		i++;
	}
}


function browserInfo() {

	var i = 0;
	while (i < webSec.length) {
		tdCell[i].innerHTML = webSec[i];
		i++;
	}
}


//	This function will populate the web security table.
function setUpPage() {
	webSecTitle();
	browserInfo();
}


// runs setUpPage() function when page loads
if (window.addEventListener) {
	window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", setUpPage);
}



