// ==UserScript==
// @name         Central > My favorite tickets
// @namespace    https://central.tri.be/
// @version      0.1
// @description  Add your favorite ticket numbers to the main menu for easy access
// @author       Andras Guseo
// @match        https://central.tri.be/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/moderntribe/tampermonkey-scripts/master/central-my-favorite-tickets.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Here you can define what the main menu item text should be
    var menuName = 'Favorites';

    // List your tickets here. The note can be whatever you want to appear in the menu.
    var tickets = {
        120914: { note: "Oversight" },
        120205: { note: "Helpdesk" },
        120264: { note: "Supporting Support" },
        120265: { note: ".org Pass" },
        120288: { note: "1:1 with team" },
        120262: { note: "Weekly Support Scrum" },
        120349: { note: "Recruiting & Onboarding" },
        120643: { note: "Plugins Weekly Status" },
        120668: { note: "Products Management Bi-Weeky Meeting" },
    };

    // Putting together the HTML
    var menu;
    menu  = '<a href="#">' + menuName + '</a>';
    menu += '<ul id="mytickets-menu-ul" style="display: none; height: auto;">';

    for( var ticketNumber in tickets ) {
        menu += '<li><a href="/issues/' + ticketNumber + '">#' + ticketNumber + ' | ' + tickets[ticketNumber].note + '</a></li>';
    }
    menu += '</ul></li>';

    //console.log( menu );

    // Creating the new menu item
    var list = document.getElementById("account-nav");
    var newItem = document.createElement("LI");
    newItem.id = 'mytickets-menu';
    newItem.className = 'drop-down';
    newItem.innerHTML = menu;

    // Adding the new menu item in DOM
    list.insertBefore( newItem, list.childNodes[0]);

    // Adding listeners
    newItem.addEventListener( 'mouseover', showSubmenu );
    newItem.addEventListener( 'mouseout', hideSubmenu );

    var subMenu = document.getElementById( 'mytickets-menu-ul' );

    // Animations
    function showSubmenu() {
        subMenu.style.display = 'block';
        newItem.classList.add( 'open' );
    }
    function hideSubmenu() {
        subMenu.style.display = 'none';
        newItem.classList.remove( 'open' );
    }

/**
 * === Changelog ===
 * 0.1 - 2019-03-04
 * Initial release
 */
})();
