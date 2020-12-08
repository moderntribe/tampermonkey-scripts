# LiveAgent Scripts

## `liveagent-clickafy-urls.user.js`

Intended for the Events Support team. Works on the LiveAgent platform.
The script makes the following strings / URLs clickable and will open in a new tab / window:
* User's site URL
* Issue Tracker ID
  * Central ticket ID (works with both `123456` and `#123456` formats)
  * Jira ticket ID
* user ID
* Sandbox site URL

## `liveagent-plugin-versions.user.js`

Intended for the Products Support team. Works on the LiveAgent platform.
The script displays the version numbers of our plugins by release date at the top of the screen.
The script has to be manually updated with new version numbers after a new release. Update notes are in the file.  

You can customize the script with adjusting the following variables:  
* `log` - Boolean, to enable logging in the console for troubleshooting. Default: _false_
* `startHidden` - Boolean, whether the table should be hidden or visible on load. Default: _true_
* `startRight` - String, e.g. '350px'. Defines the starting position of the table, which is the distance from the right edge of the browser window. Default: _350px_
* `secondColumnWidth` - Integer, to set the width of the first two columns of the table. Default: _70_
* `initialRows` - Integer, to set how many rows should be shown on load and on collapsing the table. Default: _1_
* `scrollOnCollapse` - Boolean, whether the plugin versions should scroll to the most recent version (the bottom of the table) on collapse. Default: _true_
* `expandedHeight` - Integer, to set the height of the table when expanded. Default: _300_  

Note: the changes on script update will be lost.