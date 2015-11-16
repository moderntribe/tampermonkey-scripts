// ==UserScript==
// @name         Modern Tribe navigation
// @namespace    central.tri.be
// @version      0.1
// @description  Adds custom navigation to GitHub and Central
// @author       Matthew Batchelder & Gustavo Bordoni
// @match        https://github.com
// @include      /^https:\/\/github.com\/.*/
// @include      /^https:\/\/central.tri.be(\/.*)?/
// @grant        none
// ==/UserScript==

var repo_nav = {};

( function( $, my ) {
  'use strict';

  my.repo_menu = [
    {
      url: 'https://github.com/moderntribe/the-events-calendar',
      name: 'TEC'
    },
    {
      url: 'https://github.com/moderntribe/events-pro',
      name: 'TEC Pro'
    },
    {
      url: 'https://github.com/moderntribe/tribe-common',
      name: 'Tribe Common'
    },
    {
      url: 'https://github.com/moderntribe/event-tickets',
      name: 'Event Tickets'
    },
    {
      url: 'https://github.com/moderntribe/event-tickets-plus',
      name: 'Event Tickets Plus'
    },
    {
      url: 'https://github.com/moderntribe/advanced-post-manager',
      name: 'APM'
    },
    {
      url: 'https://github.com/moderntribe/events-community',
      name: 'Community'
    },
    {
      url: 'https://github.com/moderntribe/events-eventbrite',
      name: 'Eventbrite'
    },
    {
      url: 'https://github.com/moderntribe/events-facebook',
      name: 'Facebook'
    },
    {
      url: 'https://github.com/moderntribe/events-filterbar',
      name: 'Filterbar'
    },
    {
      url: 'https://github.com/moderntribe/events-importer-ical',
      name: 'Importer: iCal'
    },    
    {
      url: 'https://github.com/moderntribe/events-community-tickets',
      name: 'Tickets: Community'
    },
    {
      url: 'https://github.com/moderntribe/events-tickets-edd',
      name: 'Tickets: EDD'
    },
    {
      url: 'https://github.com/moderntribe/events-tickets-shopp',
      name: 'Tickets: Shopp'
    },
    {
      url: 'https://github.com/moderntribe/events-tickets-woo',
      name: 'Tickets: Woo'
    },
    {
      url: 'https://github.com/moderntribe/events-tickets-wpec',
      name: 'Tickets: WPEC'
    },
    {
      divider: true
    },
    {
      url: 'https://github.com/moderntribe/eventscalendarpro.com',
      name: 'TEC.com'
    },
    {
      url: 'https://github.com/moderntribe/tribe-plugin-packager',
      name: 'Plugin packager'
    },
    {
      url: 'https://github.com/jbrinley/docker-config',
      name: 'Docker config'
    },
    {
      url: 'https://github.com/bordoni/tec-forum-support',
      name: 'Support snippets'
    }
  ];

  my.init = function() {
    my.build_styles();
    my.build_nav();
      
    if ( $( 'body' ).hasClass( 'theme-Moderntribe' ) ) {
        my.$header = $( '#breadcrumb' );
    } else {
        my.$header = $( '.main-content' );
        
        my.link_commit_refs();
    }
    my.$header.before( my.$nav_wrapper );

    my.$nav_wrapper.on( 'click', '.dropdown:not(.active)', function( e ) {
      e.preventDefault();
      $( this ).toggleClass( 'active' );
    } );

    $( document ).on( 'click', function ( e ) {
      var $actives = my.$nav_wrapper.find( '.dropdown.active' ),
          target = e.currentTarget === document ? e.target : e.currentTarget,
          $parents = $( target ).parents(),
          $this = $( target );
        console.log( $this );

      if ( ! $this.is( '.dropdown' ) && $actives.length !== 0 && ! $actives.is( target ) ) {
          $actives.removeClass( 'active' );
      }
    } );
  };

  my.build_styles = function() {
    $( 'head' ).append( '<style id="bork-nav-styles"/>' );
    my.$styles = $( document.getElementById( 'bork-nav-styles' ) );

    my.$styles.html( [
      '.tribe-header {',
        'margin-bottom: 0;',
      '}',

      '.tribe-header .pagehead-nav {',
        'float:left;',
      '}',

      '.tribe-header .pagehead-nav-item {',
        'margin-left: 0;',
        'margin-right: 21px;',
        'border-bottom: 2px solid transparent;',
      '}',

      '.tribe-header .pagehead-nav-item > a {',
        'color: inherit;',
        'text-decoration: none;',
      '}',

      '.tribe-header .pagehead-nav-item:hover {',
        'color: #333;',
        'border-bottom-color: #d26911;',
      '}',

      '.tribe-header .dropdown.active .dropdown-menu-content {',
        'display: block;',
      '}',

      '.tribe-header .dropdown .dropdown-menu {',
        'right: -4px;',
        'margin-top: -10px;',
      '}',
        
      '.tribe-header .dropdown {',
        'cursor: pointer;',
      '}',
        
    // Central Specific
    '.theme-Moderntribe .tribe-header.pagehead {',
        'position: relative;',
        'padding-top: 20px;',
        'padding-bottom: 20px;',
        'margin-bottom: 20px;',
        'border-bottom: 1px solid #eee;',
    '}',
        
    '.theme-Moderntribe .tribe-header .container:after {',
        'display: table;',
        'clear: both;',
        'content: "";',
    '}', 

    '.theme-Moderntribe .tribe-header .container:before {',
        'display: table;',
        'content: "";',
    '}',

    '.theme-Moderntribe #top-menu {',
        'height: auto;',
        'display: table;',
        'width: 100%;',
    '}',
        
    '.theme-Moderntribe .pagehead-nav {',
        'margin-bottom: -20px',
    '}',

    '.theme-Moderntribe .pagehead-nav-item {',
        'float: left;',
        'padding: 6px 10px 21px;',
        'margin-left: 20px;',
        'font-size: 14px;',
        'color: #767676;',
    '}',

    '.theme-Moderntribe .pagehead-nav-item:hover {',
        'color: #333;',
        'text-decoration: none',
    '}',

    '.theme-Moderntribe .pagehead-nav-item.selected {',
        'color: #333;',
        'border-bottom: 2px solid #d26911',
    '}',
        
    '.theme-Moderntribe .dropdown-menu-content {',
        'display: none;',
        'position: relative;',
    '}',
        
    '.theme-Moderntribe #top-menu .dropdown-menu {',
        'position: absolute;',
        'top: 100%;',
        'left: 0;',
        'z-index: 100;',
        'width: 160px;',
        'margin-top: 2px;',
        'padding-top: 5px;',
        'padding-bottom: 5px;',
        'background-color: #fff;',
        'background-clip: padding-box;',
        'border: 1px solid rgba(0,0,0,0.15);',
        'border-radius: 4px;',
        'box-shadow: 0 3px 12px rgba(0,0,0,0.15)',
    '}',
        
    '.theme-Moderntribe #top-menu .dropdown-menu-sw {',
        'left: auto;',
        'right: -14px;',
        'margin-top: 12px;',
    '}',
        
    '.theme-Moderntribe .dropdown-menu:before {',
        'position: absolute;',
        'display: inline-block;',
        'content: "";',
        'border: 8px solid transparent;',
        'border-bottom-color: rgba(0,0,0,0.15)',
    '}',

    '.theme-Moderntribe .dropdown-menu-sw:before {',
        'top: -16px;',
        'left: auto;',
        'right: 9px;',
    '}',
        
    '.theme-Moderntribe .dropdown-menu:after {',
        'position: absolute;',
        'display: inline-block;',
        'content: "";',
        'border: 7px solid transparent;',
        'border-bottom-color: #fff',
    '}',
        
    '.theme-Moderntribe .dropdown-menu-sw:after {',
        'top: -14px;',
        'left: auto;',
        'right: 10px;',
    '}',

    '.theme-Moderntribe .dropdown-item {',
        'display: block;',
        'padding: 4px 10px 4px 15px;',
        'color: #333;',
        'white-space: nowrap;',
        'overflow: hidden;',
        'text-overflow: ellipsis',
    '}',
        
    '.theme-Moderntribe .active {',
        'display: block;',
    '}',    
        
    '.theme-Moderntribe .dropdown-item:hover,',
    '.theme-Moderntribe .dropdown-item.zeroclipboard-is-hover {',
        'color: #fff;',
        'text-decoration: none;',
        'background-color: #4078c0;',
    '}',
        
    '.theme-Moderntribe .dropdown-caret {',
        'display: inline-block;',
        'width: 0;',
        'height: 0;',
        'content: "";',
        'vertical-align: -2px;',
        'border: 4px solid;',
        'border-right-color: transparent;',
        'border-left-color: transparent;',
        'border-bottom-color: transparent;',
    '}',
        
    '.theme-Moderntribe .dropdown-divider {',
        'height: 1px;',
        'margin: 8px 1px;',
        'background-color: #e5e5e5;',
    '}',
        
    '' ].join( "\n" ) );
  };

  my.build_nav = function() {
    my.$nav_wrapper = $( '<div class="pagehead tribe-header"/>' );
    my.$container = $( '<div class="container"/>' );

    my.$nav = $( '<nav class="pagehead-nav" role="navigation" />' );
    my.$repos = $( '<div class="pagehead-nav-item dropdown js-menu-container">' );
    my.$repos_menu_content = $( '<div class="dropdown-menu-content js-menu-content"/>' );
    my.$repos_menu = $( '<ul class="dropdown-menu dropdown-menu-sw"/>' );
    
    my.$repos.append( '<span class="octicon octicon-repo"></span> Repositories <span class="dropdown-caret"></span>' );
    my.$repos_menu_content.append( my.$repos_menu );
    my.$repos.append( my.$repos_menu_content );

    for ( var i in my.repo_menu ) {
      if ( ! my.repo_menu.hasOwnProperty( i ) ) {
        continue;
      }

      if ( 'undefined' !== typeof my.repo_menu[ i ].divider ) {
        my.$repos_menu.append( '<div class="dropdown-divider" />' );
      } else {
        my.$repos_menu.append( $( '<a>').attr( { 
          href: my.repo_menu[ i ].url,
          'class': 'dropdown-item',
        } ).text( my.repo_menu[ i ].name ) );
      }
    }

    my.$nav.append( '<a class="pagehead-nav-item" href="https://central.tri.be/projects/premium-plugins/issues?query_id=1028"><span class="octicon octicon-issue-opened"></span> Central Issues</a>' );
    my.$nav.append( '<a class="pagehead-nav-item" href="http://bit.ly/1VRKeXv"><span class="octicon octicon-git-pull-request"></span> Pull Requests</a>' );

    my.$nav.append( my.$repos );

    my.$container.append( my.$nav );
    my.$nav_wrapper.append( my.$container );
  };

  my.link_commit_refs = function() {
    var repo = $( '.entry-title' ).find( 'a' ).eq( -1 ).text();
    $( '.commit-ref' ).each( function () {
      var $ref = $( this ),
          $branch = $ref.children(),
          branch = $branch.text(),
          link = 'https://github.com/moderntribe/' + repo + '/tree/' + branch,
          $link = $( '<a>' ).attr( 'href', link ).append( $branch );
      
      $ref.html( $link );
    } );
  };

  $( my.init );
} )( jQuery, repo_nav );
