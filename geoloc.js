/*
CIS166AA: Case Project
Author: Kevin Ward
Date: 11/30/2016
Filename: geoloc.js
*/

"use strict";

// declare global variables for setup page.
var waitForUser;

// configure page to display Directions content
function loadDir(string) {
	document.querySelector("aside ul li:first-of-type").className = "current";
	document.getElementById("loc").style.display = "block";
	// geoTest();
	// to minimize data use, download ma only if needed and not already downloaded.
	if (typeof google !== 'object') {
		var script = document.createElement("script");
		script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&callback=geoTest";
		document.body.appendChild(script);
	}
}

function geoTest() {
	waitForUser = setTimeout(fail, 10000);
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(createDir, fail, {timeout: 10000});
	} else {
		fail();
	}
}

function createDir(position) {
	clearTimeout(waitForUser);	
	var currPosLat = position.coords.latitude;
	var currPosLng = position.coords.longitude;
	var currPosAlt = position.coords.altitude;
	var mapOptions = {
		center: new google.maps.LatLng(currPosLat, currPosLng, currPosAlt), zoom: 12
	};
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	document.getElementById("lat").innerHTML = "Latitude: " + currPosLat;
	document.getElementById("lng").innerHTML = "Longitude: " + currPosLng;
	document.getElementById("alt").innerHTML = "Altitude: " + currPosAlt;
	
}

function fail() {
	// console.log("Geolocation information not available or not authorized.");
	document.getElementById("map").innerHTML = "Unable to access your current location.";
}

// run setUpPage() function when page finishes loading
window.addEventListener("load", loadDir, false);






