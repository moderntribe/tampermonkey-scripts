// ==UserScript==
// @name         Freshdesk Ticket Coloring
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Gives background color to the tickets which are urgent / overdue
//               Note: the script runs every 5 seconds otherwise it didn't want to work.
//               If you don't see the colors (where you should), then refresh the page.
// @author       Andras Guseo
// @include      https://tribeprojects.freshdesk.com/a/tickets/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Needs a bit of cleaning, but only later.
    window.setInterval( colorIt, 5000);

    function colorIt() {
        var rows = document.getElementsByClassName( 'tickets__list' );
        //console.log('a'+rows[0]);
        var newColor = '#e7faec';
        var respondedColor = '#f4f8ff';
        var overdueColor = '#fff4f4';

        var calisun_hex = '#f4af49';
        var calisun = 'rgba(244, 175, 73, 0.8)';
        var picante_hex = '#e4554a';
        var picante = 'rgba(228, 85, 74, 0.5)';
        var i;

        // Check every line
        for( i = 0; i < rows.length; i++ ) {

            /* Light (calisun orange) warning for tickets that are 20-23 hours old */
            var k = rows[i].innerHTML.search( /(Created|Customer responded) [2]{1}[0-3]{1} hours ago/ );
            if( k > 0 ) {
                rows[i].style.backgroundColor = calisun;
                continue;
            }
            /* Overdue (picante red) warning for tickets older than 24 hours */
            k = rows[i].innerHTML.search( /(Created|Customer responded) [0-9]{1,2} day(s)? ago/ );
            if( k > 0 ) {
                rows[i].style.backgroundColor = picante;
                continue;
            }

            /* Temporarily removed until premium support settling in Freshdesk
            var j = rows[i].innerHTML.search( 'tag--new' );
            if( j > 0 ) {
                rows[i].style.backgroundColor = newColor;
                continue;
            }
            j = rows[i].innerHTML.search( 'tag--overdue' );
            if( j > 0 ) {
                rows[i].style.backgroundColor = overdueColor;
                continue;
            }
            j = rows[i].innerHTML.search( 'tag--customer-responded' );
            if( j > 0 ) {
                rows[i].style.backgroundColor = respondedColor;
                continue;
            } */
        }
        //console.log('done');
    }

})();
