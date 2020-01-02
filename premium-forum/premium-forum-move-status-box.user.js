// ==UserScript==
// @name         Premium Forum Extras - Move status box
// @namespace    https://theeventscalendar.com/
// @version      0.8
// @description  Move Assignee and Status box to the top
// @author       Andras Guseo
// @include      https://theeventscalendar.com/wp-admin/post.php?*
// @match        https://theeventscalendar.com/wp-admin/post.php?*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/moderntribe/tampermonkey-scripts/master/premium-forum-move-status-box.user.js
// @run-at       document-idle

// ==/UserScript==

(function() {
    'use strict';

    /**
     * Move Assignee and Status box to the top
     */
    $( '#staff_update_box' ).detach().insertAfter( '#bbps_extra' );

})();