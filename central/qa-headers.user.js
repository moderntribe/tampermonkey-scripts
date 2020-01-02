// ==UserScript==
// @name         Central QA Headers
// @namespace    https://central.tri.be/
// @version      1.0
// @description  Applies color background to QA template headers for better visibility
// @author       Nicole Ramsey
// @include      /https?:\/\/central(dev)?.tri.be\/(projects\/)*[^\/]*\/?issues\/?/
// @grant        none
// ==/UserScript==

(function( $ ) {
	'use strict';
	var $el;
	var $heading;
	var headings = [
		{
			'selector': 'a[name^="QA-PASSED-"]',
			'icon': 'check',
			'background': 'green',
			'color': '#fff',
			'stroke': '#0f690f'
		},
		{
			'selector': 'a[name^="RETURNED-"]',
			'icon': 'undo',
			'background': '#f4af49',
			'color': '#fff',
			'stroke': '#db8e15'
		},
	];

	for ( var i in headings ) {
		$el = $( headings[ i ].selector );

		// Find the closest h2
		$heading = $el.next( 'h2' );

		// Add the icon
		$heading.prepend( '<i class="fa fa-' + headings[ i ].icon + '" aria-hidden="true"></i>' );

		// Style the heading
		$heading.css( {
			'background-color': headings[ i ].background,
			'color': headings[ i ].color,
			'font-weight': 'bold',
			'-webkit-text-fill-color': headings[ i ].color,
			'-webkit-text-stroke': '1px ' + headings[ i ].stroke
		} );
	}
})( jQuery );
