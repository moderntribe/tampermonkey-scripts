// ==UserScript==
// @name         Modern Tribe navigation
// @namespace    central.tri.be
// @version      0.1
// @description  Adds custom navigation to GitHub and Central
// @author       Matthew Batchelder & Gustavo Bordoni
// @match        https://github.com
// @include      /^https:\/\/github.com\/.*/
// @include      /^https:\/\/central.tri.be(\/.*)?/
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @grant        none
// ==/UserScript==

var repo_nav = {};

( function( my ) {
  'use strict';
  var $;

  if ( 'undefined' !== typeof require ) {
    $ = require("github/jquery")["default"];
  } else {
    $ = jQuery;
  }

  my.menu = [
    {
      name: 'Central',
      icon: 'octicon-issue-opened',
      children: [
        {
          url: 'https://central.tri.be/projects/premium-plugins/issues?query_id=1028',
          name: 'My Tickets'
        },
        {
          url: 'https://central.tri.be/projects/premium-plugins/issues?query_id=598',
          title: 'Current Release',
          name: 'Current Major'
        },
        {
          url: 'https://central.tri.be/projects/premium-plugins/issues?query_id=924',
          title: 'Maintenance Release',
          name: 'Maintenance'
        },
        {
          url: 'https://central.tri.be/projects/premium-plugins/issues?query_id=585',
          title: 'Next Release',
          name: 'Next Major'
        },
        {
          url: 'https://central.tri.be/projects/premium-plugins/issues?query_id=1767',
          title: 'Next Maintenance Release',
          name: 'Next Maintenance'
        },
        {
          url: 'https://central.tri.be/projects/premium-plugins/issues?query_id=1261',
          title: 'Hotfix Release',
          name: 'Hotfix'
        },
        {
          divider: true
        },
        {
          url: 'https://central.tri.be/time_entries/report?criterias%5B%5D=member&period_type=1&period=current_month&columns=week&criterias%5B%5D=issue',
          name: 'This Months Tickets'
        },
        {
          url: 'https://central.tri.be/time_entries/report?criterias%5B%5D=member&period_type=2&from=2016-06-01&to=&columns=week&criterias%5B%5D=',
          name: 'Week by Week'
        }
      ]
    },
    {
      url: 'http://bit.ly/2dbY8DG',
      name: 'Pull Requests',
      icon: 'octicon-git-pull-request'
    },
    {
      name: 'Repositories',
      icon: 'octicon-repo',
      children: [
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
          url: 'https://github.com/moderntribe/events-community-tickets',
          name: 'Community Tickets'
        },
        {
          url: 'https://github.com/moderntribe/events-eventbrite',
          name: 'Eventbrite'
        },
        {
          url: 'https://github.com/moderntribe/events-filterbar',
          name: 'Filter Bar'
        },
        {
          divider: true
        },
        {
          url: 'https://github.com/moderntribe/events-facebook',
          name: 'Facebook'
        },
        {
          url: 'https://github.com/moderntribe/events-importer-ical',
          name: 'Importer: iCal'
        },
        {
          divider: true
        },
        {
          url: 'https://github.com/moderntribe/event-aggregator-site',
          name: 'Event Aggregator'
        },
        {
          url: 'https://github.com/moderntribe/pue-service',
          name: 'PUE Service'
        },
        {
          url: 'https://github.com/moderntribe/eventscalendarpro.com',
          name: 'TEC.com'
        },
        {
          url: 'https://github.com/moderntribe/tribe-product-utils',
          name: 'Product utils'
        },
        {
          url: 'https://github.com/jbrinley/docker-config',
          name: 'Docker config'
        },
        {
          url: 'https://github.com/bordoni/tec-forum-support',
          name: 'Support snippets'
        }
      ]
    },
  ]

  my.init = function() {
    my.build_styles();
    my.build_nav();

    if ( $( 'body' ).hasClass( 'theme-Moderntribe' ) ) {
        my.$header = $( '#breadcrumb' );
    } else {
        my.$header = $( '#start-of-content' );

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

      '.tribe-header .underline-nav {',
        'float:left;',
      '}',

      '.tribe-header .underline-nav-item {',
        'margin-left: 0;',
        'margin-right: 21px;',
        'border-bottom: 2px solid transparent;',
      '}',

      '.tribe-header .underline-nav-item > a {',
        'color: inherit;',
        'text-decoration: none;',
      '}',

      '.tribe-header .underline-nav-item:hover {',
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

    '.theme-Moderntribe .underline-nav {',
        'margin-bottom: -20px',
    '}',

    '.theme-Moderntribe .underline-nav-item {',
        'float: left;',
        'padding: 6px 10px 21px;',
        'margin-left: 20px;',
        'font-size: 14px;',
        'color: #767676;',
    '}',

    '.theme-Moderntribe .underline-nav-item:hover {',
        'color: #333;',
        'text-decoration: none',
    '}',

    '.theme-Moderntribe .underline-nav-item.selected {',
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

    my.$nav = $( '<nav class="underline-nav" role="navigation" />' );
    $.each( my.menu, function( index, item ) {
      if ( 'undefined' !== typeof item.children ) {
        var $item = $( '<div class="underline-nav-item dropdown js-menu-container">' ),
            $container = $( '<div class="dropdown-menu-content js-menu-content"/>' ),
            $submenu = $( '<ul class="dropdown-menu dropdown-menu-sw"/>' );

        $item.append( '<span class="octicon "></span> ' + item.name + ' <span class="dropdown-caret"></span>' );
        $container.append( $submenu );
        $item.append( $container );

        $.each( item.children, function ( key, sub_item ) {
          if ( 'undefined' !== typeof sub_item.divider ) {
            $submenu.append( '<div class="dropdown-divider" />' );
          } else {
            var $link = $( '<a>').attr( {
              href: sub_item.url,
              'class': 'dropdown-item',
            } ).text( sub_item.name );
            if ( 'undefined' !== typeof sub_item.title ) {
              $link.attr( 'title', sub_item.title );
            }

            $submenu.append( $link );
          }
        } );

        my.$nav.append( $item );
      } else {
        var $link = $( '<a>' ).attr( { 'class': 'underline-nav-item', 'href': item.url } ).text( item.name ).append( $( '<span class="octicon octicon-git-pull-request">' ) );
        my.$nav.append( $link );
      }
    } );

    my.$nav.append( my.$repos );

    my.$container.append( my.$nav );
    my.$nav_wrapper.append( my.$container );
  };

  my.link_commit_refs = function() {
    var $refs = $( '.repohead-details-container h1' ).find( 'span, strong' ),
        $repo = $refs.filter( '[itemprop="name"]' ).find( 'a' ),
        repo = $repo.attr( 'href' ),
        author = $refs.filter( '[itemprop="author"]' ).text();

    $( '.commit-ref' ).each( function () {
      var $ref = $( this ),
          $items = $ref.find( 'span' ),
          branch = $items.eq( -1 ).text();

      if ( $items.length > 1 ) {
          var user_link = 'https://github.com/' + $items.eq( 0 ).text();
          $items.eq( 0 ).replaceWith( $( '<a>' ).attr( 'href', user_link ).append( $items.eq( 0 )[0].outerHTML ) );

          repo = repo.replace( author, $items.eq( 0 ).text() );
      }

      var link = 'https://github.com' + repo + '/tree/' + branch,
          $link = $( '<a>' ).attr( 'href', link ).append( $items.eq( -1 )[0].outerHTML );

      $items.eq( -1 ).replaceWith( $link );
    } );

  $( my.init );
} )( repo_nav );
