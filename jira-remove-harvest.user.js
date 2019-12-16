// ==UserScript==
// @name         Jira: Remove Harvest time tracking widget
// @namespace    https://moderntribe.atlassian.net/
// @version      0.0.1
// @description  Remove the "Harvest Time Tracking" widget from the View Issue Sidebar.
// @author       Clifford Paulick
// @include      https://moderntribe.atlassian.net/browse/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/moderntribe/tampermonkey-scripts/master/jira-remove-harvest.user.js
// @require      https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js
// @require      https://raw.githubusercontent.com/moderntribe/tampermonkey-scripts/master/waitForKeyElements.js
// ==/UserScript==

let jira_remove_harvest_sidebar_widget = {};

(function ( $, app ) {
	'use strict';

	/**
	 * Remove the "Harvest Time Tracking" widget from the View Issue Sidebar, only if detected / after loaded.
	 *
	 * @see waitForKeyElements() The third-party script (requires jQuery) that fires our function only if/after the
	 *                           selector is found, such as after an Ajax call. Required to work at some of the Jira URLs.
	 *
	 * @param e
	 */
	function remove_harvest_widget( e ) {
		e.remove();
	}

	waitForKeyElements( '#viewissuesidebar > #harvest__toggle-timer', remove_harvest_widget );
})( jQuery, jira_remove_harvest_sidebar_widget );