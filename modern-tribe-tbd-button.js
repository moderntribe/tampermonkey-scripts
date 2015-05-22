// ==UserScript==
// @name         TBD button
// @namespace    http://your.homepage/
// @version      0.1
// @description  Pushing to TBD
// @author       You
// @include      /^https:\/\/central.tri.be\/issues\/.*/
// @grant        none
// ==/UserScript==

( function( $ ) {
    $( '.wiki' ).append( '<button id="TBD" type="button" style="font-size:1.4rem;">TBD, Mother effer!!!</button>' );
    var $tbd = $( '#TBD' );

    $( document ).on( 'click', '#TBD', function( e ) {
        $( '.icon-edit:first' ).click();
        $( '#issue-form fieldset:nth-child(3) .wiki-edit' ).val( 'Pushing to TBD' );
        $( '#issue_fixed_version_id' ).val( 444 );
        $( '#send_notification' ).prop( 'checked', false );
    });
})( jQuery );
