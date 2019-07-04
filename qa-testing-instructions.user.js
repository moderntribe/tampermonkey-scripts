// ==UserScript==
// @name         QA Testing Instructions
// @namespace    https://central.tri.be/
// @version      0.1
// @description  Click button to add QA Testing Instructions format
// @author       Paul Kim
// @include      /https?:\/\/central.tri.be\/issues\/[0-9]+\/?/
// @grant        none
// ==/UserScript==

( function() {

	var text = {
		tiFormat: `h2. QA Testing Instructions

*URL to test:* ##Add URL to test##

h3. Feature Request

##Add feature request##

h3. Solution

##Add solution##

h3. Steps to Replicate

##Add steps to replicate##`,
		seeNote: 'See note #',
	};

	var el = {
		button: null,
	};

	var addStyles = function() {
		var css = '.qa-testing-instructions{margin-bottom:10px}.qa-testing-instructions__button{margin:0px;border:none;background:#157F9D;color:#fff;border-radius:2px;padding:5px 8px}.qa-testing-instructions__button:hover,.qa-testing-instructions__button:focus{background:#1CA8C7}';
		var head = document.head;
		var style = document.createElement('style');
		style.type = 'text/css';
		style.appendChild(document.createTextNode(css));

		head.appendChild(style);
	};

	var getButton = function() {
		var button = document.createElement('button');
		button.classList.add('qa-testing-instructions__button');
		button.type = 'button';
		button.textContent = 'Add Testing Instructions';
		el.button = button;
		return button;
	};

	var insertAfter = function(newNode, refNode) {
		refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
	};

	var addQatiButton = function() {
		var wrapper = document.createElement('div');
		wrapper.classList.add('qa-testing-instructions');
		wrapper.appendChild(getButton());
		insertAfter(wrapper, el.form.querySelector('.issue-notes-new legend'));
	};

	var getNoteNum = function() {
		return document.querySelectorAll('.journal').length + 1;
	};

	var handleClick = function() {
		el.form.querySelector('.issue-notes-new #notes').value = text.tiFormat;
		el.form.querySelector('#issue_custom_field_values_24').value = text.seeNote + getNoteNum();
	};

	var bindEvents = function() {
		el.button.addEventListener('click', handleClick);
	};

	var init = function() {
		el.form = document.querySelector('#issue-form');
		addStyles();
		addQatiButton();
		bindEvents();
	};

	init();

} )();

