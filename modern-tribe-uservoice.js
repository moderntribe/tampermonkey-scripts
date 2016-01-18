// ==UserScript==
// @name         Uservoice Overrides
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Minimize some UI crap
// @author       Matthew Batchelder
// @include      /https:\/\/tribe.uservoice.com\/admin\/.*/
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

var mt_uservoice = {};

( function( $, my ) {
  'use strict';
    
  my.init = function() {
      var $graph = $( '.cols-5.mb2 + .content-box' );
      var $graph_body = $graph.find( '.content-box-body' );
      var $graph_header = $graph.find( 'header' );
      var $activity_stream = $( '#activity-stream' );
      
      $graph.on( 'click', 'header', function( e ) {
          if ( $graph_body.is( ':visible' ) ) {
              $graph_body.hide();
          } else {
              $graph_body.show();
          }
      } );
      
      $activity_stream.find( '.hfeed .hentry:not(.supported) h3.entry-title a' ).each( function() {
          var $el = $( this );
          var href = $el.attr( 'href' );
          var $article = $el.closest( 'article' );
          var $footer = $article.find( 'footer' );
          
          var jqxhr = $.get( href );
          
          jqxhr.done( function( data ) {
              var $html = $( data );
              var breadcrumbs = $html.find( '.breadcrumbs' ).html();
              if ( breadcrumbs ) {
                  $footer.prepend( '<div class="tribe-breadcrumbs">' + breadcrumbs + ' @ </div>' );
              }
              
              var $chicklet = $html.find( '.vote_chicklet .chicklet' );
              var votes = $chicklet.find( 'strong' ).html();
              
              if ( votes ) {
                  $footer.prepend( '<div class="tribe-votes">' + votes + ' Votes</div>' );
              }
          } );
      } );
      
      $activity_stream.addClass( 'hide-supported' );
      $activity_stream.find( '.activity-stream-header-table thead th[data-object-type="supported"]' ).addClass( 'is-disabled' );
      
      $( '.blog-posts' ).closest( '.cols-span-1' ).hide();
      
      $( '.activity-stream-header-table' ).each( function() {
          var $table = $( this );
          $table.find( 'tbody td' ).each( function() {
              var $cell = $( this );
              if ( '0' === $cell.html() ) {
                  $cell.hide();
                  $table.find( 'thead th[data-object-type="' + $cell.data( 'object-type' ) + '"]' ).hide();
              }
          } );
      } );
      
      my.build_styles();
  };

  my.build_styles = function() {
    $( 'head' ).append( '<style id="bork-uservoice-styles"/>' );
    my.$styles = $( document.getElementById( 'bork-uservoice-styles' ) );

    my.$styles.html( [
        '#nav {',
        '  opacity: 0.1;',
        '  transition: all 0.5s ease;',
        '}',
        '#nav:hover {',
        '  opacity: 1;',
        '}',
        '.cols-5.mb2 + .content-box .content-box-body {',
        '  display: none;',
        '}',
        '.cols-5.mb2 + .content-box > header {',
        '  cursor: pointer;',
        '}',
        '.placard-value {',
        '  font-size: 19px;',
        '}',
        '#activity-stream .tribe-breadcrumbs {',
        '  float: left;',
        '  line-height: 14px;',
        '  margin-right: .25rem;',
        '}',
        '.tribe-votes {',
        '  background: #fff;',
        '  border: 1px solid #b3b3b3;',
        '  border-radius: 5px;',
        '  float: right;',
        '  padding: .25rem;',
        '  position: relative;',
        '  top: -2.5rem;',
        '}',
    '' ].join( "\n" ) );
  };

    
  $( function() {
    my.init();
  } );
} )( jQuery, mt_uservoice );
