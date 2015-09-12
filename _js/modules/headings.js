/**
 * HEADINGS
 * Create the color changing effect on scroll.
 */

var postList = document.querySelector('.post-list'),
	postHeader = document.querySelector('.post-header-content'),
	bg = document.querySelector('.content-bg'),
	gradient = document.querySelector('.post-header .gradient'),
	headerHeight = 160,
	titleHeight = 400,
	winOffset,
	percentage;

function listScroll() {
	winOffset = window.pageYOffset;
	percentage = winOffset / headerHeight;

	if (winOffset <= headerHeight) {
		bg.style.opacity = percentage;
	}

}

function pageScroll() {

			console.log('pagescroll');

	winOffset = window.pageYOffset;
	headerOffset = ((postHeader.clientHeight / 2) + 160) - postHeader.clientHeight;
	percentage = ((winOffset / titleHeight) / 2) + 0.8;

	if (winOffset >= headerOffset) {
		postHeader.style.top = 380 - (postHeader.clientHeight / 2) + 'px';
		postHeader.style.position = 'absolute';
		postHeader.style.left = '50%';
	} else {
		postHeader.style.top = '220px';
		postHeader.style.position = 'fixed';
		postHeader.style.left = '60%';
	}
}


function gradients() {
	if (winOffset <= titleHeight) {
		gradient.style.opacity = percentage;
	}
}


function init() {

	if (postList !== null) {
		window.onscroll = listScroll;
	}

	if (postHeader !== null) {
		console.log('test');
		window.onscroll = pageScroll;
	}

	if (gradient !== null) {
		window.onscroll = gradients;
	}

}

module.exports = {
	init: init
};
