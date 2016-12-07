/*
CIS166AA: Case Project
Author: Kevin Ward
Date: 12/3/2016
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


//	Arrays for the if/else/switch/while statement.
var whoType = ["The Classic Doctor", "The Rebooted Doctor"];
var docWhoC = ["William Hartnell", "Patrick Troughton", "Jon Pertwee", "Tom Baker", 
				"Peter Davison", "Colin Baker", "Sylvester McCoy", "Paul McGann"];
var docWhoR = ["Christopher Eccleston", "David Tennant", "Matt Smith", "John Hurt", "Peter Capaldi", 
				"Doctor 13", "Doctor 14", "Doctor 15"];
var whoYrsC = ["1963-66", "1966-69", "1970-74", "1974-81", "1982-84", "1984-86", 
				"1987-89", "1996"]
var whoYrsR = ["2005", "2005-10", "2010-13", "2013", "2014-present", 
				"Wibbly Wobbly", "Timey Wimey", "Stuff, it's complicated."];
/*var docType = ["classic", "classic", "classic", "classic", "classic", "classic", 
				"classic", "classic", "reboot", "reboot", "reboot", "reboot", "reboot",
				"future", "future", "future"];*/

var thHead1 = document.getElementsByName("type");
var tdCell1 = document.getElementsByName("classic");
var tdCell2 = document.getElementsByName("reboot");


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


//	This function will populate the Doctor Who page and reset the Power Level form.
function setUpPage() {
	addWhoTitle();
	addDocYrsC();
	addDocYrsR();
}


// runs setUpPage() function when page loads
if (window.addEventListener) {
	window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", setUpPage);
}



