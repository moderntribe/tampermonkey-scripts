// ==UserScript==
// @name         CMD + SAVE a ticket
// @namespace    https://central.tri.be/
// @version      0.1.0
// @description  When editing a ticket, hit cmd + save to save the ticket
// @author       Aaron Hanson
// @include      /https?:\/\/central(dev)?.tri.be/
// @grant        none
// ==/UserScript==

( function( $ ) {

$(window).bind('keydown', function(event) {
    if (event.ctrlKey || event.metaKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
        case 's':
            event.preventDefault();
               $('#issue-form').submit();
            break;
        case 'i':

        }
    }
});
})( jQuery );
