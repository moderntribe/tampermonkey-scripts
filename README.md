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

### `central-links.js`

Turns the _Pull Request_ field in Modern Tribe's "Central" issues pages into a link.

### `clocking-nag.js`

Shows your week of clocking at the top of Central and prompts you to enter some clocked time if you are falling behind.

![screen shot 2017-08-16 at 10 04 53 am](https://user-images.githubusercontent.com/430385/29367332-8beceac6-826a-11e7-9e62-3800663c5b22.png)

### `github-products-branch-protection.js`

Auto selects some checkboxes for setting default branch protection on Products in GitHub.

### `github-pull-prefix-removal.js`

When viewing Pull Requests on GitHub, if the PR is against a Modern Tribe repo, it removes the `moderntribe/` prefix for easier scanning.

### `issue-list-tools.js`

This script provides handy tools when viewing an issue list:

* Toggle open/close row groupings of issues

Ok...fine...that's just one tool, but this has room to grow.

### `issue-summary.js`

* Color-codes central issues by status and swaps out issue types (Support, Feature, Bug) with FontAwesome "icons".
* Adds a summary of on-page issues grouped by issue status.

![screen shot 2017-08-16 at 10 08 03 am](https://user-images.githubusercontent.com/430385/29367418-db3e3328-826a-11e7-8dd1-2e9e48a338c9.png)

### `uncheck-email-all.js`

Auto-uncheck the "email all" checkbox so you only send an email when you _really_ want to.

### `uservoice.js`

Tweaks the UserVoice UI by throwing out portions of the interface that we don't care about; resizing stuff; and other small tweaks.
