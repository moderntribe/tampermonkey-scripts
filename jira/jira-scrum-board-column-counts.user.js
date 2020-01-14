// ==UserScript==
// @name         Jira: Add column count to scrum boards
// @namespace    https://moderntribe.atlassian.net/
// @version      0.0.1
// @description  Display count of issues in each scrum board column
// @author       Modern Tribe Products
// @include      https://moderntribe.atlassian.net/secure/RapidBoard.jspa*
// @grant        GM_addStyle
// @require      https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js
// @downloadURL  https://raw.githubusercontent.com/moderntribe/tampermonkey-scripts/master/jira/jira-scrum-board-column-counts.user.js
// ==/UserScript==

(function ( $ ) {
	'use strict';

	let styles = `
/** Same styling as Jira notification counter */
.mt-jira-count,
ul#ghx-column-headers .ghx-qty {
	background-color: rgb(222, 53, 11);
	color: rgb(255, 255, 255);
	border-radius: 2em;
	display: inline-block;
	font-size: 12px;
	font-weight: normal;
	line-height: 1;
	min-width: 1px;
	padding: 0.166667em 0.5em;
	text-align: center;
margin: 0;
}
	`;

	const columnHeadersRow = $( '#ghx-column-header-group ul#ghx-column-headers' );

	const columnHeaders = columnHeadersRow.find( '> li.ghx-column' );

	let columnIds = [];

	// Do not add our own counter if the Board is already displaying them
	if ( !columnHeaders.find( '.ghx-qty' ).length ) {
		columnHeaders.each( function ( i ) {
			columnIds[ i ] = $( this ).data( 'id' );
		} );
	}

	$.each( columnIds, function ( i, v ) {
		let count = $( 'li.ghx-column[data-column-id=' + v + '] .ghx-issue' ).length;

		columnHeaders.filter( '[data-id=' + v + ']' ).find( 'h2' ).after( '<span class="mt-jira-count">' + count + '</span>' );
	} );

	GM_addStyle( styles );
})( jQuery );