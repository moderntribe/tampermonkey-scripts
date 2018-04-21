// ==UserScript==
// @name         Premium Forum Extras
// @namespace    https://theeventscalendar.com/
// @version      0.6.1
// @description  Puts extra info all over a thread page.
//               1) Show red label if topic is private
//               2) Move Assignee and Status box to the top
//               3) Show the user's licenses at the bottom right
//               4) Display our plugins' latest version numbers (manually updated)
// @author       Andras Guseo
// @include      https://theeventscalendar.com/wp-admin/post.php?*
// @match        https://theeventscalendar.com/wp-admin/post.php?*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/moderntribe/tampermonkey-scripts/master/premium-forum-extras.js
// ==/UserScript==

(function() {
    'use strict';

    /**
     * Show a red label if the topic is private
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
     * Show the latest version numbers of our plugins
     * Don't forget to update this
     */
    var tecver = '4.6.14.1';
    var prover = '4.4.25';
    var etver  = '4.7.2';
    var etpver = '4.7.2';
    var cever  = '4.5.11';
    var ctver  = '4.5.4';
    var fbver  = '4.5.5';
    var apmver = '4.4';
    var ebtix  = '4.4.9';
    var iwpver = '1.0.2';

    var htmlstring = '<div id="plugin-versions">';
    htmlstring += 'TEC <span class="version-number">' + tecver + '</span> | ';
    htmlstring += 'PRO <span class="version-number">' + prover + '</span> | ';
    htmlstring += 'ET <span class="version-number">'  + etver  + '</span> | ';
    htmlstring += 'ET+ <span class="version-number">' + etpver + '</span> | ';
    htmlstring += 'EBTix <span class="version-number">' +ebtix + '</span> | ';
    htmlstring += 'CE <span class="version-number">'  + cever  + '</span> | ';
    htmlstring += 'CT <span class="version-number">'  + ctver  + '</span> | ';
    htmlstring += 'FB <span class="version-number">'  + fbver  + '</span> | ';
    htmlstring += 'APM <span class="version-number">' + apmver + '</span> | ';
    htmlstring += 'IW+ <span class="version-number">' + iwpver + '</span>';
    htmlstring += '</div>';
    $('#wp-admin-bar-top-secondary').after(htmlstring);
    $('#plugin-versions').css({ 'position': 'fixed', 'bottom': '0', 'padding': '0 5px', 'right': '150px', 'background-color': 'rgb(35, 40, 45)', 'color': '#eee' });
    $('.version-number').css({ 'font-weight': 'bold' });
})();
