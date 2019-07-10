// ==UserScript==
// @name         Starter Templates for New Central Issues
// @namespace    https://central.tri.be/
// @version      0.1.0
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
		'bug'    :
			'*Overview of the issue:*' +
			'\n\n' +
			'*Priority recommendation:*' +
			'\n\n' +
			'*Screencast recording reproducing issue:*' +
			'\n\n' +
			'*Steps to recreate:*' +
			'\n\n' +
			'*Sandbox URL of the issue:*' +
			'\n\n' +
			'*Plugins (with version #s) associated with this bug:*' +
			'\n\n' +
			'*Preferred solution/outcome:*' +
			'\n\n' +
			'*Relevant documents/files:*',
		'feature':
			'Add all applicable Support Help Desk threads and/or UserVoice threads to the ticket\'s "Forum Threads" field.' +
			'\n\n' +
			'*Priority recommendation:*' +
			'\n\n' +
			'*Explanation of the proposal:*' +
			'\n\n' +
			'*Screencast recording explaining item:* ' +
			'\n\n' +
			'*Step by Step instructions:* (if applicable)' +
			'\n\n' +
			'*Preferred Solution/Outcome:* (User Stories)' +
			'\n\n' +
			'*Relevant documents/files:*',
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