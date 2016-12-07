/*
CIS166AA: Case Project
Author: Kevin Ward
Date: 11/30/2016
Filename: form.js
*/

"use strict";	// interpret document contents in JavaScript strict mode


/*	global variables */
var formValidity = true;
var err404 = "images/error404.jpg";


/*	validate form */
function validateForm(evt) {
/*	if (evt.preventDefault) {
		evt.preventDefault(); // prevent form from submitting
	} else {
		evt.returnValue = false; // prevent form from submitting in IE8
	}*/
	evt.preventDefault();
	
	formValidity = true; // reset value for revalidation
	var inputElements = document.querySelectorAll("#datamine input");
	var elementCount = inputElements.length;
	
	try {
		for (var i = 0; i < elementCount; i++) {
			if (inputElements[i].value === "") {
				inputElements[i].style.background = "rgb(255,233,233)";
				formValidity = false;
			} else {
				inputElements[i].style.background = "";
			}
		}
		
		if (formValidity === false) {
			throw "You better Tech yourself, before you reck yourself!";
		}
		$("#errorText").hide();
		$("#errorText").html("");
		$("#errorPic").hide();
	}
	catch(msg) {
		$("#errorText").show();
		$("#errorText").html(msg);
//		$("#errorPic").show(err404); // doesn't work this way.
		document.getElementById("errorPic").src = err404;
	}
	
	if (formValidity === true) {
		$("form").submit();
	}
	
	validateName("names");
	validateDoctor();
	validateMessage();
	validateAge();
	
/*	if (formValidity === true) {
		document.getElementById("errorText").innerHTML = "";
		document.getElementById("errorText").style.display = "none";
		document.getElementsByTagName("form")[0].submit();
	} else {
		document.getElementById("errorText").innerHTML = "You better Tech yourself, before you reck yourself!";
		document.getElementById("errorText").style.display = "block";
		document.getElementById("errorPic").src = err404;
		scroll(0,0);
	}*/
	
}


/*	remove default values and formatting from state and delivery date selection lists */
function removeSelectDefaults() {
	var emptyBoxes = document.getElementsByTagName("select");
	
	for (var i = 0; i < emptyBoxes.length; i++) {
		emptyBoxes[i].selectedIndex = -1;
	}
}


/*	remove fallback placeholder text */
function zeroPlaceholder() {
	var messageBox = document.getElementById("customText");
	messageBox.style.color = "black";
	
	if (messageBox.value === messageBox.placeholder) {
		messageBox.value = "";
	}
}


/*	restore placeholder text if box contains no user entry */
function checkPlaceholder() {
	var messageBox = document.getElementById("customText");
	
	if (messageBox.value === "") {
		messageBox.style.color = "rgb(178,184,183)";
		messageBox.value = messageBox.placeholder;
	}
}


/*	adds fallback placeholder text */

function generatePlaceholder() {
	if (!Modernizr.input.placeholder) {
		var messageBox = document.getElementById("customText");
		messageBox.value = messageBox.placeholder;
		messageBox.style.color = "rgb(178,184,183)";
		
		if (messageBox.addEventListener) {
			messageBox.addEventListener("focus", zeroPlaceholder, false);
			messageBox.addEventListener("blur", checkPlaceholder, false);
		} else if (messageBox.attachEvent) {
			messageBox.attachEvent("onfocus", zeroPlaceholder);
			messageBox.attachEvent("onblur", checkPlaceholder);
		}
	}
}


/*	automatically check Custom message check box if user makes entry in customText box */
function autocheckCustom() {
	var messageBox = document.getElementById("customText");
	
	if (messageBox.value !== "" && messageBox.value !== messageBox.placeholder) {
		// if user entry is text, check Custom check box
		document.getElementById("customText").checked = "checked";
	}
}


/*	validate names fieldsets */
function validateName(fieldsetId) {
	var inputElements = document.querySelectorAll("#" + fieldsetId + " input");
	var errorDiv = document.querySelectorAll("#" + fieldsetId + " .errorMessage")[0];
	var fieldsetValidity = true;
	var elementCount = inputElements.length;
	var currentElement;
	
	try {
		for (var i = 0; i < elementCount; i++) {
			// validate all input elements in fieldset
			currentElement = inputElements[i];
			if (currentElement.value === "") {
				currentElement.style.background = "rgb(255,233,233)";
				currentElement.style.border = "2px solid red";
				throw "Name fields must contains only letters";
				fieldsetValidity = false;
			} else if (/[a-zA-Z]/.test(currentElement.value) === false) {
				currentElement.style.background = "white";
			}
		}

		if (fieldsetValidity === false) {
			// throw appropriate message based on current fieldset
			if (fieldsetId === "names") {
				throw "Please type in your full name.";
			}
		} else {
			errorDiv.style.display = "none";
			errorDiv.innerHTML = "";
		}
	} catch (msg) {
		errorDiv.style.display = "block";
		errorDiv.innerHTML = msg;
		formValidity = false;
	}
}


/*	validate Doctor Who fieldset */
function validateDoctor() {
	var selectElements = document.querySelectorAll("#doctorWho select");
	var errorDiv = document.querySelector("#doctorWho .errorMessage");
	var fieldsetValidity = true;
	var elementCount = selectElements.length;
	var currentElement;
	
	try {
		for (var i = 0; i < elementCount; i++) {
			currentElement = selectElements[i];
			if (currentElement.selectedIndex === -1) {
				currentElement.style.border = "2px solid red";
				fieldsetValidity = false;
			} else {
				currentElement.style.border = "";
			}
		}
		
		if (fieldsetValidity === false) {
			throw "Please specify a Doctor you like.";
		} else {
			errorDiv.style.display = "none";
			errorDiv.innerHTML = "";
		}
	} catch (msg) {
		errorDiv.style.display = "block";
		errorDiv.innerHTML = msg;
		formValidity = false;
	}
}


/*	validate message fieldset */
function validateMessage() {
	var errorDiv = document.querySelector("#comments .errorMessage");
	var msgBox = document.getElementById("comment");
	
	try {
		if (document.getElementById("customText".checked) && ((msgBox.value === "") || (msgBox.value === msgBox.placeholder))) {
			// customText checked but comment box empty
			throw "Please enter your comment text.";
		} else {
			errorDiv.style.display = "none";
			msgBox.style.background = "white";
			msgBox.style.border = "2px solid red";
		}
	} catch (msg) {
		errorDiv.style.display = "block";
		errorDiv.innerHTML = msg;
		msgBox.style.background = "rgb(255,233,233)";
		msgBox.style.border = "2px solid red";
		formValidity = false;
	}
}


/*	validate age field for older browsers */
function validateAge(){
	var ageNotNum;
	var ageNumElement = document.getElementById("age");
//	var ageNumErrMsg = document.getElementById("ageErrorMessage");
	var errorDiv = document.querySelector("#ages .errorMessage");
	
	try {
		if (isNaN(ageNumElement.value) || ageNumElement.value === "") {
			ageNotNum = true;
		} else { // ageNum value is a number
			ageNumElement.style.background = "";
			errorDiv.style.display = "none";
		}
				
		if (ageNotNum) {
			throw "Must contain numbers only.";
		}
	} catch (msg) {
		if (ageNotNum) {
			ageNumElement.style.background = "rgb(255,233,233)";
			ageNumElement.style.border = "2px solid red";
//			ageNumErrMsg.style.display = "block";
			errorDiv.innerHTML = "The age box " + msg;
		}
		formValidity = false;
	}
}


/*	create event listeners */
function createEventListeners() {
	var messageBox = document.getElementById("customText");
	
	if (messageBox.addEventListener) {
		messageBox.addEventListener("blur", autocheckCustom, false);
	} else if (messageBox.attachEvent) {
		messageBox.attachEvent("onblur", autocheckCustom);
	}
	
	var form = document.getElementsByTagName("form")[0];
	
	if (form.addEventListener) {
		form.addEventListener("submit", validateForm, false);
	} else if (form.attachEvent) {
		form.attachEvent("onsubmit", validateForm);
	}
}


/*	run initial form configuration functions */
function setUpPage() {
	removeSelectDefaults();
	createEventListeners();
	generatePlaceholder();
}


/*	run setup function when page finishes loading */

if (window.addEventListener) {
	window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", setUpPage);
}