// ==UserScript==
// @name         Jira: Bulk Edit Uncheck Email Checkbox
// @namespace    https://moderntribe.atlassian.net/
// @version      0.0.1
// @description  Inject items into the global nav
// @author       Modern Tribe Products
// @match        https://moderntribe.atlassian.net/secure/BulkEditDetails.jspa
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	document.getElementById( 'sendBulkNotificationCB' ).checked = false;

})();
