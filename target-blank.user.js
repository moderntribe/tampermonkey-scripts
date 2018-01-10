// ==UserScript==
// @name         Central target blank on external links
// @namespace    https://central.tri.be/
// @version      0.1
// @description  Adds target=blank on external links
// @author       Matthew Batchelder
// @include      /https?:\/\/central(dev)?.tri.be.*\/.*
// @grant        none
// ==/UserScript==

( function( $ ) {
	'use strict';

	var obj = {};

	/**
	 * Initialize
	 */
	obj.init = function() {
		var $a = $( 'a' ).not( 'a[href^="https://central"]' ).not( 'a[href^="/"]' );
		$a.attr( 'target', '_blank' );
	};

	$( function() {
		obj.init();
	} );
})( jQuery );