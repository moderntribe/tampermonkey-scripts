// ==UserScript==
// @name         LiveAgent - Latest plugin versions
// @namespace    https://theeventscalendar.com/
// @version      3.9.1
// @description  Display our plugins' latest version numbers.
// @author       Andras Guseo
// @include      https://theeventscalendar.ladesk.com/agent/*
// @include      https://support.theeventscalendar.com/agent/*
// @downloadURL  https://github.com/moderntribe/tampermonkey-scripts/raw/master/liveagent/liveagent-plugin-versions.user.js
// @grant        none
// ==/UserScript==

/**
 * When a new release is out then:
 * 1. Update script version number in the header based on the versioning info below
 * 2. Go to the 'pluginHistory' object and make a copy of the last line in the below array
 * 3. Increase the starting number of the row by one
 * 4. Add the release name, date, and plugin version numbers
 * 5a. If it is a new version compared to last release, add 'x' at the end, like '4.6.19x'. Note: Woo and EDD do not get tagged with 'x'
 * 5b. If it is a hotfix, then creating a new line is not needed, just update the version number in the last line (See Event Tickets (eti) in line 12)
 * 6. Create a pull request and ping Andras to check and approve
 *
 * Versioning:
 * First digit:  only changes when year changes. 2 = 2019; 3 = 2020
 * Second digit: increment when updating the script with plugin versions
 * Third digit:  increment when a bugfix or feature for the script
 */
(function() {
    'use strict';

//== SETUP ==//

    // Enable logging
    var log = false;

    // Start hidden?
    var startHidden = false;

    // Define starting position of the container
    // The distance from the right edge of the screen
    var startRight = '350px';

    // Define the width of the first 2 columns (in pixels)
    var secondColumnWidth = 70;

    // Define how many rows should be shown on load and when table is collapsed
    var initialRows = 1;

    // Define whether table should scroll to the last (most actual) row on collapse
    var scrollOnCollapse = true;

    // Height of the table (in pixels) when expanded
    var expandedHeight = 300;

//== START ==//
    if ( log ) console.log ( alreadydone );
    if ( log ) console.log ( typeof alreadydone );

    // Only run if it wasn't executed before
    if ( typeof alreadydone == 'undefined' ) {

        var alreadydone = true;

        var initialRowsHeight = initialRows * 20;

        if ( log ) console.log ( typeof alreadydone );

        /**
         * j - counter
         */
        var j;

        /**
         * Defining our plugin version history
         * When a new release is out then:
         * - update script version number in the header based on the versioning info at the top
         * - make a copy of the last line in the below array
         * - increase the starting number
         * - add the release name, new date, and plugin version numbers
         * - if it is a new version compared to last release, add 'x' at the end, like '4.6.19x'. Woo and EDD do not get tagged with 'x'
         * - if it is a hotfix, then creating a new line is not needed, just update the version number in the last line (See Event Tickets (eti) in line 12)
         */
        var pluginHistory = {
            0: { name: "",           date: "",           tec: "",          pro: "",          vev: "",         fib: "",         apm: "",     ebt: "",       eti: "",           etp: "",          cev: "",          ctx: "",         iwp: "",       woo: "",      edd: ""  },
            1: { name: "M18.01",     date: "Jan 7",      tec: "4.6.9.1x",  pro: "4.4.21",    vev: "-",        fib: "4.5.2",    apm: "4.4",  ebt: "4.4.9",  eti: "4.6.3",      etp: "4.6.2",     cev: "4.5.8",     ctx: "4.5.3",    iwp: "1.0.2",  woo: "-",     edd: "-" },
            2: { name: "M18.02",     date: "Jan 22",     tec: "4.6.10.2x", pro: "4.4.22x",   vev: "-",        fib: "4.5.3x",   apm: "4.4",  ebt: "4.4.9",  eti: "4.6.3",      etp: "4.6.2",     cev: "4.5.8",     ctx: "4.5.3",    iwp: "1.0.2",  woo: "-",     edd: "-" },
            3: { name: "M18.03",     date: "Feb 14",     tec: "4.6.11.2x", pro: "4.4.23x",   vev: "-",        fib: "4.5.3",    apm: "4.4",  ebt: "4.4.9",  eti: "4.6.3.1x",   etp: "4.6.2",     cev: "4.5.9x",    ctx: "4.5.3",    iwp: "1.0.2",  woo: "-",     edd: "-" },
            4: { name: "M18.04",     date: "Mar 8",      tec: "4.6.12.1x", pro: "4.4.24.2x", vev: "-",        fib: "4.5.4x",   apm: "4.4",  ebt: "4.4.9",  eti: "4.6.3.1",    etp: "4.6.2",     cev: "4.5.9",     ctx: "4.5.3",    iwp: "1.0.2",  woo: "-",     edd: "-" },
            5: { name: "TC",         date: "Mar 13",     tec: "4.6.12.1",  pro: "4.4.24.2",  vev: "-",        fib: "4.5.4",    apm: "4.4",  ebt: "4.4.9",  eti: "4.7x",       etp: "4.7x",      cev: "4.5.9",     ctx: "4.5.3",    iwp: "1.0.2",  woo: "-",     edd: "-" },
            6: { name: "M18.05",     date: "Mar 28",     tec: "4.6.13.1x", pro: "4.4.24.2",  vev: "-",        fib: "4.5.4",    apm: "4.4",  ebt: "4.4.9",  eti: "4.7.1x",     etp: "4.7.1x",    cev: "4.5.10x",   ctx: "4.5.4x",   iwp: "1.0.2",  woo: "-",     edd: "-" },
            7: { name: "M18.06",     date: "Apr 4",      tec: "4.6.14.2x", pro: "4.4.25x",   vev: "-",        fib: "4.5.5x",   apm: "4.4",  ebt: "4.4.9",  eti: "4.7.2x",     etp: "4.7.2x",    cev: "4.5.11x",   ctx: "4.5.4",    iwp: "1.0.2",  woo: "-",     edd: "-" },
            8: { name: "M18.07",     date: "May 9",      tec: "4.6.15.1x", pro: "4.4.26x",   vev: "-",        fib: "4.5.5",    apm: "4.4",  ebt: "4.4.9",  eti: "4.7.2",      etp: "4.7.2",     cev: "4.5.11",    ctx: "4.5.4",    iwp: "1.0.2",  woo: "-",     edd: "-" },
            9: { name: "TEC",        date: "May 16",     tec: "4.6.16.1x", pro: "4.4.26",    vev: "-",        fib: "4.5.5",    apm: "4.4",  ebt: "4.4.9",  eti: "4.7.2",      etp: "4.7.2",     cev: "4.5.11",    ctx: "4.5.4",    iwp: "1.0.2",  woo: "-",     edd: "-" },
            10: { name: "M18.08",    date: "May 29",     tec: "4.6.17.1x", pro: "4.4.27x",   vev: "-",        fib: "4.5.6x",   apm: "4.4",  ebt: "4.4.9",  eti: "4.7.3.1x",   etp: "4.7.3x",    cev: "4.5.12x",   ctx: "4.5.4",    iwp: "1.0.2",  woo: "-",     edd: "-" },
            11: { name: "ETR",       date: "Jun 4",      tec: "4.6.18.1x", pro: "4.4.27",    vev: "-",        fib: "4.5.6",    apm: "4.4",  ebt: "4.5x",   eti: "4.7.3.1",    etp: "4.7.3",     cev: "4.5.12",    ctx: "4.5.4",    iwp: "1.0.2",  woo: "-",     edd: "-" },
            12: { name: "M18.09",    date: "Jun 20",     tec: "4.6.19.1x", pro: "4.4.28x",   vev: "-",        fib: "4.5.6",    apm: "4.4",  ebt: "4.5.1x", eti: "4.7.4.1x",   etp: "4.7.4x",    cev: "4.5.12",    ctx: "4.5.4",    iwp: "1.0.2",  woo: "3.4.3", edd: "2.9.3" },
            13: { name: "M18.10",    date: "Jul 9",      tec: "4.6.20.2x", pro: "4.4.29.2x", vev: "-",        fib: "4.5.6",    apm: "4.4",  ebt: "4.5.1",  eti: "4.7.5.1x",   etp: "4.7.5x",    cev: "4.5.12",    ctx: "4.5.4",    iwp: "1.0.2",  woo: "3.4.3", edd: "2.9.3" },
            14: { name: "M18.11",    date: "Aug 1",      tec: "4.6.21.1x", pro: "4.4.30.1x", vev: "-",        fib: "4.5.7x",   apm: "4.4",  ebt: "4.5.2x", eti: "4.7.6x",     etp: "4.7.6x",    cev: "4.5.13x",   ctx: "4.5.5x",   iwp: "1.0.2",  woo: "3.4.4", edd: "2.9.6" },
            15: { name: "M18.12",    date: "Aug 22",     tec: "4.6.22.2x", pro: "4.4.31x",   vev: "-",        fib: "4.5.7",    apm: "4.4",  ebt: "4.5.2",  eti: "4.8x",       etp: "4.8x",      cev: "4.5.13.1x", ctx: "4.5.6x",   iwp: "1.0.2",  woo: "3.4.4", edd: "2.9.6" },
            16: { name: "M18.13",    date: "Sep 12",     tec: "4.6.23.1x", pro: "4.4.32x",   vev: "-",        fib: "4.5.8x",   apm: "4.4",  ebt: "4.5.3x", eti: "4.8.1x",     etp: "4.8.1x",    cev: "4.5.13.1",  ctx: "4.5.6",    iwp: "1.0.2",  woo: "3.4.5", edd: "2.9.7" },
            17: { name: "M18.14",    date: "Oct 3",      tec: "4.6.24.2x", pro: "4.4.33x",   vev: "-",        fib: "4.5.8",    apm: "4.4",  ebt: "4.5.4x", eti: "4.8.2x",     etp: "4.8.2x",    cev: "4.5.13.1",  ctx: "4.5.6",    iwp: "1.0.2",  woo: "3.4.5", edd: "2.9.8" },
            18: { name: "M18.15",    date: "Oct 22",     tec: "4.6.25.1x", pro: "4.4.34x",   vev: "-",        fib: "4.5.8",    apm: "4.4",  ebt: "4.5.5x", eti: "4.8.3x",     etp: "4.8.3x",    cev: "4.5.13.1",  ctx: "4.5.6",    iwp: "1.0.2",  woo: "3.5.0", edd: "2.9.8" },
            19: { name: "M18.16",    date: "Nov 13",     tec: "4.6.26.2x", pro: "4.4.35x",   vev: "-",        fib: "4.5.8",    apm: "4.4",  ebt: "4.5.6x", eti: "4.8.4.1x",   etp: "4.8.3",     cev: "4.5.14x",   ctx: "4.5.6",    iwp: "1.0.2",  woo: "3.5.1", edd: "2.9.8" },
            20: { name: "F18.03",    date: "Nov 29",     tec: "4.7.0.2x",  pro: "4.5x",      vev: "-",        fib: "4.5.8",    apm: "4.4",  ebt: "4.5.6",  eti: "4.9.0.2x",   etp: "4.9x",      cev: "4.5.14",    ctx: "4.5.6",    iwp: "1.0.2",  woo: "3.5.2", edd: "2.9.8" },
            21: { name: "M18.17",    date: "Dec 5",      tec: "4.7.1.1x",  pro: "4.5",       vev: "-",        fib: "4.5.9x",   apm: "4.4",  ebt: "4.5.6",  eti: "4.9.1x",     etp: "4.9",       cev: "4.5.15x",   ctx: "4.5.7x",   iwp: "1.0.2",  woo: "3.5.2", edd: "2.9.9" },
            22: { name: "M18.18",    date: "Dec 13",     tec: "4.7.2.1x",  pro: "4.5.1x",    vev: "-",        fib: "4.5.9",    apm: "4.4",  ebt: "4.5.6",  eti: "4.9.2x",     etp: "4.9",       cev: "4.5.15",    ctx: "4.5.7",    iwp: "1.0.2",  woo: "3.5.2", edd: "2.9.10" },
            23: { name: "M18.19",    date: "Dec 19",     tec: "4.7.3.1x",  pro: "4.5.2.1x",  vev: "-",        fib: "4.5.9",    apm: "4.4",  ebt: "4.5.6",  eti: "4.9.3x",     etp: "4.9.1x",    cev: "4.5.15",    ctx: "4.5.7",    iwp: "1.0.2",  woo: "3.5.3", edd: "2.9.10" },
            24: { name: "G19.01",    date: "Jan 15",     tec: "4.7.3.1",   pro: "4.5.2.1",   vev: "-",        fib: "4.5.9",    apm: "4.4",  ebt: "4.5.6",  eti: "4.9.4x",     etp: "4.9.2x",    cev: "4.5.16x",   ctx: "4.5.7",    iwp: "1.0.2",  woo: "3.5.3", edd: "2.9.10" },
            25: { name: "B19.01",    date: "Jan 21",     tec: "4.7.4.1x",  pro: "4.5.3x",    vev: "-",        fib: "4.5.9",    apm: "4.4",  ebt: "4.5.7x", eti: "4.9.4",      etp: "4.9.2",     cev: "4.5.16",    ctx: "4.5.7",    iwp: "1.0.2",  woo: "3.5.4", edd: "2.9.11" },
            26: { name: "F19.01",    date: "Feb 5",      tec: "4.8.0.2x",  pro: "4.6x",      vev: "-",        fib: "4.6x",     apm: "4.4",  ebt: "4.6x",   eti: "4.10.0.1x",  etp: "4.10.0.2x", cev: "4.6x",      ctx: "4.6x",     iwp: "1.0.2",  woo: "3.5.4", edd: "2.9.11" },
            27: { name: "B19.02",    date: "Feb 14",     tec: "4.8.1.1x",  pro: "4.6.1x",    vev: "-",        fib: "4.6",      apm: "4.5x", ebt: "4.6.1x", eti: "4.10.0.1",   etp: "4.10.0.2",  cev: "4.6",       ctx: "4.6",      iwp: "1.0.3x", woo: "3.5.4", edd: "2.9.11" },
            28: { name: "G19.03",    date: "Feb 26",     tec: "4.8.1.1",   pro: "4.6.1",     vev: "-",        fib: "4.6",      apm: "4.5",  ebt: "4.6.1",  eti: "4.10.1x",    etp: "4.10.1x",   cev: "4.6.1x",    ctx: "4.6.1x",   iwp: "1.0.3",  woo: "3.5.5", edd: "2.9.11" },
            29: { name: "B19.03",    date: "Mar 4",      tec: "4.8.2.1x",  pro: "4.6.2.1x",  vev: "-",        fib: "4.7x",     apm: "4.5",  ebt: "4.6.2x", eti: "4.10.1.2x",  etp: "4.10.1.3x", cev: "4.6.1.1x",  ctx: "4.6.1.1x", iwp: "1.0.3",  woo: "3.5.5", edd: "2.9.11" },
            30: { name: "G19.04",    date: "Apr 1",      tec: "4.8.2.1",   pro: "4.6.2.1",   vev: "-",        fib: "4.7.0.1x", apm: "4.5",  ebt: "4.6.2",  eti: "4.10.2x",    etp: "4.10.2x",   cev: "4.6.1.2x",  ctx: "4.6.1.2x", iwp: "1.0.3",  woo: "3.5.7", edd: "2.9.12" },
            31: { name: "ORM",       date: "Apr 17",     tec: "4.9x",      pro: "4.7x",      vev: "-",        fib: "4.8x",     apm: "4.5",  ebt: "4.6.2",  eti: "4.10.3x",    etp: "4.10.2x",   cev: "4.6.1.2",   ctx: "4.6.1.2",  iwp: "1.0.3",  woo: "3.6.1", edd: "2.9.12" },
            32: { name: "G19.05",    date: "Apr 23",     tec: "4.9.0.4x",  pro: "4.7.0.1x",  vev: "-",        fib: "4.8",      apm: "4.5",  ebt: "4.6.2",  eti: "4.10.4.3x",  etp: "4.10.3x",   cev: "4.6.1.2",   ctx: "4.6.1.2",  iwp: "1.0.3",  woo: "3.6.1", edd: "2.9.12" },
            33: { name: "B19.05",    date: "May 3",      tec: "4.9.1.2x",  pro: "4.7.1x",    vev: "-",        fib: "4.8.1x",   apm: "4.5",  ebt: "4.6.2",  eti: "4.10.4.4x",  etp: "4.10.3",    cev: "4.6.1.2",   ctx: "4.6.1.2",  iwp: "1.0.3",  woo: "3.6.2", edd: "2.9.12" },
            34: { name: "G19.06",    date: "May 14",     tec: "4.9.1.2",   pro: "4.7.1",     vev: "-",        fib: "4.8.1",    apm: "4.5",  ebt: "4.6.2",  eti: "4.10.5x",    etp: "4.10.4x",   cev: "4.6.1.2",   ctx: "4.6.1.2",  iwp: "1.0.3",  woo: "3.6.2", edd: "2.9.14" },
            35: { name: "B19.06",    date: "May 16",     tec: "4.9.2.1x",  pro: "4.7.2x",    vev: "-",        fib: "4.8.1",    apm: "4.5",  ebt: "4.6.2",  eti: "4.10.5",     etp: "4.10.4",    cev: "4.6.1.2",   ctx: "4.6.1.2",  iwp: "1.0.3",  woo: "3.6.3", edd: "2.9.14" },
            36: { name: "G19.07",    date: "May 22",     tec: "4.9.2.1",   pro: "4.7.2",     vev: "-",        fib: "4.8.1",    apm: "4.5",  ebt: "4.6.2",  eti: "4.10.6x",    etp: "4.10.5x",   cev: "4.6.1.2",   ctx: "4.6.1.2",  iwp: "1.0.3",  woo: "3.6.3", edd: "2.9.14" },
            37: { name: "B19.07",    date: "Jun 6",      tec: "4.9.3.1x",  pro: "4.7.3x",    vev: "-",        fib: "4.8.1",    apm: "4.5",  ebt: "4.6.2",  eti: "4.10.6.1x",  etp: "4.10.5.1x", cev: "4.6.1.2",   ctx: "4.6.1.2",  iwp: "1.0.3",  woo: "3.6.4", edd: "2.9.15" },
            38: { name: "G19.08",    date: "Jun 20",     tec: "4.9.3.3x",  pro: "4.7.3",     vev: "-",        fib: "4.8.1",    apm: "4.5",  ebt: "4.6.2",  eti: "4.10.6.2x",  etp: "4.10.5.1",  cev: "4.6.2x",    ctx: "4.6.2x",   iwp: "1.0.3",  woo: "3.6.4", edd: "2.9.16" },
            39: { name: "B19.08",    date: "Jul 3",      tec: "4.9.4.1x",  pro: "4.7.4x",    vev: "-",        fib: "4.8.1",    apm: "4.5",  ebt: "4.6.2",  eti: "4.10.6.2",   etp: "4.10.5.1",  cev: "4.6.2",     ctx: "4.6.2",    iwp: "1.0.3",  woo: "3.6.4", edd: "2.9.16" },
            40: { name: "G19.09",    date: "Jul 18",     tec: "4.9.4.1",   pro: "4.7.4",     vev: "-",        fib: "4.8.1",    apm: "4.5",  ebt: "4.6.2",  eti: "4.10.6.2",   etp: "4.10.5.1",  cev: "4.6.3x",    ctx: "4.6.3x",   iwp: "1.0.3",  woo: "3.6.5", edd: "2.9.16" },
            41: { name: "B19.09",    date: "Jul 25",     tec: "4.9.5.1x",  pro: "4.7.5x",    vev: "-",        fib: "4.8.1",    apm: "4.5",  ebt: "4.6.2",  eti: "4.10.6.2",   etp: "4.10.5.1",  cev: "4.6.3",     ctx: "4.6.3",    iwp: "1.0.3",  woo: "3.6.5", edd: "2.9.16" },
            42: { name: "B19.09.1",  date: "Aug 8",      tec: "4.9.6.1x",  pro: "4.7.5",     vev: "-",        fib: "4.8.1",    apm: "4.5",  ebt: "4.6.2",  eti: "4.10.6.2",   etp: "4.10.5.1",  cev: "4.6.3",     ctx: "4.6.3",    iwp: "1.0.3",  woo: "3.7.0", edd: "2.9.16" },
            43: { name: "B19.10",    date: "Aug 19",     tec: "4.9.7.1x",  pro: "4.7.6x",    vev: "-",        fib: "4.8.1",    apm: "4.5",  ebt: "4.6.2",  eti: "4.10.6.2",   etp: "4.10.5.1",  cev: "4.6.3",     ctx: "4.6.3",    iwp: "1.0.3",  woo: "3.7.0", edd: "2.9.16" },
            44: { name: "SplitP",    date: "Aug 22",     tec: "4.9.7.1",   pro: "4.7.6",     vev: "-",        fib: "4.8.1",    apm: "4.5",  ebt: "4.6.2",  eti: "4.10.7.2x",  etp: "4.10.6x",   cev: "4.6.4x",    ctx: "4.7x",     iwp: "1.0.3",  woo: "3.7.0", edd: "2.9.16" },
            45: { name: "B19.11",    date: "Sep 5",      tec: "4.9.8.1x",  pro: "4.7.7x",    vev: "-",        fib: "4.8.1",    apm: "4.5",  ebt: "4.6.2",  eti: "4.10.7.2",   etp: "4.10.6",    cev: "4.6.4",     ctx: "4.7",      iwp: "1.0.3",  woo: "3.7.0", edd: "2.9.16" },
            46: { name: "G19.11",    date: "Sep 16",     tec: "4.9.8.1",   pro: "4.7.7",     vev: "-",        fib: "4.8.1",    apm: "4.5",  ebt: "4.6.2",  eti: "4.10.8x",    etp: "4.10.7x",   cev: "4.6.5x",    ctx: "4.7.1x",   iwp: "1.0.3",  woo: "3.7.0", edd: "2.9.16" },
            47: { name: "B19.12",    date: "Sep 25",     tec: "4.9.9.1x",  pro: "4.7.8.1x",  vev: "-",        fib: "4.8.1",    apm: "4.5",  ebt: "4.6.2",  eti: "4.10.8",     etp: "4.10.7",    cev: "4.6.5",     ctx: "4.7.1",    iwp: "1.0.3",  woo: "3.7.0", edd: "2.9.16" },
            48: { name: "G19.12",    date: "Sep 30",     tec: "4.9.9.1",   pro: "4.7.8.1",   vev: "-",        fib: "4.8.1",    apm: "4.5",  ebt: "4.6.2",  eti: "4.10.9x",    etp: "4.10.8x",   cev: "4.6.5",     ctx: "4.7.1",    iwp: "1.0.3",  woo: "3.7.0", edd: "2.9.17" },
            49: { name: "G19.13",    date: "Oct 14",     tec: "4.9.9.1",   pro: "4.7.8.1",   vev: "-",        fib: "4.8.1",    apm: "4.5",  ebt: "4.6.2",  eti: "4.10.10x",   etp: "4.10.9x",   cev: "4.6.6x",    ctx: "4.7.1",    iwp: "1.0.3",  woo: "3.7.1", edd: "2.9.17" },
            50: { name: "B19.13",    date: "Oct 16",     tec: "4.9.10.1x", pro: "4.7.8.1",   vev: "-",        fib: "4.8.1",    apm: "4.5",  ebt: "4.6.3x", eti: "4.10.10",    etp: "4.10.9",    cev: "4.6.6.1x",  ctx: "4.7.1",    iwp: "1.0.3",  woo: "3.7.1", edd: "2.9.18" },
            51: { name: "B19.14",    date: "Nov 12",     tec: "4.9.11.1x", pro: "4.7.9x",    vev: "-",        fib: "4.8.1",    apm: "4.5",  ebt: "4.6.3",  eti: "4.10.10",    etp: "4.10.9",    cev: "4.6.6.1",   ctx: "4.7.1",    iwp: "1.0.3",  woo: "3.8",   edd: "2.9.20" },
            52: { name: "G19.14",    date: "Nov 13",     tec: "4.9.11.1",  pro: "4.7.9",     vev: "-",        fib: "4.8.1",    apm: "4.5",  ebt: "4.6.3",  eti: "4.10.11.1x", etp: "4.10.10x",  cev: "4.6.6.1",   ctx: "4.7.1",    iwp: "1.0.3",  woo: "3.8",   edd: "2.9.20" },
            53: { name: "B19.15",    date: "Nov 20",     tec: "4.9.12.1x", pro: "4.7.10x",   vev: "-",        fib: "4.8.1",    apm: "4.5",  ebt: "4.6.3",  eti: "4.10.11.1",  etp: "4.10.10",   cev: "4.6.6.1",   ctx: "4.7.1",    iwp: "1.0.3",  woo: "3.8",   edd: "2.9.20" },
            54: { name: "AR Modal",  date: "Dec 10",     tec: "4.9.13.1x", pro: "4.7.10",    vev: "-",        fib: "4.8.1",    apm: "4.5",  ebt: "4.6.3",  eti: "4.11.0.1x",  etp: "4.11.0.2x", cev: "4.6.6.1",   ctx: "4.7.1",    iwp: "1.0.3",  woo: "3.8.1", edd: "2.9.20" },
            55: { name: "G",         date: "Dec 19",     tec: "4.9.13.1",  pro: "4.7.10",    vev: "-",        fib: "4.8.1",    apm: "4.5",  ebt: "4.6.3",  eti: "4.11.1x",    etp: "4.11.1x",   cev: "4.6.6.1",   ctx: "4.7.1",    iwp: "1.0.3",  woo: "3.8.1", edd: "2.9.20" },
            56: { name: "B20.01",    date: "Jan 15",     tec: "4.9.14.1x", pro: "4.7.10",    vev: "-",        fib: "4.8.1",    apm: "4.5",  ebt: "4.6.3",  eti: "4.11.1",     etp: "4.11.1",    cev: "4.6.6.1",   ctx: "4.7.1",    iwp: "1.0.3",  woo: "3.8.1", edd: "2.9.20" },
            57: { name: "B20.02 v2", date: "Jan 27",     tec: "5.0.0.3x",  pro: "5.0.0.2x",  vev: "-",        fib: "4.9.0x",   apm: "4.5",  ebt: "4.6.3",  eti: "4.11.2x",    etp: "4.11.1.1x", cev: "4.6.6.1",   ctx: "4.7.2x",   iwp: "1.0.3",  woo: "3.9",   edd: "2.9.20" },
            58: { name: "G20.01",    date: "Feb 6",      tec: "5.0.0.3",   pro: "5.0.0.2",   vev: "-",        fib: "4.9.0",    apm: "4.5",  ebt: "4.6.3",  eti: "4.11.3.1x",  etp: "4.11.2x",   cev: "4.6.7x",    ctx: "4.7.2",    iwp: "1.0.3",  woo: "3.9.1", edd: "2.9.20" },
            59: { name: "B20.02.01", date: "Feb 12",     tec: "5.0.1.1x",  pro: "5.0.1x",    vev: "-",        fib: "4.9.1x",   apm: "4.5",  ebt: "4.6.3",  eti: "4.11.3.1",   etp: "4.11.2",    cev: "4.6.7",     ctx: "4.7.2",    iwp: "1.0.3",  woo: "3.9.2", edd: "2.9.20" },
            60: { name: "B20.02.02", date: "Feb 19",     tec: "5.0.2x",    pro: "5.0.2x",    vev: "-",        fib: "4.9.2x",   apm: "4.5",  ebt: "4.6.3",  eti: "4.11.3.1",   etp: "4.11.2",    cev: "4.6.7",     ctx: "4.7.2",    iwp: "1.0.3",  woo: "3.9.2", edd: "2.9.20" },
            61: { name: "Y",         date: "Feb 24",     tec: "5.0.2.2x",  pro: "5.0.2",     vev: "-",        fib: "4.9.2",    apm: "4.5",  ebt: "4.6.4x", eti: "4.11.3.1",   etp: "4.11.2",    cev: "4.6.7",     ctx: "4.7.2",    iwp: "1.0.3",  woo: "3.9.2", edd: "2.9.20" },
            62: { name: "G20.02",    date: "Feb 26",     tec: "5.0.2.2",   pro: "5.0.2",     vev: "-",        fib: "4.9.2",    apm: "4.5",  ebt: "4.6.4x", eti: "4.11.4x",    etp: "4.11.3x",   cev: "4.6.7",     ctx: "4.7.2",    iwp: "1.0.3",  woo: "3.9.2", edd: "2.9.21" },
            63: { name: "G20.03",    date: "Mar 18",     tec: "5.0.2.2",   pro: "5.0.2",     vev: "-",        fib: "4.9.2",    apm: "4.5",  ebt: "4.6.4",  eti: "4.11.5x",    etp: "4.11.4x",   cev: "4.6.7",     ctx: "4.7.2",    iwp: "1.0.3",  woo: "3.9.3", edd: "2.9.21" },
            64: { name: "B20.03",    date: "Mar 23",     tec: "5.0.3.2x",  pro: "5.0.3x",    vev: "-",        fib: "4.9.3x",   apm: "4.5",  ebt: "4.6.4",  eti: "4.11.5",     etp: "4.11.4",    cev: "4.6.7",     ctx: "4.7.2",    iwp: "1.0.3",  woo: "3.9.3", edd: "2.9.21" },
            65: { name: "20.04",     date: "Apr 23",     tec: "5.1.0.1x",  pro: "5.1.0x",    vev: "-",        fib: "4.10.0x",  apm: "4.5",  ebt: "4.6.5x", eti: "4.12.0.1x",  etp: "4.12.0x",   cev: "4.7.0x",    ctx: "4.7.3x",   iwp: "1.0.3",  woo: "4.0.1", edd: "2.9.23" },
            66: { name: "B20.05",    date: "May 11",     tec: "5.1.1x",    pro: "5.1.1x",    vev: "-",        fib: "4.10.0",   apm: "4.5",  ebt: "4.6.5",  eti: "4.12.0.1",   etp: "4.12.0",    cev: "4.7.0",     ctx: "4.7.3",    iwp: "1.0.3",  woo: "4.1.0", edd: "2.9.23" },
            67: { name: "G20.05",    date: "May 20",     tec: "5.1.1",     pro: "5.1.1",     vev: "-",        fib: "4.10.0",   apm: "4.5",  ebt: "4.6.5",  eti: "4.12.1.2x",  etp: "4.12.1x",   cev: "4.7.1.1x",  ctx: "4.7.4x",   iwp: "1.0.3",  woo: "4.1.1", edd: "2.9.23" },
            68: { name: "B20.05.2",  date: "May 27",     tec: "5.1.2x",    pro: "5.1.2x",    vev: "-",        fib: "4.10.0",   apm: "4.5",  ebt: "4.6.5",  eti: "4.12.1.2",   etp: "4.12.1",    cev: "4.7.1.1",   ctx: "4.7.4",    iwp: "1.0.3",  woo: "4.1.1", edd: "2.9.23" },
            69: { name: "B20.06",    date: "Jun 22",     tec: "5.1.3x",    pro: "5.1.2",     vev: "1.0.0x",   fib: "4.10.0",   apm: "4.5",  ebt: "4.6.5",  eti: "4.12.1.2",   etp: "4.12.1",    cev: "4.7.1.1",   ctx: "4.7.4",    iwp: "1.0.3",  woo: "4.2.0", edd: "2.9.23" },
            70: { name: "20.06",     date: "Jun 24",     tec: "5.1.4x",    pro: "5.1.3x",    vev: "1.0.1x",   fib: "4.10.0",   apm: "4.5",  ebt: "4.6.5",  eti: "4.12.2x",    etp: "4.12.2x",   cev: "4.7.2x",    ctx: "4.7.4",    iwp: "1.0.3",  woo: "4.2.2", edd: "2.9.23" },
            71: { name: "B20.07",    date: "Jul 27",     tec: "5.1.5x",    pro: "5.1.4x",    vev: "1.0.2.1x", fib: "4.10.1x",  apm: "4.5",  ebt: "4.6.5",  eti: "4.12.2",     etp: "4.12.2",    cev: "4.7.2",     ctx: "4.7.4",    iwp: "1.0.3",  woo: "4.3.1", edd: "2.9.23" },
            72: { name: "G20.07",    date: "Jul 28",     tec: "5.1.5",     pro: "5.1.4",     vev: "1.0.2.1",  fib: "4.10.1",   apm: "4.5",  ebt: "4.6.5",  eti: "4.12.3.1x",  etp: "4.12.3x",   cev: "4.7.3x",    ctx: "4.7.4",    iwp: "1.0.3",  woo: "4.3.1", edd: "2.9.23" },
            73: { name: "B20.08",    date: "Aug 24",     tec: "5.1.6x",    pro: "5.1.4",     vev: "1.0.3x",   fib: "4.10.1",   apm: "4.5",  ebt: "4.6.5",  eti: "4.12.3.1",   etp: "4.12.3",    cev: "4.7.3",     ctx: "4.7.4",    iwp: "1.0.3",  woo: "4.4.1", edd: "2.9.24" },
            74: { name: "G20.08",    date: "Aug 26",     tec: "5.1.6",     pro: "5.1.4",     vev: "1.0.3",    fib: "4.10.1",   apm: "4.5",  ebt: "4.6.5",  eti: "5.0.0.1x",   etp: "5.0.0x",    cev: "4.8.0x",    ctx: "4.7.4",    iwp: "1.0.3",  woo: "4.4.1", edd: "2.9.24" },
            75: { name: "G20.09",    date: "Sep 21",     tec: "5.1.6",     pro: "5.1.4",     vev: "1.0.3",    fib: "4.10.1",   apm: "4.5",  ebt: "4.6.5",  eti: "5.0.1x",     etp: "5.0.1x",    cev: "4.8.1x",    ctx: "4.7.5x",   iwp: "1.0.3",  woo: "4.5.2", edd: "2.9.25" },
            76: { name: "B20.09",    date: "Sep 29",     tec: "5.2.0x",    pro: "5.1.5x",    vev: "1.0.4x",   fib: "5.0.0.1x", apm: "4.5",  ebt: "4.6.5",  eti: "5.0.1",      etp: "5.0.1",     cev: "4.8.1",     ctx: "4.7.5",    iwp: "1.0.3",  woo: "4.5.2", edd: "2.9.25" },
            77: { name: "B20.09.02", date: "Oct 6",      tec: "5.2.0",     pro: "5.1.5",     vev: "1.1.0x",   fib: "5.0.0.1",  apm: "4.5",  ebt: "4.6.5",  eti: "5.0.1",      etp: "5.0.1",     cev: "4.8.1",     ctx: "4.7.5",    iwp: "1.0.3",  woo: "4.5.2", edd: "2.9.26" },
            78: { name: "G20.10",    date: "Oct 19",     tec: "5.2.0",     pro: "5.1.5",     vev: "1.1.0",    fib: "5.0.0.1",  apm: "4.5",  ebt: "4.6.5",  eti: "5.0.2x",     etp: "5.0.1",     cev: "4.8.1",     ctx: "4.7.6x",   iwp: "1.0.3",  woo: "4.6.0", edd: "2.9.26" },
            79: { name: "B20.10",    date: "Oct 22",     tec: "5.2.1x",    pro: "5.1.6x",    vev: "1.1.1x",   fib: "5.0.1x",   apm: "4.5",  ebt: "4.6.5",  eti: "5.0.2",      etp: "5.0.1",     cev: "4.8.1",     ctx: "4.7.6",    iwp: "1.0.3",  woo: "4.6.1", edd: "2.9.26" },
            80: { name: "G20.11",    date: "Nov 19",     tec: "5.2.1.1x",  pro: "5.1.6",     vev: "1.1.1",    fib: "5.0.1",    apm: "4.5",  ebt: "4.6.5",  eti: "5.0.3.1x",   etp: "5.1.0.2x",  cev: "4.8.2x",    ctx: "4.7.7x",   iwp: "1.0.3",  woo: "4.6.1", edd: "2.9.26" },
            81: { name: "B20.11",    date: "Dec 2",      tec: "5.3.0x"  ,  pro: "5.2.0x",    vev: "1.1.2x",   fib: "5.0.2x",   apm: "4.5",  ebt: "4.6.6x", eti: "5.0.3.1" ,   etp: "5.1.0.2" ,  cev: "4.8.2" ,    ctx: "4.7.7" ,   iwp: "1.0.3",  woo: "4.6.1", edd: "2.9.26" },
        };

        // The number of releases (the length of the object)
        var rowNumber = Object.keys(pluginHistory).length;

        // Added Woo and EDD for static version
        var pluginNames = ['tec', 'pro', 'vev', 'fib', 'apm', 'ebt', 'eti', 'etp', 'cev', 'ctx', 'iwp', 'woo', 'edd'];

        /**
         * Defining our plugins
         * (Probably "version" here is not needed.)
         */
        var pluginVersions = {
            tec: { name: '(The Events Calendar version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Modern Tribe, Inc.)',                           namelength: '28', version: '', curr: '#currtecver', user: '#usertecver' },
            pro: { name: '(Events Calendar PRO version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Modern Tribe, Inc.)',                           namelength: '28', version: '', curr: '#currprover', user: '#userprover' },
            vev: { name: '(The Events Calendar: Virtual Events version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Modern Tribe, Inc.)',           namelength: '44', version: '', curr: '#currfibver', user: '#userfibver' },
            fib: { name: '(The Events Calendar: Filter Bar version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Modern Tribe, Inc.)',               namelength: '40', version: '', curr: '#currfibver', user: '#userfibver' },
            apm: { name: '(Advanced Post Manager version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Modern Tribe, Inc.)',                         namelength: '30', version: '', curr: '#currapmver', user: '#userapmver' },
            ebt: { name: '(The Events Calendar: Eventbrite Tickets version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Modern Tribe, Inc.)',       namelength: '48', version: '', curr: '#currebtver', user: '#userebtver' },
            eti: { name: '(Event Tickets version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Modern Tribe, Inc.)',                                 namelength: '22', version: '', curr: '#curretiver', user: '#useretiver' },
            etp: { name: '(Event Tickets Plus version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Modern Tribe, Inc.)',                            namelength: '27', version: '', curr: '#curretpver', user: '#useretpver' },
            cev: { name: '(The Events Calendar: Community Events version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Modern Tribe, Inc.)',         namelength: '46', version: '', curr: '#currcevver', user: '#usercevver' },
            ctx: { name: '(The Events Calendar: Community Events Tickets version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Modern Tribe, Inc.)', namelength: '54', version: '', curr: '#currctxver', user: '#userctxver' },
            iwp: { name: '(Image Widget Plus version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Modern Tribe, Inc.)',                             namelength: '26', version: '', curr: '#curriwpver', user: '#useriwpver' },
            woo: { name: '(WooCommerce version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Automattic)',                                           namelength: '20', version: '', curr: '#currecmver', user: '#userecmver' },
            edd: { name: '(Easy Digital Downloads version )(.{0,})( by )(<a href=".{0,30}">){0,1}(Easy Digital Downloads)',                    namelength: '31', version: '', curr: '#currecmver', user: '#userecmver' }
        };

        /**
         * Table of the plugin versions
         */
        var htmlstring = '<div id="plugin-versions">';

        htmlstring += '<style>' +
            '#plugin-versions { z-index: 2; position: fixed; top: 0; background-color: rgb(62, 72, 73); color: rgb(242, 241, 240); transition-duration: 1000ms; transition-timing-function: ease-in-out; right: ' + startRight + '; min-width: 860px; }' +
            '#plugin-versions table { width: 100%; }' +
            '.versions td { padding: 0 5px !important; border-right: 1px solid white; line-height: 1.5em !important; font-size: 110% !important; }' +
            '.versions td img { width: 30px !important; }' +
            '.versions tr.first-row td { text-align: center; }' +
            '.alwayson { text-align: center; }' +
            '.versions td { line-height: 1.5em !important; }' +
            '.versions td.blue { background-color: #157f9d; }' +
            '.versions td.blue.new-version { background-color: #1ca8c7; }' +
            '.versions td.green { background-color: #078e87; }' +
            '.versions td.green.new-version { background-color: #2dd39c; }' +
            '.versions td.yellow { background-color: #ebe463; color: #666; }' +
            '.versions td.yellow.new-version { background-color: #ebc863; }' +
            '.row td:nth-child(6), .row td:nth-child(7) { border-right-width: 3px; }' +
            '.row { text-align: center; }' +
            '#hider, #more { cursor: pointer; }' +
            '.hider-cell, .more-cell { vertical-align: top; }' +
            '#plugin-versions thead, #plugin-versions tbody, #plugin-versions tr, #plugin-versions td { display: block; }' +
            '#plugin-versions tr:after { display: block; visibility: hidden; clear: both; content: " "; }' +
            '#plugin-versions thead td { height: 34px; }' +
            '#plugin-versions tbody { height: ' + initialRowsHeight + 'px; overflow-y: scroll; scrollbar-width: thin; scrollbar-color: orange rgb(62, 72, 73); transition-property: height; transition-duration: 0.5s; transition-timing-function: ease-in-out; }' +
            '#plugin-versions thead { overflow-y: scroll; scrollbar-width: thin; scrollbar-color: rgb(62, 72, 73) rgb(62, 72, 73); }' +
            '#plugin-versions td { width: ' + secondColumnWidth + 'px; float: left; white-space: nowrap; }' +
            '#plugin-versions td:nth-child(n+3) { width: calc((100% - ' + 2 * secondColumnWidth + 'px) / 13); }' +
            '</style>';
        htmlstring += '<table width="100%" class="versions" id="versions-table" cellpadding="0" cellspacing="0">';

        // Header row
        htmlstring += '<thead><tr class="row first-row alwayson">' +
            '<td class="hider-cell"><span id="hider">[';
        htmlstring += startHidden ? 'show' : 'hide';
        htmlstring += ']</span></td>' +
            '<td class="more-cell" id="more"><span id="mmore">[more]</span></td>' +
            '<td class="blue"><img src="https://andrasguseo.com/images/new-tec-icon.svg" title="TEC" alt="The Events Calendar icon" /></td>' +
            '<td class="blue"><img src="https://andrasguseo.com/images/new-ecp-icon.svg" title="ECP" alt="Events Calendar Pro icon" /></td>' +
            '<td class="blue"><img src="https://andrasguseo.com/images/new-ve-icon.svg" title="VE" alt="The Events Calendar: Virtual Events icon" /></td>' +
            '<td class="blue"><img src="https://andrasguseo.com/images/new-fb-icon.svg" title="Filter Bar" alt="The Events Calendar: Filter Bar icon" /></td>' +
            '<td class="blue">APM</td>' +
            '<td class="yellow"><img src="https://andrasguseo.com/images/new-eb-icon.svg" title="Eventbrite Tickets" alt="Eventbrite Tickets icon" /></td>' +
            '<td class="green"><img src="https://andrasguseo.com/images/new-et-icon.svg" title="ET" alt="Event Tickets icon" /></td>' +
            '<td class="green"><img src="https://andrasguseo.com/images/new-etp-icon.svg" title="ET+" alt="Event Tickets Plus icon" /></td>' +
            '<td class="green"><img src="https://andrasguseo.com/images/new-ce-icon.svg" title="Community Events" alt="Community Events icon" /></td>' +
            '<td class="green"><img src="https://andrasguseo.com/images/new-ct-icon.svg" title="Community Tickets" alt="Community Tickets icon" /></td>' +
            '<td class="green">IW+</td>';

        // eCommerce in Header
        htmlstring += '<td><img src="https://andrasguseo.com/images/woo-icon.png" title="WooCommerce" alt="WooCommerce icon" /></td>';
        htmlstring += '<td><img src="https://andrasguseo.com/images/edd-headshot.png" title="Easy Digital Downloads" alt="Easy Digital Downloads icon" /></td>';
        htmlstring += '</tr></thead>';

        htmlstring += '<tbody id="pluginversions-tbody">';

        // Go through the plugin history row by row

        for( var number in pluginHistory ) {

            if ( log ) console.log('Number: ' + number + ' ' + rowNumber );

            htmlstring += '<tr class="row';
            // For the last row add additional classes

            // Show last 3 rows on hover
            if ( number >= rowNumber-3 && number < rowNumber-1 ) htmlstring += ' show';

            // Always show last row
            if (  number == rowNumber-1 ) {
                htmlstring += ' last last-row alwayson';
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
                htmlstring += '<td class="';

                // Add class based on team
                if ( 0 <= j && j <= 4 ) {
                    htmlstring += 'blue';
                }
                else if ( 5 == j ) {
                    htmlstring += 'yellow'
                }
                else if ( 6 <= j && j <= 10 ) {
                    htmlstring += 'green'
                }

                if( log ) console.log( 'this: ' + number + '-' + pN );

                // If plugin version number has 'x', then it's a new release, so add extra class
                if( pluginHistory[number][pN].includes( "x" ) ) {
                    htmlstring += ' new-version';
                }

                // Closing quote
                htmlstring += '"';

                // Print the version number and close the cell
                htmlstring += '>' + pluginHistory[number][pN].replace( 'x', '' ) + '</td>';

            } // end for ( j = 0; j < pluginNames.length; j++ )

            // Close the row
            htmlstring += '</tr>';

        } // end for( var number in pluginHistory )

        htmlstring += '</tbody>';

        // Close the table and the container
        htmlstring += '</table>';
        htmlstring += '</div>';

        if ( log ) console.log( htmlstring );

        // Adding to markup
        $( '#body' ).after( htmlstring );

        /**
         * Expand / collapse table
         */
        function moreLess() {
            var more = document.getElementById( 'mmore' );
            var bodyHeight = document.getElementById('pluginversions-tbody').clientHeight;

            if ( bodyHeight >= expandedHeight ) {
                $( '#pluginversions-tbody' ).css({ 'height': initialRowsHeight + 'px' });
                more.innerHTML = '[more]';
                if ( scrollOnCollapse ) scrollToBottom();
            }
            else {
                $( '#pluginversions-tbody' ).css({ 'height': expandedHeight + 'px' });
                more.innerHTML = '[less]';
            }

        }

        /**
         * Hide / show table
         */
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

            if ( block.offsetLeft + 150 > window.outerWidth ) {
                $( '#plugin-versions' ).css({ 'right': startRight });
                str.innerHTML = '[hide]';
            }
            else {
                $( '#plugin-versions' ).css({ 'right': hideRight });
                str.innerHTML = '[show]';
            }
        }

        /**
         * Scroll to the bottom of the version numbers on collapse
         */
        function scrollToBottom() {
            var bodyHeight = document.getElementById('pluginversions-tbody').clientHeight;
            if ( bodyHeight > initialRowsHeight ) {
                scrollToBottomAction();
                setTimeout( scrollToBottom, 1);
            }
        }

        function scrollToBottomAction() {
            document.getElementById('pluginversions-tbody').scrollTop=document.getElementById('pluginversions-tbody').scrollHeight;
        }

        //using closure to cache all child elements
        var parent = document.getElementById( 'plugin-versions' );

        // Scrolling to bottom on load
        scrollToBottomAction();

        // Hide if we are starting hidden
        if ( startHidden ) {
            startRight = -parent.offsetWidth + 100;
        }
        $('#plugin-versions').css({'right': startRight});

        // Handle actions
        if ( document.getElementById( 'plugin-versions' ) != null ) {
            document.getElementById( 'hider' ).addEventListener( 'click', hideBlock );
            document.getElementById( 'more' ).addEventListener( 'click', moreLess );
        }

    } // if ( typeof alreadydone == 'undefined')

    /**
     * === Changelog ===
     *
     * 3.9.1 - 2020-12-08
     * Usability improvements & code cleanup
     * The version numbers table can now be scrolled
     * Setup can be customized with variables
     *
     * 3.9.0 - 2020-12-07
     * Added new plugin versions (80-81)
     *
     * 3.8.0 - 2020-10-26
     * Added new plugin versions (77-79)
     *
     * 3.7.0 - 2020-09-29
     * Added new plugin versions (75-76)
     *
     * 3.6.0 - 2020-09-07
     * Added new plugin versions (71-74)
     * Adjusted spacing to align columns in the main object
     *
     * 3.5.0 - 2020-06-24
     * Added new plugin versions (70)
     *
     * 3.4.0 - 2020-06-22
     * Updated version numbers up to this date (66-69)
     * Added Virtual Events
     *
     * 3.3.1 - 2020-04-29
     * Updated version numbers up to this date (63-65)
     * Updated product icons
     * Added product icons for Woo and EDD
     * Added the option to start the bar in a hidden stated
     * Restructured the code a bit
     *
     * 3.2.0 - 2020-03-04
     * Updated version numbers up to this date (62)
     *
     * 3.1.0 - 2020-02-25
     * Simplified versioning practice
     * Updated version numbers up to this date (59-61)
     *
     * 3.0.0.0 - 2020-02-09
     * Updated version numbers up to this date
     * Reordered plugins to separate Eventbrite Tickets / Yellow and adjusted code
     *
     * 2.28.2.0 - 2019-12-13
     * Added version numbers for B19.15
     * Added version numbers for AR Modal and hotfixes
     *
     * 2.26.1.0 - 2019-11-19
     * Adjusted version numbers for B19.14
     * Adjusted version numbers for G19.14 and hotfix
     * Did a whole bunch of code cleanup
     * Adjusted version numbers for G19.13
     * Removed duplicate column of Eventbrite Tickets
     *
     * 2.25.0.0 - 2019-10-29
     * Adjusted version numbers for B19.14
     * Adjusted version numbers for G19.13.1 Hotfix
     * Adjusted version numbers for G19.13
     * Removed duplicate column of Eventbrite Tickets
     *
     * 2.24.0.0 - 2019-10-10
     * Fixed Blue versioning
     *
     * 2.23.0.0 - 2019-10-06
     * Adjusted version numbers for G19.12
     *
     * 2.22.1.1 - 2019-09-26
     * Removed new markers for Green plugins (Ooops)
     *
     * 2.22.1.0 - 2019-09-26
     * Adjusted version numbers for B19.13 and hotfix
     *
     * 2.21.0.0 - 2019-09-24
     * Adjusted version numbers for G19.11
     *
     * 2.20.0.0 - 2019-09-06
     * Adjusted version number for ET hotfix
     * Adjusted version numbers for B19.12
     *
     * 2.19.2.1 - 2019-08-28
     * Enhanced the script so the 'note' column in the pluginHistory object can be omitted
     *
     * 2.19.2.0 - 2019-08-28
     * Adjusted version numbers for B19.11
     * Adjusted version numbers for Split Payments release
     * Adjusted version numbers for ET hotfix
     *
     * 2.18.0.0 - 2019-08-14
     * Adjusted version numbers for B19.09 and B19.10
     * Skipped a version number
     *
     * 2.16.0.0 - 2019-07-18
     * Adjusted version numbers for B19.08 and G19.09
     * Skipped a version number
     *
     * 2.14.0.0 - 2019-06-24
     * Adjusted version numbers for G19.08 and hotfix before
     *
     * 2.13.1.0 - 2019-06-12
     * Adjusted version numbers for B19.07 and hotfix
     *
     * 2.12.0.0 - 2019-05-27
     * Adjusted version numbers for G19.07
     *
     * 2.11.0.0 - 2019-05-16
     * Double down on G and B19.06
     * Skipped a version number
     *
     * 2.9.1.0 - 2019-05-07
     * TEC hotfix
     *
     * 2.9.0.0 - 2019-05-03
     * Restructured plugin order based on teams
     * Colored plugin columns based on teams
     * Adjusted version numbers for B19.05
     *
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
