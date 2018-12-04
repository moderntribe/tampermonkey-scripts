// ==UserScript==
// @name         Central issue summary
// @namespace    http://central.tri.be/
// @version      0.2.6
// @description  Generate a ticket summary from visible tickets
// @author       Matthew Batchelder, Nick Pelton & Gustavo Bordoni
// @include      /https?:\/\/central(dev)?.tri.be\/(projects\/)*[^\/]*\/?issues\/?/
// @grant        none
// ==/UserScript==

( function( $ ) {
    var my = {};

    my.statuses_colors = {
        'Design QA': {
            color: '#fad8c7'
        },
        'Proposed': {
            color: '#fffff6'
        },
        'New': {
            color: '#ffffe2'
        },
        'In Progress': {
            color: '#bfd4f2'
        },
        'Pending Code Review': {
            color: '#bfe5bf'
        },
        'Pending Merge': {
            color: '#009800',
            text: '#fff'
        },
        'Pending Manager': {
            color: '#76dbdf'
        },
        'Pending Customer': {
            color: '#e2c688'
        },
        'On Hold': {
            color: '#dbc7e3'
        },
        'Pending Final Signoff': {
            color: '#ccbfa2'
        },
        'Pending QA': {
            color: '#fad8c7'
        },
        'Pending Smoketest': {
            color: '#e9b398'
        },
        'Declined': {
            color: '#969696',
            text: '#fff'
        },
        'Pending Release': {
            color: '#7e987b'
        },
        'Complete': {
            color: '#91be9c'
        },
        'Pending Estimate': {
            color: '#ffc2a0'
        },
        'Pending Scope': {
            color: '#dafcf4'
        },
        'Skills Interview': {
            color: '#74e68b'
        },
        'Skills Screening': {
            color: '#dafcf4'
        },
        'Pending Notice of Decline': {
            color: '#f88888'
        },
        'Recruiter Interview': {
            color: '#d1e3ff'
        },
        'The Bench': {
            color: '#e0d1af'
        },
        'Needs More Info': {
            color: '#ff94c7'
        },
        'Future Review': {
            color: '#8e85ff'
        },
        'Trial in Progress': {
            color: '#91badf'
        },
        'Onboarding': {
            color: '#6ec772'
        },
        'Pending Gig': {
            color: '#65f5c7'
        }
    };

    // Bubble template
    my.TLP = `
<div class="tribe-status {class_name}">
    <div class="tribe-status-count" style="font-size: 1.5rem;padding: .5rem;">{count}</div>
    <div class="tribe-status-label" style="font-size:.7rem;padding:0 .5rem .5rem"><span style="background:{bg_color};border-radius:5px;padding: 5px;color:{txt_color};">{label}</span></div>
</div>
`;

    my.shift = false;
    my.ctrl = false;

    // Render bubble and insert into DOM
    my.addBubble = function( count, label, class_name, bg_color, txt_color ){

        var options = {
            count: count || 0,
            label: label || "empty",
            class_name: class_name || "",
            bg_color: bg_color || "",
            txt_color: txt_color || ""
        };

        var template = my.TLP,
            $template;

        template = template.replace( /{count}/g, options.count );
        template = template.replace( /{label}/g, options.label );
        template = template.replace( /{class_name}/g, options.class_name + ( options.class_name ? ' tribe-clickable' : '' ) );
        template = template.replace( /{bg_color}/g, options.bg_color );
        template = template.replace( /{txt_color}/g, options.txt_color );

        $template = $( template );
        $template.attr( 'data-bubble', JSON.stringify( options ) );

        my.$summary_container.append( $template );
    };


    my.statuses = {};

    my.build_styles = function() {
        $( 'head' ).append( '<style id="tribe-ticket-status-styles"/>' );
        my.$styles = $( document.getElementById( 'tribe-ticket-status-styles' ) );

        my.$styles.html( `
.tribe-status {
    border:1px solid #eee;
    border-radius:5px;
    box-shadow:0 0 3px 0px rgba( 0, 0, 0, 0.1 );
    display:inline-block;
    margin:.25rem;
    text-align:center;
}

.tribe-status.tribe-clickable {
    cursor: pointer;
}

.tribe-status.tribe-active {
    border: 1px #3e3e3e solid;
}
        ` );
    };

    my.init = function() {
        my.build_styles();

        my.$table = $( 'table.list.issues' );
        my.$issues = my.$table.find( 'tr.issue' );
        my.$non_parent_issues = my.$issues.filter( ':not(.parent)' );

        // Create a list of Status Names by Code
        my.$table.find( 'td.status' ).each( function(){
            var
                $this = $( this ),
                $row = $this.parents( 'tr' ).eq( 0 ),
                code = $row.attr( 'class' ).match( /status\-[0-9]+/g )[0],
                name = $this.text();

            my.statuses[ code ] = name;
        } );

        $( document ).on( 'keyup keydown', function ( e ) {
            my.shift = 16 === e.keyCode && ! my.shift;
            my.ctrl = 91 === e.keyCode && ! my.ctrl;
        } );

        $( document ).on( 'click', '.tribe-status.tribe-clickable', function ( event ) {
            var $this = $( this ),
                data = $this.data( 'bubble' ),
                $rows = my.$issues,
                filter = '';

            my.$issues.hide();

            if ( my.ctrl ) {
                $this.toggleClass( 'tribe-active' );

                $( '.tribe-status.tribe-active' ).each( function ( k, status ) {
                    if ( filter ) {
                        filter = filter + ', ';
                    }
                    filter = filter + '.' + $( status ).data( 'bubble' ).class_name;
                } );
            } else {
                $( '.tribe-status' ).not( $this ).removeClass( 'tribe-active' );
                $this.toggleClass( 'tribe-active' );

                if ( $this.hasClass( 'tribe-active' ) ) {
                    filter = '.' + data.class_name;
                }
            }

            if ( filter ) {
                $rows.filter( filter ).show();
            } else {
                $rows.show();
            }
        } );

        // Clear any existing summary
        $('.tribe-status-summary').remove();

        my.$summary_container = $( '<div class="tribe-status-summary"/>' );
        my.$titleBar = $( '#content .title-bar' );
        var issue_count = my.$table.find( 'tr.issue' ).length;

        if ( ! issue_count ) {
            return;
        }

        // Ticket Count
        var $summary = $( '<div class="tribe-summary-text">Issue count: ' + issue_count + '</div>' );
        my.$summary_container.append( $summary );

        // Ticket Summary
        $.each( my.statuses, function( code, name ) {
            var $rows = my.$table.find( 'tr.' + code );

            if ( ! $rows.length || 'undefined' === typeof my.statuses_colors[ name ] ) {
                return;
            }

            var text_color = '';

            if ( 'undefined' !== typeof my.statuses_colors[ name ].text ) {
                text_color = 'color:' + my.statuses_colors[ name ].text + ';';
            }

            my.addBubble( $rows.length, name, code, my.statuses_colors[ name ].color, text_color );
        } );

        // Estimate summary
        var that = this;
        that.$rows = this.$non_parent_issues.find( '.estimated_hours' );

        if ( that.$rows.length ) {

            that.estimates = 0;
            $.each( this.$rows, function(index, $object){
                val = ( parseFloat( $($object).html() ) || 0 );
                that.estimates += val;
            });

            that.hours = 0;
            that.$rows = this.$non_parent_issues.find( '.spent_hours' );
            $.each(this.$rows, function(index, $object){
                val = ( parseFloat( $($object).html() ) || 0 );
                that.hours += val;
            });

            that.diff = that.estimates - that.hours;
            that.diff_text = "Under";
            if(that.diff < 0){
                that.diff_text = "Over";
            }

            my.addBubble( Math.round( that.estimates * 100 ) / 100, "Hrs Est." );
            my.addBubble( Math.round( that.hours * 100 ) / 100, "Hrs Spent" );
            my.addBubble( Math.round( that.diff * 100 ) / 100, "Hrs " + that.diff_text );

        }

        // Add to DOM
        my.$summary_container.find('.tribe-status:first' ).css( { 'margin-left': '0' } );
        my.$titleBar.append( my.$summary_container );

        my.color_code();
    };

    my.color_code = function() {
        my.$issues.each( function() {
            var $issue = $( this );
            var $status = $issue.find( '.status' );
            var $tracker = $issue.find( '.tracker' );
            var name = $status.text();
            var color = 'transparent';
            var text = '#000';

            if ( 'undefined' === typeof my.statuses_colors[ name ] ) {
                // Marks undefined Status so we can add colors later on
                console.log( 'Undefined Status in this Query:', name );
                return;
            }

            if ( 'undefined' !== typeof my.statuses_colors[ name ].text ) {
                text = my.statuses_colors[ name ].text;
            }

            if ( 'undefined' !== typeof my.statuses_colors[ name ].color ) {
                color = my.statuses_colors[ name ].color;
            }

            $status.css( {
                'background-color': color,
                'text-align': 'center',
                'color': text
            } );

            var icon = null;

            switch ( $.trim( $tracker.text() ) ) {
                case 'Bug':
                    icon = 'bug';
                    break;
                case 'Enhancement':
                    icon = 'wrench';
                    break;
                case 'Feature':
                    icon = 'star-o';
                    break;
                case 'Support':
                    icon = 'life-ring';
                    break;
                case 'Resource':
                    icon = 'user';
                    break;
                case 'Task':
                    icon = 'sticky-note-o';
                    break;
            }

            if ( ! $tracker.find( 'i.fa' ).length ) {
                $tracker
                    .css( {
                        'text-align': 'center'
                    } )
                    .html( '<i class="fa fa-' + icon + '"></i>' );
            }
        } );
    };

    $( function() {

        // If page is update by Ajax, re-run our script
        var target = document.querySelector('#content');

        // create an observer instance
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                my.init();
            });
        });

        // configuration of the observer:
        var config = { attributes: true, childList: true, characterData: true };

        // pass in the target node, as well as the observer options
        observer.observe( target, config );

        my.init();
    } );
} )( jQuery );
