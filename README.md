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

Improves the content space and make sure sidebar is collapsable to the same width of http://tri.be/ and sidebar is accesible just by moving the cursor to the sidebar to  make it available when only needed it.

![collapsable sidebar](https://user-images.githubusercontent.com/3921289/37617341-82bc4994-2b78-11e8-8856-288de6d2c8e5.gif)

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

### `clocking-nag.user.js`

Shows your week of clocking at the top of Central and prompts you to enter some clocked time if you are falling behind.

![screen shot 2017-08-16 at 10 04 53 am](https://user-images.githubusercontent.com/430385/29367332-8beceac6-826a-11e7-9e62-3800663c5b22.png)

## `dotorg-helper.user.js`

In runs in the .org forums for Modern Tribe plugins. It colors the resolved threads green, and the threads which have the last voice from a team member to light yellow.

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

### `over-estimate.user.js`

* highlight the spent hours with pink if they are over estimate
* works on both issue lists and single issues

### `party-llamacorn.user.js`

When a ticket is set to _Pending Merge_ or _Complete_, a llamacorn flies across the screen.

### `premium-forum-extras.js`

Puts extra info all over a thread page.
1) Show red label if topic is private
2) Move Assignee and Status box to the top
3) Show the user's licenses at the bottom right
4) Show the latest version numbers of our plugins in the admin bar (does not yet update automatically)
Screenshot at https://cloudup.com/cdukQK9rkr1

![screen shot 2018-03-27 at 01 12 53 am](https://cloudup.com/cdukQK9rkr1)

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
