// ==UserScript==
// @name         Github PR name formatting.
// @namespace    http://central.tri.be/
// @version      0.1
// @description  Format Github PR Links same as Github does.
// @author       Crisoforo Gaspar Hernandez
// @match        https://central.tri.be/issues/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  var links = Array.prototype.slice.call( document.querySelectorAll('.linkified') );

  links.forEach(function(node) {
    node.innerText = node.innerText.replace('https://github.com/moderntribe/', '').replace('/pull/', '#');
  });

})();