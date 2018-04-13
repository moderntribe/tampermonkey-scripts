// ==UserScript==
// @name         .org Helper for Modern Tribe Support
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  The script runs in the .org forums for Modern Tribe plugins. It colors resolved threads green, and threads where last voice is a team member light yellow.
// @author       Andras Guseo
// @include      https://wordpress.org/support/plugin/pardot*
// @include      https://wordpress.org/support/plugin/the-events-calendar*
// @include      https://wordpress.org/support/plugin/event-tickets*
// @include      https://wordpress.org/support/plugin/gigpress*
// @include      https://wordpress.org/support/plugin/image-widget*
// @include      https://wordpress.org/support/plugin/advanced-post-manager*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Get all lines in an array
    var x = document.getElementsByClassName("type-topic");

    // MT support team members
    var mtteam = [
        'aguseo',
        'barryhughes-1',
        'bskousen3',
        'cliffpaulick',
        'cliffseal',
        'courane01',
        'erishel',
        'geoffbel',
        'jaimemarchwinski',
        'jeremy80',
        'juanfra',
        'mitogh',
        'nicosantos',
        'skyshab',
        'vicskf',
    ];

    var i, j;
    var resolvedColor = "#98fb98";
    var lastVoiceColor = "#ffffcc";

    // Check every line
    for (i = 0; i < x.length; i++) {

        // Check if the line is resolved
        for( j = 0; j < mtteam.length; j++ ) {
            //console.log();
            var m = x[i].innerHTML.search( 'class="resolved"' );
            if( m > 0 ) {
                x[i].style.backgroundColor = resolvedColor;

                // If resolved then skip
                continue;
            }

            // If not resolved, check if tha last voice is a team member
            var n = x[i].innerHTML.search( 'href="https://wordpress.org/support/users/' + mtteam[j] + '/"' );

            if ( n > 0 ) {
                x[i].style.backgroundColor = lastVoiceColor;
            }
        }
    }


})();
