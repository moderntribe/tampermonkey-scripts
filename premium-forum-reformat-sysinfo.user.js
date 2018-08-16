// ==UserScript==
// @name         Premium Forum Extras - Reformat Sysinfo
// @namespace    https://theeventscalendar.com/
// @version      0.1
// @description  Reformat system information if it comes through without line breaks. If you still see improvement areas, let me know.
// @author       Andras Guseo
// @include      https://theeventscalendar.com/wp-admin/post.php?*
// @match        https://theeventscalendar.com/wp-admin/post.php?*
// @downloadURL  https://raw.githubusercontent.com/moderntribe/tampermonkey-scripts/master/premium-forum-reformat-sysinfo.user.js
// @grant        none
// ==/UserScript==

// @to-test      https://theeventscalendar.com/wp-admin/post.php?post=1597502&action=edit
// @to-test      https://theeventscalendar.com/wp-admin/post.php?post=1597502&action=edit

(function() {
    'use strict';

    // Get sysinfo
    var s = document.getElementsByClassName( 'system-info' );

    if ( s.length > 0 ) {
        var fullstats = s[0].innerHTML;

        // Normal case #1
        if ( fullstats.startsWith('<p>') ) {
            //console.log( 'p' )
        }
        // Normal case #2
        else if ( fullstats.startsWith('<dl') ) {
            //console.log( 'dl' )
        }
        // Abnormal case
        else {
            //console.log( 'none' );
            // Split options into new lines
            fullstats = fullstats.replace( /((\w|-)* =[^>&])/g, '<br>$&' );
            // Split plugin list into new lines
            // (exclude also Google Analytics Dashboard for WP (GADWP))
            fullstats = fullstats.replace( /[^(GADWP)]\)/g, '$&<br>' );
            // Split WordPress version into new line
            // and skip plugins that end with "for WordPress version x.y"
            fullstats = fullstats.replace( /(wordpress version)\s([4-5])([0-9\.]{2,5})/ig, '<br>&nbsp;<br>$&<br>' );
            // Split 'Theme' into new line
            // And exclude iThemes, ThemeFusions, theme-fusion etc.
            fullstats = fullstats.replace( /theme[^\w\-]/ig, '<br>&nbsp;<br>$&<br>' );

            var titles = [
                'Home URL',
                'Site URL',
                'Site Language',
                'Character Set',
                'Name',
                'Email',
                'Install keys',
                'Permalink Structure',
                'PHP version',
                'Server',
                'SAPI',
                'Plugins',
                'Network Plugins',
                'MU Plugins',
                'Multisite',
                'Settings',
                'Community Add',
                'Community List',
                'Community Options',
                'WP Timezone',
                'WP GMT Offset',
                'Default PHP Timezone',
                'WP Date Format',
                'WP Time Format',
                'Week Starts On',
                'Common Library Dir',
                'Common Library Version',
            ];

            // Split section headers into new lines
            for ( var t = 0; t < titles.length; t++ ) {
                fullstats = fullstats.replace( titles[t], '<br>&nbsp;<br>' + titles[t].toUpperCase() + '<br>' );
                fullstats = fullstats.replace( titles[t].toUpperCase(), '<br>&nbsp;<br>' + titles[t].toUpperCase() + '<br>' );
            }

        }

        // Replace double new lines to single
        fullstats = fullstats.replace( /(<br>)(\s){0,1}(<br>)/ig, '<br>' );

        // Remove blank lines from beginning
        fullstats = fullstats.replace( /(.*)home url/ig, 'HOME URL' );

        // Replace sysinfo
        s[0].innerHTML = fullstats;

        // Color red to signal change
        $( '.when-collapsed' ).css({ 'color': 'red' });
        $( '.when-expanded' ).css({ 'color': 'red' });
    } // else {

})();
