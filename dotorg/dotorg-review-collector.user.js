// ==UserScript==
// @name         dotorg Review Collector
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Try to collect reivews from WordPress.org
// @author       Andras Guseo
// @match        https://wordpress.org/support/topic/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var stars = document.getElementsByClassName('dashicons-star-filled').length;

    console.log(stars);

    var submissionDate = document.getElementsByClassName('bbp-topic-permalink')[0].title.split(' at ');
    console.log(submissionDate[0]);

    var threadURL = document.getElementsByClassName('bbp-topic-permalink')[0].href;

    var writer = document.getElementsByClassName('bbp-user-nicename'); //[0].innerHTML.replace('(','').replace(')','');

    var author = writer[0].innerHTML.replace('(','').replace(')','');
    var reply = "";
    if( writer.length > 1 ) {
        reply = writer[1].innerHTML.replace('(','').replace(')','');
    }
    console.log(author);

    var title = document.getElementsByClassName('page-title')[0].innerHTML;

    console.log(title);

    var infoContainer = document.createElement('input');
	infoContainer.id = 'infoContainerId';
    infoContainer.style.width = '100%';
	var dotorgHead = document.getElementById('wordpress-org');
    //var popup = document.getElementsByClassName('modal-time-entry');
	dotorgHead.parentNode.insertBefore(infoContainer, dotorgHead);

    infoContainer.value = stars + ';out of 5 stars;' + submissionDate[0] + ';' + submissionDate[1] + ';' + author + ';' + title + ';' + reply + ';' + threadURL;
    infoContainer.onclick = 'copyFunction';

    infoContainer.addEventListener( 'click', function( e ) {
        var target = e.target;
        console.log(target.nodeName);
        if ( 'input' !== target.nodeName.toLowerCase() ) {
            return true;
        }

        var ticket_id = target.id;
        console.log(ticket_id);
        copyIt( ticket_id );
    } );

    function copyIt( element ) {
        console.log( element );
        var copyText = document.getElementById( element );
        copyText.select();
        document.execCommand( "Copy" );
    }

})();
