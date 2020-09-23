// ==UserScript==
// @name         .org Helper for Modern Tribe Support
// @namespace    http://tampermonkey.net/
// @version      1.7.4
// @description  The script runs in the .org forums for Modern Tribe plugins. It colors resolved threads green, and threads where last voice is a team member light yellow.
// @author       Andras Guseo
// @include      https://wordpress.org/support/plugin/pardot*
// @include      https://wordpress.org/support/plugin/the-events-calendar*
// @include      https://wordpress.org/support/plugin/event-tickets*
// @include      https://wordpress.org/support/plugin/gigpress*
// @include      https://wordpress.org/support/plugin/image-widget*
// @include      https://wordpress.org/support/plugin/advanced-post-manager*
// @downloadURL  https://github.com/moderntribe/tampermonkey-scripts/raw/master/dotorg/dotorg-helper.user.js
// @grant        none
// ==/UserScript==

/**
 * Marks resolved threads green.
 * Marks threads blue where Modern Tribe is the last voice. (No action needed.)
 * Marks threads yellow that are more than a month old.
 */

(function() {
    'use strict';

    // Get all lines in an array
    var x = document.getElementsByClassName( 'type-topic' );

    // MT team members
    var mtteam = [
        'aguseo',                       // Andras Guseo                 - 2016-04-25
        'alaasalama',                   // Alaa Salama                  - 2018-11-19 to 2020-08-31
        'barryhughes-1',                // Barry Hughes                 - xxxx-xx-xx to 2020-07-31
        'bordoni',                      // Gustavo Bordoni
        'bskousen3',                    // Brendan Skousen              - 2017-10-23
        'brianjessee',                  // Brian Jessee
        'borkweb',                      // Mattew Batchelder            - 2020-03-30
        'brook-tribe',                  // Brook                        - xxxx-xx-xx to 2017-xx-xx
        'chikaibeneme',                 // Chika Ibeneme                - 2020-02-10
        'cliffpaulick',                 // Clifford Paulick
        'cliffseal',                    // Cliff Seal - Pardot
        'cswebd3v',                     // Chris Swenson                - 2020-09-01
        'courane01',                    // Courtney Robertson           - 2017-02-22
        'deblynprado',                  // Deblyn Prado                 - 2019-04-11
        'djbramer',                     // Dan Bramer
        'erishel',                      // Edward Rishel                - 2018-03-12 to 2018-12-31	
        'eugenekyale',                  // Eugene Kyale                 - 2020-09-01
        'eugenetribe',                  // Eugene Kyale                 - 2020-09-01
        'geoffbel',                     // Geoffroy 'LeGeoff' Belanger  - 2016-01-20
        'geoffgraham',                  // Geoff Graham
        'ggwicz',                       // George Gecewicz              - xxxx-xx-xx to 2017-xx-xx
        'iammarta',                     // Marta Kozak                  - 2020-09-01
        'jaimemarchwinski',             // Jaime Marchwinski            - 2017-08-31
        'jentheo',                      // Jennifer Theodore            - 2017-05-08
        'jeremy80',                     // Jeremy Marchandeau           - 2018-03-26
        'juanfra',                      // Juan Francisco Aldasoro
        'koriashton',                   // Kori Ashton                  - 2020-09-01
        'lucasbustamante',              // Lucas Bustamante             - 2020-03-30
        'mandraagora',                  // Wolf Bishop                  - 2020-03-04
        'masoodak',                     // Masood Khan                  - 2020-09-01
        'matumu',                       // Marho Atumu                  - 2020-09-01
        'mitogh',                       // Crisoforo Hernandez
        'neillmcshea',                  // Neill McShae
        'nicosantos',                   // Nico Santos                  - 2015-xx-xx to 2019-xx-xx
        'nikrosales',                   // Nik Rosales                  - 2020-02-24
        'patriciahillebrandt',          // Patricia Hillebrandt         - 2017-06-09
        'rafsuntaskin',                 // Rafsun Chowdhury             - 2020-03-30
        'sdenike',                      // Shelby DeNike                - 2018-10-08 to 2019-08-31
        'sjaure',                       // Santiago Jaureguiberry       - 2019-05-26
        'skyshab',                      // Jason 'Sky' Shabatura        - 2018-01-02
        'tokyobiyori',                  // Ali Darwich                  - 2018-11-19
        'tribalmike',                   // Mike Cotton                  - 2018-10-11
        'tribecari',                    // Caroline                     - 2016-05-16 to 2017-12-31
        'translationsbymoderntribe',    // Modern Tribe Translations    - 2020-03-30
        'vicskf',                       // Victor Zarranz               - 2017-xx-xx
        'zbtirrell',                    // Zach Tirrell                 - 
    ];

    var i, j;
    var resolvedColor  = '#98fb98';
    var lastVoiceColor = '#add8e6';
    var closeColor     = '#ffe463';

    // Check every line
    for( i = 0; i < x.length; i++ ) {

        // Check if the line is resolved
        for( j = 0; j < mtteam.length; j++ ) {
            //console.log();
            var m = x[i].innerHTML.search( 'class="resolved"' );
            if( m > 0 ) {
                x[i].style.backgroundColor = resolvedColor;

                // If resolved then skip
                continue;
            }

            // If not resolved, check if tha last voice is a team member
            var n = x[i].innerHTML.search( 'href="https://wordpress.org/support/users/' + mtteam[j] + '/"' );

            if ( n > 0 ) {
                var o = x[i].innerHTML.search( /[1-9] (month[s]?)/ );
                if ( o > 0 ) {
                    x[i].style.backgroundColor = closeColor;
                    continue;
                }
                x[i].style.backgroundColor = lastVoiceColor;
            }
        }
    }


})();
