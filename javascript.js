/*
CIS166AA: Case Project
Author: Kevin Ward
Date: 11/30/2016
Filename: javascript.js
*/


//	Define any variables I will need in my page.
//	Legend of Zelda copyright Nintendo.
var crest = "images/hyrulecrest.png";
var rinku = "images/link.jpg";
var zelda = "images/zelda.jpg";
var ganon = "images/ganon.jpg";
var armor = "images/BotWArmor.jpg";
var err404 = "images/error404.jpg";
//	Star Wars characters copyright Disney.
var sw = "images/sw.jpg";
var luke = "images/luke.jpg";
var leia = "images/leia.jpg";
var vader = "images/vader.jpg";
//	Video Game toons copyright their respective owners.
var xal1 = "images/xal1.png";
var xal2 = "images/xal2.jpg";
var xal3 = "images/xal3.jpg";

//	Variables for my DragonBall Z Power Level function.
var totalPwrLvl = 0;
var pwrLvlCost = 0;
var age = document.getElementById("age");
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


//	Arrays for the if/else/switch/while statement.
var whoType = ["The Classic Doctor", "-", "The Rebooted Doctor"];
var docWhoC = ["William Hartnell", "Patrick Troughton", "Jon Pertwee", "Tom Baker", 
				"Peter Davison", "Colin Baker", "Sylvester McCoy", "Paul McGann"];
var docWhoR = ["Christopher Eccleston", "David Tennant", "Matt Smith", "John Hurt", "Peter Capaldi", 
				"Doctor 13", "Doctor 14", "Doctor 15"];
var whoYrsC = ["1963-66", "1966-69", "1970-74", "1974-81", "1982-84", "1984-86", 
				"1987-89", "1996"]
var whoYrsR = ["2005", "2005-10", "2010-13", "2013", "2014-present", 
				"Wibbly Wobbly", "Timey Wimey", "Stuff, it's complicated."];
var docType = ["classic", "classic", "classic", "classic", "classic", "classic", 
				"classic", "classic", "reboot", "reboot", "reboot", "reboot", "reboot",
				"future", "future", "future"];
var thHead1 = document.getElementsByName("type");
var tdCell1 = document.getElementsByName("classic");
var tdCell2 = document.getElementsByName("reboot");
var thHead2 = document.getElementsByName("websec");
var tdCell3 = document.getElementsByName("navi");


//	Array for Web Security table.
var webSecType = ["The name of the exposed DOM object:", "What the DOM object exposes to us:"];
var webSec = ["Web Browser name:", navigator.appName, 
			"Web browser version:", navigator.appVersion, 
			"User Agent used:", navigator.userAgent, 
			"Platform you're running:", navigator.platform, 
			"Your Online status:", navigator.onLine, 
			"Your Screen Resolution:", screen.width + " X " + screen.height, 
			"The Color Depth of your screen:", screen.colorDepth];




//	Calculates your DragonBall Z Power Level.
function calcPwrLvl() {
	var plage = ageBox;
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
	ageFieldset.value = age;
	over9kFieldset.checked = over9k;
	alienFieldset.checked = alien;
	calcPwrLvl();
	createEventListeners();
}


//	Function to place whoType values in header row cells. Works!
function addWhoTitle() {
	var i = 0;
	while (i < whoType.length) {
		thHead1[i].innerHTML = whoType[i];
		i++;
	}
}


//	This switch statement should add the Doctor Who names and dates.
function addDocYrsC() {
	var i = 0;
	while (i < docWhoC.length) {
		tdCell1[i].innerHTML = "<p>" + docWhoC[i] + "<br>" + whoYrsC[i] + "</p>";
		i++;
	}
}// end function


function addDocYrsR() {
	var i = 0;
	while (i < docWhoR.length) {
		tdCell2[i].innerHTML = "<p>" + docWhoR[i] + "<br>" + whoYrsR[i] + "</p>";
		i++;
	}	
} // end function


//	The function should validate the age in the Power Level form from getting text in the number spots.
function valAgeForm() {
	var valAge = age;
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


function webSecTitle() {
	var i = 0;
	while (i < webSecType.length) {
		thHead2[i].innerHTML = webSecType[i];
		i++;
	}
}


function browserInfo() {
	var i = 0;
	while (i < webSec.length) {
		tdCell3[i].innerHTML = webSec[i];
		i++;
	}
}


//	This function will populate the Doctor Who page and reset the Power Level form.
function setUpPage() {
	addWhoTitle();
	addDocYrsC();
	addDocYrsR();
//	createEventListeners();
//	valAgeForm();
//	resetLvl();
//	webSecTitle();
//	browserInfo();
}


// runs setUpPage() function when page loads
if (window.addEventListener) {
	window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", setUpPage);
}



