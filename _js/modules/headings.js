/**
 * HEADINGS
 * Create the color changing effect on scroll.
 */

var postList = document.querySelector('.post-list'),
	bg = document.querySelector('.content-bg'),
	headerHeight = 160,
	winOffset,
	percentage;

function scrolled() {
	winOffset = window.pageYOffset;
	percentage = winOffset;

	if (winOffset <= headerHeight) {
		bg.style.opacity = percentage / 160;
	}

}

function init() {

	if (postList !== null) {
		window.onscroll = scrolled;
	}

}

module.exports = {
	init: init
};
