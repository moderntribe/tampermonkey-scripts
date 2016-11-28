// ==UserScript==
// @name         Anchor tags in Central
// @namespace    http://central.tri.be/
// @version      0.1
// @description  Adds anchor tags to some links in central
// @author       You
// @include        /^https:\/\/central.tri.be(\/.*)?/
// @require      http://soapbox.github.io/linkifyjs/js/linkify/linkify.min.js
// @require      http://soapbox.github.io/linkifyjs/js/linkify/linkify-jquery.min.js
// @grant        none
// ==/UserScript==

var central_links = {};

( function( $, my ) {
    my.init = function() {
        my.build_styles();

        my.$headings = $( 'table.attributes' ).find( 'th:contains(Pull Request:), th:contains(Forum Threads:), th:contains(User Story:), th:contains(UserVoice Threads:)' );
        my.$headings.each( function() {
            var $this = $( this ),
                $link_cell = $this.next( 'td' );

            $link_cell.linkify({
                target: "_blank"
            });

            $link_cell.find( 'a' ).append( '<br>' );
        } );
    };

    my.build_styles = function() {
        $( 'head' ).append( '<style id="tribe-anchor-tags-styles"/>' );
        my.$styles = $( document.getElementById( 'tribe-anchor-tags-styles' ) );

        my.$styles.html( [
          '.attachments .files a {',
            'display: inline-block;',
          '}',

        '' ].join( "\n" ) );
      };

    $( function() {
        my.init();
    });
} )( jQuery, central_links );
