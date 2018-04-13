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

$( '.issue-title-link.js-navigation-open' ).each( function() {
  var $el = $( this );
  var jqxhr = $.get( $el.attr( 'href' ) );
  jqxhr.done( function( data ) {
    var $page = $( data );
    var $author = $page.find( '.pull-header-username' );
    var $meta = $el.closest( '.js-issue-row' ).find( '.issue-meta' );
    $meta.prepend( '<span class="tribe-by"></span>' );
    $meta.find( '.tribe-by' ).append( 'by: ' ).append( $author );
  } );
});
