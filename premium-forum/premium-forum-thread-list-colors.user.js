// ==UserScript==
// @name         Premium Forum Extras - Thread List Colors
// @namespace    https://theeventscalendar.com/
// @version      0.1
// @description  Colors thead list based on urgency: Critical (past a 24h): red; Overdue (past 20h): orange; Resolved: green
// @author       Andras Guseo
// @include      https://theeventscalendar.com/wp-admin/edit.php?post_type=topic&page=tribe-support-queues*
// @include      https://theeventscalendar.com/wp-admin/edit.php?page=tribe-support-queues&post_type=topic*
// @match        https://theeventscalendar.com/wp-admin/edit.php?post_type=topic&page=tribe-support-queues*
// @downloadURL  https://raw.githubusercontent.com/moderntribe/tampermonkey-scripts/master/premium-forum-thread-list-colors.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var resolvedRows, criticalRows, i;
    criticalRows = document.getElementsByClassName( 'column-activity' );
    resolvedRows = document.getElementsByClassName( 'column-status' );

    for ( i = 0; i < criticalRows.length; i++ ) {

        /* Resolved - green */
        var replyHtml = resolvedRows[i].innerHTML;
        var isResolved = replyHtml.search( /resolved/gi );
        if ( isResolved >= 0 ) {
            resolvedRows[i].parentNode.style.backgroundColor = 'lightgreen';
            continue;
        }

        /* Overdue - past 20 hours - orange */
        replyHtml = criticalRows[i].innerHTML;
        var isOverdue = replyHtml.search( /^(2)([0-9]{1})h/g );
        if ( isOverdue >= 0 ) {
            criticalRows[i].parentNode.style.backgroundColor = '#f4af49';
            continue;
        }

        /* Critical - past 24 hours - red */
        var isCritical = replyHtml.search( /^([0-9]{1,2})(D|W|M|Y)/g );
        if ( isCritical >= 0 ) {
            criticalRows[i].parentNode.style.backgroundColor = 'rgba(228, 85, 74,0.3)';
            continue;
        }

    }

})();
