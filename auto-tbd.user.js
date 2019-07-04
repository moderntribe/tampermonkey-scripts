// ==UserScript==
// @name         Auto-TBD on new
// @namespace    https://central.tri.be/
// @version      0.1
// @description  Auto-sets TBD on new issues
// @author       You
// @include        /^https:\/\/central.tri.be\/projects\/premium-plugins\/issues\/new\/?/
// @grant        none
// ==/UserScript==

var central_links = {};

( function( $, my ) {
    my.init = function() {
        $( '#issue_fixed_version_id' ).val( 444 );
    };

    $( function() {
        my.init();
    });
} )( jQuery, central_links );
