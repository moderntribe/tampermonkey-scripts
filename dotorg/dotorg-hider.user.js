// ==UserScript==
// @name         .org Hider for Modern Tribe Support
// @namespace    http://tampermonkey.net/
// @version      1.7.3
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

/**
 * Hides all threads that are resolved or last voice is Modern Tribe.
 * Marks threads yellow that are more than a month old.
 */

(function() {
    'use strict';

    // Get all lines in an array
    var x = document.getElementsByClassName( 'type-topic' );

    // MT team members
    var mtteam = [
        'aguseo',                       // Andras Guseo
        'alaasalama',                   // Alaa Salama
        'barryhughes-1',                // Barry Hughes
        'bordoni',                      // Gustavo Bordoni
        'bskousen3',                    // Brendan Skousen
        'brianjessee',                  // Brian Jessee
        'borkweb',                      // Mattew Batchelder            - 2020-03-30
        'brook-tribe',                  // Brook
        'chikaibeneme',                 // Chika Ibeneme                - 2020-02-10
        'cliffpaulick',                 // Clifford Paulick
        'cliffseal',                    // Cliff Seal - Pardot
        'cswebd3v',                     // Chris Swenson                - 2020-09-01
        'courane01',                    // Courtney Robertson
        'deblynprado',                  // Deblyn Prado
        'djbramer',                     // Dan Bramer
        'erishel',                      // Edward Rishel
        'eugenekyale',                  // Eugene Kyale                 - 2020-09-01
        'geoffbel',                     // Geoffroy 'LeGeoff' Belanger
        'geoffgraham',                  // Geoff Graham
        'ggwicz',                       // George Gecewicz
        'jaimemarchwinski',             // Jaime Marchwinski
        'jentheo',                      // Jennifer Theodore
        'jeremy80',                     // Jeremy Marchandeau
        'juanfra',                      // Juan Francisco Aldasoro
        'koriashton',                   // Kori Ashton                  - 2020-09-01
        'lucasbustamante',              // Lucas Bustamante             - 2020-03-30
        'mandraagora',                  // Wolf Bishop                  - 2020-03-04
        'masoodak',                     // Masood Khan                  - 2020-09-01
        'mitogh',                       // Crisoforo Hernandez
        'neillmcshea',                  // Neill McShae
        'nicosantos',                   // Nico Santos
        'nikrosales',                   // Nik Rosales
        'patriciahillebrandt',          // Patricia Hillebrandt
        'rafsuntaskin',                 // Rafsun Chowdhury             -2020-03-30
        'sdenike',                      // Shelby DeNike
        'sjaure',                       // Santiago Jaureguiberry
        'skyshab',                      // Jason 'Sky' Shabatura
        'tokyobiyori',                  // Ali Darwich
        'tribalmike',                   // Mike Cotton
        'tribecari',                    // Caroline
        'translationsbymoderntribe',    // Modern Tribe Translations    - 2020-03-30
        'vicskf',                       // Victor Zarranz
        'zbtirrell',                    // Zach Tirrell
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
