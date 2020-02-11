// ==UserScript==
// @name         Make LA strings links
// @namespace    https://moderntribe.atlassian.net
// @version      0.1
// @description  Convert text urls to clickable links in the "Forum Threads" field in Jira's "new view"
// @author       Stephen Page
// @include      https://moderntribe.atlassian.net/browse/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @require      https://raw.githubusercontent.com/moderntribe/tampermonkey-scripts/master/waitForKeyElements.js
// @downloadURL  https://github.com/moderntribe/tampermonkey-scripts/raw/master/jira/jira-convert-threads-to-links.user.js
// @grant        none
// ==/UserScript==

if ( ! document.getElementById( 'jira' ) ) {
	return;
}

waitForKeyElements("[aria-label='Edit Forum Threads']", wrap_fu, true );

function wrapLines(str, tmpl) {
	return str.replace(/http.+$/gm, tmpl || '<a href="$&">$&</a>');
}

function wrap_fu(threadsButton) {
	const sib = threadsButton.prev();
	const text = sib.html();

	sib.html( wrapLines( text ) );
}
