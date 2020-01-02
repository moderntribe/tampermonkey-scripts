// ==UserScript==
// @name         Friendly UI for PR list and forums Threads
// @namespace    https://central.tri.be/
// @version      0.1
// @description  Update the UI to allow improve the UI to add more than one PR to an issue.
// @author       Crisoforo Gaspar Hernandez
// @include      https://central.tri.be/issues/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  var prEl = document.querySelector('#issue_custom_field_values_56');
  var issueForm = document.querySelector('#issue-form');

  if ( ! issueForm || ! prEl ) {
    return;
  }

  hide(prEl);

  var PULL_REQUESTS = [];
  var ZERO = 0;
  var currentValue = toMultipleValue(prEl.value).map( function( value ) {
    createDynamicField( value, prEl.parentNode );
  });

  if ( currentValue.length === ZERO ) {
    createDynamicField( '', prEl.parentNode );
  }

  function createDynamicField( value, parentNode ) {
    var container = document.createElement('div');

    var input = document.createElement('input');
    input.style.width = 'calc(100% - 80px)';
    input.style.padding = '2px 5px';
    input.style.marginRight = '10px';
    input.value = value;

    var add = document.createElement('button');
    add.innerText = '+';
    addButtonStyles(add);

    var remove = document.createElement('button');
    remove.innerText = '-';
    addButtonStyles(remove);
    remove.style.backgroundColor = '#e4554a';

    // Add field
    add.addEventListener('click', function(e) {
      e.preventDefault();
      createDynamicField( '', parentNode );
    });

    // Remove Field
    remove.addEventListener('click', function(e) {
      e.preventDefault();

      prEl.parentNode.removeChild( container );
      PULL_REQUESTS.splice(container.index, 1);

      // If all has been removed add one back so we never are empty
      if ( PULL_REQUESTS.length === 0 ) {
        createDynamicField( '', parentNode );
      }
    });


    container.appendChild(input);
    container.appendChild(add);
    container.appendChild(remove);
    // Save them for future use.
    container.index = PULL_REQUESTS.length;
    PULL_REQUESTS.push( container );

    container.style.marginBottom = '5px';

    parentNode.appendChild( container );
  }


  issueForm.addEventListener('submit', function( e ) {
    prEl.value = toSingleValue( PULL_REQUESTS );
  });

  function toSingleValue( group ) {
    return group.map(function(container) {
      return container.querySelector('input');
    }).filter(function( input ) {
      return input.value.replace(/\s/g, '').length > 0;
    }).map( function( item ) {
      return item && item.value ? item.value : '';
    }).join( ' ' );
  }

  function toMultipleValue( singleValue ) {
    var values = singleValue ? singleValue.trim().split(' ') : [];
    return values.map(function( item ) {
      return item.replace(/\s/g,'');
    }).filter(function( item ) {
        return item.length > 0;
    });
  }

  function hide( el ) {
    if ( el ) {
      el.style.display = 'none';
    }
  }

  function addButtonStyles( el ) {
    el.style.padding = '2px 5px';
    el.style.border = 'none';
    el.style.backgroundColor = '#1ca8c7';
    el.style.margin = '0 7px 0 0';
    el.style.color = '#FFF';
    el.style.fontWeight = 'bold';
    el.style.width = '20px';
  }

})();
