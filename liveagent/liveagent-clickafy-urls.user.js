// ==UserScript==
// @name         LiveAgent - Clickafy URLs
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Make the Central and Jira issue tracker IDs, the user ID, the user's website, and the sandbox site URL clickable in LiveAgent
// @author       Andras Guseo
// @include      https://support.theeventscalendar.com/agent/*
// @include      https://theeventscalendar.ladesk.com/agent/*
// @downloadURL  https://github.com/moderntribe/tampermonkey-scripts/raw/master/liveagent/liveagent-clickafy-urls.user.js
// @grant        none
// ==/UserScript==

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
            var centralIdInReply      = row.search( "Central ID" );
            var issueTrackerIdInReply = row.search( "Issue Tracker ID" );
            var siteUrlInReply        = row.search( "Site's URL" );
            var userIdInReply         = row.search( "WordPress ID" );
            var sandboxUrlInReply     = row.search( "Sandbox URL" );

            // Only run if we find the Central ID field
            if( centralIdInReply >= 0 || issueTrackerIdInReply >= 0 || siteUrlInReply >= 0 || userIdInReply >= 0 || sandboxUrlInReply >= 0 ) {

                var url, label;
                if( centralIdInReply >= 0 ) {
                    url = '';
                    label = 'Central ID';
                }
                else if( siteUrlInReply >= 0 ) {
                    url = '';
                    label = "Issue Tracker ID";
                }
                else if( siteUrlInReply >= 0 ) {
                    url = '';
                    label = "Site's URL";
                }
                else if( userIdInReply >= 0 ) {
                    url = '';
                    label = "WordPress ID";
                }
                else if( sandboxUrlInReply >= 0 ) {
                    url = '';
                    label = "Sandbox URL";
                }


                if ( log ) console.log( 'Found ' + label + ' in row ' + i );

                // Check if the link already exists
                var isItClickafied = row.search( 'clickafied' );

                // Only run if the link doesn't exist yet
                if( isItClickafied < 0 ) {

                    if( log ) console.log( label + ' not clickafied yet' );

                    // Starting position of label ("Central ID" or "Site's URL" or "WordPress ID" or "Sandbox URL" )
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
                    else if( issueTrackerIdInReply >= 0 ) {

                        /* If field value is not a URL yet then... */
                        if ( value.search( 'http' ) < 0 ) {
                            /* If it doesn't contain a dash, then it's Central */
                            if ( value.search( '-' ) < 0 ) {
                                url = 'https://central.tri.be/issues/';
                            }
                            /* Otherwise it is Jira */
                            else {
                                url = 'https://moderntribe.atlassian.net/browse/';
                            }
                        }

                        /* Remove hash character from URL (Usually Central ID) */
                        url += value.replace( '#', '' );
                    }
                    else if( siteUrlInReply >= 0 || sandboxUrlInReply >= 0 ) {
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
 * 1.0 - 2020-01-07
 * - Adjusted to make it work with both Central and Jira ticket IDs
 * - Renamed file and updated download URL
 *
 * 0.5 - 2019-09-26
 * - The script now handles Sandbox URL as well
 *
 * 0.4 - 2019-09-06
 * - The script now correctly handles central tickets with full URL
 */
})();
