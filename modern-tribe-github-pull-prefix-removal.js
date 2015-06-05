// ==UserScript==
// @name         Suppress moderntribe/
// @namespace    http://central.tri.be/
// @version      0.1
// @description  When on a combined pull request list, remove moderntribe/ so the list is more easily scannable
// @author       Matthew Batchelder
// @include      /https:\/\/github.com\/pulls?.*q=is%3Aopen\+is%3Apr\+sort%3Aupdated-desc\+repo%3Amoderntribe%2Fevents-pro.*/
// @grant        none
// ==/UserScript==

$( '.issue-title-link.issue-nwo-link' ).each( function() {
    var $el = $( this );
    $el.html( $el.html().replace( /moderntribe\//, '' ) );
} );
