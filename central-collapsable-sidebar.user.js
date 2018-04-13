// ==UserScript==
// @name         Collapsable Sidebar
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Collapse sidebar on the left on central, available on hover on the sidebar (only on desktop).
// @author       Crisoforo Gaspar Hernandez
// @include      https://central.tri.be/*
// @grant        none
// ==/UserScript==

(function() {
    var sidebarContainer = document.getElementById('side-container');
    var sidebar = document.getElementById('sidebar');
    var menu = document.getElementById('main-menu');
    var wrapper = document.getElementById('wrapper');
    var topMenu = document.getElementById('top-menu');
    var navLogo = document.getElementById('nav-logo');
    var banner = document.querySelector('a.banner');

    if ( ! sidebarContainer || ! sidebar || ! menu || ! topMenu ) {
        return;
    }

    var mobileBreakpoint = 950;
    var logoURL = 'https://tri.be/content/uploads/2017/06/tribelogo.png';

    // Create a new logo element
    var img = document.createElement('img');
    img.style.width = '48px';
    img.style.position = 'absolute';
    img.style.right = '15px';
    img.style.top = '25px';
    img.setAttribute('src', logoURL);
    img.style.transition = 'opacity .1s ease-in';
    navLogo.insertAdjacentElement( 'beforebegin', img );

    menu.style.transition = 'opacity .25s ease-in';
    sidebar.style.transition = 'opacity .1s ease-in';
    navLogo.style.transition = 'opacity .1s ease-in';
    sidebarContainer.style.transition = 'transform .25s ease-in';

    var isOpen = true;

    function close() {
        sidebarContainer.style.transform = 'translateX(-120px)';
        sidebar.style.opacity = '0';
        menu.style.opacity = '0';
        navLogo.style.opacity = '0';
        sidebar.style.pointerEvents = 'none';
        menu.style.pointerEvents = 'none';
        navLogo.style.pointerEvents = 'none';
        isOpen = false;
    }

    function open() {
        img.style.opacity = '0';
        topMenu.style.zIndex = '1';
        wrapper.style.width = 'calc(100% - 80px)';
        sidebarContainer.style.transform = 'translateX(0)';

        if ( banner ) {
            banner.style.width = 'calc(100% - 80px)';
        }
        isOpen = true;
    }

    sidebarContainer.addEventListener('transitionend', function( event ) {
        if ( 'propertyName' in event && 'transform' === event.propertyName ) {
            if ( isOpen ) {
                sidebar.style.opacity = '1';
                menu.style.opacity = '1';
                navLogo.style.opacity = '1';
                sidebar.style.pointerEvents = 'auto';
                menu.style.pointerEvents = 'auto';
                navLogo.style.pointerEvents = 'auto';
            } else {
                img.style.opacity = '1';
            }
            topMenu.style.zIndex = isOpen ? '1' : '';
        }
    });

    function destroy() {
        img.style.opacity = '0';
        topMenu.style.zIndex = '';
        wrapper.style.width = '';
        sidebarContainer.style.transform = 'translateX(0)';
        isOpen = true;
        // Remove Listeners
        sidebarContainer.removeEventListener('mouseenter', open);
        sidebarContainer.removeEventListener('mouseleave', close);
    }

    function init() {
        // Adjust new width
        wrapper.style.width = 'calc(100% - 80px)';

        if ( banner ) {
            banner.style.width = 'calc(100% - 80px)';
        }
        topMenu.style.zIndex = '1';
        // Attach Listeners
        sidebarContainer.addEventListener('mouseenter', open);
        sidebarContainer.addEventListener('mouseleave', close);

        isOpen = true;
        // By default it should be closed
        close();
    }

    function onResize() {
        if ( document.documentElement.clientWidth <= mobileBreakpoint ) {
            destroy();
        } else {
            init();
        }
    }

    // Fire it manually on start.
    onResize();
    window.addEventListener( 'resize', onResize );
})();
