// ==UserScript==
// @name         Jira: Hide private events in My Work
// @namespace    https://moderntribe.atlassian.net/
// @version      0.1
// @description  Hide private / unneeded events from your Google calendar on the Mywork page to reduce clutter
// @author       Andras Guseo
// @include      https://app.tempo.io/timesheets/jira/my-work/*
// @grant        none
// ==/UserScript==

/**
 * If you are using the Google Calendar integration in Tempo
 * you can hide events on the My Work page by defining keywords
 * or strings. When the script finds a keyword in the event title
 * the event will be hidden on the My Work page.
 * You can define your own keywords at the top of the script a bit below.
 * They can be simple words like 'Private' or full event titles like
 * 'Dentist appointment'.
 *
 * Examples that will be hidden based on the keywords / strings defined below:
 * Busy - dinner with mom
 * Hide - Dentist appointment yearly checkup
 * Busy with kids
 * Private investigator
 * Nighttime
 */

(function() {
    'use strict';

    /**
     * Define the keywords / strings that we are looking for in event titles
     * that should be hidden. Case sensitive!
     */
    var strings = [
        'Hide',
        'Busy',
        'Private',
        'Night',
    ];

    // Your code here...
    var slots;

    // Do we want error logging in the console?
    var log = false;

    // Wait 2 seconds...
    var startScript = window.setTimeout( hideThem, 2000 );

    function hideThem() {

        // Collect all the events
        slots =   document.getElementsByClassName( 'sc-fAjcbJ' );

        if ( log ) console.log( "x" + slots.length );

        // Walk the object
        for ( var i = 0; i < slots.length; i++ ) {

            // Get the HTML from the row
            var row = slots[i].innerHTML;

            // Check if one of the predefined strings is in the row
            for ( var j = 0; j < strings.length; j++ ) {

                // If yes, then hide it
                if ( row.search( strings[j] ) > 0 ) {
                    if ( log ) console.log('Found one: ' + i);
                    slots[i].style.display = 'none';
                }
            }
        }
    }
})();
