// ==UserScript==
// @name         Jira Dashboard: Sprint Health Gadget Styles
// @namespace    https://moderntribe.atlassian.net/
// @version      0.1
// @description  Adjust styles of the Sprint Health Gadget
// @author       Matthew Batchelder
// @include      /https?:\/\/moderntribe.atlassian.net\/secure\/Dashboard.jspa/
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    var styles = `
.sprint-health-dashboard-item h1,
.sprint-health-dashboard-item h1 span,
.sprint-health-dashboard-item h3 {
  font-size: 1rem;
}

.sprint-health-dashboard-item .ag-metric-value {
  font-size: 1.25rem;
}

.sprint-health-dashboard-item .ag-inner-area {
  padding: 0.5rem;
}

.sprint-health-dashboard-item .ag-status-header {
  margin-bottom: 0.5rem;
}
`;
    GM_addStyle( styles );
})();
