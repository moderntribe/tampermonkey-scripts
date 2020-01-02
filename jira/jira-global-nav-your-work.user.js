// ==UserScript==
// @name         Jira: Add Your Work to Global Nav
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
			"name": 'Your Work',
			"url": '/jira/your-work',
			"svg": '<svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation"><g fill="currentColor" fill-rule="evenodd"><path d="M5 19h14V5H5v14zM3 4.995C3 3.893 3.893 3 4.995 3h14.01C20.107 3 21 3.893 21 4.995v14.01A1.995 1.995 0 0 1 19.005 21H4.995A1.995 1.995 0 0 1 3 19.005V4.995z" fill-rule="nonzero"></path><path d="M9.17 17H4v1.5A1.5 1.5 0 0 0 5.505 20h12.99c.838 0 1.505-.672 1.505-1.5V17h-5.17a3.001 3.001 0 0 1-5.66 0zM7 12h10v2H7zm0-4h10v2H7z"></path></g></svg>'
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
