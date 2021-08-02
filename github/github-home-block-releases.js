// ==UserScript==
// @name         GitHub Block Releases
// @namespace    https://github.com/saya-rbt
// @version      1.0
// @description  Hides the releases on GitHub's homepage
// @author       Saya @saya-rbt
// @match        https://github.com/
// @icon         https://www.google.com/s2/favicons?domain=github.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("Running GitHub Block Releases...");

    // Select the node that will be observed for mutations
    const targetNode = document.getElementsByClassName('news')[0];

    // Options for the observer (which mutations to observe)
    const config = {childList: true, subtree: true, characterData: true};

    // Callback function to execute when mutations are observed
    const callback = function(mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                var divs = document.getElementsByClassName("release");
                for(var i = 0; i < divs.length; i++) {
                    divs[i].style.visibility = 'hidden';
                    divs[i].style.height = '0';
                }
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
})();
