# tampermonkey-scripts

These are some common Modern Tribe Tampermonkey scripts.

## Installation

1. Install [Tampermonkey](https://tampermonkey.net/)
1. Select a script in this repo that you wish to use. View the file and click the _Raw_ button at the top of the file to view its source
1. Copy the source
1. Open Tampermonkey in your browser and click the Add Script tab (icon with a plus symbol)
1. Paste the source into the script window and hit save
1. Viola!

## Scripts

## `central-collapsable-sidebar.user.js`

Improves the content space and make sure sidebar is collapsible to the same width of http://tri.be/ and sidebar is accessible just by moving the cursor to the sidebar to  make it available when only needed it.

![collapsible sidebar](https://user-images.githubusercontent.com/3921289/37617341-82bc4994-2b78-11e8-8856-288de6d2c8e5.gif)

### `central-link-pr-formatting.user.js`

Format the links that points to Pull Request in Central from a format like: `https://github.com/moderntribe/event-tickets-plus/pull/490` into a format like `event-tickets-plus#490
`event-tickets-plus#490`  similar to what GitHub does when a Pull Request is referenced inside of an issue.  

### `central-friendly-ui-for-multiple-pr.user.js`

Improves the UI when an issue has more than a single Pull Request to improve the addition / removal of new Pull Requests. 

![Multiple PR Image](https://user-images.githubusercontent.com/3921289/36676235-b69b5434-1ad0-11e8-9df3-345627c01aff.gif)

### `central-estimates-time-conversion.user.js`

Updates the estimate field to make it wider and available to accepts entries such as: 4h 5m and make them work exactly the same as **Spent time** field.

### `central-issues-kanban.user.js`

Creates a kanban board for all issues queried. The board is hidden by default and can be toggled open and closed.

### `central-links.user.js`

Turns the _Pull Request_ field in Modern Tribe's "Central" issues pages into a link.

### `central-my-favorite-tickets.user.js`

Add your favorite ticket numbers to the main menu for easy access.
The ticket numbers and descriptions need to be manually adjusted in the script.

![screen shot](https://dl.dropboxusercontent.com/s/ni5i38m93hvxmjc/shot_190304_231637.jpg)

### `central-new-issue-templates.user.js`

Starter Templates for New Central Issues

### `clocking-nag.user.js`

Shows your week of clocking at the top of Central and prompts you to enter some clocked time if you are falling behind.

![screen shot 2017-08-16 at 10 04 53 am](https://user-images.githubusercontent.com/430385/29367332-8beceac6-826a-11e7-9e62-3800663c5b22.png)

## `dotorg-helper.user.js`

In runs in the .org forums for Modern Tribe plugins. It colors the resolved threads green, and the threads which have the last voice from a team member to light yellow. Don't use together with dotorg Hider.

## `dotorg-hider.user.js`

A twin to .org Helper. The script runs in the .org forums for Modern Tribe plugins. It hides threads that don't need attention: resolved threads and threads where last voice is a team member. Don't use together with dotorg Helper.

### `github-products-branch-protection.user.js`

Auto selects some checkboxes for setting default branch protection on Products in GitHub.

### `github-pull-prefix-removal.user.js`

When viewing Pull Requests on GitHub, if the PR is against a Modern Tribe repo, it removes the `moderntribe/` prefix for easier scanning.

### `issue-list-tools.user.js`

This script provides handy tools when viewing an issue list:

* Toggle open/close row groupings of issues

Ok...fine...that's just one tool, but this has room to grow.

### `issue-summary.user.js`

* Color-codes central issues by status and swaps out issue types (Support, Feature, Bug) with FontAwesome "icons".
* Adds a summary of on-page issues grouped by issue status.

![screen shot 2017-08-16 at 10 08 03 am](https://user-images.githubusercontent.com/430385/29367418-db3e3328-826a-11e7-8dd1-2e9e48a338c9.png)

### `key-commands.js`

Sorta like vim/gmail key commands
* `/` places your cursor in the search box.
* in query view: `j` and `k` move your selection up or down. Pressing `enter` on the selection takes you to that ticket.
* `i` takes you to the My Query.
If you don't like the query view `i` takes you to, change the URL in line 15. 

### `liveagent-clickafy-central-id.user.js`

Intended for the Events Support team. Works on the LiveAgent platform.  
The script makes the Site's URL, the Central ID, and the user ID in the meta boxes clickable, which will open in a new tab / window.  
The Central ID works with both `123456` and `#123456` formats.

### `liveagent-plugin-versions.user.js`

Intended for the Events Support team. Works on the LiveAgent platform.  
The script Display our plugins' latest version numbers at the top of the screen.  
It has to be manually updated after a new release. Update notes are in the file.

### `over-estimate.user.js`

* highlight the spent hours with pink if they are over estimate
* works on both issue lists and single issues

### `party-llamacorn.user.js`

When a ticket is set to _Pending Merge_ or _Complete_, a llamacorn flies across the screen.

### `premium-forum-collapse-convo.user.js`

You have a long exchange with a client. Tired of always scrolling down and up? This is for you.
If there are more than 6 replies in a thread, then everything between the first and the last will be collapsed.

Screenshot: https://cloudup.com/cn2yDKGCZ4v

### `premium-forum-move-status-box.user.js`

Moves the Assignee box and the Status box to the top, above the posts.

### `premium-forum-plugin-versions.user.js`

Shows the following info:
* Plugin version numbers of the last 5 releases
* Version numbers of the user's plugins, if system information is submitted
* The users nick for easy access / copy-paste 

Screenshot: https://cloudup.com/cU1Tp-rggXe

### `premium-forum-private-topic.user.js`

If the thread is marked private then puts a red label at the top and bottom, and draws a red border around the posts.

### `premium-forum-reformat-sysinfo.user.js`

Reformats the user submitted system information if it comes through without line breaks.

It will re-color "View raw system information" to red to signal the formatting.

If you still see improvement areas, like a plugin in 2 lines, let me know.

Screenshot before: https://cloudup.com/ibZxM-aYwLA

Screenshot after:  https://cloudup.com/i4JtjHdOgaP

### `premium-forum-thread-list-colors.user.js`

Colors the thead list on theeventscalendar.com based on urgency.
* Critical (past a 24h): red
* Overdue (past 20h): orange
* Resolved: green

Screenshot: https://cloudup.com/ccdWJTkiF30

### `premium-forum-users-licenses.user.js`

Show the user's licenses at the bottom right, making them visible when the thread is long.

### `qa-headers.user.js`

Styles QA headers so scanning QA activity on tickets is quicker. Relies on using the following headers in Central:

```
h2. QA PASSED (plus any extra text you want here)

h2. RETURNED (plus any extra text you want here)
```

### `qa-testing-instructions.user.js`

Adds a button to the update form in a specific issue.
When clicking the button, the notes and testing instructions fields are automatically populated with formatted starter text.

### `relay-for-toggl.user.js`

Adds a button to tasks in central to start toggl.
You need to provide your toggl API key and the proxy address.
You are welcome to use the proxy at https://relay-for-toggl.herokuapp.com/ 
Proxy repo: https://github.com/binarygary/relay-for-toggl
![example](https://github.com/moderntribe/tampermonkey-scripts/img/toggl.gif)

### `sticky-clocker-dropdowns.user.js`

Sets the __project__ and __activity__ to previous values after clocking time on the clocking tool.
This does not work if the clocking tool is opened in a pop-up window.

### `target-blank.user.js`

Auto-adds `target="_blank"` to all external links.

### `uncheck-email-all.user.js`

Auto-uncheck the "email all" checkbox so you only send an email when you _really_ want to.

### `uservoice.user.js`

Tweaks the UserVoice UI by throwing out portions of the interface that we don't care about; resizing stuff; and other small tweaks.
