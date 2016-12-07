/*
CIS166AA: Case Project
Author: Kevin Ward
Date: 11/30/2016
Filename: jsdbzpl.js
*/


//	Define any variables I will need in my page.

//	Variables for my DragonBall Z Power Level function.
var totalPwrLvl = 0;
var pwrLvlCost = 0;
//var age = document.getElementById("age");
var over9k = false;
var alien = false;

//	Global vars tracking status of each form sections.
var ageComp = true;
var over9kComp = true;
var alienComp = true;
//	Global var referencing sidebar p element.
var pwrlvlSide = document.getElementById("powerlvl");
//	Global var referencing fieldset elements.
var ageFieldset = document.getElementsByTagName("fieldset")[0];
var over9kFieldset = document.getElementsByTagName("fieldset")[1];
var alienFieldset = document.getElementsByTagName("fieldset")[2];
//	Global vars referencing text input elements.
var ageBox = document.getElementById("age");


//	Calculates your DragonBall Z Power Level.
function calcPwrLvl() {
	var plage = ageBox;			//document.getElementById("age");
//window.alert(plage.value + ageBox.value + ageFieldset.value + age.value);
	totalPwrLvl -= pwrLvlCost;
	pwrLvlCost = plage * 20; //	For some reason this line is causing a NaN error or just doesn't change the pwrLvlCost.
	totalPwrLvl += pwrLvlCost;
	pwrlvlSide.innerHTML = "#" + totalPwrLvl;
}


//	Adds/subtracts over 9000 Power Levels.
function toggle9K() {
	(document.getElementById("over9k").checked === false) ? totalPwrLvl -= 9000 : totalPwrLvl += 9000;
	pwrlvlSide.innerHTML = "#" + totalPwrLvl;
}


//	Adds/subtracts if they are an alien or not.
function toggleAlien() {
	(document.getElementById("alien").checked === false) ? totalPwrLvl -= 250 : totalPwrLvl += 250;
	pwrlvlSide.innerHTML = "#" + totalPwrLvl;
}


//	Creates event listeners for my Power Level form.
function createEventListeners() {
	if (document.addEventListener) {
		ageFieldset.addEventListener("change", calcPwrLvl, false);
		over9kFieldset.addEventListener("change", toggle9K, false);
		alienFieldset.addEventListener("change", toggleAlien, false);
	} else if (document.attachEvent) {
		ageFieldset.attachEvent("onchange", calcPwrLvl, false);
		over9kFieldset.attachEvent("onchange", toggle9K, false);
		alienFieldset.attachEvent("onchange", toggleAlien, false);
	}
}


//	This will set all the Power Level form field values to defaults.
function resetLvl() {
	ageFieldset.value = ageBox;
	over9kFieldset.checked = over9k;
	alienFieldset.checked = alien;
	calcPwrLvl();
	createEventListeners();
}


//	The function should validate the age in the Power Level form from getting text in the number spots.
function valAgeForm() {
	var valAge = ageBox;
	var validity = true;
	var messageText = "";
	
	try {
		if (!(valAge.value <= 18)) {
			throw "Please enter a valid age greater than 18.";
		}//	end if
	}// end try
	
	catch(ageError) {
		window.alert(ageError);
		return false;
	}// end catch
	
	finally {
		ageValid = true;
	}// end finally
	
	return true;
}// end function


//	This function will populate the Doctor Who page and reset the Power Level form.
function setUpPage() {
	createEventListeners();
	valAgeForm();
	resetLvl();
}


// runs setUpPage() function when page loads
if (window.addEventListener) {
	window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", setUpPage);
}



