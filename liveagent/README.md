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

Intended for the Events Support team. Works on the LiveAgent platform.
The script displays our plugins' latest version numbers at the top of the screen.
It has to be manually updated after a new release. Update notes are in the file.  

You can start with having the info bar hidden on page load. For this to happen set `var startHidden = true;` on line 35 
of the script.
