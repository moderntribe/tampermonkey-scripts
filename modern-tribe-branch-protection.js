// ==UserScript==
// @name         GitHub Branch Protection
// @namespace    github.com
// @version      0.1
// @description  Checks all the required fields for basic protection of Branches
// @author       Gustavo Bordoni
// @match        https://github.com
// @include      /^https:\/\/github.com\/.*/
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @grant        none
// ==/UserScript==


(function( $ ) {
    'use strict';

    $( document ).ready( function(){
        var $secure = $( 'input[name="secure"]' );

        if ( $secure.is( ':checked' ) ) {
            return;
        }

        $secure.trigger( 'click' );

        $( 'input[name="has_required_reviews"]' ).trigger( 'click' );
        $( 'input[name="dismiss_stale_reviews_on_push"]' ).trigger( 'click' );
        $( 'input[name="required_reviews_enforce_dismissal"]' ).trigger( 'click' );

        $( 'input[name="authorized_users_or_teams"]' ).trigger( 'click' );

        $( '.js-protected-branch-settings' )
            .append( '<input class="form-control" name="dismiss_team_ids[]" type="hidden" value="1830260">' )
            .append( '<input class="form-control" name="push_team_ids[]" type="hidden" value="1830260">' );

    });
})( jQuery );
