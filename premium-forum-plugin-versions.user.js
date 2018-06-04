// ==UserScript==
// @name         Premium Forum Extras - Latest plugin versions
// @namespace    https://theeventscalendar.com/
// @version      0.8
// @description  Display our plugins' latest version numbers (manually updated) and the user's version numbers from sysinfo
// @author       Andras Guseo
// @include      https://theeventscalendar.com/wp-admin/post.php?*
// @match        https://theeventscalendar.com/wp-admin/post.php?*
// @downloadURL  https://raw.githubusercontent.com/moderntribe/tampermonkey-scripts/master/premium-forum-plugin-versions.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function showRows() {
        $('.row').css({ 'display': 'table-row '});
    }
    function hideRows() {
        $('.row').css({ 'display': 'none'});
        $('.alwayson').css({ 'display': 'table-row'});
    }

    // Getting the system info in a string
    var i = document.getElementsByClassName( 'system-info' );
    console.log('one' + i.length);
    var fullstats = i[0].innerHTML;

    // Defining our plugins
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
    };

    var j, pname, pby, pver;
    var result = "";

    // Going through the array and checking for our plugins in system info
    for( var key in pluginVersions ) {

        // This is the for-cycle for named arrays
        if ( pluginVersions.hasOwnProperty( key ) ) {

            // If plugin exists ...
            pname = fullstats.indexOf( pluginVersions[key].name );
            if ( pname != -1 ) {
                // start of plugin name + plugin name length = start of version number
                pname = fullstats.indexOf( pluginVersions[key].name )+ pluginVersions[key].name.length;
                // start of by | end of version number
                pby = fullstats.indexOf( "by", pname );
                // version number only
                pver = fullstats.substring ( pname, pby );
                // trim it
                pluginVersions[key].version = pver.trim();
            }
            // If plugin doesn't exist
            else {
                pluginVersions[key].version = "-";
            }
        }
    }

    // Table for current and past versions
    var htmlstring = '<div id="plugin-versions">';

    htmlstring += '<style>.versions td { padding: 0 5px !important; border-right: 1px solid white;line-height: 1.5em !important; font-size: 90% !important; } .versions td.new-version{ background-color:grey; } .versions td img {width: 40px !important;} .versions tr.first-row td {text-align: center;}</style>';
    htmlstring += '<table width="100%" class="versions" cellpadding="0" cellspacing="0">';

    htmlstring += '<tr class="row first-row alwayson"><td></td><td></td><td><img src="https://andrasguseo.com/images/tec.png" title="TEC" alt="TEC" /></td><td><img src="https://andrasguseo.com/images/ecpro.png" title="PRO" alt="PRO" /></td><td><img src="https://andrasguseo.com/images/et.png" title="ET" alt="ET" /></td><td><img src="https://andrasguseo.com/images/et+.png" title="ET+" alt="ET+" /></td><td><img src="https://andrasguseo.com/images/ebt.png" title="Eventbrite" alt="Eventbrite" /></td><td><img src="https://andrasguseo.com/images/ce.png" title="CommEvents" alt="CommEvents" /></td><td><img src="https://andrasguseo.com/images/ct.png" title="CommTix" alt="CommTix" /></td><td><img src="https://andrasguseo.com/images/fb.png" title="Filter Bar" alt="Filter Bar" /></td><td>APM</td><td>IW+</td></tr>';

    htmlstring += '<tr class="row"><td>Mar 28</td><td>M18.05</td><td class="new-version">4.6.13</td><td>4.4.24.2</td><td class="new-version">4.7.1</td><td class="new-version">4.7.1</td><td>4.4.9</td><td class="new-version">4.5.10</td><td class="new-version">4.5.4</td><td>4.5.4</td>	<td>4.4</td><td>1.0.2</td></tr>';
    htmlstring += '<tr class="row"><td> Apr 4</td><td>M18.06</td><td class="new-version">4.6.14.1</td><td class="new-version">4.4.25</td>	<td class="new-version">4.7.2</td>	<td class="new-version">4.7.2</td>	<td>4.4.9</td>	<td class="new-version">4.5.11</td>	<td>4.5.4</td>	<td class="new-version">4.5.5</td>	<td>4.4</td>	<td>1.0.2</td>	</tr>';
    htmlstring += '<tr class="row"><td> May 9</td><td>M18.07</td><td class="new-version">4.6.15</td><td class="new-version">4.4.26</td>	<td>4.7.2</td>	<td>4.7.2</td>	<td>4.4.9</td>	<td>4.5.11</td>	<td>4.5.4</td>	<td>4.5.5</td>	<td>4.4</td>	<td>1.0.2</td>	</tr>';
    htmlstring += '<tr class="row"><td>May 16</td><td>TEC   </td><td class="new-version">4.6.16</td><td>4.4.26</td>	<td>4.7.2</td>	<td>4.7.2</td>	<td>4.4.9</td>	<td>4.5.11</td>	<td>4.5.4</td>	<td>4.5.5</td>	<td>4.4</td>	<td>1.0.2</td>	</tr>';
    htmlstring += '<tr class="row last-row alwayson"><td>May 29</td><td>M18.08</td><td class="new-version" id="currtecver">4.6.17</td><td id="currprover" class="new-version">4.4.27</td><td class="new-version" id="curretiver">4.7.3.1</td><td id="curretpver" class="new-version">4.7.3</td><td id="currebtver">4.4.9</td><td id="currcevver" class="new-version">4.5.12</td><td id="currctxver">4.5.4</td><td id="currfibver" class="new-version">4.5.6</td><td id="currapmver">4.4</td><td id="curriwpver">1.0.2</td></tr>';

    // Row of user's version numbers
    htmlstring += '<tr class="row last-row alwayson userrow"><td>user</td><td>' + $( '#bbps_extra_info .displayname' ).html() + '</td><td id="usertecver">' + pluginVersions.tec.version + '</td><td id="userprover">' + pluginVersions.pro.version + '</td><td id="useretiver">' + pluginVersions.eti.version + '</td><td id="useretpver">' + pluginVersions.etp.version + '</td><td id="userebtver">' + pluginVersions.ebt.version + '</td><td id="usercevver">' + pluginVersions.cev.version + '</td><td id="userctxver">' + pluginVersions.ctx.version + '</td><td id="userfibver">' + pluginVersions.fib.version + '</td><td id="userapmver">' + pluginVersions.apm.version + '</td><td id="useriwpver">' + pluginVersions.iwp.version + '</td></tr>';
    htmlstring += '</table>';
    htmlstring += '</div>';

    // Formatting
    $('#wp-admin-bar-top-secondary').after(htmlstring);
    $('#plugin-versions').css({ 'position': 'fixed', 'bottom': '0', 'right': '150px', 'background-color': 'rgb(35, 40, 45)', 'color': '#eee' });
    $('.versions td').css({ 'line-height': '1.5em !important' });
    $('.version-number').css({ 'font-weight': 'bold' });
    $('.row').css({ 'display': 'none', 'text-align': 'center' });
    $('.alwayson').css({ 'display': 'table-row'});
    //jQuery('.userrow').css({ 'text-align': 'right'});

    // Handle hover
    if ( document.getElementById('plugin-versions') != null ) {
        document.getElementById('plugin-versions').addEventListener("mouseover", showRows );
        document.getElementById('plugin-versions').addEventListener("mouseout", hideRows);
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

})();