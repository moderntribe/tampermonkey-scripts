// ==UserScript==
// @name         LiveAgent - Clickafy URLs
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Make the Central and Jira issue tracker IDs, the user ID, the user's website, and the sandbox site URL clickable in LiveAgent
// @author       Andras Guseo
// @include      https://support.theeventscalendar.com/agent/*
// @include      https://theeventscalendar.ladesk.com/agent/*
// @downloadURL  https://github.com/moderntribe/tampermonkey-scripts/raw/master/liveagent/liveagent-clickafy-urls.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // If you set this to true you will see log messages in the console
    var log = false;
    if (log) console.log('Starting Clickafy Script');

    // Run the script every 5 seconds. This is necessary due to the dynamic nature of LiveAgent
    var startScript = window.setInterval(clickableCentral, 5000);

    var fields = ["Central ID", "Issue Tracker ID", "Site's URL", "WordPress ID", "Sandbox URL"];
    var field = "",
        url = "";

    function clickableCentral() {

        // Get the rows is an object
        var rows = document.getElementsByClassName('gwt-TextBox');

        // Walk the object
        for (var i = 0; i < rows.length; i++) {

            // Get the HTML from the row
            field = rows[i].name;

            // If it's not a field we're looking for, then skip.
            if (fields.indexOf(field) < 0) {
                if (log) console.log('Skipped. Field not in array: ' + field);
                continue;
            }

            // Create the id for the field
            var id = field.toLowerCase().replace(' ', '-').replace("'", '');
            if (log) console.log('ID: ' + id);

            // Check if the ID exists. If it exists it means we already created it, so skip.
            if (null != document.getElementById(id)) {
                if (log) console.log('Skipped at ID: ' + id);
                continue;
            }

            // Now we can start creating...

            // Get the value of the field
            var val = rows[i].value;
            if (log) console.log(field + ': ' + val);

            // If they are URLs, then use the value
            if (val.search('http') >= 0) {
                if (log) console.log("Found 'http', using value as URL. . " + val);
                url = val;
            } else if (field == "Site's URL") {
                if (log) console.log("Found Site's URL - " + val);
                url = 'https://' + val;
            } else if (field == "WordPress ID") {
                if (log) console.log("Found WordPress ID - " + val);
                url = 'https://theeventscalendar.com/wp-admin/user-edit.php?user_id=' + val;
            } else if (field == "Issue Tracker ID" || field == "Central ID") {
                if (log) console.log("Found Issue Tracker ID - " + val);
                /* If it doesn't contain a dash, then it's Central */
                if (val.search('-') < 0) {
                    if (log) console.log("Found Central - " + val);
                    url = 'https://central.tri.be/issues/';
                }
                /* Otherwise it is Jira */
                else {
                    if (log) console.log("Found Jira - " + val);
                    url = 'https://moderntribe.atlassian.net/browse/';
                }
                url = url + val;
            }

            //Creating the container.
            var linkContainer = document.createElement('span');
            linkContainer.id = id;
            linkContainer.innerHTML = '<a href="' + url + '" target="_blank" title="Open link in new window">👁️</a>';
            linkContainer.style = 'position: absolute; right: 10px; z-index: 9;';
            rows[i].parentNode.insertBefore(linkContainer, rows[i]);

        } // for ( var i=0; i<rows.length; i++ )
    } //function clickableCentral

    /**
     * Changelog
     * 2.0 - 2020-09-23
     * - Re-wrote the script to make it work with updated LiveAgent fields
     *
     * 1.1 - 2020-01-14
     * - Fixed a glitch where the user's site URL was added to the Jira Issue Tracker URL
     *
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
