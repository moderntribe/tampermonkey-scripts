// ==UserScript==
// @name         Clocking Nag
// @namespace    https://central.tri.be/
// @version      0.1
// @description  Nag about clocking right in Central
// @author       Matthew Batchelder
// @include      /https?:\/\/central(dev)?.tri.be/
// @grant        none
// ==/UserScript==

/**
 * SET YOUR CENTRAL USER ID HERE
 */
var central_clocking_nag_user_id = 652;

/**
 * SET YOUR GOAL HOURS FOR THE DAY
 */
var central_clocking_nag_goal_hours = 7;

/**
 * SET YOUR WORK DAYS
 *
 * 0 = Monday
 * 1 = Tuesday
 * 2 = Wednesday
 * 3 = Thursday
 * 4 = Friday
 * 5 = Saturday
 * 6 = Sunday
 */
var central_clocking_nag_work_days = [ 0, 1, 2, 3, 4 ];

( function( $, user_id, goal_hours, work_days ) {
    'use strict';

    Number.prototype.padLeft = function( base, chr ) {
        var  len = ( String( base || 10 ).length - String( this ).length ) + 1;
        return len > 0 ? new Array(len).join( chr || '0' ) + this : this;
    };

    var obj = {
        userId: user_id,
        goalHours: goal_hours,
        workDays: work_days,
        numDays: 7,
        failLevel: 0
    };

    obj.init = function() {
        obj.buildStyles();

        var d     = new Date();
        d.setDate( d.getDate() - obj.numDays + 1 );

        var from = obj.formatDate( d );

        d = new Date();

        var to   = obj.formatDate( new Date() );
        var clocking = {
            day: [],
            total: 0
        };

        for ( var dateCounter = obj.numDays - 1; dateCounter >= 0; dateCounter-- ) {
            var tempDate = new Date();
            tempDate.setDate( tempDate.getDate() - dateCounter );
            clocking.day[ obj.formatDate( tempDate ) ] = 0;
        }

        var url   = 'https://central.tri.be/time_entries.json?period_type=2&from=' + from + '&to=' + to + '&columns=day&user_id=' + obj.userId;

        var jqxhr = $.ajax( {
            dataType: 'json',
            type: 'GET',
            url: url,
            headers: {
                Accept: 'text/javascript, text/html, application/xml, text/xml, */*'
            }
        } );

        jqxhr.done( function( data ) {
            for ( var i in data.time_entries ) {
                if ( ! data.time_entries.hasOwnProperty( i ) ) {
                    continue;
                }

                var item  = data.time_entries[ i ];
                var hours = parseFloat( item.hours );

                // if we aren't tracking this day, skip it
                if ( 'undefined' === typeof clocking.day[ item.spent_on ] ) {
                    continue;
                }

                clocking.day[ item.spent_on ] += hours;
                clocking.total                += hours;
            }

            obj.clockingTracker( clocking );
        } );
    };

    obj.clockingTracker = function( clocking ) {
        var $header = $( document.getElementById( 'top-menu' ) );
        $header.after( '<div id="clocking-tracker"><div class="tracker-days"/></div>' );

        var $tracker   = $( document.getElementById( 'clocking-tracker' ) );
        var $days      = $tracker.find( '.tracker-days' );
        var dayCounter = 0;

        for ( var i in clocking.day ) {
            if ( ! clocking.day.hasOwnProperty( i ) ) {
                continue;
            }
            dayCounter++;

            var classes = '';
            var day     = i.split( '-' );
            day         = day[1] + '/' + day[2];

            var date         = new Date( i );
            var isWorkDay    = true;
            var hoursClocked = parseFloat( clocking.day[ i ] ).toFixed( 2 );
            var title        = '';

            if ( -1 === $.inArray( date.getDay(), obj.workDays ) ) {
                // not a work day!
                isWorkDay = false;
                classes  += ' non-work-day';
                title     = "Non-work day!";
            } else if ( isWorkDay && dayCounter === obj.numDays ) {
                classes += ' current-day';
            } else if ( isWorkDay && obj.goalHours > 0 && obj.goalHours - ( obj.goalHours * 0.4 ) > hoursClocked ) {
                // underclocked by 40%!
                classes  += ' severely-under-clocked';
                title     = "You under clocked this day by a LOT.";
                obj.failLevel += 5;
            } else if ( isWorkDay && obj.goalHours > 0 && obj.goalHours - ( obj.goalHours * 0.2 ) > hoursClocked ) {
                // underclocked by 20%
                classes  += ' under-clocked';
                title     = "You under clocked this day.";
                obj.failLevel += 1;
            }

            if ( dayCounter < ( obj.numDays - 3 ) ) {
                classes += ' unclockable';
                title   += ' This day is too old to clock to.';
            }

            $days.prepend( '<div class="tracker-day' + classes + '" title="' + $.trim( title ) + '"><div class="tracker-hours">' + hoursClocked + '</div><div class="tracker-date">' + day + '</div></div>' );
        }

        var message = '';
        var messageSeverity = '';

        if ( obj.failLevel > obj.numDays * 1.5 ) {
            message = 'Whoa. You are <i>really</i> far behind and need to clock some hours. Take a break and clock some <b>now</b>.';
            messageSeverity = 'severity-high';
        } else if ( obj.failLevel > obj.numDays ) {
            message = 'You need to clock some hours. Take a break and clock some now.';
            messageSeverity = 'severity-medium';
        } else if ( obj.failLevel > obj.numDays / 2 ) {
            message = 'It looks like you are running a bit behind on clocking. Play catch-up now?';
            messageSeverity = 'severity-low';
        }

        if ( '' !== message ) {
            $tracker.append( '<div class="tracker-message ' + messageSeverity +'">' + message + '</div>' );
        }

    };

    obj.formatDate = function( d ) {
        return [
            d.getFullYear(),
            ( d.getMonth() + 1 ).padLeft(),
            d.getDate().padLeft()
        ].join('-');
    };

    obj.buildStyles = function() {
        $( 'head' ).append( '<style id="tribe-clocking-tracker-styles"/>' );
        obj.$styles = $( document.getElementById( 'tribe-clocking-tracker-styles' ) );
        obj.$styles.html( `
#clocking-tracker {
  background: #fcfcfc;
  border-bottom: #eee;
  padding: 0.5rem 1rem;
  width: auto;
}

#clocking-tracker .tracker-message {
  margin-top: 0.5rem;
  text-align: center;
}


#clocking-tracker .tracker-message.severity-medium {
  font-size: 1.2rem;
}

#clocking-tracker .tracker-message.severity-high {
  font-size: 1.4rem;
}

#clocking-tracker .tracker-message.severity-high b,
#clocking-tracker .tracker-message.severity-high i {
  color: #c30c0c;
}

#clocking-tracker .tracker-days {
  display: flex;
  flex-direction: row;
  width: 100%;
}

#clocking-tracker .tracker-day {
  background-color: #eee;
  border-radius: 3px;
  margin-right: 1rem;
  max-width: 100%;
  padding: 1rem 1rem 0.5rem;
  text-align: center;
  width: 14%;
}

#clocking-tracker .non-work-day {
  opacity: 0.3;
}

#clocking-tracker .unclockable {
  background-image: url( https://i.imgur.com/9Fv736o.png );
}

#clocking-tracker .tracker-day:last-child {
  margin-right: 0;
}

#clocking-tracker .tracker-hours {
  font-size: 1.1rem;
  margin-bottom: .5rem;
}

#clocking-tracker .tracker-date {
  color: #999;
  font-size: 0.7rem;
}

#clocking-tracker .under-clocked {
  background-color: #f4af49;
}

#clocking-tracker .under-clocked .tracker-hours {
  color: #fff;
}

#clocking-tracker .under-clocked .tracker-date {
  color: #f6e6cf;
}

#clocking-tracker .severely-under-clocked {
  background-color: #c30c0c;
}

#clocking-tracker .severely-under-clocked .tracker-hours {
  color: #fff;
}

#clocking-tracker .severely-under-clocked .tracker-date {
  color: #cb9e9e;
}

@media screen and (max-width: 950px) {
  #clocking-tracker {
    padding: .25rem .5rem;
    position: relative;
    top: 90px;
  }

  #clocking-tracker .tracker-day {
    margin-right: 0.25rem;
    padding: 0.5rem 0.5rem 0.25rem;
  }

  #clocking-tracker .tracker-days {
    margin-right: 0.5rem;
    padding: 0.5rem 0.5rem 0.25rem;
  }

  #clocking-tracker .tracker-hours {
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }

  #clocking-tracker .tracker-date {
    font-size: 0.6rem;
  }

  #clocking-tracker .tracker-day:nth-child(6),
  #clocking-tracker .tracker-day:nth-child(7) {
    display: none;
  }
}
        ` );
    };

    $( function() {
        obj.init();
    } );
} )( jQuery, central_clocking_nag_user_id, central_clocking_nag_goal_hours, central_clocking_nag_work_days );
