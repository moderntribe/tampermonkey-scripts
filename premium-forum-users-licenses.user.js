// ==UserScript==
// @name         Premium Forum Extras - Show user's licenses
// @namespace    https://theeventscalendar.com/
// @version      0.8
// @description  Show the user's licenses at the bottom right
// @author       Andras Guseo
// @include      https://theeventscalendar.com/wp-admin/post.php?*
// @match        https://theeventscalendar.com/wp-admin/post.php?*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/moderntribe/tampermonkey-scripts/master/premium-forum-users-licenses.user.js
// @run-at       document-idle

// ==/UserScript==

(function() {
    'use strict';

    /**
     * Show the user's licenses at the bottom right
     */
    $( '.licenses' ).clone().appendTo( '#poststuff' ).addClass( 'newLicenses' );

    var cssLicenses = 'li.newLicenses { position: fixed; bottom: 80px; right: 20px; font-size: 85%; list-style: none; tight: 20px; z-index: -1; } li.newLicenses .nonactive { color: #A00000; } ',
        head = document.head || document.getElementsByTagName( 'head' )[0],
        style = document.createElement( 'style' );

    style.type = 'text/css';
    if ( style.styleSheet ) {
        style.styleSheet.cssText = 'css';
    }
    else {
        style.appendChild( document.createTextNode( cssLicenses ) );
    }

    head.appendChild( style );

})();