// ==UserScript==
// @name         Tickets over estimate
// @namespace    http://central.tri.be/
// @version      0.1.1
// @description  Adds highlighting when a ticket has more hours clocked than the estimate
// @author       Zach Tirrell
// @include      /^https:\/\/central.tri.be\/(\/.*)*/
// @grant        none
// ==/UserScript==

var central_over_estimate = {};
(function( $, my ) {
    'use strict';

    my.init = function() {
        my.highlight_single();
        my.highlight_table();
    };

    my.highlight_single = function() {
        var $estimated = $( '.issue.details td.estimated-hours' );
        var $spent = $( '.issue.details td.spent-time' );

        var estimated = parseFloat( $estimated.html() );
        if ( isNaN( estimated ) ) {
            return;
        }

        var spent = parseFloat( $spent.find( 'a' ).html() );
        if ( isNaN( spent ) || spent <= estimated ) {
            return;
        }

        $spent.css( 'background-color', 'pink' );
        $spent.find( 'a' ).css( 'font-weight', 'bold' );
    };

    my.highlight_table = function() {
        $( '.list.issues .issue' ).each( function() {
            var $estimated = $( this ).find( 'td.estimated_hours' );
            var $spent = $( this ).find( 'td.spent_hours' );

            var estimated = parseFloat( $estimated.html() );
            if ( isNaN( estimated ) ) {
                return;
            }

            var spent = parseFloat( $spent.html() );
            if ( isNaN( spent ) || spent <= estimated ) {
                return;
            }
            $spent.css( 'background-color', 'pink' );
        } );
    };

    $( function() {
        my.init();
    } );
})( jQuery, central_over_estimate );