// ==UserScript==
// @name         Modern Tribe navigation
// @namespace    central.tri.be
// @version      0.1
// @description  Adds custom navigation to GitHub and Central
// @author       Matthew Batchelder
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
      url: 'https://github.com/moderntribe/events-community-edd',
      name: 'Tickets: EDD'
    },
    {
      url: 'https://github.com/moderntribe/events-community-shopp',
      name: 'Tickets: Shopp'
    },
    {
      url: 'https://github.com/moderntribe/events-community-woo',
      name: 'Tickets: Woo'
    },
    {
      url: 'https://github.com/moderntribe/events-community-wpec',
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
      my.init_central();
    } else {
      my.init_github();
    }
    my.$header.before( my.$nav_wrapper );

    $( document ).on( 'click', '#bork-nav-repo-link', function( e ) {
      e.preventDefault();
      my.$nav_repo_container.toggle();
    } );
  };

  my.init_github = function() {
    my.$header = $( '[role="banner"].header' );
  };

  my.init_central = function() {
    my.$header = $( document.getElementById( 'top-menu' ) );
    my.$styles.append(
      '#wrapper {' +
      '  background: #fff url("/plugin_assets/redmine_shane_and_peter_design/images/header-other.jpg") no-repeat center 79px;' +
      '}' +
      '#bork-nav {' +
      '  background-color: #fff;' +
      '}' +
      '#bork-nav .container {' +
      '  margin-left: 32px;' +
      '}' +
      '#bork-nav a {' +
      '  color: #333;' +
      '  font-size: 13px;' +
      '  font-weight: bold;' +
      '}' +
      '#bork-nav .dropdown-menu-content {' +
      '  display: none;' +
      '}' +
      '#bork-nav .dropdown-menu>li>a:hover {' +
      '  color: #fff;' +
      '  text-decoration: none;' +
      '  background-color: #4183c4;' +
      '}' +
      '#bork-nav .header-nav-link {' +
      '  display: inline-block;' +
      '  padding: 4px 8px;' +
      '  font-size: 13px;' +
      '  font-weight: bold;' +
      '  line-height: 20px;' +
      '  color: #333;' +
      '}' +
      '#bork-nav .dropdown-menu {' +
      '  position: absolute;' +
      '  top: 100%;' +
      '  z-index: 100;' +
      '  width: 160px;' +
      '  margin-top: 2px;' +
      '  margin-left: -80px;' +
      '  padding-top: 5px;' +
      '  padding-bottom: 5px;' +
      '  list-style: none;' +
      '  background-color: #fff;' +
      '  background-clip: padding-box;' +
      '  border: 1px solid rgba(0,0,0,0.15);' +
      '  border-radius: 4px;' +
      '  box-shadow: 0 3px 12px rgba(0,0,0,0.15);' +
      '}' +
      '.dropdown-divider {' +
      '  height: 1px;' +
      '  margin: 8px 1px;' +
      '  background-color: #e5e5e5;' +
      '}' +
      '#bork-nav .dropdown-menu:before {' +
      '  position: absolute;' +
      '  top: -16px;' +
      '  display: inline-block;' +
      '  content: "";' +
      '  border: 8px solid transparent;' +
      '  border-bottom-color: #ccc;' +
      '  border-bottom-color: rgba(0,0,0,0.15);' +
      '}' +
      '#bork-nav .dropdown-menu:after {' +
      '  position: absolute;' +
      '  top: -14px;' +
      '  display: inline-block;' +
      '  content: "";' +
      '  border: 7px solid transparent;' +
      '  border-bottom-color: #fff;' +
      '}' +
      '#bork-nav .dropdown-menu>li>a {' +
      '  display: block;' +
      '  font-weight: normal;' +
      '  padding: 4px 10px 4px 1rem;' +
      '  color: #333;' +
      '  white-space: nowrap;' +
      '  overflow: hidden;' +
      '  text-overflow: ellipsis;' +
      '  background: none;' +
      '}' +
      '#top-menu .dropdown-menu>li {' +
      '  float: none;' +
      '  font-size: 13px;' +
      '}' +
      ''
    );
  };

  my.build_styles = function() {
    $( 'head' ).append( '<style id="bork-nav-styles"/>' );
    my.$styles = $( document.getElementById( 'bork-nav-styles' ) );

    my.$styles.html(
      '#bork-nav {' +
      '  background: #f5f5f5;' +
      '  padding: .5rem .5rem 0;' +
      '  position: relative;' +
      '}' +
      '#bork-nav .container {' +
      '  position: relative;' +
      '}' +
      '#bork-nav-repo {' +
      '  left: 270px;' +
      '}' +
      '#bork-nav-repo>li>a {' +
      '  padding-left: 1rem;' +
      '}' +
      '#bork-nav-repo:before, #bork-nav-repo:after {' +
      '  left: .5rem;' +
      '}' +
      '#bork-nav .header-nav-link {' +
      '  display: inline-block;' +
      '}' +
      '#bork-nav .container > a:first-child {' +
      '  padding-left: 0;' +
      '}' +
      ''
    );
  };

  my.build_nav = function() {
    my.$nav_wrapper = $( '<div id="bork-nav"/>' );
    my.$nav = $( '<div class="container clearfix" />' );
    my.$nav_repo = $( '<a href="#" id="bork-nav-repo-link" class="header-nav-link js-menu-target">Repos</a>' );
    my.$nav_repo_container = $( '<div id="bork-nav-repo-container" class="dropdown-menu-content js-menu-content"/>' );
    my.$nav_repo_menu = $( '<ul id="bork-nav-repo" class="dropdown-menu dropdown-menu-ne"/>' );

    for ( var i in my.repo_menu ) {
      if ( ! my.repo_menu.hasOwnProperty( i ) ) {
        continue;
      }

      if ( 'undefined' !== typeof my.repo_menu[ i ].divider ) {
        my.$nav_repo_menu.append( '<li class="dropdown-divider" />' );
      } else {
        my.$nav_repo_menu.append( '<li><a href="' + my.repo_menu[ i ].url + '">' + my.repo_menu[ i ].name + '</a></li>' );
      }
    }

    my.$nav.append( '<a id="bork-central-issues-link" class="header-nav-link" href="https://central.tri.be/projects/premium-plugins/issues?query_id=144">My Central Issues</a>' );
    my.$nav.append( '<a id="bork-pr-link" class="header-nav-link" href="https://github.com/pulls?utf8=%E2%9C%93&q=is%3Aopen+is%3Apr+sort%3Aupdated-desc+repo%3Amoderntribe%2Fevents-pro+repo%3Amoderntribe%2Fthe-events-calendar+repo%3Amoderntribe%2Fevents-tickets-edd+repo%3Amoderntribe%2Fevents-tickets-woo+repo%3Amoderntribe%2Fevents-tickets-wpec+repo%3Amoderntribe%2Fevents-tickets-shopp+repo%3Amoderntribe%2Fevents-community+repo%3Amoderntribe%2Fevents-community-tickets+repo%3Amoderntribe%2Fevents-eventbrite+repo%3Amoderntribe%2Fevents-facebook+repo%3Amoderntribe%2Fevents-filterbar+repo%3Amoderntribe%2Fevents-importer-ical+repo%3Amoderntribe%2Fadvanced-post-manager+">MT PRs</a>' );
    my.$nav.append( my.$nav_repo );
    my.$nav.append( my.$nav_repo_container );
    my.$nav_repo_container.append( my.$nav_repo_menu );
    my.$nav_wrapper.append( my.$nav );
  };

  $( function() {
  my.init();
  } );
} )( jQuery, repo_nav );
