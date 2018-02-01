// ==UserScript==
// @name         Sticky Clocker Dropdowns
// @namespace    http://central.tri.be/
// @version      0.1
// @description  Persistent project and activity fields after submitting hours on the clocking tool
// @author       Paul Kim
// @include      /^https:\/\/central.tri.be(\/.*)?/
// @grant        none
// ==/UserScript==

( function($) {
	var state = {
		projectId: null,
		activityId: null,
		submitted: false,
	};

	var keys = {
		projectId: 'project_id',
		activityId: 'time_entry%5Bactivity_id%5D',
	};

	var handleProject = function(event, xhr, settings) {
		if (settings.hasOwnProperty('data')) {
			var dataArr = settings.data.split('&');

			dataArr.forEach(function(query) {
				var queryArr = query.split('=');
				var key = queryArr[0];

				if (key === keys.projectId) {
					state.projectId = queryArr[1];
				}
				if (key === keys.activityId) {
					state.activityId = queryArr[1];
				}
			});

			if (xhr.status === 201) {
				if (state.projectId != null) {
					$('#clocking-tool .project_id').val(state.projectId).change();
					state.projectId = null;
				}

				state.submitted = true;
			}
		}
	};

	var handleActivity = function(event, xhr, settings) {
		if (state.submitted && settings.url.startsWith('/clocking_tool/activities.json') && state.activityId != null) {
			$('#clocking-tool .time_entry_activity_id').val(state.activityId).change();
			state.submitted = false;
			state.activityId = null;
		}
	};

	var bindEvents = function() {
		$('#clocking-tool form').ajaxComplete(handleProject);
		$('#clocking-tool form').ajaxComplete(handleActivity);
	};

	var init = function() {
		bindEvents();
	};

	init();

} )(jQuery);
