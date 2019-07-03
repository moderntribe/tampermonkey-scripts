// ==UserScript==
// @name         Party Llamacorn
// @namespace    https://central.tri.be/
// @version      0.1
// @description  Party time!
// @author       Paul Kim, Aaron Hanson
// @include      /https?:\/\/central.tri.be\/issues\/[0-9]+\/?/
// @grant        none
// ==/UserScript==

( function($) {

	var showLlamacorn = function() {
		var status = document.querySelector('#content .meta td.status').textContent;
		return status == 'Pending Merge' || status == 'Complete';
	};

	var setStyles = function() {
		var css = '.llamacorn-wrapper{position:absolute;top:50%;transform:translateY(-50%);width:100%;pointer-events:none;z-index:9999;overflow:hidden}.llamacorn{position:relative;left:0;transform:translateX(-100%);transition:1.3s}.llamacorn-fly{left:100%;transform:translateX(0)}';
		var head = document.head;
		var style = document.createElement('style');
		style.type = 'text/css';
		style.appendChild(document.createTextNode(css));

		head.appendChild(style);
	};

	var createImage = function() {
		var image = document.createElement('img');
		image.src = 'https://central.tri.be/attachments/105168/llamacorn.png';
		image.classList.add('llamacorn');
		return image;
	};

	var createImageWrapper = function() {
		var wrapper = document.createElement('div');
		wrapper.classList.add('llamacorn-wrapper');
		wrapper.appendChild(createImage());
		document.body.appendChild(wrapper);
	};

	var imageLoaded = function() {
		$('.llamacorn').addClass('llamacorn-fly');
	};

	var removeLlamacorn = function() {
		$('.llamacorn-wrapper').remove();
	};

	var bindEvent = function() {
		$('.llamacorn').each(function() {
			if( this.complete ) {
				imageLoaded.call( this );
			} else {
				$(this).one('load', imageLoaded);
			}
		});
		$('.llamacorn').on('transitionend', removeLlamacorn);
	};

	var init = function() {
		if (showLlamacorn()) {
			setStyles();
			createImageWrapper();
			bindEvent();
		}
	};

	init();

} )(jQuery);
