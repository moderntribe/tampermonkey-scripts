// ==UserScript==
// @name         GitHub PR Tools (merge)
// @namespace    https://github.com/
// @version      0.1
// @description  Adds "Mark Merge" button above issue labels
// @author       Scott Kingsley Clark
// @include      /https?:\/\/github\.com.*\/pull\/.*/
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const $issue_label_container = jQuery('.js-issue-labels-container');
    const $issue_label_heading_button = jQuery('button.discussion-sidebar-heading', $issue_label_container);

    jQuery('<button id="merge-it">Mark Merge</button>').insertBefore($issue_label_container);

    jQuery('#merge-it').on('click', function() {
        $issue_label_heading_button.click();

        jQuery( 'div.select-menu-item-text div.css-truncate', $issue_label_container ).each( function() {
            var $label_row = jQuery( this ),
                label_text = jQuery( 'span.name', $label_row ).text();

            if ( 'merge' === label_text || 'code review' === label_text ) {
                $label_row.click();
            }
        } );

        setTimeout(function(){
            $issue_label_heading_button.click();
        }, 200);
    });
})();
