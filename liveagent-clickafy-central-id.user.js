// ==UserScript==
// @name         LiveAgent - Clickafy Central ID
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Make the Central ID in the ticket meta box clickable
// @author       Andras Guseo
// @include      https://support.theeventscalendar.com/agent/*
// @include      https://theeventscalendar.ladesk.com/agent/*
// @downloadURL  https://raw.githubusercontent.com/moderntribe/tampermonkey-scripts/master/liveagent-clickafy-central-id.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // If you set this to true you will see log messages in the console
    var log = false;

    // Run the script every 5 seconds. This is necessary due to the dynamic nature of LiveAgent
    var startScript = window.setInterval( clickableCentral, 5000);

    function clickableCentral() {

        // Get the rows is an object
        var rows = document.getElementsByClassName('DetailsFormfield');

        // Walk the object
        for ( var i = 0; i < rows.length; i++ ) {

            // Get the HTML from the row
            var row = rows[i].innerHTML;

            // Get the starting position of the string 'Central ID'
            var inReply = row.search( 'Central ID' );

            // Only run if we find the Central ID field
            if ( inReply >= 0 ) {

                if ( log ) console.log( 'Found Central ID in row ' + i );

                // Check if the link already exists
                var isItLinked = row.search( 'https://central.tri.be' );

                // Only run if the link doesn't exist yet
                if( isItLinked < 0 ) {

                    if( log ) console.log( 'Central ID not clickafied yet' );

                    // Starting position of 'Central ID'
                    var startCentralID = parseInt( row.search( 'Central ID' ) );

                    // Starting position of div after 'central ID'
                    var startDiv = row.indexOf( '<div class="gwt-Label">', startCentralID ); // length = 23

                    // Starting position of the ID itself
                    var startCID = startDiv + 23;

                    // Starting position of </div> after starting div
                    var endDiv = row.indexOf( '</div>', startDiv );

                    // The central ID itself
                    var CID = row.substring( startCID, endDiv );
                    if( log ) console.log( 'Central ID ' + CID );

                    // The new clickafied Central ID
                    var newCID = '<div class="gwt-Label"><a href="https://central.tri.be/issues/' + CID.replace( '#', '' ) + '" target="_blank">' + CID + '</a></div>';

                    // Replacing Central ID with the clickafied version
                    row = row.replace( '<div class="gwt-Label">' + CID + '</div>', newCID );

                    // Replacing in code
                    rows[i].innerHTML = row;

                } // if( isItLinked < 0 )

                if( log ) console.log( 'Central ID already clickafied' );

            } // if ( inReply >= 0 )
        } // for ( var i=0; i<rows.length; i++ )
    } //function clickableCentral

})();
