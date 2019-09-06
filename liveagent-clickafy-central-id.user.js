// ==UserScript==
// @name         LiveAgent - Clickafy Central ID
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Make the Central ID, the user ID, and the user's website in the ticket box clickable
// @author       Andras Guseo
// @include      https://support.theeventscalendar.com/agent/*
// @include      https://theeventscalendar.ladesk.com/agent/*
// @downloadURL  https://raw.githubusercontent.com/moderntribe/tampermonkey-scripts/master/liveagent-clickafy-central-id.user.js
// @grant        none
// ==/UserScript==

// Check with this for site URL
// https://support.theeventscalendar.com/agent/index.php?rnd=7056#Conversation;id=0f114222

(function() {
    'use strict';

    // If you set this to true you will see log messages in the console
    var log = true;

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
            var centralIdInReply = row.search( 'Central ID' );
            var siteUrlInReply = row.search( "Site's URL" );
            var userIdInReply = row. search ("WordPress ID" );

            // Only run if we find the Central ID field
            if( centralIdInReply >= 0 || siteUrlInReply >= 0 || userIdInReply >= 0 ) {

                var url, label;
                if( centralIdInReply >= 0 ) {
                    url = '';
                    label = 'Central ID';
                }
                else if( siteUrlInReply >= 0 ) {
                    url = '';
                    label = "Site's URL";
                }
                else if( userIdInReply >= 0 ) {
                    url = '';
                    label = "WordPress ID";
                }

                if ( log ) console.log( 'Found ' + label + ' in row ' + i );

                // Check if the link already exists
                var isItClickafied = row.search( 'clickafied' );

                // Only run if the link doesn't exist yet
                if( isItClickafied < 0 ) {

                    if( log ) console.log( label + ' not clickafied yet' );

                    // Starting position of label ("Central ID" or "Site's URL" or "WordPress ID" )
                    var startLabel = parseInt( row.search( label ) );

                    // Starting position of div after label
                    var startDiv = row.indexOf( '<div class="gwt-Label">', startLabel ); // length = 23

                    // Starting position of the ID itself
                    var startValue = startDiv + 23;

                    // Starting position of </div> after starting div
                    var endDiv = row.indexOf( '</div>', startDiv );

                    // The value itself
                    var value = row.substring( startValue, endDiv );
                    if( log ) console.log( label + ' ' + value );

                    if( centralIdInReply >= 0 ) {
                        if ( value.search( 'http' ) < 0 ) {
                            url = 'https://central.tri.be/issues/';
                        }
                        url += value.replace( '#', '' );
                    }
                    else if( siteUrlInReply >= 0 ) {
                        if( value.search( 'http' ) < 0 ) {
                            url = 'http://' + value;
                        }
                        else {
                            url = value;
                        }
                    }
                    else if( userIdInReply >= 0 ) {
                        url = 'https://theeventscalendar.com/wp-admin/user-edit.php?user_id=' + value;
                    }

                    if( log ) console.log( 'x ' + label + ' ' + value + ' ' + url );

                    // The new clickafied Central ID
                    var newValue = '<div class="gwt-Label"><a href="' + url + '" target="_blank" class="clickafied">' + value + '</a></div>';
                    if( log ) console.log( newValue );

                    // Replacing Central ID with the clickafied version
                    row = row.replace( '<div class="gwt-Label">' + value + '</div>', newValue );

                    // Replacing in code
                    rows[i].innerHTML = row;

                } // if( isItClickafied < 0 )

                if( log ) console.log( label + ' already clickafied' );

            } // if ( centralIdInReply >= 0 )
        } // for ( var i=0; i<rows.length; i++ )
    } //function clickableCentral

/**
 * Changelog
 * 0.4 - 2019-09-06
 * - The script now correctly handles central tickets with full URL
 */
})();
