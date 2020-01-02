// ==UserScript==
// @name         Jira: Remove Harvest time tracking widget
// @namespace    https://moderntribe.atlassian.net/
// @version      0.0.1
// @description  Customize and remove modules from Edit Screen
// @author       Modern Tribe Products
// @include      https://moderntribe.atlassian.net/browse/*
// @grant        GM_addStyle
// @downloadURL  https://raw.githubusercontent.com/moderntribe/tampermonkey-scripts/master/jira/jira-remove-harvest.user.js
// @run-at       document-start
// ==/UserScript==

(function() {
	'use strict';

	GM_addStyle( '#harvest__toggle-timer { display: none; }' );

})();
