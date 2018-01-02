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

        if ( specFiles.length > 0 ) {
            $reviewTools.prepend( '<div class="diffbar-item"><button class="btn btn-sm" id="tribe-suppress-spec"><span>Hide</span> spec.js (' + specFiles.length + ')</button></div>' );
            $reviewTools.on( 'click', '#tribe-suppress-spec', function( e ) {
                var $el = $( this );
                var isActive = $el.hasClass( 'active' );

                Array.prototype.forEach.call( specFiles, function( el ) {
                    $( el ).find( '.js-details-target' ).click();
                } );

                if ( isActive ) {
                    $el.removeClass( 'active' );
                    $el.find( 'span' ).html( 'Hide' );
                } else {
                    $el.addClass( 'active' );
                    $el.find( 'span' ).html( 'Show' );
                }
            } );
        }
    };

    obj.getSpecFiles = function() {
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
