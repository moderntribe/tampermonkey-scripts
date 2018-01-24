// ==UserScript==
// @name         Central QA Headers
// @namespace    http://central.tri.be/
// @version      1.0
// @description  Applies color background to QA template headers for better visibility
// @author       Nicole Ramsey
// @include      /https?:\/\/central(dev)?.tri.be\/(projects\/)*[^\/]*\/?issues\/?/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
       //QA PASSED ON TO NEXT STATUS
       // Find the link with name attribute that contains the word "passed"
        var qa_pass = document.getElementsByName("QA-PASSED-TO-COMPLETE");

        // use this to check if it is on page, troubleshooting
        // console.log(qa_pass[0].tagName);

        // Find the closest h2
        var qa_pass_heading = qa_pass[0].nextElementSibling;

        // use this to check if it is on page, troubleshooting
        //console.log(qa_pass_heading.innerHTML);

        // then add CSS background
        qa_pass_heading.style.backgroundColor = 'green';
        qa_pass_heading.style.color = 'black';


        //QA RETURNED TO IN PROGRESS WITH NOTES
       // Find the link with name attribute that contains the word "returned"
        var qa_in_progress = document.getElementsByName("RETURNED-TO-QA-IN-PROGRESS");

        // use this to check if it is on page, troubleshooting
        // console.log(qa_in_progress[0].tagName);

       // Find the closest h2
        var qa_in_progress_heading = qa_in_progress[0].nextElementSibling;

        // use this to check if it is on page, troubleshooting
        //console.log(qa_in_progress_heading.innerHTML);

        // then add CSS background
        qa_in_progress_heading.style.backgroundColor = '#ffffe2';
        qa_in_progress_heading.style.color = 'black';

      //Problems to address:
      // 1. If both aren't on the page there is a undefined JS error in console, need to tell it to relax if it doesn't find either of
      //    these items on a page.
      // 2. Would be better to get element by "passed" or "returned" since rest of remaining phrase could be unique.
      //
})();