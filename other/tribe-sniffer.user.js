// ==UserScript==
// @name         Tribe Sniffer
// @namespace    http://tampermonkey.net/
// @version      2.0.0
// @description  Trying to find out what's running on a WordPress site with The Events Calendar.
// @author       Andras Guseo
// @include      https://*
// @exclude      http*://*.local/wp-admin/*
// @exclude      https://support.theeventscalendar.com/*
// @exclude      https://theeventscalendar.ladesk.com/*
// @exclude      https://theeventscalendar.com/*
// @exclude      *google*
// @downloadURL  https://github.com/moderntribe/tampermonkey-scripts/raw/master/other/tribe-sniffer.user.js
// @grant        none
// @run-at document-end
// ==/UserScript==

(function() {
    'use strict';

    console.log( 'Started sniffing' );

    // Only logs found items
    var logLevel1 = false;

    // Logs everything
    var logLevel2 = false;
    if ( logLevel2 ) logLevel1 = true;

    var snifferVersionNumber = '2.0';

    /**
     * Declarations
     */
    var competitors = {
        "Modern Events Calendar": { id: "mec-frontend-script-js-extra" },
        "Something Else": { id: "something-else" },
    };

    var bodyClasses = document.getElementsByTagName( 'body' )[ 0 ].className.split( " " );

    // Classes of the views. Note: List should be (almost) at the end, as its css class can be present on other list-based views.
    var views = {
        "Day view"         : { css1: "tribe-events-day", css2: "tribe-events-view--day" },
        "Month view"       : { css1: "tribe-events-month", css2: "tribe-events-view--month" },
        "Week view"        : { css1: "tribe-events-week", css2: "tribe-events-view--week" },
        "Photo view"       : { css1: "tribe-events-view-photo", css2: "tribe-events-view--photo" },
        "Map view"         : { css1: "tribe-events-map", css2: "tribe-events-view--map" },
        "List view"        : { css1: "tribe-events-list", css2: "tribe-events-view--list" },
        "Single event view": { css1: "tribe-events-single", css2: "tribe-events-single" },
    };

    // Products and IDs of their assets
    var products = {
        //"WordPress"              : { css : "wp-block-library-css" },
        "The Events Calendar V1" : { css: "tribe-events-calendar-style-css" },
        "The Events Calendar V2" : { css: "tribe-events-views-v2-skeleton-css" },
        "Events Calendar Pro"    : { css: "tribe-events-calendar-pro-style-css" },
        "Virtual Events"         : { css: "tribe-events-virtual-skeleton-css" },
        "Filter Bar V1"          : { css: "tribe-filterbar-styles-css" },
        "Filter Bar V2"          : { css: "tribe-events-filterbar-views-v2-1-filter-bar-skeleton-css" },
        "Event Tickets"          : { css: "event-tickets-tickets-css-css" },
        "Event Tickets Plus"     : { css: "event-tickets-plus-tickets-css-css" },
        //"WooCommerce"            : { css : "woocommerce-general-css" },
        "Avada"                  : { css: "avada-stylesheet-css" },
    };

    // Used for themes and Autoptimize
    var links = document.getElementsByTagName( 'link' );

    // Getting the <meta>'s: WPML, WooCommerce, etc
    var metaTags = document.getElementsByTagName( 'meta' );
    var metas = [
        'WooCommerce',
        'WPML',
        'Divi',
    ];

    /**
     * Caching plugins
     */
    var caching = [
        'WP-Super-Cache',
        'WP Fastest Cache',
        'W3 Total Cache',
        'Hummingbird',
        'WP Rocket',
        'Endurance Page Cache',
        'LiteSpeed Cache',
        'WP Super Minify',
    ];

    /**
     * Work
     */

        // Check for competitor
    var competitorHtml = checkIfCompetitor();

    // If there is no competitor or tribe product found, then quit
    if ( false === competitorHtml && false === checkIfTribe() ) {
        console.log( 'Tribe or competitor not found. Quitting.' );
        return false;
    }

    // String V1 or V2
    var tecDesignVersion = getTecDesignVersion();

    // String: 'view' or n/a
    var tecView = getTecView( tecDesignVersion );

    // String
    var editorUsed = getEditor( tecView );

    // String
    var shortcode = getShortcode();

    // HTML markup
    var versionNumbers = getVersionNumbers( tecDesignVersion );

    // String
    var theme = getTheme();

    // HTML markup
    var WordPress = getOtherPlugins( true );

    // HTML markup
    var otherPlugins = getOtherPlugins( false );

    // Bool
    var autoptimize = checkAutoptimize();

    // String
    var cachingPlugin = checkCaching();

    /**
     * Render
     */
    var finalHtml = renderStyle() + renderMarkup();
    if ( window.self === window.top ) {
        document.getElementsByTagName( 'body' )[ 0 ].insertAdjacentHTML( 'afterend', finalHtml );
        document.getElementById( 'sniffer-container' ).style.right = -document.getElementById( 'sniffer-container' ).offsetWidth + 55 + "px";
        document.getElementById( 'hider' ).addEventListener( 'click', hideBlock );
    }

    /**
     * Functions
     */

    /**
     * Checking for competitor products
     *
     * @returns {string|boolean} Returns the product name or false if not found.
     */
    function checkIfCompetitor() {

        if ( logLevel1 ) console.log( "Checking for competitors." );

        for( var competitor in competitors ) {

            if ( logLevel2 ) console.log( "Checking for: " + competitor );

            if ( null !== document.getElementById( competitors[ competitor ].id ) ) {

                if ( logLevel1 ) console.log( competitor + ' found.' );

                //var competitorHtml = competitor;

                return competitor;
            }
        }
        return false;
    }

    /**
     * Check for 'tribe' in body classes to see if Modern Tribe plugins are present
     *
     * @returns {boolean}
     */
    function checkIfTribe() {
        for( var i = 0; i < bodyClasses.length; i++ ) {
            if ( bodyClasses[ i ].startsWith( "tribe" ) ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Get the used design version for Modern Tribe Products based on the presence of a V2 css class
     *
     * @returns {string} V1 or V2
     */
    function getTecDesignVersion() {
        // We use breakpoint to check for design version
        var design = 'V1';
        if ( document.getElementsByClassName( 'tribe-common--breakpoint-xsmall' ).length > 0 ) {
            design = 'V2';
        }
        if ( logLevel1 ) console.log ( 'Design used: ' + design );
        return design;
    }

    /**
     * Get the calendar view of the current page.
     *
     * @param design The design used in The Events Calendar, V1 or V2.
     *
     * @returns {string} Name of the view or n/a.
     *
     * @todo Remove css if not needed
     * @todo In the log line use the appropriate css (css1 or css2) based on design
     */
    function getTecView( design ) {
        var element;
        //var css;

        // Go through the views row by row
        for( var view in views ) {
            if ( logLevel2 ) console.log( design + ' - ' + view + ': ' + views[ view ].css2 );
            if ( design == 'V1' ) {
                element = document.getElementsByClassName( views[ view ].css1 );
                //css = views[ view ].css1;
            } else if ( design == 'V2' ) {
                element = document.getElementsByClassName( views[ view ].css2 );
                //css = views[ view ].css1;
            }

            // Check if the class exists
            if ( element.length > 0 ) {
                if ( logLevel1 ) console.log( 'Found view: ' + view );
                return view;
            }
        }
        return 'n/a';
    }

    /**
     * Try to get the editor used on single event page.
     *
     * @param view
     *
     * @returns {string} The editor used or n/a.
     */
    function getEditor( view ) {
        // Block editor on single event page
        var editor = document.getElementsByClassName( 'tribe-blocks-editor' );

        if ( view == 'Single event view' ) {
            if ( editor.length > 0 ) {
                editor = 'Block editor';
            } else {
                editor = 'Classic editor';
            }
        } else {
            editor = 'n/a';
        }

        return editor;
    }

    /**
     * Check if page was generated by any kind of shortcode.
     *
     * @returns {string} Returns if the page is generated with shortcode and if yes, then which plugin was used.
     */
    function getShortcode() {
        // Tribe shortcodes
        var shortcodeV1 = document.getElementsByClassName( 'tribe-events-shortcode' );
        var shortcodeV2 = document.getElementsByClassName( 'tribe-events-view--shortcode' );
        // Events Calendar Shortcode & Block
        var ecsb = document.getElementsByClassName( 'ecs-events' );
        // Events Calendar Shortcode and Templates Addon
        var ect = document.getElementById( 'ect-events-list-content' );
        // This holds the answer
        var shortcode = '';

        if ( shortcodeV1.length > 0 || shortcodeV2.length > 0 ) {
            shortcode = 'Yes';
        } else {
            if ( ecsb.length > 0 ) {
                shortcode = "Yes, by 3rd party plugin:\n - <a href='https://wordpress.org/plugins/the-events-calendar-shortcode/' target='_blank'>The Events Calendar Shortcode & Block</a>";
            } else if ( ect != null && ect.innerHTML.length > 0 ) {
                shortcode = "Yes, by 3rd party plugin:\n - <a href='https://wordpress.org/plugins/template-events-calendar/' target='_blank'>The Events Calendar Shortcode and Templates Addon</a>";
            } else {
                shortcode = "NO";
            }
        }
        if ( logLevel1 ) console.log( 'Shortcode: ' + shortcode );
        return shortcode;
    }

    /**
     * Try to get the theme used
     *
     * @returns {string} The theme name or slug
     */
    function getTheme() {
        var theme = "couldn't identify";

        // Checking for the theme
        for( var i = 0; i < bodyClasses.length; i++ ) {
            // Check for Avada
            if ( logLevel2 ) console.log( 'Checking: ' + bodyClasses[i] + ' for...' );
            if ( logLevel2 ) console.log( '...Avada...' );
            if ( bodyClasses[ i ].startsWith( "avada-" ) ) {
                var avadaVersion = document.getElementById( products[ 'Avada' ].css ).getAttribute( 'href' );
                theme = 'Avada ' + getVersionNumber( avadaVersion );
                break;
            }

            // Check for other themes
            if ( logLevel2 ) console.log( '...other themes...' );
            if ( bodyClasses[ i ].startsWith( "tribe-theme-" ) ) {
                theme = bodyClasses[ i ].substr( 12 );
                break;
            }
            // Check for more other themes
            if ( logLevel2 ) console.log( '...more other themes...' );
            if ( bodyClasses[ i ].startsWith( "theme-" ) ) {
                theme = bodyClasses[ i ].substr( 6 );
                break;
            }
        }
        // Check for even more other themes
        if ( theme == '' ) {
            if ( logLevel2 ) console.log( '...even more other themes...' );
            for( i = 0; i < links.length; i++ ) {
                var link = links[ i ].href.match( /(themes\/).{2,}?(\/)/ );
                if ( links[ i ].href != undefined && link != null ) {
                    theme = link[ 0 ].slice( 7, -1 );
                    break;
                }
            }
        }

        if ( logLevel1 ) console.log( 'Theme found: ' + theme );
        return theme;
    }

    /**
     * Retrieves the version number of a product
     *
     * @param resourceUrl The URL of the resource
     *
     * @returns {string}  The version number
     */
    function getVersionNumber( resourceUrl ) {
        // Grab the version number
        var versionNumber = resourceUrl.substr( resourceUrl.indexOf( "=" ) + 1 );

        // Check if there is anything after the version number
        var misc = versionNumber.search( '&' );
        if ( misc > 0 ) {
            versionNumber = versionNumber.substr( 0, misc );
        }

        if ( logLevel2 ) console.log( resourceUrl + ' | ' + versionNumber );
        return versionNumber;
    }

    /**
     * Looking for other plugins and their version numbers
     *
     * @param wp  Boolean if we want to retrieve WordPress version number or something else
     *
     * @returns {*}
     */
    function getOtherPlugins( wp = false ) {
        var other = '';
        // Looking for WordPress and other plugins
        for( var i = 0; i < metaTags.length; i++ ) {
            // Skip if meta is not 'generator'
            if ( metaTags[ i ].name != 'generator' ) continue;

            if ( logLevel2 ) console.log( 'Checking <meta> ' + metaTags[i].content + ' for...' );
            if ( ! wp ) {
                for( var j = 0; j < metas.length; j++ ) {
                    if ( logLevel2 ) console.log( '...' + metas[j] + '...' );
                    if ( metaTags[ i ].content.search( metas[j] ) >= 0 ) {
                        other += lineify( metaTags[ i ].content ); //'<p>' + metaTags[i].content + '</p>';
                        if ( logLevel2 ) console.log( other );
                    }
                }
            }
            else {
                // WordPress
                if ( logLevel2 ) console.log( 'Checking <meta> ' + metaTags[i].content + ' for WordPress' );
                if ( metaTags[ i ].content.search( 'WordPress' ) == 0 ) {
                    other += lineify( metaTags[ i ].content ); //'<p>' + metaTags[i].content.split(" ")[0]; + '</p>';
                    if ( logLevel2 ) console.log( other );
                    return other;
                }
            }
        }

        return other;
    }

    /**
     * Get Modern Tribe plugin version numbers.
     *
     * @param design The design used in The Events Calendar, V1 or V2.
     *
     * @returns {string} HTML markup of the list of plugins with version numbers
     *
     * @todo Eliminate one Filter Bar version
     */
    function getVersionNumbers( design ) {
        var plugins = '';
        var version = '';

        // Version numbers
        // Go through the products row by row
        for( var product in products ) {
            //if ( logLevel2 ) console.log( design + product + ', ' + products[ product ].css );

            // Skip the following
            if ( product == 'Avada' ) continue;

            // Eliminate one TEC
            if ( (design == 'V1' || design == '(V1)') && product == 'The Events Calendar V2' ) continue;
            if ( design == 'V2' && product == 'The Events Calendar V1' ) continue;

            var x = document.getElementById( products[ product ].css );

            // If the stylesheet is found, then let's look at the href attrib / URL
            if ( x != null ) x = x.getAttribute( "href" );

            // Look for version number
            if ( x != null && x.search( "=" ) >= 0 ) {
                version = getVersionNumber( x );
            }
            // ... or add 'not found'
            else {
                version = 'not found';
            }

            if ( logLevel1 ) console.log( product + ' ' + version + ' found' );
            // Open the line
            plugins += '<p><span class="sniffer-label sniffer-product-name">' + product + ':</span> <span class="sniffer-product-version">';
            plugins += version;
            // Close the line
            plugins += '</span></p>';

        }

        return plugins;
    }

    /**
     * Checking for Autoptimize
     *
     * @returns {boolean}
     */
    function checkAutoptimize() {
        for( var i = 0; i < links.length; i++ ) {
            var source = links[ i ].getAttribute( 'href' );
            if ( source != null ) {
                if ( source.search( 'autoptimize' ) > 0 ) {
                    if ( logLevel1 ) console.log( 'Autoptimize found.' );
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Checking for caching and minification plugins. Returns the first found.
     *
     * @returns {string}
     */
    function checkCaching() {
        // Last tag before the closing body. For caching plugins.
        var prevSib = document.lastChild.previousSibling.nodeValue;
        var lastChi = document.lastChild.nodeValue;
        var i;

        // Checking last sibling
        if( logLevel2 ) console.log( 'Caching: checking prevSib for...' );
        if ( prevSib != null ) {
            for( i = 0; i < caching.length; i++ ) {
                if( logLevel2 ) console.log( '...' + caching[i] );
                if ( prevSib.search( caching[ i ] ) > 0 ) {
                    if( logLevel1 ) console.log( 'Caching found: ' + caching[i] );
                    return caching[ i ];
                }
            }
        }
        if ( logLevel2 ) console.log( '...No prevSib found in DOM' );

        // Checking last child
        if( logLevel2 ) console.log( 'Caching: checking lastChi for...' );
        if ( lastChi != null ) {
            for( i = 0; i < caching.length; i++ ) {
                if( logLevel2 ) console.log( '...' + caching[i] );
                if ( lastChi.search( caching[ i ] ) > 0 ) {
                    if( logLevel1 ) console.log( 'Caching found: ' + caching[i] );
                    return caching[ i ];
                }
            }
        }
        if ( logLevel2 ) console.log( '...No lastChi found in DOM' );

        // Asset CleanUp: Page Speed Booster
        // IDs for ACU
        if( logLevel2 ) console.log( 'Caching: checking for ACU...' );
        var cachingACU = [ 'wpacu-combined-css-body-1', 'wpacu-combined-js-body-group-1' ];
        for( i = 0; i < cachingACU.length; i++ ) {
            if ( null != document.getElementById( cachingACU[ i ] ) ) {
                if( logLevel1 ) console.log( 'Caching found: Asset CleanUp: Page Speed Booster' );
                return "Asset CleanUp: Page Speed Booster";
            }
        }

        // Swift Performance caching plugin
        if( logLevel2 ) console.log( 'Caching: checking for Swift Performance...' );
        if ( document.getElementsByClassName( 'swift-in-viewport' ).length > 0 ) {
            if( logLevel1 ) console.log( 'Caching found: Swift Performance' );
            return "Swift Performance";
        }

        if( logLevel1 ) console.log( 'No caching found' );
        return 'not found';
    }

    /**
     * Create a renderable line with HTML markup
     *
     * @param line
     *
     * @returns {string}
     */
    function lineify( line ) {
        line = line.split( " " );
        return '<p><span class="sniffer-label">' + line[ 0 ] + ':</span> ' + line[ 1 ].replace( 'ver:', '' ).replace( 'v.', '' ) + '</p>';
    }

    /**
     * Rendering
     */
    function renderStyle() {
        var style = '<style>#sniffer-container { border: 0px solid black; color: #666; position: fixed; top: 10%; font-family: "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif; z-index: 9999999999; transition-duration: 1000ms; transition-timing-function: ease-in-out; }';
        style += '#sniffer-container .sniffer-version { font-size: 10px; font-weight: bold; position: absolute; top: -1.1em; left: 65px; }';
        style += '#sniffer-container .tab { width: 60px; height: 50px; border: 1px solid #666; border-right-width: 0; float: left; background-image: url("https://andrasguseo.com/images/sniffer-1.png"); background-repeat: no-repeat; background-size: 50px 50px; background-position-x: 5px; background-color: #fff; border-top-left-radius: 10px; border-bottom-left-radius: 10px; }';
        style += '#sniffer-container .info { float: left; padding: 10px; border: 1px solid #666; background-color: #efefef; }';
        style += '#sniffer-container .sniffer-section { margin-bottom: 1em; }';
        style += '#sniffer-container h2, #sniffer-container p { margin: 0.4em 0; color: #333; line-height: unset; padding: 0; font-family: unset; }';
        style += '#sniffer-container h2 { font-size: 18px; font-weight: bold; }';
        style += '#sniffer-container p { font-size: 14px; }';
        style += '#sniffer-container .sniffer-label { min-width: 170px; display: inline-block; }';
        style += '</style>';

        return style;
    }

    function renderMarkup() {

        var html = '';
        html = '<div id="sniffer-container">';
        html += '<div class="sniffer-version">Tribe Sniffer ' + snifferVersionNumber + '</div>';
        html += '<div class="tab" id="hider">&nbsp;</div>';
        html += '<div class="info">';
        html += '<div class="sniffer-section">';

        if ( false !== competitorHtml ) {
            html += '<p>' + competitorHtml + '</p>';
        } else {
            html += '<h2>About this page</h2>';
            html += '<p><span class="sniffer-label">View:</span> <span class="sniffer-value">';
            html += tecView;
            html += '</span></p>';

            html += '<p>';
            html += '<span class="sniffer-label">Editor used:</span> <span class="sniffer-value">';
            html += editorUsed;
            html += '</span></p>';

            html += '<p><span class="sniffer-label">Design:</span> <span class="sniffer-value">';
            html += tecDesignVersion;
            html += '</span></p>';

            html += '<p><span class="sniffer-label">Generated by shortcode:</span> <span class="sniffer-value">';
            html += shortcode;
            html += '</span></p>';

            html += '<p><span class="sniffer-label">Theme used:</span> <span class="sniffer-value">';
            html += theme;
            html += '</span></p>';

            html += '</div>';

            html += '<div class="sniffer-section">';
            html += '<h2>Versions</h2>';

            html += WordPress;

            html += versionNumbers;

            html += otherPlugins;

            html += '</div>';

            html += '<div class="sniffer-section">';
            html += '<h2>Caching / Minification</h2>';

            if ( true === autoptimize ) {
                html += '<p>AUTOPTIMIZE FOUND!!!</p>';
            }

            html += '<p>' + cachingPlugin + '</p>';

        }
        html += '</div></div></div>';

        return html;
    }

    /**
     * Animation
     */
    function hideBlock() {
        var block = document.getElementById( 'sniffer-container' );
        var str = document.getElementById( 'hider' );
        var right = window.outerWidth - block.offsetLeft;
        var hideRight = -block.offsetWidth + 55;
        if ( logLevel2 ) console.log( 'block.offsetLeft: ' + block.offsetLeft );
        if ( logLevel2 ) console.log( 'block.offsetWidth: ' + block.offsetWidth );
        if ( logLevel2 ) console.log( 'window.outerWidth: ' + window.outerWidth );
        if ( logLevel2 ) console.log( 'right: ' + right );
        if ( logLevel2 ) console.log( 'hideRight: ' + hideRight );


        if ( block.offsetLeft + 150 > window.outerWidth ) {
            block.style.right = "10px";
            if ( logLevel2 ) console.log( 'move left' );
        } else {
            block.style.right = hideRight + "px";
            if ( logLevel2 ) console.log( 'move right' );
        }
    }

})();
