// ==UserScript==
// @name         LiveAgent - Latest plugin versions
// @namespace    https://theeventscalendar.com/
// @version      2.9.0.0
// @description  Display our plugins' latest version numbers.
// @author       Andras Guseo
// @include      https://theeventscalendar.ladesk.com/agent/*
// @include      https://support.theeventscalendar.com/agent/*
// @downloadURL  https://raw.githubusercontent.com/moderntribe/tampermonkey-scripts/master/liveagent-plugin-versions.user.js
// @grant        none
// ==/UserScript==

/**
 Versioning:
 First digit:  only changes when year changes. 2 = 2019
 Second digit: corresponds to which MR we just shipped. First MR of the year -> 1
 Third digit:  increment when a hotfix or a feature release is out
 Fourth digit: bugfix or feature for the script
 */
(function() {
    'use strict';

    var log = false;

    if ( log ) console.log ( alreadydone );
    if ( log ) console.log ( typeof alreadydone );

    // Only run if it wasn't executed before
    if ( typeof alreadydone == 'undefined') {

        var alreadydone = true;

        if ( log ) console.log ( typeof alreadydone );

        /**
         * j      = counter
         * Left for the future
         * pname  = plugin name + plugin name length = start of version number
         * pby    = start of by | end of version number
         * pver   = version number string
         */
        var j, pname, pby, pver;

        /**
         * Defining our plugin version history
         * When a new release is out then:
         * - update script version number in the header
         * - make a copy of the last line in the below array
         * - increase the starting number
         * - adjust the note: show|last (usually show the last 3 versions)
         * - add the new date, release number, and plugin version numbers
         * - if it is a new version compared to last release, add 'x' at the end, like '4.6.19x'. Woo and EDD do not get tagged with 'x'
         * - if it is a hotfix, then creating a new line is not needed, just update the version number in the last line (See Event Tickets (eti) in line 12)
         */
        var pluginHistory = {
            0: { note: "",      date: "",       name: "",       tec: "",          pro: "",          eti: "",          etp: "",          ebt: "",       cev: "",          ctx: "",         fib: "",         apm: "",     iwp: "",       woo: "",      edd: "" },
            1: { note: "",      date: "Jan 7",  name: "M18.01", tec: "4.6.9x",    pro: "4.4.21",    eti: "4.6.3",     etp: "4.6.2",     ebt: "4.4.9",  cev: "4.5.8",     ctx: "4.5.3",    fib: "4.5.2",    apm: "4.4",  iwp: "1.0.2",  woo: "",      edd: "" },
            2: { note: "",      date: "Jan 22", name: "M18.02", tec: "4.6.10x",   pro: "4.4.22x",   eti: "4.6.3",     etp: "4.6.2",     ebt: "4.4.9",  cev: "4.5.8",     ctx: "4.5.3",    fib: "4.5.3x",   apm: "4.4",  iwp: "1.0.2",  woo: "",      edd: "" },
            3: { note: "",      date: "Feb 14", name: "M18.03", tec: "4.6.11.1x", pro: "4.4.23x",   eti: "4.6.3.1x",  etp: "4.6.2",     ebt: "4.4.9",  cev: "4.5.9x",    ctx: "4.5.3",    fib: "4.5.3",    apm: "4.4",  iwp: "1.0.2",  woo: "",      edd: "" },
            4: { note: "",      date: "Mar 8",  name: "M18.04", tec: "4.6.12x",   pro: "4.4.24.2x", eti: "4.6.3.1",   etp: "4.6.2",     ebt: "4.4.9",  cev: "4.5.9",     ctx: "4.5.3",    fib: "4.5.4x",   apm: "4.4",  iwp: "1.0.2",  woo: "",      edd: "" },
            5: { note: "",      date: "Mar 13", name: "TC",     tec: "4.6.12",    pro: "4.4.24.2",  eti: "4.7x",      etp: "4.7x",      ebt: "4.4.9",  cev: "4.5.9",     ctx: "4.5.3",    fib: "4.5.4",    apm: "4.4",  iwp: "1.0.2",  woo: "",      edd: "" },
            6: { note: "",      date: "Mar 28", name: "M18.05", tec: "4.6.13x",   pro: "4.4.24.2",  eti: "4.7.1x",    etp: "4.7.1x",    ebt: "4.4.9",  cev: "4.5.10x",   ctx: "4.5.4x",   fib: "4.5.4",    apm: "4.4",  iwp: "1.0.2",  woo: "",      edd: "" },
            7: { note: "",      date: "Apr 4",  name: "M18.06", tec: "4.6.14.1x", pro: "4.4.25x",   eti: "4.7.2x",    etp: "4.7.2x",    ebt: "4.4.9",  cev: "4.5.11x",   ctx: "4.5.4",    fib: "4.5.5x",   apm: "4.4",  iwp: "1.0.2",  woo: "",      edd: "" },
            8: { note: "",      date: "May 9",  name: "M18.07", tec: "4.6.15x",   pro: "4.4.26x",   eti: "4.7.2",     etp: "4.7.2",     ebt: "4.4.9",  cev: "4.5.11",    ctx: "4.5.4",    fib: "4.5.5",    apm: "4.4",  iwp: "1.0.2",  woo: "",      edd: "" },
            9: { note: "",      date: "May 16", name: "TEC",    tec: "4.6.16x",   pro: "4.4.26",    eti: "4.7.2",     etp: "4.7.2",     ebt: "4.4.9",  cev: "4.5.11",    ctx: "4.5.4",    fib: "4.5.5",    apm: "4.4",  iwp: "1.0.2",  woo: "",      edd: "" },
            10: { note: "",     date: "May 29", name: "M18.08", tec: "4.6.17x",   pro: "4.4.27x",   eti: "4.7.3.1x",  etp: "4.7.3x",    ebt: "4.4.9",  cev: "4.5.12x",   ctx: "4.5.4",    fib: "4.5.6x",   apm: "4.4",  iwp: "1.0.2",  woo: "",      edd: "" },
            11: { note: "",     date: "Jun 4",  name: "ETR",    tec: "4.6.18x",   pro: "4.4.27",    eti: "4.7.3.1",   etp: "4.7.3",     ebt: "4.5x",   cev: "4.5.12",    ctx: "4.5.4",    fib: "4.5.6",    apm: "4.4",  iwp: "1.0.2",  woo: "",      edd: "" },
            12: { note: "",     date: "Jun 20", name: "M18.09", tec: "4.6.19x",   pro: "4.4.28x",   eti: "4.7.4.1x",  etp: "4.7.4x",    ebt: "4.5.1x", cev: "4.5.12",    ctx: "4.5.4",    fib: "4.5.6",    apm: "4.4",  iwp: "1.0.2",  woo: "3.4.3", edd: "2.9.3" },
            13: { note: "",     date: "Jul 9",  name: "M18.10", tec: "4.6.20.1x", pro: "4.4.29.2x", eti: "4.7.5.1x",  etp: "4.7.5x",    ebt: "4.5.1",  cev: "4.5.12",    ctx: "4.5.4",    fib: "4.5.6",    apm: "4.4",  iwp: "1.0.2",  woo: "3.4.3", edd: "2.9.3" },
            14: { note: "",     date: "Aug 1",  name: "M18.11", tec: "4.6.21x",   pro: "4.4.30.1x", eti: "4.7.6x",    etp: "4.7.6x",    ebt: "4.5.2x", cev: "4.5.13x",   ctx: "4.5.5x",   fib: "4.5.7x",   apm: "4.4",  iwp: "1.0.2",  woo: "3.4.4", edd: "2.9.6" },
            15: { note: "",     date: "Aug 22", name: "M18.12", tec: "4.6.22.1x", pro: "4.4.31x",   eti: "4.8x",      etp: "4.8x",      ebt: "4.5.2",  cev: "4.5.13.1x", ctx: "4.5.6x",   fib: "4.5.7",    apm: "4.4",  iwp: "1.0.2",  woo: "3.4.4", edd: "2.9.6" },
            16: { note: "",     date: "Sep 12", name: "M18.13", tec: "4.6.23x",   pro: "4.4.32x",   eti: "4.8.1x",    etp: "4.8.1x",    ebt: "4.5.3x", cev: "4.5.13.1",  ctx: "4.5.6",    fib: "4.5.8x",   apm: "4.4",  iwp: "1.0.2",  woo: "3.4.5", edd: "2.9.7" },
            17: { note: "",     date: "Oct 3",  name: "M18.14", tec: "4.6.24.1x", pro: "4.4.33x",   eti: "4.8.2x",    etp: "4.8.2x",    ebt: "4.5.4x", cev: "4.5.13.1",  ctx: "4.5.6",    fib: "4.5.8",    apm: "4.4",  iwp: "1.0.2",  woo: "3.4.5", edd: "2.9.8" },
            18: { note: "",     date: "Oct 22", name: "M18.15", tec: "4.6.25x",   pro: "4.4.34x",   eti: "4.8.3x",    etp: "4.8.3x",    ebt: "4.5.5x", cev: "4.5.13.1",  ctx: "4.5.6",    fib: "4.5.8",    apm: "4.4",  iwp: "1.0.2",  woo: "3.5.0", edd: "2.9.8" },
            19: { note: "",     date: "Nov 13", name: "M18.16", tec: "4.6.26.1x", pro: "4.4.35x",   eti: "4.8.4.1x",  etp: "4.8.3",     ebt: "4.5.6x", cev: "4.5.14x",   ctx: "4.5.6",    fib: "4.5.8",    apm: "4.4",  iwp: "1.0.2",  woo: "3.5.1", edd: "2.9.8" },
            20: { note: "",     date: "Nov 29", name: "F18.03", tec: "4.7.0.1x",  pro: "4.5x",      eti: "4.9.0.2x",  etp: "4.9x",      ebt: "4.5.6",  cev: "4.5.14",    ctx: "4.5.6",    fib: "4.5.8",    apm: "4.4",  iwp: "1.0.2",  woo: "3.5.2", edd: "2.9.8" },
            21: { note: "",     date: "Dec 5",  name: "M18.17", tec: "4.7.1x",    pro: "4.5",       eti: "4.9.1x",    etp: "4.9",       ebt: "4.5.6",  cev: "4.5.15x",   ctx: "4.5.7x",   fib: "4.5.9x",   apm: "4.4",  iwp: "1.0.2",  woo: "3.5.2", edd: "2.9.9" },
            22: { note: "",     date: "Dec 13", name: "M18.18", tec: "4.7.2x",    pro: "4.5.1x",    eti: "4.9.2x",    etp: "4.9",       ebt: "4.5.6",  cev: "4.5.15",    ctx: "4.5.7",    fib: "4.5.9",    apm: "4.4",  iwp: "1.0.2",  woo: "3.5.2", edd: "2.9.10" },
            23: { note: "",     date: "Dec 19", name: "M18.19", tec: "4.7.3x",    pro: "4.5.2.1x",  eti: "4.9.3x",    etp: "4.9.1x",    ebt: "4.5.6",  cev: "4.5.15",    ctx: "4.5.7",    fib: "4.5.9",    apm: "4.4",  iwp: "1.0.2",  woo: "3.5.3", edd: "2.9.10" },
            24: { note: "",     date: "Jan 15", name: "G19.01", tec: "4.7.3",     pro: "4.5.2.1",   eti: "4.9.4x",    etp: "4.9.2x",    ebt: "4.5.6",  cev: "4.5.16x",   ctx: "4.5.7",    fib: "4.5.9",    apm: "4.4",  iwp: "1.0.2",  woo: "3.5.3", edd: "2.9.10" },
            25: { note: "",     date: "Jan 21", name: "B19.01", tec: "4.7.4x",    pro: "4.5.3x",    eti: "4.9.4",     etp: "4.9.2",     ebt: "4.5.7x", cev: "4.5.16",    ctx: "4.5.7",    fib: "4.5.9",    apm: "4.4",  iwp: "1.0.2",  woo: "3.5.4", edd: "2.9.11" },
            26: { note: "",     date: "Feb 5",  name: "F19.01", tec: "4.8.0.1x",  pro: "4.6x",      eti: "4.10.0.1x", etp: "4.10.0.2x", ebt: "4.6x",   cev: "4.6x",      ctx: "4.6x",     fib: "4.6x",     apm: "4.4",  iwp: "1.0.2",  woo: "3.5.4", edd: "2.9.11" },
            27: { note: "",     date: "Feb 14", name: "B19.02", tec: "4.8.1x",    pro: "4.6.1x",    eti: "4.10.0.1",  etp: "4.10.0.2",  ebt: "4.6.1x", cev: "4.6",       ctx: "4.6",      fib: "4.6",      apm: "4.5x", iwp: "1.0.3x", woo: "3.5.4", edd: "2.9.11" },
            28: { note: "",     date: "Feb 26", name: "G19.03", tec: "4.8.1",     pro: "4.6.1",     eti: "4.10.1x",   etp: "4.10.1x",   ebt: "4.6.1",  cev: "4.6.1x",    ctx: "4.6.1x",   fib: "4.6",      apm: "4.5",  iwp: "1.0.3",  woo: "3.5.5", edd: "2.9.11" },
            29: { note: "",     date: "Mar 4",  name: "B19.03", tec: "4.8.2x",    pro: "4.6.2.1x",  eti: "4.10.1.2x", etp: "4.10.1.3x", ebt: "4.6.2x", cev: "4.6.1.1x",  ctx: "4.6.1.1x", fib: "4.7x",     apm: "4.5",  iwp: "1.0.3",  woo: "3.5.5", edd: "2.9.11" },
            30: { note: "show", date: "Apr 1",  name: "G19.04", tec: "4.8.2",     pro: "4.6.2.1",   eti: "4.10.2x",   etp: "4.10.2x",   ebt: "4.6.2",  cev: "4.6.1.2x",  ctx: "4.6.1.2x", fib: "4.7.0.1x", apm: "4.5",  iwp: "1.0.3",  woo: "3.5.7", edd: "2.9.12" },
            31: { note: "show", date: "Apr 17", name: "ORM",    tec: "4.9x",      pro: "4.7x",      eti: "4.10.3x",   etp: "4.10.2",    ebt: "4.6.2",  cev: "4.6.1.2",   ctx: "4.6.1.2",  fib: "4.8x",     apm: "4.5",  iwp: "1.0.3",  woo: "3.6.1", edd: "2.9.12" },
            32: { note: "last", date: "Apr 23", name: "G19.05", tec: "4.9.0.3x",  pro: "4.7.0.1x",  eti: "4.10.4.3x", etp: "4.10.3x",   ebt: "4.6.2",  cev: "4.6.1.2",   ctx: "4.6.1.2",  fib: "4.8",      apm: "4.5",  iwp: "1.0.3",  woo: "3.6.1", edd: "2.9.12" },
        };

        //var pluginNames = ['tec', 'pro', 'eti', 'etp', 'ebt', 'cev', 'ctx', 'fib', 'apm', 'iwp'];

        // The number of releases
        var rowNumber = Object.keys(pluginHistory).length;

        // This will show one more line on the first click.
        // It is 2 b/c the object starts with 0 but the nth-child starts with 1.
        // After hiding this is set back to the initial value.
        var rowCounter = 2;

        // Show this many more lines with every subsequent click.
        var xMore = 3;

        // Added Woo and EDD for static version
        var pluginNames = ['tec', 'pro', 'eti', 'etp', 'ebt', 'cev', 'ctx', 'fib', 'apm', 'iwp', 'woo', 'edd'];

        /**
         * Defining our plugins
         * (Probably "version" here is not needed.)
         */
        var pluginVersions = {
            tec: { name: '(The Events Calendar version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Modern Tribe, Inc.)',                           namelength: '28', version: '', curr: '#currtecver', user: '#usertecver' },
            pro: { name: '(Events Calendar PRO version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Modern Tribe, Inc.)',                           namelength: '28', version: '', curr: '#currprover', user: '#userprover' },
            eti: { name: '(Event Tickets version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Modern Tribe, Inc.)',                                 namelength: '22', version: '', curr: '#curretiver', user: '#useretiver' },
            etp: { name: '(Event Tickets Plus version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Modern Tribe, Inc.)',                            namelength: '27', version: '', curr: '#curretpver', user: '#useretpver' },
            ebt: { name: '(The Events Calendar: Eventbrite Tickets version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Modern Tribe, Inc.)',       namelength: '48', version: '', curr: '#currebtver', user: '#userebtver' },
            cev: { name: '(The Events Calendar: Community Events version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Modern Tribe, Inc.)',         namelength: '46', version: '', curr: '#currcevver', user: '#usercevver' },
            ctx: { name: '(The Events Calendar: Community Events Tickets version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Modern Tribe, Inc.)', namelength: '54', version: '', curr: '#currctxver', user: '#userctxver' },
            fib: { name: '(The Events Calendar: Filter Bar version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Modern Tribe, Inc.)',               namelength: '40', version: '', curr: '#currfibver', user: '#userfibver' },
            apm: { name: '(Advanced Post Manager version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Modern Tribe, Inc.)',                         namelength: '30', version: '', curr: '#currapmver', user: '#userapmver' },
            iwp: { name: '(Image Widget Plus version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Modern Tribe, Inc.)',                             namelength: '26', version: '', curr: '#curriwpver', user: '#useriwpver' },
            woo: { name: '(WooCommerce version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Automattic)',                                           namelength: '20', version: '', curr: '#currecmver', user: '#userecmver' },
            edd: { name: '(Easy Digital Downloads version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Easy Digital Downloads)',                    namelength: '31', version: '', curr: '#currecmver', user: '#userecmver' }
        };

        /**
         * Table of the plugin versions
         */
        var htmlstring = '<div id="plugin-versions">';

        htmlstring += '<style>.versions td { padding: 0 5px !important; border-right: 1px solid white;line-height: 1.5em !important; font-size: 110% !important; } .versions td.new-version{ background-color:grey; } .versions td img {width: 30px !important;} .versions tr.first-row td {text-align: center;}</style>';
        htmlstring += '<table width="100%" class="versions" id="versions-table" cellpadding="0" cellspacing="0">';

        // Header row
        htmlstring += '<tr class="row first-row alwayson"><td class="hider-cell"><span id="hider">[hide]</span></td><td class="more-cell" id="more"><span id="mmore">[more]</span></td><td><img src="https://andrasguseo.com/images/tec.png" title="TEC" alt="TEC" /></td><td><img src="https://andrasguseo.com/images/ecpro.png" title="PRO" alt="PRO" /></td><td><img src="https://andrasguseo.com/images/et.png" title="ET" alt="ET" /></td><td><img src="https://andrasguseo.com/images/et+.png" title="ET+" alt="ET+" /></td><td><img src="https://andrasguseo.com/images/ebt.png" title="Eventbrite" alt="Eventbrite" /></td><td><img src="https://andrasguseo.com/images/ce.png" title="CommEvents" alt="CommEvents" /></td><td><img src="https://andrasguseo.com/images/ct.png" title="CommTix" alt="CommTix" /></td><td><img src="https://andrasguseo.com/images/fb.png" title="Filter Bar" alt="Filter Bar" /></td><td>APM</td><td>IW+</td>';
        /*    if ( ecmUsed != "-" ) {
                htmlstring += '<td>';
                htmlstring += ecmUsed.toUpperCase();
                htmlstring += '</td>';
            }*/
        // eCommerce in Header
        htmlstring += '<td>WOO</td>';
        htmlstring += '<td>EDD</td>';
        htmlstring += '</tr>';

        // Go through the plugin history row by row
        for( var number in pluginHistory ) {

            // Check if it has a note
//            if ( pluginHistory.hasOwnProperty( number ) && ( pluginHistory[number].note == 'show' || pluginHistory[number].note == 'last' ) ) {
            htmlstring += '<tr class="row';
            // For the last row add additional classes
            if ( pluginHistory[number].note !== "") htmlstring += ' ' + pluginHistory[number].note;
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

            /*if ( ecmUsed != "-" ) {
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
                htmlstring += '</td>';
            } // end if ( ecmUsed != "-" )
            */

            // Close the row
            htmlstring += '</tr>';

//            } // end if ( pluginHistory.hasOwnProperty( number ) && ( pluginHistory[number].note == 'show' || pluginHistory[number].note == 'last' ) )

        } // end for( var number in pluginHistory )

        // Row of user's version numbers
        /*
        htmlstring += '<tr class="row last-row alwayson userrow"><td>user</td><td>' + $( '#bbps_extra_info .displayname' ).html() + '</td><td id="usertecver">' + pluginVersions.tec.version + '</td><td id="userprover">' + pluginVersions.pro.version + '</td><td id="useretiver">' + pluginVersions.eti.version + '</td><td id="useretpver">' + pluginVersions.etp.version + '</td><td id="userebtver">' + pluginVersions.ebt.version + '</td><td id="usercevver">' + pluginVersions.cev.version + '</td><td id="userctxver">' + pluginVersions.ctx.version + '</td><td id="userfibver">' + pluginVersions.fib.version + '</td><td id="userapmver">' + pluginVersions.apm.version + '</td><td id="useriwpver">' + pluginVersions.iwp.version + '</td>';
        if ( ecmUsed != "-" ) {
            htmlstring += '<td id="userecmver">' + userEcmVer + '</td>';
        }*/

        // Close the row of user versions
        // htmlstring += '</tr>';

        // Close the table and the container
        htmlstring += '</table>';
        htmlstring += '</div>';

        if ( log ) console.log( htmlstring );

        // Formatting
        $( '#body' ).after( htmlstring );
        $( '#plugin-versions' ).css({ 'z-index': '2', 'position': 'fixed', 'top': '0', 'right': '350px', 'background-color': 'rgb(35, 40, 45)', 'color': '#eee', 'transition-duration': '1000ms', 'transition-timing-function': 'ease-in-out' });
        $( '.versions td' ).css({ 'line-height': '1.5em !important' });
        $( '.version-number' ).css({ 'font-weight': 'bold' });
        $( '.row' ).css({ 'display': 'none', 'text-align': 'center' });
        $( '.alwayson' ).css({ 'display': 'table-row' });
        $( '#hider, #more' ).css({ 'cursor': 'pointer' });
        $( '.hider-cell, .more-cell' ).css({ 'vertical-align': 'top' });

        // Handle hover
        if ( document.getElementById( 'plugin-versions' ) != null ) {
            document.getElementById( 'plugin-versions' ).addEventListener( 'mouseover', showRows );
            //document.getElementById( 'plugin-versions' ).addEventListener( 'mouseout', hideRows );
            document.getElementById( 'hider' ).addEventListener( 'click', hideBlock );
            document.getElementById( 'more' ).addEventListener( 'click', showMore );
        }

        // Compare current and user, and color it
        /*
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
        */

        /* Hover/unhover actions */
        function showRows() {
            $( '.show' ).css({ 'display': 'table-row ' });
        }
        function hideRows() {
            $( '.row' ).css({ 'display': 'none' });
            $( '.alwayson' ).css({ 'display': 'table-row' });
            // We need to set rowCounter back to the initial value.
            rowCounter = 2;
        }
        function hideBlock() {
            var block = document.getElementById( 'plugin-versions' );
            var str   = document.getElementById( 'hider' );
            var right = window.outerWidth-block.offsetLeft;
            var hideRight = -block.offsetWidth + 55;
            if ( log ) console.log( 'block.offsetLeft: ' + block.offsetLeft );
            if ( log ) console.log( 'block.offsetWidth: ' + block.offsetWidth );
            if ( log ) console.log( 'window.outerWidth: ' + window.outerWidth );
            if ( log ) console.log( 'right: ' + right );
            if ( log ) console.log( 'hideRight: ' + hideRight );

            if ( block.offsetLeft + 100 > window.outerWidth ) {
                $( '#plugin-versions' ).css({ 'right': '350px' });
                str.innerHTML = '[hide]';
            }
            else {
                $( '#plugin-versions' ).css({ 'right': hideRight });
                str.innerHTML = '[show]';
            }
        }
        // Show xMore more lines with every click
        function showMore() {
            if ( log ) console.log( rowCounter );
            if ( rowNumber >= rowCounter ) {
                var which = rowNumber - rowCounter;
                $( '.versions tr:nth-child(n+'+which+')' ).css({ 'display': 'table-row ' });
                rowCounter = rowCounter+xMore;
            }
        }

        // Prevent onMouseOut when hovering over child
        // Source: https://stackoverflow.com/questions/4697758/prevent-onmouseout-when-hovering-child-element-of-the-parent-absolute-div-withou
        function makeMouseOutFn( elem ){
            var list = traverseChildren( elem );
            return function onMouseOut( event ) {
                var e = event.toElement || event.relatedTarget;
                if ( !!~list.indexOf( e ) ) {
                    return;
                }
                //alert('MouseOut');
                // handle mouse event here!
                hideRows();
            };
        }

        //using closure to cache all child elements
        var parent = document.getElementById( 'plugin-versions' );
        parent.addEventListener( 'mouseout', makeMouseOutFn( parent ), true);

        //quick and dirty DFS children traversal,
        function traverseChildren( elem ) {
            var children = [];
            var q = [];
            q.push( elem );
            while ( q.length > 0 ) {
                var elem = q.pop();
                children.push( elem );
                pushAll( elem.children );
            }
            function pushAll( elemArray ) {
                for( var i=0; i < elemArray.length; i++ ) {
                    q.push( elemArray[i] );
                }
            }
            return children;
        }

    } // if ( typeof alreadydone == 'undefined')

    /**
     * === Changelog ===
     * 2.8.3.0 - 2019-04-30
     * Adjusted version numbers for G19.05
     * Adjusted version numbers for the hotfixes after
     *
     * 2.7.0.0 - 2019-04-22
     * Adjusted version numbers for ORM
     * Adjusted version numbers for Filter Bar security fix
     *
     * 2.6.0.0 - 2019-04-01
     * Adjusted version numbers for G19.04
     *
     * 2.5.2.0 - 2019-03-30
     * Adjusted version numbers based on March hotfixes
     *
     * 2.5.0.0 - 2019-03-04
     * Added B19.03 version numbers
     *
     * 2.4.0.0 - 2019-02-26
     * Added G19.03 version numbers
     * Cleaned up and commented 'view more' related code
     *
     * 2.3.0.1 - 2019-02-23
     * Added a functionality to view more rows on click
     */
})();
