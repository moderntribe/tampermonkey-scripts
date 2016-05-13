// ==UserScript==
// @name         Anchor tags in Central
// @namespace    http://central.tri.be/
// @version      0.1
// @description  Adds anchor tags to some links in central
// @author       You
// @include        /^https:\/\/central.tri.be(\/.*)?/
// @grant        none
// ==/UserScript==

var central_links = {};

( function( $, my ) {
    my.init = function() {
        my.$headings = $( 'table.attributes' ).find( 'th:contains(Pull Request:), th:contains(Forum threads:), th:contains(User Story:), th:contains(UserVoice Threads:)' );

        my.$headings.each( function() {
            var $this = $( this ),
                $link_cell = $this.next( 'td' ),
                link = $link_cell.html();

            if ( ! link ) {
                return;
            }

            var links;
            if ( link.indexOf( '<br>' ) ) {
                links = link.split( '<br>' );
            } else {
                links = link.split( ' ' );
            }

            for ( var i in links ) {
                links[i] = String( links[i] ).replace( /(http[^\n <]+)/, '<a href="$1" target="_blank">$1</a>' );
            }

            $link_cell.html( links.join( '<br>' ) );
        } );
    };

    $( function() {
        my.init();
    });
} )( jQuery, central_links );
