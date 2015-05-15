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
    'use strict';
    my.init = function() {
      my.$pr_heading = $( 'table.attributes th:contains(Pull Request:)' );
      var $link_cell = my.$pr_heading.next();
      var link = $link_cell.html();
      $link_cell.html( '<a href="' + link + '" target="_blank">' + link + '</a>' );
    };

    $( function() {
      my.init();
    });
} )( jQuery, central_links );
