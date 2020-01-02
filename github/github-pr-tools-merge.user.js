// ==UserScript==
// @name         GitHub PR Tools (merge)
// @namespace    https://github.com/
// @version      0.2
// @description  Adds Merge It button
// @author       Scott Kingsley Clark
// @include      /https?:\/\/github\.com.*\/pull\/.*/
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const $issue_label_container = jQuery('.label-select-menu');
    const $issue_label_heading_button = jQuery('summary.discussion-sidebar-heading', $issue_label_container);

    jQuery('<button id="merge-it">Mark Merge</button>').insertBefore($issue_label_container);

    const $merge_it = jQuery('#merge-it');

    $merge_it.on('click', function() {
        $issue_label_heading_button.click();

        setTimeout(function(){
            jQuery( 'div.select-menu-item', $issue_label_container ).each( function() {
                var $label_row = jQuery(this),
                    label_selected = $label_row.hasClass('selected'),
                    label_text = jQuery('span.name', $label_row).text();

                if ('merge' === label_text && ! label_selected) {
                    $label_row.click();
                } else if ( 'code review' === label_text && label_selected ) {
                    $label_row.click();
                }
            } );
        }, 200);

        setTimeout(function(){
            $issue_label_heading_button.click();
        }, 400);
    });
})();
