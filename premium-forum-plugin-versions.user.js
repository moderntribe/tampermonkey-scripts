// ==UserScript==
// @name         Premium Forum Extras - Latest plugin versions
// @namespace    https://theeventscalendar.com/
// @version      1.0
// @description  Display our plugins' latest version numbers (manually updated) and the user's version numbers from sysinfo
// @author       Andras Guseo
// @include      https://theeventscalendar.com/wp-admin/post.php?*
// @match        https://theeventscalendar.com/wp-admin/post.php?*
// @downloadURL  https://raw.githubusercontent.com/moderntribe/tampermonkey-scripts/master/premium-forum-plugin-versions.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    /**
     * Defining our plugin version history
     * When a new release is out then:
     * - make a copy of the last line
     * - adjust the starting number
     * - adjust the note: how|last (usually show the last 5 versions)
     * - add the new plugin version numbers
     * - if it is a new version compared to last release, add 'x' at the end, like '4.6.19x'
     */
    var pluginHistory = {
         0: { note: "",     date: "",       name: "",       tec: "",          pro: "",          eti: "",         etp: "",       ebt: "",       cev: "",        ctx: "",       fib: "",       apm: "",    iwp: "",      woo: "",      edd: "" },
         1: { note: "",     date: "Jan 7",  name: "M18.01", tec: "4.6.9x",    pro: "4.4.21",    eti: "4.6.3",    etp: "4.6.2",  ebt: "4.4.9",  cev: "4.5.8",   ctx: "4.5.3",  fib: "4.5.2",  apm: "4.4", iwp: "1.0.2", woo: "",      edd: "" },
         2: { note: "",     date: "Jan 22", name: "M18.02", tec: "4.6.10x",   pro: "4.4.22x",   eti: "4.6.3",    etp: "4.6.2",  ebt: "4.4.9",  cev: "4.5.8",   ctx: "4.5.3",  fib: "4.5.3x", apm: "4.4", iwp: "1.0.2", woo: "",      edd: "" },
         3: { note: "",     date: "Feb 14", name: "M18.03", tec: "4.6.11.1x", pro: "4.4.23x",   eti: "4.6.3.1x", etp: "4.6.2",  ebt: "4.4.9",  cev: "4.5.9x",  ctx: "4.5.3",  fib: "4.5.3",  apm: "4.4", iwp: "1.0.2", woo: "",      edd: "" },
         4: { note: "",     date: "Mar 8",  name: "M18.04", tec: "4.6.12x",   pro: "4.4.24.2x", eti: "4.6.3.1",  etp: "4.6.2",  ebt: "4.4.9",  cev: "4.5.9",   ctx: "4.5.3",  fib: "4.5.4x", apm: "4.4", iwp: "1.0.2", woo: "",      edd: "" },
         5: { note: "",     date: "Mar 13", name: "TC",     tec: "4.6.12",    pro: "4.4.24.2",  eti: "4.7x",     etp: "4.7x",   ebt: "4.4.9",  cev: "4.5.9",   ctx: "4.5.3",  fib: "4.5.4",  apm: "4.4", iwp: "1.0.2", woo: "",      edd: "" },
         6: { note: "",     date: "Mar 28", name: "M18.05", tec: "4.6.13x",   pro: "4.4.24.2",  eti: "4.7.1x",   etp: "4.7.1x", ebt: "4.4.9",  cev: "4.5.10x", ctx: "4.5.4x", fib: "4.5.4",  apm: "4.4", iwp: "1.0.2", woo: "",      edd: "" },
         7: { note: "",     date: "Apr 4",  name: "M18.06", tec: "4.6.14.1x", pro: "4.4.25x",   eti: "4.7.2x",   etp: "4.7.2x", ebt: "4.4.9",  cev: "4.5.11x", ctx: "4.5.4",  fib: "4.5.5x", apm: "4.4", iwp: "1.0.2", woo: "",      edd: "" },
         8: { note: "show", date: "May 9",  name: "M18.07", tec: "4.6.15x",   pro: "4.4.26x",   eti: "4.7.2",    etp: "4.7.2",  ebt: "4.4.9",  cev: "4.5.11",  ctx: "4.5.4",  fib: "4.5.5",  apm: "4.4", iwp: "1.0.2", woo: "",      edd: "" },
         9: { note: "show", date: "May 16", name: "TEC",    tec: "4.6.16x",   pro: "4.4.26",    eti: "4.7.2",    etp: "4.7.2",  ebt: "4.4.9",  cev: "4.5.11",  ctx: "4.5.4",  fib: "4.5.5",  apm: "4.4", iwp: "1.0.2", woo: "",      edd: "" },
        10: { note: "show", date: "May 29", name: "M18.08", tec: "4.6.17x",   pro: "4.4.27x",   eti: "4.7.3.1x", etp: "4.7.3x", ebt: "4.4.9",  cev: "4.5.12x", ctx: "4.5.4",  fib: "4.5.6x", apm: "4.4", iwp: "1.0.2", woo: "",      edd: "" },
        11: { note: "show", date: "Jun 4",  name: "ETR",    tec: "4.6.18x",   pro: "4.4.27",    eti: "4.7.3.1",  etp: "4.7.3",  ebt: "4.5x",   cev: "4.5.12",  ctx: "4.5.4",  fib: "4.5.6",  apm: "4.4", iwp: "1.0.2", woo: "",      edd: "" },
        12: { note: "last", date: "Jun 20", name: "M18.09", tec: "4.6.19x",   pro: "4.4.28x",   eti: "4.7.4x",   etp: "4.7.4x", ebt: "4.5.1x", cev: "4.5.12",  ctx: "4.5.4",  fib: "4.5.6",  apm: "4.4", iwp: "1.0.2", woo: "3.4.3", edd: "2.9.3" },
    };

    var pluginNames = ['tec', 'pro', 'eti', 'etp', 'ebt', 'cev', 'ctx', 'fib', 'apm', 'iwp'];

    /**
     * Defining our plugins
     * (Probably "version" here is not needed.)
     */
    var pluginVersions = {
        tec: { name: "The Events Calendar version ", version: "", curr: "#currtecver", user: "#usertecver" },
        pro: { name: "The Events Calendar PRO version ", version: "", curr: "#currprover", user: "#userprover" },
        eti: { name: "Event Tickets version ", version: "", curr: "#curretiver", user: "#useretiver" },
        etp: { name: "Event Tickets Plus version ", version: "", curr: "#curretpver", user: "#useretpver" },
        ebt: { name: "The Events Calendar: Eventbrite Tickets version ", version: "", curr: "#currebtver", user: "#userebtver" },
        cev: { name: "The Events Calendar: Community Events version ", version: "", curr: "#currcevver", user: "#usercevver" },
        ctx: { name: "The Events Calendar: Community Events Tickets version ", version: "", curr: "#currctxver", user: "#userctxver" },
        fib: { name: "The Events Calendar: Filter Bar version ", version: "", curr: "#currfibver", user: "#userfibver" },
        apm: { name: "Advanced Post Manager version ", version: "", curr: "#currapmver", user: "#userapmver" },
        iwp: { name: "Image Widget Plus version ", version: "", curr: "#curriwpver", user: "#useriwpver" },
        woo: { name: "WooCommerce version ", version:"", curr: "#currecmver", user: "#userecmver" },
        edd: { name: "Easy Digital Downloads version ", version:"", curr: "#currecmver", user: "#userecmver" }
    };

    /**
     * i          = contains the sysinfo from the sysinfo box
     * k          = counter
     * inReply    = returns a positive if sysinfo is submitted/found in a reply
     * replyHtml  = stores the HTML of a reply in the cycle
     * ecmUsed    = stores the string of the eCommerce solution used by the client (woo|edd)
     * userEcmVer = stores the version number of the eCommerce solution used by the client
     */
    var i, k, inReply, replyHtml, ecmUsed, userEcmVer;

    /**
     * Getting the system info in a string
     * fullstats = contains the full html string of the sysinfo box
     */
    i = document.getElementsByClassName( 'system-info' );
    if ( i.length > 0 ) {
        var fullstats;
        fullstats = i[0].innerHTML;
    }

    /**
     * If system information is submitted in a reply, take that instead
     * Go from the last reply forward
     * replies = array containing all the replies
     */
    var replies = document.getElementsByClassName( 'bbp-reply-content' );
    for ( k = replies.length-1; k >= 0; k-- ) {
        replyHtml = replies[k].innerHTML;
        // Search for the string "Home URL" case insensitive
        inReply = replyHtml.search( /home url/i );
        if ( inReply >= 0 ) {
            fullstats = replyHtml;
            break;
        }
    }

    // If there is no sysinfo, then stop the execution of the scirpt
    if ( typeof fullstats == 'undefined' ) return;

    /**
     * j      = counter
     * pname  = plugin name + plugin name length = start of version number
     * pby    = start of by | end of version number
     * pver   = version number string
     * result = ???
     */
    var j, pname, pby, pver;
    var result = "";

    /**
     * Going through the array and checking for our plugins in system info
     * key = the short name of the plugin
     */
    for( var key in pluginVersions ) {

        // This is the for-cycle for named arrays
        if ( pluginVersions.hasOwnProperty( key ) ) {

            // If plugin name is found in the sysinfo ...
            pname = fullstats.indexOf( pluginVersions[key].name );
            if ( pname != -1 ) {
                // Starting position of version number = start of plugin name + plugin name length
                pname = fullstats.indexOf( pluginVersions[key].name ) + pluginVersions[key].name.length;
                // Starting position of by (after the plugin name) | end of version number
                pby = fullstats.indexOf( "by", pname );
                // Get version number only
                pver = fullstats.substring( pname, pby );
                // Trim it
                pluginVersions[key].version = pver.trim();
                // Which eCommerce used?
                if ( key == "woo" || key == "edd" ) {
                    ecmUsed = key;
                }
            }
            // If plugin name is not found in the sysinfo
            else {
                pluginVersions[key].version = "-";
            }
        }
    }

    /**
     * Table of the plugin versions
     */
    var htmlstring = '<div id="plugin-versions">';

    htmlstring += '<style>.versions td { padding: 0 5px !important; border-right: 1px solid white;line-height: 1.5em !important; font-size: 90% !important; } .versions td.new-version{ background-color:grey; } .versions td img {width: 40px !important;} .versions tr.first-row td {text-align: center;}</style>';
    htmlstring += '<table width="100%" class="versions" cellpadding="0" cellspacing="0">';

    // Header row
    htmlstring += '<tr class="row first-row alwayson"><td></td><td></td><td><img src="https://andrasguseo.com/images/tec.png" title="TEC" alt="TEC" /></td><td><img src="https://andrasguseo.com/images/ecpro.png" title="PRO" alt="PRO" /></td><td><img src="https://andrasguseo.com/images/et.png" title="ET" alt="ET" /></td><td><img src="https://andrasguseo.com/images/et+.png" title="ET+" alt="ET+" /></td><td><img src="https://andrasguseo.com/images/ebt.png" title="Eventbrite" alt="Eventbrite" /></td><td><img src="https://andrasguseo.com/images/ce.png" title="CommEvents" alt="CommEvents" /></td><td><img src="https://andrasguseo.com/images/ct.png" title="CommTix" alt="CommTix" /></td><td><img src="https://andrasguseo.com/images/fb.png" title="Filter Bar" alt="Filter Bar" /></td><td>APM</td><td>IW+</td><td>';
    htmlstring += ecmUsed.toUpperCase();
    htmlstring += '</td></tr>';

    // Go through the plugin history row by row
    for( var number in pluginHistory ) {

        // Check if it has a note
        if ( pluginHistory.hasOwnProperty( number ) && ( pluginHistory[number].note == 'show' || pluginHistory[number].note == 'last' ) ) {
            htmlstring += '<tr class="row';
            // For the last row add additional classes
            if( pluginHistory[number].note == 'last' ) {
                htmlstring += ' last-row alwayson';
            }
            htmlstring += '">';
            htmlstring += '<td>' + pluginHistory[number].date + '</td>';
            htmlstring += '<td>' + pluginHistory[number].name + '</td>';

            /**
             * Go through all the plugins
             * pN = stores the plugin name so we can refer to it
             */
            for ( j = 0; j < pluginNames.length; j++ ) {
                var pN = pluginNames[j];

                // Open the cell
                htmlstring += '<td';

                // If plugin version number has 'x', then it's a new release, so add extra class
                if( pluginHistory[number][pN].includes( "x" ) ) {
                    htmlstring += ' class="new-version"';
                }

                // If it's the last row, then add the IDs
                if ( pluginHistory[number].note == 'last' ) {
                    htmlstring += ' id="curr' + pN + 'ver"';
                }

                // Print the version number and close the cell
                htmlstring += '>' + pluginHistory[number][pN].replace( 'x', '' ) + '</td>';
            } // end for ( j = 0; j < pluginNames.length; j++ )

            // eCommerce versions
            htmlstring += '<td';
            if ( pluginHistory[number].note == 'last' ) {
                htmlstring += ' id="currecmver"';
            }
            htmlstring += '>';
            if ( ecmUsed == "woo" ) {
                htmlstring += pluginHistory[number].woo;
                userEcmVer = pluginVersions.woo.version
            }
            else if ( ecmUsed == "edd" ) {
                htmlstring += pluginHistory[number].edd;
                userEcmVer = pluginVersions.edd.version
            }
            else {
                htmlstring += '-';
            }
            htmlstring += '</td></tr>';

        } // end if ( pluginHistory.hasOwnProperty( number ) && ( pluginHistory[number].note == 'show' || pluginHistory[number].note == 'last' ) )

    } // end for( var number in pluginHistory )

    // Row of user's version numbers
    htmlstring += '<tr class="row last-row alwayson userrow"><td>user</td><td>' + $( '#bbps_extra_info .displayname' ).html() + '</td><td id="usertecver">' + pluginVersions.tec.version + '</td><td id="userprover">' + pluginVersions.pro.version + '</td><td id="useretiver">' + pluginVersions.eti.version + '</td><td id="useretpver">' + pluginVersions.etp.version + '</td><td id="userebtver">' + pluginVersions.ebt.version + '</td><td id="usercevver">' + pluginVersions.cev.version + '</td><td id="userctxver">' + pluginVersions.ctx.version + '</td><td id="userfibver">' + pluginVersions.fib.version + '</td><td id="userapmver">' + pluginVersions.apm.version + '</td><td id="useriwpver">' + pluginVersions.iwp.version + '</td><td id="userecmver">' + userEcmVer + '</td></tr>';
    htmlstring += '</table>';
    htmlstring += '</div>';

    // Formatting
    $( '#wp-admin-bar-top-secondary' ).after( htmlstring );
    $( '#plugin-versions' ).css({ 'position': 'fixed', 'bottom': '0', 'right': '150px', 'background-color': 'rgb(35, 40, 45)', 'color': '#eee' });
    $( '.versions td' ).css({ 'line-height': '1.5em !important' });
    $( '.version-number' ).css({ 'font-weight': 'bold' });
    $( '.row' ).css({ 'display': 'none', 'text-align': 'center' });
    $( '.alwayson' ).css({ 'display': 'table-row' });

    // Handle hover
    if ( document.getElementById( 'plugin-versions' ) != null ) {
        document.getElementById( 'plugin-versions' ).addEventListener( 'mouseover', showRows );
        document.getElementById( 'plugin-versions' ).addEventListener( 'mouseout', hideRows );
    }

    // Compare current and user, and color it
    for( var plugin in pluginVersions ) {
        // This is the for-cycle for named arrays
        if ( pluginVersions.hasOwnProperty( plugin ) && pluginVersions[plugin].version != "-" ) {
            if ( $( pluginVersions[plugin].curr ).html() == pluginVersions[plugin].version ) {
                $( pluginVersions[plugin].user ).css({ 'color': '#2dd39c', 'font-weight': 'bold' });
            }
            else {
                $( pluginVersions[plugin].user ).css({ 'color': '#e4554a', 'font-weight': 'bold' });
            }
        }
    }

    /* Hover/unhover actions */
    function showRows() {
        $( '.row' ).css({ 'display': 'table-row ' });
    }
    function hideRows() {
        $( '.row' ).css({ 'display': 'none' });
        $( '.alwayson' ).css({ 'display': 'table-row' });
    }

})();
