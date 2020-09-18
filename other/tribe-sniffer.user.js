// ==UserScript==
// @name         Tribe Sniffer
// @namespace    http://tampermonkey.net/
// @version      1.2.0
// @description  Trying to find out what's running on a WordPress site with The Events Calendar.
// @author       Andras Guseo
// @include      https://*
// @exclude      http*://*.local/wp-admin/*
// @grant        none
// ==/UserScript==

(function(){
    'use strict';

    function popup() {
        var msg="";
        var bp=document.getElementsByClassName('tribe-common--breakpoint-xsmall');
        var sc=document.getElementsByClassName('tribe-events-view--shortcode');
        var ed=document.getElementsByClassName('tribe-blocks-editor');
        var sng=document.getElementsByClassName('tribe-events-single');
        var bodyClasses = document.getElementsByTagName('body')[0].className;
        var res = bodyClasses.split(" ");
        var scripts = document.getElementsByTagName('script');
        var links = document.getElementsByTagName('link');
        var prods = ['WordPress','TEC V1', 'TEC V2', 'ECP','Filter Bar','ET','ET+','WooCommerce'];
        var csss = ['wp-block-library-css','tribe-events-calendar-style-css','tribe-events-views-v2-skeleton-css','tribe-events-calendar-pro-style-css','tribe-filterbar-styles-css','event-tickets-tickets-css-css','event-tickets-plus-tickets-css-css','woocommerce-general-css'];
        var caching = ['WP-Super-Cache','WP Fastest Cache','W3 Total Cache','Hummingbird','WP Rocket','Endurance Page Cache','LiteSpeed Cache'];
        var prevSib=document.lastChild.previousSibling.nodeValue;
        var lastChi=document.lastChild.nodeValue;
        var i,sorc,cacher='not found',theme='';
        var ecsb=document.getElementsByClassName('ecs-events');
        var ect=document.getElementById('ect-events-list-content');

        msg = 'Single event view: ';
        if(sng.length>0){
            msg+="YES\nEditor: ";
            if(ed.length>0){
                msg+="Block";
            }
            else{
                msg+="Classic";
            }
        }
        else{
            msg+="NO\nDesign: ";
            if(bp.length>0){
                msg+='V2';
            }
            else{
                msg+='V1';
            }
        }

        msg+="\nShortcode: ";

        if(sc.length>0){
            msg+="YES";
        }
        else{
            if(ecsb.length>0){
                msg+="Yes, by 3rd party plugin:\n - The Events Calendar Shortcode & Block";
            }
            else if(ect!=null && ect.innerHTML.length>0) {
                msg+="Yes, by 3rd party plugin:\n - The Events Calendar Shortcode and Templates Addon";
            }
            else {
                msg+="NO";
            }
        }
        for ( i=0; i < links.length; i++) {
            sorc = links[i].getAttribute("href");
            if( sorc != null ) {
                if (sorc.search('autoptimize')>0){
                    console.log(sorc.substr(sorc.indexOf("=")+1));
                    msg+="AUTOPTIMIZE FOUND!";
                    msg+="\n------------------\n";
                    break;
                }
            }
        }

        msg+="\nTheme: ";

        for (i=0; i < res.length; i++) {
            if(res[i].startsWith("avada-")) {
                theme= 'Avada';
                break;
            }
            else if(res[i].startsWith("tribe-theme-")) {
                theme= res[i].substr(12);
                break;
            }
            else if(res[i].startsWith("theme-")) {
                theme= res[i].substr(6);
                break;
            }
        }

        if(theme==''){
            for(i=0; i<links.length; i++) {
                var link=links[i].href.match(/(themes\/).{2,}?(\/)/);
                if(links[i].href!=undefined && link!=null) {
                    theme= link[0].slice(7,-1);
                    break;
                }
            }
        }
        if(theme==''){
            theme= "couldn't identify";
        }
        msg+=theme;

        msg+='\n------\nVERSIONS:';

        for(i=0;i<csss.length;i++) {
            var x=document.getElementById(csss[i]);
            if(x != null) x= x.getAttribute("href");
            msg+="\n"+prods[i]+": "
            if(x!=null && x.search("=")>=0){
                msg+= x.substr(x.indexOf("=")+1);
            }
            else{
                msg +='not found';
            }
        }

        msg+='\n------\nCaching:\n';

        if(prevSib!=null){
            for(i=0;i<caching.length;i++){
                if(prevSib.search(caching[i])>0){
                    cacher=caching[i];
                }
            }
        }
        if(lastChi!=null) {
            for(i=0;i<caching.length;i++){
                if(lastChi.search(caching[i])>0){
                    cacher=caching[i];
                }
            }
        }
        msg+=cacher;

        alert(msg);
    }

    var buttonContainer = document.createElement('div');
    buttonContainer.id = 'buttonContainerId';
    document.body.appendChild(buttonContainer);
    document.getElementById('buttonContainerId').innerHTML = '&#128269;';
    buttonContainer.style = 'position: fixed; bottom: 0; right: 0; font-size: 2em; background-color: #313df5; opacity: 0.5; cursor: pointer; padding: 0 6px;';
    buttonContainer.onclick = function(){popup()};

})();
