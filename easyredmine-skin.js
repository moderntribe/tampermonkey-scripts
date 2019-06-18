// ==UserScript==
// @name         EasyRedmine
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*.easyredmine.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle(`
/* adjust styling in header */

#top-menu #logo a {
    background-image: url("https://central.tri.be/images/mt-logo.png");
	background-size: 130px;
	background-color: #3e4849;
}

@media only screen and (max-width: 960px) {
	#top-menu #logo a {
		background-image: url("http://design.tri.be/brand-guide/assets/tribe-icon.png");
		background-size: 50px;
	}
}

#top-menu {
    background-color: #3e4849;
}

#top-menu>ul>li>a {
    font-weight: normal;
}

#top-menu-container {
    border: none;
}

#top-menu-container>li .easy-top-menu-more-toggler {
    margin-right: 4px;
}

#top-menu-container>li .easy-top-menu-more-toggler:before {
    width: 6px;
    height: 6px;
    margin-top: 0;
}

#easy_page_tabs:first-child {
    background: #5F7777;
    color: #fff;
}

#easy_page_tabs>ul>li>a {
    color: #fff;
    font-weight: normal;
}

#easy_page_tabs>ul>li>a.selected {
    background: rgba(0,0,0,0.25);
    border-color: transparent;
}

#top-menu-container>li>ul.menu-children {
    background: #3e4849;
    border: none;
    padding: 0;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, .5);
}

#top-menu-container>li>ul.menu-children>li {
    padding: 0;
}

#top-menu-container>li>ul.menu-children>li>a:before {
    color: #fff;
}

#top-menu-container>li>ul.menu-children>li>a {
    color: #F2F1F0;
    font-size: 13px;
    padding: 12px 10px 12px 36px;
}

#top-menu-container>li>ul.menu-children>li>a:hover {
    background-color: rgba(255,255,255,0.1);
    text-decoration: none;
}

input#search_q_autocomplete {
    background: #F2F1F0;
}

#top-menu-quick-search-container #quick-search i {
    background-color: #F2F1F0;
}

/ * Adjust overall font */

.journal-tools>a, .message-tools>a, .list-item-actions a, table.list .easy-query-additional-ending-buttons a, table.list .easy-query-additional-ending-buttons>span, table.list .easy-additional-ending-buttons a, table.list .easy-additional-ending-buttons>span, .row-control>.expander, .row-control>.expander-root, .row-control>.expander-descendant, legend a.icon, .attachments-container span[id*='attachments_'] .remove-upload, .attachments-container span[id*='attachments_'] .modify-upload, .button-icon, .box .module-heading-links a, .easy-query-heading-controls a, .easy-query-heading-wrapper .tooltip a, .easy-page-content.edit .close-icon-container a.icon-close, .easy-entity-details .avatar-container+.avatar-edit, .easy-entity-details .easy-contextual a, .journal-tools .menu-more ul li, .message-tools .menu-more ul li, .menu--tooltip ul li, .button-group .menu-more ul li, #context-menu ul li, #top-menu-rich-more .top-menu-rich-more-item>li ul li, .menu-user-profile>li ul li, #main .easy-gantt__menu-group--tooltiped ul li, body, input, textarea, keygen, select, button, .ui-widget {
    font-family: "freight-sans-pro", "Freight Sans Pro", -apple-system, BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,'Fira Sans','Droid Sans','Helvetica Neue',sans-serif;
}

h1, .easy-entity-details-header>h2, .h1, h2, .h2, .easy-query-listing-links>.period, div.easy-calendar-listing-links>.period, .easy-chart-listing-links>.period, .easy-query-listing-links>.easy-cal-title, div.easy-calendar-listing-links>.easy-cal-title, .easy-chart-listing-links>.easy-cal-title, .easy-query-listing-links>.easy-calendar__calendar-listing-date, div.easy-calendar-listing-links>.easy-calendar__calendar-listing-date, .easy-chart-listing-links>.easy-calendar__calendar-listing-date, h3, .h3, h4, .h4, table.list .group>td.inline_expander, h5, .h5, h6, .h6, .journal-byline, .message-authoring {
    font-family: "freight-sans-pro", "Freight Sans Pro", "Helvetica Neue", helvetica
}

a {
    color: #1CA8C7;
}
a:hover {
    text-decoration: none;
}

#header h1 {
    padding: 40px 24px;
}
#header h1 a {
    font-size: 2em;
}
#header h1 a:hover {
    text-decoration: none;
}

/* Service Bar */

#easy_servicebar {
    background: #3e4849;
}

#easy_servicebar>ul li>a[class^=icon]:hover {
    color: #fff;
}

@media only screen and (min-width: 961px) {
#main {
    padding-right: 60px;
}
}

/* Modules */

.easy-page-module {
    box-shadow: 0 0 3px rgba(0,0,0,0.1);
}

.box .module-toggle-button+div {
    margin-top: 45px;
}
.easy-page-module .module-heading {
    background-color: #f7f7f7;
	padding: 14px 24px;
	font-size: 1em;
	border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

.box .module-heading-links {
    top: 4px;
}
/*.easy-page-module.box .module-heading-links a::before, .module-heading-title {
    color: #F2F1F0;
}*/
.module-heading-title {
    margin-top: 5px;
    color: #50596f;
}
.box .module-heading:before {
    font-size: 1em;
    color: #50596f;
}
.box .module-toggle-button .expander {
    top: 15px;
}
.module-heading a {
    color: #50596f;
}

/* Boards */

span.scrum-actions.agile__sprint-actions {
    right: 18px;
    position: absolute;
}

span.scrum-actions.agile__sprint-actions a {
    color: #50596f;
    padding-left: 10px;
}

span.agile__sprint-title-date {
    margin-left: 20px;
}

.agile__list {
    background: rgba(255,255,255,0.3);
    border: 1px dashed rgba(0,0,0,0.1);
}

.agile__item {
    border-radius: 5px;
    border-color: transparent;
    margin: 9px;
    box-shadow: 0 0 3px rgba(0,0,0,0.1);
}

h3.agile__card__title {
    font-size: 14px;
    margin-bottom: 0px;
}

span.agile__card__context-menu.icon.icon-more-vert {
    top: -2px;
}

p.agile__card__subtitle {
    font-size: 10px;
    font-weight: normal;
    color: #b5b5b5;
}

form#easy_sprint_form {
    margin-bottom: 10px;
}

/* Buttons Etc */

.button-important, a.button-3, a.button-positive.orange, html .button-3.ui-button.ui-widget, input.button-3[type=submit], .box.epm_onboarding div.onboarding_redmine .epm-step .try_dashboards {
    background: #1CA8C7;
    border-color: transparent;
	padding: 12px;
	font-size: 1em;
}
.button-important:hover, a.button-3:hover, a.button-positive.orange:hover, html .button-3.ui-button.ui-widget:hover, input.button-3:hover[type=submit], .box.epm_onboarding div.onboarding_redmine .epm-step .try_dashboards:hover {
    background: #157F9D;
}

.entity-array>a, .entity-array>span, .saved-queries a, #user-query-automatic-filter a, .tags a, .multigrouping .multigroup_element, #search-results-counts li a, .version-list a {
    border: none;
}

.entity-array>a:after, .entity-array>span:after, .saved-queries a:after, #user-query-automatic-filter a:after, .tags a:after, .multigrouping .multigroup_element:after, #search-results-counts li a:after, .version-list a:after {
    border: none;
    background: none;
    left: 0;
}

#sidebar .entity-array>a, #sidebar .entity-array>span, #sidebar .saved-queries a, .saved-queries #sidebar a, #sidebar #user-query-automatic-filter a, #user-query-automatic-filter #sidebar a, #sidebar .tags a, .tags #sidebar a, #sidebar .multigrouping .multigroup_element, .multigrouping #sidebar .multigroup_element, #sidebar #search-results-counts li a, #search-results-counts li #sidebar a, #sidebar .version-list a, .version-list #sidebar a, #easy_grid_sidebar .entity-array>a, #easy_grid_sidebar .entity-array>span, #easy_grid_sidebar .saved-queries a, .saved-queries #easy_grid_sidebar a, #easy_grid_sidebar #user-query-automatic-filter a, #user-query-automatic-filter #easy_grid_sidebar a, #easy_grid_sidebar .tags a, .tags #easy_grid_sidebar a, #easy_grid_sidebar .multigrouping .multigroup_element, .multigrouping #easy_grid_sidebar .multigroup_element, #easy_grid_sidebar #search-results-counts li a, #search-results-counts li #easy_grid_sidebar a, #easy_grid_sidebar .version-list a, .version-list #easy_grid_sidebar a, #sidebarClone .entity-array>a, #sidebarClone .entity-array>span, #sidebarClone .saved-queries a, .saved-queries #sidebarClone a, #sidebarClone #user-query-automatic-filter a, #user-query-automatic-filter #sidebarClone a, #sidebarClone .tags a, .tags #sidebarClone a, #sidebarClone .multigrouping .multigroup_element, .multigrouping #sidebarClone .multigroup_element, #sidebarClone #search-results-counts li a, #search-results-counts li #sidebarClone a, #sidebarClone .version-list a, .version-list #sidebarClone a, #easy_grid_sidebarClone .entity-array>a, #easy_grid_sidebarClone .entity-array>span, #easy_grid_sidebarClone .saved-queries a, .saved-queries #easy_grid_sidebarClone a, #easy_grid_sidebarClone #user-query-automatic-filter a, #user-query-automatic-filter #easy_grid_sidebarClone a, #easy_grid_sidebarClone .tags a, .tags #easy_grid_sidebarClone a, #easy_grid_sidebarClone .multigrouping .multigroup_element, .multigrouping #easy_grid_sidebarClone .multigroup_element, #easy_grid_sidebarClone #search-results-counts li a, #search-results-counts li #easy_grid_sidebarClone a, #easy_grid_sidebarClone .version-list a, .version-list #easy_grid_sidebarClone a {
    font-size: 0.8em;
}

#sidebar a:hover {
    background-color: #078E87;
    color: #fff;
}

.ps-scrollbar-x, .ps-scrollbar-y {
    background: none;
}

.button-positive:hover, .ui-dialog-buttonset>button.button-1:hover, button-1:hover, input.button-positive:hover[type=submit], input.button-1:hover[type=submit], html .button-positive.ui-button.ui-widget:hover, #login_form_container button:hover, #easy_page_layout_service_box .menu-manager>li a:hover[class*="button-positive"], .box.epm_onboarding div.onboarding_redmine .epm-step .button:hover, #tab-content-easy_crm p.buttons input:hover[type=submit], #tab-content-easy_crm h3.icon .module-heading-links a.button-positive:hover {
    border-color: #00af93;
}

#sidebar #easy_page_layout_service_box .button-positive:hover:nth-child(n+2), #sidebar #easy_page_layout_service_box li:nth-child(n+2)>.button-positive:hover, #easy_grid_sidebar #easy_page_layout_service_box .button-positive:hover:nth-child(n+2), #easy_grid_sidebar #easy_page_layout_service_box li:nth-child(n+2)>.button-positive:hover {
    background: #00957e !important;
    color: #fff !important;
    border: transparent;
}

.button-negative, .ui-dialog-buttonset>button.button-1, button-1, input.button-negative[type=submit], input.button-1[type=submit], html .button-negative.ui-button.ui-widget, .box.epm_onboarding .module-heading-links .onboarding_module__header_tooltip, .inmplayer-general .inmplayer-trigger {
    background: #5F7777;
    border: transparent;
}

.button-negative:hover, .ui-dialog-buttonset>button.button-1:hover, button-1:hover, input.button-negative[type=submit]:hover, input.button-1[type=submit]:hover, html .button-negative.ui-button.ui-widget:hover, .box.epm_onboarding .module-heading-links .onboarding_module__header_tooltip:hover, .inmplayer-general .inmplayer-trigger:hover {
    background: #E4554A;
    border: transparent;
}

#sidebar .button-negative:hover {
    background-color: #E4554A;
}

#sidebar #easy_page_layout_service_box .button-positive:nth-child(n+2), #sidebar #easy_page_layout_service_box li:nth-child(n+2)>.button-positive, #easy_grid_sidebar #easy_page_layout_service_box .button-positive:nth-child(n+2), #easy_grid_sidebar #easy_page_layout_service_box li:nth-child(n+2)>.button-positive {
    background-color: #5F7777 !important;
    border: transparent;
    color: #fff !important;
}

#sidebar .sidebar-control a:hover, #easy_grid_sidebar .sidebar-control a:hover {
    background-color: rgba(0,0,0,0.05);
    color: rgba(0,0,0,0.5);
}

#easy_grid_sidebar a.icon, #sidebar a.icon {
    margin-bottom: 10px;
    padding: 10px;
}

/* Project List */

table.list td.easy-query-additional-ending-buttons .ending-buttons-fixed, table.list td.easy-additional-ending-buttons .ending-buttons-fixed, table.list th.easy-query-additional-ending-buttons .ending-buttons-fixed, table.list th.easy-additional-ending-buttons .ending-buttons-fixed {
    border: 1px;
    border-color: transparent;
    right: 6px;
    background: none;
}

/* Task List */

table.list>tbody>tr>td a, table.list>tbody>tr>th a {
    font-size: 1em;
}

table.list>tbody>tr.overdue .due_date {
    font-size: 1em;
}

/* Priorities */

span[data-name="issue[priority_id]"] {
    background-color: #777777;
    border-radius: 20px;
    width: 14px;
    height: 14px;
    display: block;
    text-align: center;
    line-height: 14px;
    color: white;
    font-weight: bold;
    font-size: 10px;
}
/*p1*/
span[data-value="20"] {
    background-color: #E4554A;
}
/*p2*/
span[data-value="13"] {
    background-color: #F4AF49;
}
/*p3*/
span[data-value="12"] {
    background-color: #F8CE4D;
}
/*p4*/
span[data-value="29"] {
    background-color: #1CA8C7;
}
/*p5*/
span[data-value="35"] {
    background-color: #5F7777;
}


/* Gantt */


.gantt_container, .gantt_grid, #main .gantt_grid .gantt_grid_head_cell, #main .gantt_grid_scale, #main #gantt_grid, #main .gantt_scale_cel, #main .gantt_task_scale, .gantt_cell, .gantt_task .gantt_task_scale .gantt_scale_cell, .gantt_scale_line {
    border-color: #e4e4e4 !important;
}

/* Hide noisy buttons and things */

.box.epm_onboarding {
    display: none;
}

span.entity-array {
    display: none;
}

.easy-query-filter-container .buttons>div span {
    display: none;
}

.easy-entity-list__item i.icon-message {
    display: none;
}

i.icon.icon-message.red-icon.unread.push-left {
    display: none;
}

span.attendance-user-status {
    display: none;
}
`);
})();