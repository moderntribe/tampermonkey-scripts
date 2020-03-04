// ==UserScript==
// @name         Jira: Hide private events in My Work
// @namespace    https://moderntribe.atlassian.net/
// @version      0.4
// @description  Hide private / unneeded events from your Google calendar on the Mywork page to reduce clutter
// @author       Andras Guseo
// @include      https://app.tempo.io/timesheets/jira/my-work/*
// @include      https://app.tempo.io/io/web/tempo-app*
// @downloadURL  https://github.com/moderntribe/tampermonkey-scripts/raw/master/jira/jira-mywork-hide-events.user.js
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
 *
 * Dev notes:
 * The @include needs to match the url of the iframe.
 */

(function() {
    'use strict';

    /**************/
    /*  SETTINGS  */
    /**************/

    /**
     * Define the class to look for. This changes on occasion
     */
    var rowClass = 'sc-MKjYC';

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

    /******************/
    /*  SETTINGS END  */
    /******************/

    // The array / object where we store the calendar entries
    var slots;

    // Do we want error logging in the console?
    var log = false;

    // Run every 2 seconds...
    var startScript = window.setInterval( hideThem, 2000 );

    function hideThem() {

        // Collect all the events
        slots =   document.getElementsByClassName( rowClass );

        if ( log ) console.log( 'Number of slots: ' + slots.length );

        // Walk the object
        if ( slots.length > 0 ) {
            for ( var i = 0; i < slots.length; i++ ) {

                // Bail if we already did the excercise
                if ( slots[i].classList.contains( 'weredone' ) ) {
                    if ( log ) console.log( 'Skipped');
                    continue;
                }
                // Add a class, so we know we have checked this already
                else {
                    slots[i].classList.add( 'weredone' );
                }

                // Get the HTML from the row
                var row = slots[i].innerHTML;

                // Check if one of the predefined strings is in the row
                for ( var j = 0; j < strings.length; j++ ) {

                    // If yes, then hide it
                    if ( row.search( strings[j] ) > 0 ) {
                        if ( log ) console.log( 'Found one: ' + i );
                        slots[i].style.display = 'none';
                    }
                }
            }
        }
        else {
            console.log( 'DOM not ready.' );
        }
    }
})();

/** Changelog
 *
 * === 0.4 - 2020-03-04 ===
 * Set up a settings part at the top
 * Broke out the class name to be a setting
 *
 * === 0.3 - 2020-02-26 ===
 * Updated the @include URL
 * Updated the class name the script is looking for
 * Added @downloadURL
 * Added checks to reduce resource needs
 * Housekeeping
 *
 * === 0.1 - 2020-01-16 ===
 * Initial version
 */
