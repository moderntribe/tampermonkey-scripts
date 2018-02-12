// ==UserScript==
// @name         Relay Toggl for Tribe
// @namespace    https://central.tri.be/
// @version      0.1
// @description  Adds a button to record task/description and start time to toggl.
// @author       Gary Kovar
// @match        *://central.tri.be/issues/*
// ==/UserScript==

window.tribeToggl = {};
var apiKeyToggl = 'toggleAPIkey';
var proxyURL    = 'relay address';

(function( window, $, app, apiKeyToggl ) {
	'use strict';

	var cache = {};

	app.init = function() {
		app.setupCache();
		app.setupProjects();
		app.getButton();
	};

	app.setupCache = function() {
		cache.id = window.location.pathname.match(/\d+/)[0];
		cache.project = $('title').text().trim().split('-')[0];
		cache.taskName = $('#issue_subject').val();
		cache.projects = $('ul #projects-menu li');
		cache.project_names = [];
		cache.projects.each(function(proj) {
			cache.project_names.push($(this).text().replace('»', '').trim());
		} );
		cache.projectID = '';
		cache.activityNumber = '';
		cache.activityText = '';
		cache.activityDescription = '';
	};

	// This makes sure each project is already set up.
	app.setupProjects = function() {
		$.post( proxyURL,
			{ request: 'project',
				action: 'setup',
				api_key: apiKeyToggl,
				projects : cache.project_names,
				project_name : cache.project
			}, 'json' )
			.done(function( data ) {
				cache.projectId = data;
			});
	};

	app.getButton = function() {
		$.post( proxyURL,
			{ request: 'time',
				action: 'running',
				api_key: apiKeyToggl
			}, 'json' )
			.done(function( data ) {
				data = $.parseJSON( data );
				$('.title-bar-actions div').append(app.startTime( data.running ) );
				$( "#toggl-relay" ).on('change', function (e) {
					cache.activityNumber = $(e.target).val();
					cache.activityText = $(e.target).find("option:selected").text();
					$( 'button.time' ).show();
					$( 'button.time-new' ).on( 'click', function() {
						cache.activityDescription = $('#timerdescription').val();
						$('.time').remove();
						app.startToggl();
					});
				});
			});
	};

	app.startTime = function( running ) {

		var input = '<input type="text" class="time" id="timerdescription">';

		//if ( running === 0 ) {
		return app.activityType() + input + '<button class="time time-new" style="display: none">Start Timer</button>';
		//} else {
		//    return app.activityType() + input + '<button class="time time-stop-new" style="display: none">Stop Timer / Start on This Task</button>' ;
		//}
	};

	app.activityType = function() {
		return '<select id="toggl-relay" class="time">' + $('#time_entry_activity_id').html() + '</select>';
	};

	app.startToggl = function() {
		$.post( proxyURL,
			{ request: 'time',
				action: 'start',
				api_key: apiKeyToggl,
				central_url: centralURL,
				central_username: centralUN,
				central_password: centralPW,
				description: '[' + cache.id + '][' + cache.activityText + '][' + cache.activityDescription + ']',
				pid : cache.projectId
			}, 'json' )
			.done( function () {
				app.getButton();
			} );
	};


	app.init();


})( window, jQuery, window.tribeToggl, apiKeyToggl );
