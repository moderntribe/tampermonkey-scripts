// ==UserScript==
// @name         Jira: Remove Harvest time tracking widget
// @namespace    https://moderntribe.atlassian.net/
// @version      0.0.1
// @description  The applicable template inserts into the empty Description field after selecting an Issue Tracker status (Bug, Feature, etc.)
// @author       Clifford Paulick
// @include      https://moderntribe.atlassian.net/browse/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/moderntribe/tampermonkey-scripts/master/jira-remove-harvest.user.js
// ==/UserScript==

(function () {
	'use strict';

	let jira_harvest_sidebar_widget = document.querySelector( '#viewissuesidebar > #harvest__toggle-timer' );

	jira_harvest_sidebar_widget.parentNode.removeChild( jira_harvest_sidebar_widget );
})();