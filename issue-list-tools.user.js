// ==UserScript==
// @name         Issue list tools
// @namespace    https://central.tri.be/
// @version      0.1
// @description  Adds tools to interact with the issue list
// @author       Matthew Batchelder
// @include      /https?:\/\/central(dev)?.tri.be.*\/issues/
// @grant        none
// ==/UserScript==

( function( $ ) {
    'use strict';

     var obj = {};

    /**
     * Initializes the clocking nav
     */
    obj.init = function() {
        var $issueList = $( document.getElementById( 'issue-list' ) );
        $issueList.before( '<div class="tribe-row-tools"><a href="#" class="collapse-row-groups">Toggle row groups</a></div>' );
        $( document ).on( 'click', '.collapse-row-groups', function( e ) {
            e.preventDefault();
            $( '.expander' ).click();
        } );

        obj.buildStyles();
    };

    /**
     * Adds CSS for clocking tracker
     */
    obj.buildStyles = function() {
        $( 'head' ).append( '<style id="tribe-issue-list-tools-styles"/>' );
        obj.$styles = $( document.getElementById( 'tribe-issue-list-tools-styles' ) );
        obj.$styles.html( `
.tribe-row-tools {
  padding: .5rem 0;
}
        ` );
    };

    $( function() {
        obj.init();
    } );
})( jQuery );
