// ==UserScript==
// @name         Jira: Remove Harvest time tracking widget
// @namespace    https://moderntribe.atlassian.net/
// @version      0.0.1
// @description  Customize and remove modules from Edit Screen
// @author       Crisoforo Gaspar
// @include      /^https:\/\/moderntribe.atlassian.net\/browse\/\w{1,20}-\d{1,20}
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/moderntribe/tampermonkey-scripts/master/jira/jira-remove-harvest.user.js
// ==/UserScript==

(function() {
	'use strict';

	hide('#harvest__toggle-timer'); // Hide the harvest widget

	// Add more below


	function hide( selector ) {
		document.querySelector( selector ).style.display = 'none';
	}

})();
