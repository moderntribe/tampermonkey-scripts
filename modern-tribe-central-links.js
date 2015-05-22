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
        my.$pr_heading = $( 'table.attributes th:contains(Pull Request:)' );
        var $link_cell = my.$pr_heading.next();
        var link = $link_cell.html();
        $link_cell.html( '<a href="' + link + '" target="_blank">' + link + '</a>' );
        
        my.$forum_heading = $( 'table.attributes th:contains(Forum threads:)' );
        $link_cell = my.$forum_heading.next();
        var links = $link_cell.html().split( "<br>" );
        for ( var i in links ) {
            links[i] = String( links[i] ).replace( /(http[^\n <]+)/, '<a href="$1" target="_blank">$1</a>' );
        }

        $link_cell.html( links.join( '<br>' ) );
    };
    
    $( function() {
        my.init();
    });
} )( jQuery, central_links );
