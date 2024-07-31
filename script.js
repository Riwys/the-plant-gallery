"use strict";


//message under elem

let elem = document.getElementById("coords-show-mark");

function createMessageUnder(elem, html) {
	// create message element
	let message = document.createElement('div');
	message.className = "welcome";
	// better to use a css class for the style here
	message.style.cssText = "position: absolute; color: white";

	// assign coordinates, don't forget "px"!
	let coords =  elem.getBoundingClientRect();

	message.style.left = coords.left + 12 +'px';
	message.style.top = coords.bottom + -8 + 'px';

	message.innerHTML = html;

	return message;
}

// Usage
// add it for 10 seconds in the document
let message = createMessageUnder(elem, 'Hello there! Have fun in the plant gallery!!');
setTimeout(() => document.body.append(message), 1000);
setTimeout(() => message.remove(), 10000);



// Tooltip
let tooltipElem;

document.onmouseover = function(event) {
	let target = event.target;

	// if we have tooltip HTML...
	let tooltipHtml = target.dataset.tooltip;
	if (!tooltipHtml) return;

	// ...create the tooltip element

	tooltipElem = document.createElement('div');
	tooltipElem.className = 'tooltip';
	tooltipElem.innerHTML = tooltipHtml;
	document.body.append(tooltipElem);

	// position it above the annotated element (top-center)
	
	let tooltipCoords = target.getBoundingClientRect();

	let left = tooltipCoords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
	if (left < 0) left = 0;
	//  don't cross the left window edge

	let top = tooltipCoords.top - tooltipElem.offsetHeight - 5;
	if (top < 0) {
		top = tooltipCoords.top + target.offsetHeight + 5;
	}

	tooltipElem.style.left = left + 'px';
	tooltipElem.style.top = top + 'px';
	
	
	/*
	tooltipElem.style.left = event.clientX + 'px';
	tooltipElem.style.top = event.clientY + 'px';
	*/

};

document.onmouseout = function(e) {

	if (tooltipElem) {
		tooltipElem.remove();
		tooltipElem = null;
	}
};

document.onscroll = function(e) {

	if (tooltipElem) {
		tooltipElem.remove();
		tooltipElem = null;
	}
};


// View image
thumbs.onclick = function(event) {
	let thumbnail = event.target.dataset.tooltip;

	if (!thumbnail) return;
	showThumbnail(thumbnail.href , thumbnail.title);
	event.preventDefault();
}

function showThumbnail(href, title) {
	largeImg.src = href;
	largeImg.alt = title;
}



// Scrolltop icon
let arrowTop = document.createElement('div');
	arrowTop.id = "arrowTop";
	arrowTop.hidden = "true";
	document.body.append(arrowTop);


arrowTop.onclick = function() {
	window.scrollTo(pageXOffset, 0);
	// after scrollTo, there will be a "scroll" event,
	// so the arrow will hide automatically
};

window.addEventListener('scroll', function() {
	arrowTop.hidden = (pageYOffset < document.documentElement.clientHeight);
});



//nav color change
window.addEventListener('scroll', function() {
	let nav = document.querySelector('nav');
	let a = document.querySelectorAll('a');
	if (pageYOffset > document.documentElement.clientHeight/2.6) {
		nav.style.cssText = "background-color: rgba(18, 18, 18, 1.0); color: #fff;";
		for (let i = 0; i < 4; i++) {
		a[i].style.cssText = "color: #fff;";
		}
	} else {
		nav.style.cssText = "background-color: none; color: #fff;";
		for (let i = 0; i < 4; i++) {
		a[i].style.cssText = "color: #fff;";
		}
	}

	
});