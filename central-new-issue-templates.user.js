// ==UserScript==
// @name         Starter Templates for New Central Issues
// @namespace    https://central.tri.be/
// @version      0.1.1
// @description  The applicable template inserts into the empty Description field after selecting an Issue Tracker status (Bug, Feature, etc.)
// @author       Clifford Paulick
// @include      https://central.tri.be/projects/*/issues/new
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/moderntribe/tampermonkey-scripts/master/central-new-issue-templates.user.js
// ==/UserScript==

let central_new_issue_templates = {};

(function ( $, app ) {
	'use strict';

	/**
	 * Input values as the object keys. Map to the appropriate template name as the object values.
	 */
	const map_input_values_to_template_name = {
		'1' : 'bug',
		'14': 'feature',
		'2' : 'feature',
		'10': 'support',
		'9' : 'task',
		'11': 'discussion',
	};

	/**
	 * The template name as the object keys. The template text as the object values.
	 */
	const templates = {
		'feature'    :
			'h2. +*Info*+' +
			'\n\n' +
			'*Explanation of the proposal:*' +
			'\n' +
			'*Screencast/Screenshots recording explaining item:*' +
			'\n' +
			'*Priority recommendation:*' +
			'\n' +
			'*Preferred Solution/Outcome:*' +
			'\n\n' +
			'h2.  +*User Stories*+' +
			'\n\n' +
			'# as a ... I expect' +
			'\n' +
			'# as a ... I expect' +
			'\n' +
			'# as a ... I expect' +
			'\n\n' +
			'h2. +*Application Details*+' +
			'\n\n' +
			'Classic/Block,' +
			'\n' +
			'Specific deliverable,' +
			'\n' +
			'Product focus/area,' +
			'\n' +
			'etc' +
			'\n\n' +
			'h2. +*Extras*+' +
			'\n\n' +
			'*Relevant documents/files:*' +
			'\n' +
			'_Add all applicable Support Help Desk threads and/or UserVoice threads to the ticket\'s "Forum Threads" field._',
		'bug':
			'h2. +*Info*+\n' +
			'\n' +
			'*Overview of the issue:*' +
			'\n' +
			'*Recommended Solution:*' +
			'\n' +
			'*Priority recommendation:*' +
			'\n\n' +
			'h2. +*Steps To Reproduce:*+' +
			'\n\n' +
			'**Environmental requirements (plugins, WP version, etc)**' +
			'\n\n' +
			'_setup requirements (create events, tickets, blocks, ar-modal, etc)_' +
			'\n\n' +
			'# Do this' +
			'\n' +
			'# expectation' +
			'\n' +
			'# actual (bug)' +
			'\n' +
			'# then this' +
			'\n\n' +
			'h2. +*Extras*+' +
			'\n\n' +
			'*Screenshot:* ' +
			'\n' +
			'*Video:* ' +
			'\n' +
			'*Sandbox URL of the issue:* ' +
			'\n' +
			'*Relevant documents/files* _(attach or link)_' +
			'\n' +
			'*Customer System Info* _(attach as text file)_' +
			'\n' +
			'_Add all applicable Support Help Desk threads and/or UserVoice threads to the ticket\'s "Forum Threads" field._',
	};

	/**
	 * Upon Issue Tracker selection, set the Description to the template value.
	 *
	 * If the Description is not empty, bail.
	 */
	$( 'select#issue_tracker_id' ).change( function () {
		// Issue Tracker value
		let value = $( this ).val();

		// Description textarea
		let desc = $( 'textarea#issue_description' );
		let desc_text = desc.val();
		let desc_text_is_a_template = false;

		// Get the selection's template text
		let template_type = map_input_values_to_template_name[ value ]; // e.g. 'bug'
		let template_text = templates[ template_type ]; // full template text

		// If Description is not blank, detect if it is one of the templates, such as if selecting 'bug' then changing mind to 'feature'
		$.each( templates, function ( key, value ) {
			if ( value === desc_text ) {
				desc_text_is_a_template = true;
				return false; // break;
			}
		} );

		// If selection type does not have an associated template...
		if ( !template_text ) {
			if ( desc_text_is_a_template ) {
				// remove the previously-inserted template, such as going from 'bug' (has template) to 'support' (does not have a template)
				desc.val( '' );
			} else {
				// bail if no template to insert or remove
				return;
			}
		}

		// If Description is blank or is one of the templates, insert the template
		if (
			'' === desc_text
			|| desc_text_is_a_template
		) {
			desc.val( template_text );
		}
	} );
})( jQuery, central_new_issue_templates );
