// ==UserScript==
// @name         Project Search
// @namespace    http://central.tri.be/
// @version      0.1
// @description  Filter for projects dropdown
// @author       Daniel Dvorkin
// @include      /^https:\/\/central.tri.be(\/.*)*/
// @grant        none
// ==/UserScript==

( function( $ ) {

var container = $('li#projects-menu ul'),
    items = container.find('li');

var add_style = function(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
};

var filter = function(value){
    container.find('li').each(function(){
        var $_ = $(this);

        if ($_.attr('data-project-filter') == 1) return;

        var text = $_.text().toLowerCase();
        var s = value.toLowerCase();

       text.search(s) > -1 ? $_.show() : $_.hide();
    });
}

var handle_key = function(e){
    var selected = $(".selected");
    items.removeClass("selected");

    switch(e.which){
        case 38: //up
            var prev = selected.prev(':visible');
            prev.length ? prev.addClass("selected") : selected.siblings(':visible').last().addClass("selected")
            break;
        case 40: //down
            var next = selected.next(':visible');
            next.length ? next.addClass("selected") : selected.siblings(':visible').eq(1).addClass("selected");
            break;
        case 13: //enter
            var link = selected.find('a').first();
            if (link.length) window.location = link.attr('href');
            break;
        default:
            filter(this.value);
            container.find('li:visible').eq(1).addClass('selected');
    }
};


var add_search_field = function() {
    var search_field = $('<input/>').attr({ type: 'text', id: 'test', name: 'test'});
    var li = $('<li />').append(search_field);

    search_field.addClass('search_field');
    search_field.css('outline','none');
    li.css('text-align', 'center');
    li.attr('data-project-filter', 1);

    container.find('li').eq(1).addClass('selected');

    search_field.keyup(handle_key);

    container.prepend(li);
};

add_style('#projects-menu ul li.selected a { background-color:#21A6CB !important; }');
add_search_field();

} )( jQuery );
