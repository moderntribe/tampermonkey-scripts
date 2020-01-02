// ==UserScript==
// @name         Central Estimates time conversion
// @namespace    https://central.tri.be/
// @version      0.1
// @description  Makes sure estimate field accepts format such as 2h 5m and converts it into an float value.
// @author       Crisoforo Gaspar Hernandez
// @include      https://central.tri.be/issues/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var input = document.getElementById('issue_estimated_hours');
    var KEYS = {
        MINUTE: 'm',
        HOUR: 'h',
    };

    if ( ! input ) {
        return;
    }

    input.style.width = '40px';
    var NOT_FOUND = -1;
    var decimalPlaces = 2;

    function to_float( str ) {
        var number = parseFloat( str );
        return isNaN( number ) ? 0 : number;
    }

    function format( input ) {
        return input.toFixed( decimalPlaces );
    }

    function getAmount( value ) {
        return value
        // Separate words
            .split(' ')
        // Translate strings to float numbers
            .map( function( chunk ) {
                if ( chunk.indexOf( KEYS.HOUR ) !== NOT_FOUND ) {
                    return to_float( chunk.replace( KEYS.HOUR, '') );
                } else if ( chunk.indexOf( KEYS.MINUTE ) !== NOT_FOUND ) {
                    return to_float( chunk.replace( KEYS.MINUTE, '') ) / 60 ;
                } else {
                    return 0;
                }
                // return the math (sum) on them
            }).reduce(function(accumulator, currentValue) {
                return accumulator + currentValue;
            }, 0);
    }

    function onBlur() {
        if ( ! input.value ) {
            return;
        }

        var value = input.value.toLowerCase();

        // does not contain an h or an m
        if ( value.indexOf( KEYS.HOUR ) === NOT_FOUND && value.indexOf( KEYS.MINUTE ) === NOT_FOUND ) {
            input.value = format( to_float( value ) );
        } else {
            input.value = format( to_float( getAmount( value ) ) );
        }
    }

    input.addEventListener( 'blur',  onBlur );

})();
