// ==UserScript==
// @name         Premium Forum Extras - Private topic
// @namespace    https://theeventscalendar.com/
// @version      0.8
// @description  Shows a red label if topic is private
// @author       Andras Guseo
// @include      https://theeventscalendar.com/wp-admin/post.php?*
// @match        https://theeventscalendar.com/wp-admin/post.php?*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/moderntribe/tampermonkey-scripts/master/premium-forum-private-topic.user.js
// @run-at       document-idle

// ==/UserScript==

(function() {
    'use strict';

    /**
     * Show a red label if the topic is private
     */
    if ( document.getElementById( 'mark_private' ) !== null ) {
        var isPrivate = document.getElementById( 'mark_private' ).checked;
        var top = document.getElementById( 'bbps_extra' );
        var replybox = document.getElementById( 'new-reply-0' );
        var convo = document.getElementById( 'bbps_conversation' );

        if ( true === isPrivate ) {

            convo.style.border = '2px solid red';
            var privateTopic = document.createElement( 'div' );
            privateTopic.id = 'privateTopic';
            privateTopic.innerHTML = 'This is a fully private topic.';
            privateTopic.style.fontWeight = 'bold';
            privateTopic.style.color = 'red';

            replybox.insertBefore( privateTopic, replybox.firstChild );
            var privateTopic2 = privateTopic.cloneNode( true );
            top.parentNode.insertBefore( privateTopic2, top.nextSibling );
        }
    }

})();