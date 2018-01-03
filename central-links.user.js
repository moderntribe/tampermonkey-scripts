// ==UserScript==
// @name         Anchor tags in Central
// @namespace    http://central.tri.be/
// @version      0.1.1
// @description  Adds anchor tags to some links in central
// @author       Gustavo Bordoni
// @include        /^https:\/\/central.tri.be(\/.*)?/
// @require      http://soapbox.github.io/linkifyjs/js/linkify/linkify.min.js
// @require      http://soapbox.github.io/linkifyjs/js/linkify/linkify-jquery.min.js
// @grant        none
// ==/UserScript==

var central_links = {};

( function( $, my ) {
    my.init = function() {
        my.build_styles();

        var regExpGoogleDocs = /docs\.google\.com.+\/d\/([^\/]+)/ig;

        my.$headings = $( 'table.attributes' ).find( 'th:contains(Pull Request:), th:contains(Forum Threads:), th:contains(User Story:), th:contains(UserVoice Threads:)' );
        my.$headings.each( function() {
            var $this = $( this );
            var $link_cell = $this.next( 'td' );

            $link_cell.linkify({
                target: "_blank",
                format: function( value, type ) {
                    var matches = regExpGoogleDocs.exec( value );

                    if ( ! matches ){
                        return value;
                    }

                    return 'Google#' + matches[1];
                }
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
