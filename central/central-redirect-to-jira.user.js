// ==UserScript==
// @name         Automatically redirect Central Issues to Jira Issues.
// @namespace    https://central.tri.be/
// @version      0.0.1
// @description  You don't live in the past, and you want to be automated into the future.
// @author       Clifford Paulick
// @include      https://central.tri.be/issues/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/moderntribe/tampermonkey-scripts/master/central/central-redirect-to-jira.user.js
//
// 2min demo video: https://share.getcloudapp.com/04ugxG4Q
//
// JQL search syntax references:
// https://community.atlassian.com/t5/Jira-questions/How-to-create-a-jira-URL-to-do-a-JQL-search/qaq-p/305793
// https://confluence.atlassian.com/jirasoftwarecloud/advanced-searching-fields-reference-764478339.html
// https://confluence.atlassian.com/jiracoreserver073/advanced-searching-fields-reference-861257219.html#Advancedsearching-fieldsreference-customCustomfield
//
// ==/UserScript==

let central_redirect_to_jira = {};

(function ( app ) {
	'use strict';

	function redirect() {
		window.location = encodeURI( 'https://moderntribe.atlassian.net/issues/?jql=cf[10037]="' + window.location.href + '"' );
	}

	document.write( 'Redirecting you to find this issue in Jira...' );
	setTimeout( redirect, 500 ); // 0.5 seconds
})( central_redirect_to_jira );
