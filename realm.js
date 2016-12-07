/*
CIS166AA: Case Project
Author: Kevin Ward
Date: 11/30/2016
Filename: realm.js
*/

"use strict";

//	Define any variables I will need in my page.
//	global variables
var selRealm = "Thrall";
var realmReport;
var httpRequest = false;

//var rType;// = type;
//var rName;// = name;
//var rStat;// = status;
//var rPop;// = population;
//var rConRealm;// = connected_realms;
var type;
var name;
var status;
var population;
var connected_realms;

function getRequestObj() {
	try {
		httpRequest = new XMLHttpRequest();
	}
	
	catch (requestError) {
		document.querySelector("p.error").innerHTML = "Realms are not supported by your browser.";
		document.querySelector("p.error").style.display = "block";
		return false;
	}
	return httpRequest;
}

function getRealm(evt) {
	var rType = type;
	var rName = name;
	var rStat = status;
	var rPop = population;
	var rConRealm = connected_realms;
	
	if (evt.type !== "load") {
		if (evt.target) {
			selRealm = evt.target.innerHTML;
		} else if (evt.srcElement) {
			selRealm = evt.srcElement.innerHTML;
		}
	}
	
	if (selRealm === "Thrall") {
		rType = "pve";
		rName = "Thrall"
		rStat = "true"
		rPop = "high";
		rConRealm = "thrall"
	} else if (selRealm === "Vek'Nilash") {
		rType = "pve";
		rName = "Vek'Nilash"
		rStat = "true"
		rPop = "medium";
		rConRealm = "nesingwary, nazgrel, veknilash"
	} else if (selRealm === "Mok'Nathal") {
		rType = "pve";
		rName = "Mok'Nathal"
		rStat = "true"
		rPop = "medium";
		rConRealm = "silvermoon, moknathal"
	} /*else if (selRealm === "Xalicus") {
		cName = "stuff"
	}*/
	
//	var url = "https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=m3fpsc5749akmzbtycd4w8q38g5tnp7m";
	var url = "https://us.api.battle.net/wow/realm/status?locale=en_US&jsonp=getRealm&apikey=m3fpsc5749akmzbtycd4w8q38g5tnp7m" + type + "," + name + "," + status + "," + population + "," + connected_realms + "?callback=getAllRealms";
//	var url = "https://us.api.battle.net/wow/character/Thrall/Xalicus?locale=en_US&jsonp=me&apikey=m3fpsc5749akmzbtycd4w8q38g5tnp7m";
	
	var script = document.createElement("script");
	script.id = "jsonp";
	script.src = url;
	document.body.appendChild(script);
}

function getAllRealms(realms) {
	try {
		fillRealm(realms);
	}
	finally {
		var script = document.getElementById("jsonp");
		script.parentNode.removeChild(script);
	}
}

function fillRealm(realmReport) {
//	var type; // = ["pve", "pvp", "rp", "rppvp"];
//	var name;
//	var stat;
//	var pop;
//	var conRealm;
//	var dateValue = new Date(realmReport.daily.data[0].time);
//	var dayOfWeek = dateValue.getDay();
	var rows = document.querySelectorAll("section.realmlist table tbody tr");
	document.querySelector("section.realmlist table caption").innerHTML = selRealm;
	
	for (var i = 0; i < rows.length; i++) {
		var firstCell = rows[1].getElementsByTagName("td")[0];
		var secondCell = rows[i].getElementsByTagName("td")[1];
		var thirdCell = rows[i].getElementsByTagName("td")[2];
		var forthCell = rows[i].getElementsByTagName("td")[3];
		var fifthCell = rows[i].getElementsByTagName("td")[4];
		firstCell.innerHTML = rType[i];		
		secondCell.innerHTML = rName[i];
		thirdCell.innerHTML = rStat[i];
		forthCell.innerHTML = rPop[i];
		fifthCell.innerHTML = rConRealm[i];
//		fifthCell.style.fontSize - "2.5em";
	}
	
	document.querySelector("section.realmlist table caption").style.display = "block";
	document.querySelector("section.realmlist table").style.display = "inline-block";
	document.querySelector("section.realmlist p.credit").style.display = "block";
}


var servers = document.querySelectorAll("section ul li p");

for (var i = 0; i < servers.length; i++) {
   if (servers[i].addEventListener) {
      servers[i].addEventListener("click", getRealm, false);
   } else if (servers[i].attachEvent) {
      servers[i].attachEvent("onclick", getRealm);
   }
}


if (window.addEventListener) {
   window.addEventListener("load", getRealm, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", getRealm);
}


/*

// global variables
var selectedCity = "Tucson, AZ";
var weatherReport;
var httpRequest = false;

function getRequestObject() {
	try {
		httpRequest = new XMLHttpRequest();
	}
	
	catch (requestError) {
		document.querySelector("p.error").innerHTML = "Forecast not supported by your browser.";
		document.querySelector("p.error").style.display = "block";
		return false;
	}
	
	return httpRequest;
}

function getWeather(evt) {
   var latitude;
   var longitude;
   
   if (evt.type !== "load") {
      if (evt.target) {
         selectedCity = evt.target.innerHTML;
      } else if (evt.srcElement) {
         selectedCity = evt.srcElement.innerHTML;
      }
   }
   
   if (selectedCity === "Tucson, AZ") {
      latitude = 37.7577;
      longitude = -122.4376;
   } else if (selectedCity === "Chicago, IL") {
      latitude = 41.8337329;
      longitude = -87.7321555;
   } else if (selectedCity === "Montreal, QC") {
      latitude = 45.5601062;
      longitude = -73.7120832;
   }
	
	var url = "https://api.darksky.net/forecast/71c1f1ae4c5b0355162e6ed3c5c0ac0c/" + latitude + "," + longitude + "?callback=getForcast";
	
	var script = document.createElement("script");
	script.id = "jsonp";
	script.src = url;
	document.body.appendChild(script);
}

function getForcast(forecast) {
	try {
		fillWeather(forecast);
	}
	finally {
		var script = document.getElementById("jsonp");
		script.parentNode.removeChild(script);
	}
}

function fillWeather(weatherReport) {
		var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var dateValue = new Date(weatherReport.daily.data[0].time);
		var dayOfWeek = dateValue.getDay();
		var rows = document.querySelectorAll("section.week table tbody tr");
		document.querySelector("section.week table caption").innerHTML = selectedCity;
		
		for (var i = 0; i < rows.length; i++) {
			var firstCell = rows[i].getElementsByTagName("td")[0];
			var secondCell = rows[i].getElementsByTagName("td")[1];
			var thirdCell = rows[i].getElementsByTagName("td")[2];
			firstCell.innerHTML = days[dayOfWeek];
			if (dayOfWeek + 1 === 7) {
				dayOfWeek = 0;
			} else {
				dayOfWeek++;
			}
			var sun = Math.round((1 - weatherReport.daily.data[i].cloudCover) * 100,0);
			if (sun > 90) {secondCell.style.color = "rgb(255,171,0)";}
			else if (sun > 80 && sun <= 90) {secondCell.style.color = "rgb(255,179,25)";}
			else if (sun > 70 && sun <= 80) {secondCell.style.color = "rgb(255,188,51)";}
			else if (sun > 60 && sun <= 70) {secondCell.style.color = "rgb(255,196,77)";}
			else if (sun > 50 && sun <= 60) {secondCell.style.color = "rgb(255,205,102)";}
			else if (sun > 40 && sun <= 50) {secondCell.style.color = "rgb(255,213,128)";}
			else if (sun > 30 && sun <= 40) {secondCell.style.color = "rgb(255,221,153)";}
			else if (sun > 20 && sun <= 30) {secondCell.style.color = "rgb(255,230,179)";}
			else if (sun > 10 && sun <= 20) {secondCell.style.color = "rgb(255,238,204)";}
			else if (sun <= 10) {secondCell.style.color = "rgb(255,247,230)";}
			secondCell.style.fontSize = "2.5em";
			thirdCell.innerHTML = sun + "%";
		}
		
		document.querySelector("section.week table caption").style.display = "block";
		document.querySelector("section.week table").style.display = "inline-block";
		document.querySelector("section.week p.credit").style.display = "block";
}

var locations = document.querySelectorAll("section ul li");

for (var i = 0; i < locations.length; i++) {
   if (locations[i].addEventListener) {
      locations[i].addEventListener("click", getWeather, false);
   } else if (locations[i].attachEvent) {
      locations[i].attachEvent("onclick", getWeather);
   }
}

if (window.addEventListener) {
   window.addEventListener("load", getWeather, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", getWeather);
}

*/





