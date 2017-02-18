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

var container = $('li#projects-menu ul');

var filter = function(value){
    container.find('li').each(function(){
        var $_ = $(this);

        if ($_.attr('data-project-filter') == 1) return;

        var text = $_.text().toLowerCase();
        var s = value.toLowerCase();

       text.search(s) > -1 ? $_.show() : $_.hide();
    });
}



var add_field = function() {
    var search_field = $('<input/>').attr({ type: 'text', id: 'test', name: 'test'});
    var li = $('<li />').append(search_field);

    search_field.addClass('search_field');
    search_field.css('outline','none');
    li.css('text-align', 'center');
    li.attr('data-project-filter', 1);

    search_field.keyup(function(e){
        if (e.which !== 13) filter(this.value);
        else{
            var link = container.find('li:visible').eq(1).find('a').first();
            if (link.length) window.location = link.attr('href');
        }
    });

    container.prepend(li);
};

add_field();

} )( jQuery );
