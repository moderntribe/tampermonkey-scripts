// ==UserScript==
// @name         Premium Forum Extras
// @namespace    https://theeventscalendar.com/
// @version      0.4
// @description  Puts extra info all over a thread page.
//               1) Show red label if topic is private
//               2) Move Assignee and Status box to the top
//               3) Show the user's licenses at the bottom right
//               4) Show the latest version numbers of our plugins in the admin bar (not updated automatically)
// @author       Andras Guseo
// @include      https://theeventscalendar.com/wp-admin/post.php?*
// @match        https://theeventscalendar.com/wp-admin/post.php?*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    /**
     * Show a red label is the topic is private
     */
    var x=document.getElementById('mark_private').checked;
    var box=document.getElementById('staff_update_box');
    var replybox=document.getElementById('new-reply-0');
    if ( x ) {

        var privateTopic = document.createElement( 'div' );
        privateTopic.id = 'privateTopic';
        privateTopic.innerHTML = 'This is a fully private topic.';
        privateTopic.style.fontWeight = 'bold';
        privateTopic.style.color = 'red';
        box.appendChild( privateTopic );
        var privateTopic2 = privateTopic.cloneNode( true );
        replybox.insertBefore( privateTopic2, replybox.firstChild );
    }

    /**
     * Move Assignee and Status box to the top
     */

    jQuery("#staff_update_box").detach().insertAfter('#bbps_extra');
    //jQuery("#staff_update_box").insertAfter('#bbps_extra');

    /**
     * Show the user's licenses at the bottom right
     */
    $( ".licenses" ).clone().appendTo( "#poststuff" ).addClass( 'newLicenses' );

    var cssLicenses = 'li.newLicenses { position: fixed; bottom: 50px; right: 20px; font-size: 85%; list-style: none; tight: 20px; z-index: -1; } li.newLicenses .nonactive { color: #A00000; } ',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet){
        style.styleSheet.cssText = css;
    }
    else {
        style.appendChild(document.createTextNode(cssLicenses));
    }

    head.appendChild(style);

    /**
     * Show the latest version numbers of our plugins in the admin bar
     * Don't forget to update this manually
     */
    var tecver = '4.6.12';
    var prover = '4.4.24.4';
    var etver  = '4.7';
    var etpver = '4.7';
    var cever  = '4.5.9';
    var ctver  = '4.5.3';
    var fbver  = '4.5.4';

    $('#wp-admin-bar-top-secondary').after('<div id="plugin-versions">TEC <span class="version-number">' + tecver + '</span> | PRO <span class="version-number">' + prover + '</span> | ET <span class="version-number">' + etver + '</span> | ET+ <span class="version-number">' + etpver + '</span> | CE <span class="version-number">' + cever + '</span> | CT <span class="version-number">' + ctver + '</span> | FB <span class="version-number">' + fbver + '</span></div>');
    $('#plugin-versions').css({'float': 'right', 'color': '#fff'});
    $('.version-number').css({'font-weight': 'bold'});

})();
