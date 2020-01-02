// ==UserScript==
// @name         GitHub PR Tools
// @namespace    https://github.com/
// @version      0.1
// @description  Adds PR helper tools
// @author       Matthew Batchelder
// @include      /https?:\/\/github\.com.*\/pull\/.*/
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @grant        none
// ==/UserScript==

( function( $ ) {
    'use strict';

     var obj = {
         specFiles: []
     };

    /**
     * Initialize
     */
    obj.init = function() {
        var $reviewTools = $( '.pr-review-tools' );

        var specFiles = obj.getSpecFiles();

        $reviewTools.prepend( '<div class="diffbar-item"><button class="btn btn-sm" id="tribe-suppress-spec"><span id="tribe-suppress-spec-showhide">Hide</span> spec.js<span id="tribe-suppress-spec-count"></span></button></div>' );
        $reviewTools.on( 'click', '#tribe-suppress-spec', function( e ) {
            var specFiles = obj.getSpecFiles();

            var $el = $( this );
            var isActive = $el.hasClass( 'active' );

            $( '#tribe-suppress-spec-count' ).text( ' (' + specFiles.length + ')' );

            var $showhide = $( '#tribe-suppress-spec-showhide' );

            specFiles.forEach( function( el ) {
                $( '.js-details-target', el ).click();
            } );

            if ( isActive ) {
                $el.removeClass( 'active' );
                $showhide.html( 'Hide' );
            } else {
                $el.addClass( 'active' );
                $showhide.html( 'Show' );
            }
        } );
    };

    obj.getSpecFiles = function() {
        // Reset spec files array
        obj.specFiles = [];

        var jsFiles = document.getElementsByClassName( 'js-file' );

        Array.prototype.forEach.call( jsFiles, function( el, index, array ) {
            var fileloc = el.querySelector( '.file-info a' );
            if ( fileloc.innerText.match( /\.spec\.js/ ) ) {
                obj.specFiles.push( el );
            }
        } );

        return obj.specFiles;
    };

    $( function() {
        obj.init();
    } );
})( jQuery );
