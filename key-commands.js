// ==UserScript==
// @name         Key Commands for Central
// @namespace    https://central.tri.be/
// @version      0.1
// @description  Add some basic key commands to central.
// @author       Gary Kovar
// @match        *://central.tri.be/issues*
// @grant        none
// ==/UserScript==

var selected;
var bg = '#2DD39C';

(function(window, $, app, selected, bg ) {
    var query = 'https://central.tri.be/issues?query_id=3270';

    $( "tr.issue" ).click( function () {
        selected = $( this );
        selected.css( "background-color", bg );
    } );

    $(document).keydown(function(e) {

    var _target = $(e.target);
    var _focused = $(document.activeElement);
    var _inputting = _focused.get(0).tagName.toLowerCase()==="textarea" || _focused.get(0).tagName.toLowerCase()==="input";


    // / (forward slash) key = search
    if (!_inputting && e.keyCode===191) {
        e.preventDefault();
        document.getElementById( 'q' ).focus();
        document.getElementById( 'q' ).select();
        return;
    }

    // i key = query url specified (inbox)
    if (!_inputting && e.keyCode===73) {
        e.preventDefault();
        window.location = query;
        return;
    }

    // use j or k to scroll up and down, press enter to go to the ticket.
    if ( window.location.href == query && !_inputting && ( e.keyCode===74 || e.keyCode===75 ) ) {
        if ( typeof selected == "undefined"){
            selected = $( "tr.issue" ).first();
            selected.css( "background-color", bg );
            return;
        }

        selected.css( "background-color", "" );
        if ( e.keyCode ===74 ) {
            $next = selected.next();
            if( ! $next.length ) {
                selected = $( "tr.issue" ).first();
            } else {
                selected = selected.next();
            }
        } else {
            $prev = selected.prev();
            if( ! $prev.length ) {
                selected = $( "tr.issue" ).last();
            } else {
                selected = selected.prev();
            }
        }
        selected.css( "background-color", bg );
        position = selected.position();
        window.scrollTo(position.left, position.top);
    }

    if ( window.location.href == query && !_inputting && e.keyCode===13 ) {
        $id = $(selected).attr("id");
        if ( typeof $id == "undefined"){
            return;
        }
        $issue_id = $id.substring(6);
        window.location = 'https://central.tri.be/issues/' + $issue_id;
    }

});

})( window, jQuery, window.tribeKeyCommands, selected, bg );