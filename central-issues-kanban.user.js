// ==UserScript==
// @name         Central Issues Kanban
// @namespace    https://central.tri.be/
// @version      0.1
// @description  Display a Kanban board of queried tickets
// @author       Paul Kim, Aaron Hanson
// @include      /https?:\/\/central.tri.be\/(projects\/)*[^\/]*\/?issues\/?/
// @exclude      /https?:\/\/central.tri.be\/(projects\/)*[^\/]*\/?issues\/[0-9]+\/?/
// @grant        none
// ==/UserScript==

( function($) {

	var columns = {
		new: [],
		inProgress: [],
		designQA: [],
		codeReview: [],
		qa: [],
		merge: [],
		smoketest: [],
		release: [],
	};

	var status = {
		new: 'New',
		inProgress: 'In Progress',
		designQA: 'Design QA',
		codeReview: 'Pending Code Review',
		qa: 'Pending QA',
		merge: 'Pending Merge',
		smoketest: 'Pending Smoketest',
		release: 'Pending Release',
	};

	var keys = Object.keys(columns);

	var el = {
		titleBar: null,
		kanban: null,
		toggle: null,
	};

	var state = {
		showKanban: false,
	};

	var addStyles = function() {
		var css = '.kanban{display:-webkit-box;display:-ms-flexbox;display:flex;overflow-x:scroll;margin-bottom:2rem}.kanban a{text-decoration:none;color:#000}.kanban--hidden{display:none}.kanban-toggle{margin:2rem 0}.kanban-toggle__button{margin:0px;border:none;background:#157F9D;color:#fff;border-radius:2px;padding:5px 8px}.kanban-toggle__button:hover{background:#1CA8C7}.kanban__column{-webkit-box-flex:0;-ms-flex:none;flex:none;width:250px;margin:.5rem;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.kanban__column-header{-webkit-box-flex:0;-ms-flex:none;flex:none}.kanban__column-content{padding:.25rem;background:#f9f9f9;-webkit-box-flex:1;-ms-flex:auto;flex:auto}.card{background:#fff;margin:.75rem .45rem;padding:.45rem .75rem .45rem 1.25rem;border:#e6e6e6 1px solid;position:relative;vertical-align:middle;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-box-shadow:0 0 1px transparent;box-shadow:0 0 1px transparent;-webkit-backface-visibility:hidden;backface-visibility:hidden;-moz-osx-font-smoothing:grayscale;-webkit-transition-duration:0.3s;transition-duration:0.3s;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform, -webkit-transform}.card:before{content:"";height:calc(100% + 2px);width:5px;background:#666;position:absolute;top:-1px;left:-1px}.card:hover{background-color:#f9f9f9;-webkit-transform:scale(1.03);transform:scale(1.03)}.card .card__issue,.card .card__subject,.card .card__assigned-to{margin:.5rem 0;display:block}.card .card__issue a:hover,.card .card__issue a:focus,.card .card__subject a:hover,.card .card__subject a:focus,.card .card__assigned-to a:hover,.card .card__assigned-to a:focus{color:#136379}.card .card__issue{text-transform:uppercase;font-size:.75rem}.card .card__issue a{color:#21A6CB}.card .card__subject{font-size:1rem;margin:0}.card .card__assigned-to{font-size:.75rem}.card .card__assigned-to a{color:#666}.card--p1:before{background-color:#EA3546}.card--p2:before{background-color:#FF6700}.card--p3:before{background-color:#70BF67}.card--p4:before{background-color:#43BCCD}.card--p5:before{background-color:#9F9AA4}';
		var head = document.head;
		var style = document.createElement('style');
		style.type = 'text/css';
		style.appendChild(document.createTextNode(css));

		head.appendChild(style);
	};

	var insertAfter = function(newNode, refNode) {
		refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
	};

	var arrangeCard = function(card) {
		switch(card.status) {
			case 'New':
				columns.new.push(card);
				break;
			case 'In Progress':
				columns.inProgress.push(card);
				break;
			case 'Design QA':
				columns.designQA.push(card);
				break;
			case 'Pending Code Review':
				columns.codeReview.push(card);
				break;
			case 'Pending QA':
				columns.qa.push(card);
				break;
			case 'Pending Merge':
				columns.merge.push(card);
				break;
			case 'Pending Smoketest':
				columns.smoketest.push(card);
				break;
			case 'Pending Release':
				columns.release.push(card);
				break;
		}
	};

	var getCards = function() {
		var issuesArray = [].slice.call(document.querySelectorAll('#issue-list-body tr.issue'));

		issuesArray.forEach(function(issue) {
			var card = {
				issueNumber: issue.querySelector('.issue').innerHTML,
				status: issue.querySelector('.status').textContent,
				priority: issue.querySelector('.priority').textContent,
				subject: issue.querySelector('.subject').innerHTML,
				assignedTo: issue.querySelector('.assigned_to').innerHTML,
			};

			arrangeCard(card);
		});
	};

	var comparePriority = function(a, b) {
		return a.priority - b.priority;
	};

	var sortColumns = function() {
		keys.forEach(function(key) {
			columns[key].sort(comparePriority);
		});
	};

	var getColumnHeader = function(title) {
		var headerHtml = '<header class="kanban__column-header">';
		headerHtml += '<h3 class="kanban__header-title">' + title + '</h3>';
		headerHtml += '</header>';

		return headerHtml;
	};

	var getCardHtml = function(card) {
		var cardHtml = '<div class="kanban__card card card--p' + card.priority + '">';
		cardHtml += '<span class="card__issue">' + card.issueNumber + '</span>';
		cardHtml += '<h4 class="card__subject">' + card.subject + '</h3>';
		cardHtml += '<span class="card__assigned-to">' + card.assignedTo + '</span>';
		cardHtml += '</div>';

		return cardHtml;
	};

	var getKanbanHtml = function() {
		var html = '';

		keys.forEach(function(key) {
			html += '<div class="kanban__column">';
			html += getColumnHeader(status[key]);
			html += '<div class="kanban__column-content">';
			columns[key].forEach(function(card) {
				html += getCardHtml(card);
			});
			html += '</div>';
			html += '</div>';
		});

		return html;
	};

	var setKanban = function() {
		var wrapper = document.createElement('div');
		wrapper.classList.add('kanban', 'kanban--hidden');
		wrapper.innerHTML = getKanbanHtml();
		el.kanban = wrapper;
		insertAfter(wrapper, el.titleBar);
	};

	var getToggleHtml = function() {
		var button = document.createElement('button');
		button.classList.add('kanban-toggle__button');
		button.textContent = 'Toggle Kanban';
		el.toggle = button;
		return button;
	};

	var setToggle = function() {
		var wrapper = document.createElement('div');
		wrapper.classList.add('kanban-toggle');
		wrapper.appendChild(getToggleHtml());
		insertAfter(wrapper, el.titleBar);
	};

	var handleClick = function() {
		if (state.kanbanShown) {
			el.kanban.classList.add('kanban--hidden');
			state.kanbanShown = false;
		} else {
			el.kanban.classList.remove('kanban--hidden');
			state.kanbanShown = true;
		}
	};

	var bindEvents = function() {
		el.toggle.addEventListener('click', handleClick);
	};

	var init = function() {
		el.titleBar = document.querySelector('#content .title-bar');
		addStyles();
		getCards();
		sortColumns();
		setKanban();
		setToggle();
		bindEvents();
	};

	init();

} )(jQuery);
