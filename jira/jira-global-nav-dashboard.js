// ==UserScript==
// @name         Jira: Add Dashboard to Global Nav
// @namespace    https://moderntribe.atlassian.net/
// @version      0.0.1
// @description  Inject items into the global nav
// @author       Modern Tribe Products
// @include      https://moderntribe.atlassian.net/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	let links = [
		{
			"name": 'Dashboard',
			"url": '/secure/Dashboard.jspa',
			"svg": '<svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation"><g fill="currentColor"><path d="M4 18h16.008C20 18 20 6 20 6H3.992C4 6 4 18 4 18zM2 5.994C2 4.893 2.898 4 3.99 4h16.02C21.108 4 22 4.895 22 5.994v12.012A1.997 1.997 0 0 1 20.01 20H3.99A1.994 1.994 0 0 1 2 18.006V5.994z"></path><path d="M7 5v14h2V5z"></path><path d="M7 11h14V9H7z"></path></g></svg>'
		}
	];

	function insertNavItem( item ) {
		let navItem = document.createElement( 'span' );
		navItem.setAttribute( 'class', 'tampermonkey-addition' );
		let html = `
<div class="css-2rlxtj">
  <div class="css-7xjigh" role="presentation">
	<div>
	  <div class="css-1baulvz">
		<a class="css-tu2hbs" data-testid="GlobalNavigationItem" href="${item.url}" title="${item.name}">
		  <div class="css-1ixbp0l">
			<span class="sc-iV0Tot kJV0th" area-label="${item.name}">
			  ${item.svg}
			</span>
		  </div>
		</a>
	  </div>
	</div>
  </div>
</div>
`;
		navItem.innerHTML = html;
		document.querySelectorAll( 'span[data-test-id="navigation-next.global-navigation.components.global-nav-with-id"] > div > div' )[0].appendChild( navItem );
	}

	for ( let i in links ) {
		insertNavItem( links[i] );
	}
})();
