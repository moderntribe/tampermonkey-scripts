// ==UserScript==
// @name         Auto-TEC.com Backlog on new
// @namespace    http://central.tri.be/
// @version      0.1
// @description  Auto-sets TEC.com Backlog on new issues
// @author       You
// @include      /^https:\/\/central.tri.be\/projects\/website\/issues\/new\/?/
// @grant        none
// ==/UserScript==

var central_links = {};

( function( $, my ) {
    my.init = function() {
        $( '#issue_fixed_version_id' ).val( 585 );
    };

    $( function() {
        my.init();
    });
} )( jQuery, central_links );
