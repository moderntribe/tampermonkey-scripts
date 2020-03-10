// ==UserScript==
// @name         .org Hider for Modern Tribe Support
// @namespace    http://tampermonkey.net/
// @version      1.7.1
// @description  The script runs in the .org forums for Modern Tribe plugins. A twin to .org Helper. It hides threads that don't need attention: resolved threads and threads where last voice is a team member.
// @author       Andras Guseo
// @include      https://wordpress.org/support/plugin/pardot*
// @include      https://wordpress.org/support/plugin/the-events-calendar*
// @include      https://wordpress.org/support/plugin/event-tickets*
// @include      https://wordpress.org/support/plugin/gigpress*
// @include      https://wordpress.org/support/plugin/image-widget*
// @include      https://wordpress.org/support/plugin/advanced-post-manager*
// @downloadURL  https://github.com/moderntribe/tampermonkey-scripts/raw/master/dotorg/dotorg-hider.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Get all lines in an array
    var x = document.getElementsByClassName( 'type-topic' );

    // MT support team members
    var mtteam = [
        'aguseo',                   // Andras Guseo
        'alaasalama',               // Alaa Salama
        'barryhughes-1',            // Barry Hughes
        'bordoni',                  // Gustavo Bordoni
        'bskousen3',                // Brendan Skousen
        'brianjessee',              // Brian Jessee
        'brook-tribe',              // Brook
        'chikaibeneme',             // Chika Ibeneme - 2020-02-10
        'cliffpaulick',             // Clifford Paulick
        'cliffseal',                // Cliff Seal - Pardot
        'courane01',                // Courtney Robertson
        'deblynprado',              // Deblyn Prado
        'djbramer',                 // Dan Bramer
        'erishel',                  // Edward Rishel
        'geoffbel',                 // Geoffroy 'LeGeoff' Belanger
        'geoffgraham',              // Geoff Graham
        'ggwicz',                   // George Gecewicz
        'jaimemarchwinski',         // Jaime Marchwinski
        'jentheo',                  // Jennifer Theodore
        'jeremy80',                 // Jeremy Marchandeau
        'juanfra',                  // Juan Francisco Aldasoro
        'mandraagora',              // Wolf Bishop - 2020-03-04
        'mitogh',                   // Crisoforo Hernandez
        'neillmcshea',              // Neill McShae
        'nicosantos',               // Nico Santos
        'nikrosales',               // Nik Rosales
        'patriciahillebrandt',      // Patricia Hillebrandt
        'sdenike',                  // Shelby DeNike
        'sjaure',                   // Santiago Jaureguiberry
        'skyshab',                  // Jason 'Sky' Shabatura
        'tokyobiyori',              // Ali Darwich
        'tribalmike',               // Mike Cotton
        'tribecari',                // Caroline
        'vicskf',                   // Victor Zarranz
        'zbtirrell',                // Zach Tirrell
    ];

    var i, j;

    // Check every line
    for( i = 0; i < x.length; i++ ) {

        // Check if the line is resolved
        for( j = 0; j < mtteam.length; j++ ) {
            //console.log();
            var m = x[i].innerHTML.search( 'class="resolved"' );
            if( m > 0 ) {
                x[i].style.display = 'none';

                // If resolved then skip
                continue;
            }

            // If not resolved, check if tha last voice is a team member
            var n = x[i].innerHTML.search( 'href="https://wordpress.org/support/users/' + mtteam[j] + '/"' );

            if ( n > 0 ) {
                var o = x[i].innerHTML.search( /[1-9] (month[s]?)/ );
                if ( o > 0 ) {
                    x[i].style.backgroundColor = '#ffe463';
                    continue;
                }
                x[i].style.display = 'none';
            }
        }
    }


})();
