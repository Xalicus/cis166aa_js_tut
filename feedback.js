/*
CIS166AA: Case Project
Author: Kevin Ward
Date: 11/30/2016
Filename: feedback.js
*/

"use strict";	// interpret document contents in JavaScript strict mode


/*	global variables */
var formValidity = true;
var err404 = "images/error404.jpg";
var profile = {};
var lodging = [];
var objectString;
var arrayString;


/*	remove default values and formatting from state and delivery date selection lists */
function removeSelectDefaults() {
	var emptyBoxes = document.getElementsByTagName("select");
	
	for (var i = 0; i < emptyBoxes.length; i++) {
		emptyBoxes[i].selectedIndex = -1;
	}
}


// validate entered username
function validateUname() {
	var unInput = document.getElementById("unames");
	var errorDiv = document.querySelector("#unames .errorMessage");
	try {
		if (/.{4,}/.test(unInput.value) === false) {
		   throw "Username must be at least 4 characters long";
		} else if (/\W/.test(unInput.value) === true) {
			throw "Username must contains only letters and numbers";
		}

		// remove any username error styling and message
		unInput.style.background = "";
		errorDiv.style.display = "none";
		errorDiv.innerHTML = "";
		// copy valid username value to profile object
		profile.username = unInput.value;
		// copy profile.username value to profile section
		document.getElementById("profileUname").innerHTML = profile.username;
		// make profile section and username section visible
		document.getElementById("profile").style.display = "block";
		document.getElementById("unameSection").style.display = "block";
	}
	catch(msg) {
		// display error message
		errorDiv.style.display = "block";
		errorDiv.innerHTML = msg;
		// change input style
		unInput.style.background = "rgb(255,233,233)";
		formValidity = false;
	}
}


// validate entered email
function validateEmail() {
	var emailInput = document.getElementById("emailbox");
	var errorDiv = document.querySelector("#emails .errorMessage");
	var emailFormat = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;
	try {
		
		if (emailFormat.test(emailInput.value) === false) {
			throw "Please provide a valid email address";
		}

		// remove any email error styling and message
		emailInput.style.background = "";
		errorDiv.innerHTML = "";
		errorDiv.style.display = "none";
		// convert email address to lowercase
		emailInput.value = emailInput.value.toLowerCase();

		// copy valid email value to profile object
		profile.email = emailInput.value;
		// copy profile.email value to profile section
		document.getElementById("profileEmail").innerHTML = profile.email;
		// make profile section and email section visible
		document.getElementById("profile").style.display = "block";
		document.getElementById("emailSection").style.display = "block";
	}
	catch(msg) {
		// display error message
		errorDiv.innerHTML = msg;
		errorDiv.style.display = "block";
		// change input style
		emailInput.style.background = "rgb(255,233,233)";
		formValidity = false;
	}
}


/* validate entered cell phone number */
function validateCell() {
	var phoneFormat = /^(1 )?(\([0-9]{3}\) )?([1-9]{3})(\-[1-9]{4})$/;
	var cellInput = document.getElementById("cell");
	var errorDiv = document.querySelector("#cells .errorMessage");
//	var errorDiv = document.getElementById("errorMessage");
	try {
//	   if (unInput.value.length < 4) {
		if (phoneFormat.test(cellInput.value) === false) {
		   throw "Cell Phone Number must be at least 10 digits";
	   }

		// remove any cell phone error styling and message
		cellInput.style.background = "";
		errorDiv.style.display = "none";
		errorDiv.innerHTML = "";
		// copy valid cell value to profile object
		profile.cell = cellInput.value;
		// copy profile.username value to profile section
		document.getElementById("profileCell").innerHTML = profile.cell;
		// make profile section and username section visible
		document.getElementById("profile").style.display = "block";
		document.getElementById("cellSection").style.display = "block";
	}
	catch(msg) {
		// display error message
		errorDiv.style.display = "block";
		errorDiv.innerHTML = msg;
		// change input style
		cellInput.style.background = "rgb(255,233,233)";
		formValidity = false;
	}
}


/*	validate Doctor Who fieldset */
function validateDoctor() {
	var docInput = document.querySelectorAll("#doctorWho select");
	var errorDiv = document.querySelector("#doctorWho .errorMessage");
	var fieldsetValidity = true;
	var elementCount = docInput.length;
	var currentElement;
	
	try {
		for (var i = 0; i < elementCount; i++) {
			currentElement = docInput[i];
			if (currentElement.selectedIndex === -1) {
				currentElement.style.border = "2px solid red";
				fieldsetValidity = false;
			} else {
				currentElement.style.border = "";
			}
		}
		
		// remove any doctor who error styling and message
		docInput.style.background = "";
		errorDiv.style.display = "none";
		errorDiv.innerHTML = "";
		// copy valid doctor who value to profile object
		profile.doctor = docInput.value;
		// copy profile.doctor value to profile section
		document.getElementById("profileDoctor").innerHTML = profile.doctor;
		// make profile section and doctor who section visible
		document.getElementById("profile").style.display = "block";
		document.getElementById("doctorSection").style.display = "block";
		
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
		
		// remove any age error styling and message
		ageNumElement.style.background = "";
		errorDiv.style.display = "none";
		errorDiv.innerHTML = "";
		// copy valid age value to profile object
		profile.age = ageNumElement.value;
		// copy profile.age value to profile section
		document.getElementById("profileAge").innerHTML = profile.age;
		// make profile section and age section visible
		document.getElementById("profile").style.display = "block";
		document.getElementById("ageSection").style.display = "block";
		
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


/*	validate form */
function validateForm(evt) {
	if (evt.preventDefault) {
		evt.preventDefault(); // prevent form from submitting
	} else {
		evt.returnValue = false; // prevent form from submitting in IE8
	}
	formValidity = true; // reset value for revalidation
	validateUname();
	validateEmail();
	validateCell();
	validateAge();
	validateDoctor();
	
	if (formValidity === true) {
		document.getElementById("errorText").innerHTML = "";
		document.getElementById("errorText").style.display = "none";
		document.getElementById("errorpic").style.display = "none";
		document.getElementsByTagName("form")[0].submit();
	} else {
		document.getElementById("errorText").innerHTML = "Please fix all errors on the page to continue!";
		document.getElementById("errorText").style.display = "block";
		document.getElementById("errorPic").src = err404;
		scroll(0,0);
	}
}


//convert form input to strings for submission
function convertToString() {
	// convert lodging array to string
//	arrayString = lodging.toString();
	// convert profile object to string
	objectString = JSON.stringify(profile);
}


/*	create event listeners */
function createEventListeners() {
//	var nameIP = document.getElementById("names");
	var unIP = document.getElementById("unames");
	var emailIP = document.getElementById("emails");
	var cellIP = document.getElementById("cells");
//	var genderIP = document.getElementById("genders");
	var ageIP = document.getElementById("ages");
	var docIP = document.getElementById("doctorWho");
	var form = document.getElementsByTagName("form")[0];
	var button = document.getElementById("submitBtn");
	
	if (unIP.addEventListener) {
//		nameIP.addEventListener("change", validateName, false);
		unIP.addEventListener("change", validateUname, false);
		emailIP.addEventListener("change", validateEmail, false);
		cellIP.addEventListener("change", validateCell, false);
//		genderIP.addEventListener("change", validateGender, false);
		ageIP.addEventListener("change", validateAge, false);
		docIP.addEventListener("change", validateDoctor, false);
		form.addEventListener("submit", validateForm, false);
	} else if (unIP.attachEvent) {
//		nameIP.attachEvent("onchange", validateName);
		unIP.attachEvent("onchange", validateUname);
		emailIP.attachEvent("onchange", validateEmail);
		cellIP.attachEvent("onchange", validateCell);
//		genderIP.attachEvent("onchange", validateGender);
		ageIP.attachEvent("onchange", validateAge);
		docIP.attachEvent("onchange", validateDoctor);
		form.attachEvent("onsubmit", validateForm);
	}
   
/*	var lodgings = document.getElementsByName("lodgings");
	if (lodgings[0].addEventListener) {
		for (var i = 0; i < lodgings.length; i++) {
			lodgings[i].addEventListener("change", registerLodging, false);
		}
	} else if (lodgings[0].attachEvent) {
		for (var i = 0; i < lodgings.length; i++) {
			lodgings[i].attachEvent("onchange", registerLodging);
		}
	}*/
	
	if (form.addEventListener) {
		form.addEventListener("click", validateForm, false);
	} else if (form.attachEvent) {
		form.attachEvent("onclick", validateForm);
	}

	if (button.addEventListener) {
		button.addEventListener("click", convertToString, false);
	} else if (button.attachEvent) {
		button.attachEvent("onclick", convertToString);
	}
}


/*	run initial form configuration functions */
function setUpPage() {
	createEventListeners();
//	removeSelectDefaults();
//	generatePlaceholder();
}


/*	run setup function when page finishes loading */

if (window.addEventListener) {
	window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", setUpPage);
}
