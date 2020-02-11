# Jira scripts

## Dashboard tweaks

### Project list styles

Script: [`jira-dashboard-styles-projects.user.js`](https://github.com/moderntribe/tampermonkey-scripts/raw/master/jira/jira-dashboard-styles-projects.user.js)

Improves the styling of the Project List gadget.

### Reduce size of Sprint Health Gadget on the Dashboard

Script: [`jira-dashboard-styles-sprint-health.user.js`](https://github.com/moderntribe/tampermonkey-scripts/raw/master/jira/jira-dashboard-styles-sprint-health-gadget.user.js)

This script injects styles that reduce the font size of the Sprint Health Gadget within the Dashboard.

* Before: http://p.tri.be/PaGYhL
* After: http://p.tri.be/9XVPS1

## Navigation tweaks

### Add "Dashboard" link in Global Nav

Script: [`jira-global-nav-dashboard.user.js`](https://github.com/moderntribe/tampermonkey-scripts/raw/master/jira/jira-global-nav-dashboard.user.js)

This adds a *Dashboard icon* to the Global Navigation sidebar, allowing you to one-click to your dashboard if you have set your default page to the *Your Work* page.

Screencast: http://p.tri.be/ov7Grn

### Make urls in the "Forum Threads" field clickable links

Script: [`jira-convert-threads-to-links.js`](https://github.com/moderntribe/tampermonkey-scripts/raw/master/jira/jira-convert-threads-to-links.js)

This checks for the "Forum Threads" field and scrapes it for urls, wrapping them in anchor tags so they become clickable links.

Screenshot: http://p.tri.be/wCrT13

### Add "Your Work" link in Global Nav

Script: [`jira-global-nav-your-work.user.js`](https://github.com/moderntribe/tampermonkey-scripts/raw/master/jira/jira-global-nav-your-work.user.js)

This adds a *Your Work* icon to the Global Navigation sidebar, allowing you to one-click to the *Your Work* page if you have set your default page to the *Dashboard* page.

Screencast: Basically...the same as the `jira-global-nav-dashboard.user.js`, only the inverse.

## Ticket tweaks

### Remove Harvest from ticket page

Script: [`jira-remove-harvest.user.js`](https://github.com/moderntribe/tampermonkey-scripts/raw/master/jira/jira-remove-harvest.user.js)

Removes the Harvest section in the sidebar of Jira.

### Uncheck email checkbox when bulk editing

Script: [`jira-bulk-edit-uncheck-email.user.js`](https://github.com/moderntribe/tampermonkey-scripts/raw/master/jira/jira-bulk-edit-uncheck-email.user.js)

When bulk editing tickets, automatically uncheck the _Send mail for this update_ checkbox.

## Tempo tweaks

### Hide private events in My Work / Tempo

Script: [`jira-mywork-hide-events.user.js`](https://github.com/moderntribe/tampermonkey-scripts/raw/master/jira/jira-mywork-hide-events.user.js)

If you are using the Google Calendar integration in Tempo you can hide events on the My Work page by defining keywords or strings. When the script finds a keyword in the event title the event will be hidden on the My Work page.
Predefined keywords:
* Hide
* Busy
* Private
* Night

You can also adjust or define your own keywords in the script.
