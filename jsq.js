/*
CIS166AA: Case Project
Author: Kevin Ward
Date: 11/30/2016
Filename: jsq.js
*/


function display(event) {
//	$(event.currentTarget).children("ul").addClass("show");
//	$(event.currentTarget).children("ul").show();
	$(event.currentTarget).children("ul").slideDown("fast");
}

function hide(event) {
//	$(event.currentTarget).children("ul").removeClass("show");
//	$(event.currentTarget).children("ul").hide();
	$(event.currentTarget).children("ul").slideUp("slow");
}

$("ul.mainmenu li").hover(display,hide);
