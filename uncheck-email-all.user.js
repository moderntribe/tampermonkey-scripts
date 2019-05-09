// ==UserScript==
// @name         Uncheck email all
// @namespace    http://your.homepage/
// @version      0.1
// @description  Uncheck the email all checkbox
// @author       You
// @include      /^https:\/\/central.tri.be(\/.*)?/
// @grant        none
// ==/UserScript==

( function( $ ) {
    $( '#send_notification' ).prop( 'checked', false );
})( jQuery );
