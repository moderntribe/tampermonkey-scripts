// ==UserScript==
// @name         Premium Forum Extras - Collapse Convo
// @namespace    https://theeventscalendar.com/
// @version      0.1
// @description  You have a long exchange with a client. Tired of always scrolling down and up? This is for you. Kicks in at 6 replies.
// @author       Andras Guseo
// @include      https://theeventscalendar.com/wp-admin/post.php?*
// @match        https://theeventscalendar.com/wp-admin/post.php?*
// @grant        none
// @run-at       document-idle

// ==/UserScript==

(function() {
    'use strict';

    /**
     * Show a red label if the topic is private
     */
    var heads = document.getElementsByClassName( 'bbp-reply-header' );
    var threads = document.getElementsByClassName( 'type-reply' );
    var tlen = threads.length;
    if ( tlen > 6 ) {
        var ntlen = '.bbp-reply-header:nth-child(' + tlen + ')';
        $( '.bbp-reply-header' ).css({ 'display': 'none' });
        $( '.type-reply' ).css({ 'display': 'none' });
        $( ntlen ).css({ 'display': 'block' });
        $( '.type-reply:last-child' ).css({ 'display': 'block' });

        var htmlstring;
        htmlstring  = '<div id="count-container"><div class="count-line top">&nbsp;</div><div class="count-number"><span class="count-round">';
        htmlstring += tlen-1;
        htmlstring += '</span><span class="count-more">more</span></div><div class="count-line bottom">&nbsp;</div></div>';

        var htmlJumpToTop;
        htmlJumpToTop = '<span id="hideem" class="hideem">Hide`em again</span>&nbsp;|&nbsp;<span id="jumptotop"><a href="#bbps_conversation">Jump to first post</a></span>';

        var htmlHideemTop;
        htmlHideemTop = '<div id="hideemTop" class="hideem">Hide`em again</div>';

        $( '#bbp-topic-0-lead' ).after( htmlstring );
        $( '#count-container' ).css({ 'cursor': 'pointer' });
        $( '.count-number' ).css({ 'display': 'inline-block', 'float': 'left', 'clear': 'both' });
        $( '.count-round' ).css({ 'border-width': '1px', 'border-style': 'solid', 'border-color': '#ccc', 'border-radius': '50%', 'display': 'inline-block', 'padding': '5px', 'margin-left': '5px', 'margin-right': '5px', 'width': '20px', 'text-align': 'center' });
        $( '.count-line' ).css({ 'display': 'inline-block', 'float': 'left', 'clear': 'both', 'width': '20px', 'border-right-width': '3px', 'border-right-style': 'dashed', 'border-right-color': '#999', 'margin-top': '1px', 'margin-bottom': '1px' });

        $( '#topic-0-replies' ).after( htmlJumpToTop );

        $( '#bbp-topic-0-lead' ).after( htmlHideemTop );
        $( '.hideem' ).css({ 'cursor': 'pointer', 'display': 'none' });

        // Handle hover
        if ( document.getElementById( 'count-container' ) != null ) {
            document.getElementById( 'count-container' ).addEventListener( 'click', showPosts );
            document.getElementById( 'hideem' ).addEventListener( 'click', hidePosts );
            document.getElementById( 'hideemTop' ).addEventListener( 'click', hidePosts );
        }
    }

    function showPosts() {
        $( '.bbp-reply-header' ).css({ 'display': 'block' });
        $( '.type-reply' ).css({ 'display': 'block' });
        $( '#count-container' ).css({ 'display': 'none' });
        $( '.hideem' ).css({ 'display': 'inline-block' });
    }
    function hidePosts() {
        $( '.bbp-reply-header' ).css({ 'display': 'none' });
        $( '.type-reply' ).css({ 'display': 'none' });
        $( ntlen ).css({ 'display': 'block' });
        $( '.type-reply:last-child' ).css({ 'display': 'block' });
        $( '#count-container' ).css({ 'display': 'block' });
        $( '.hideem' ).css({ 'display': 'none' });
    }

})();