// ==UserScript==
// @name         Central issue summary
// @namespace    http://central.tri.be/
// @version      0.2.4
// @description  Generate a ticket summary from visible tickets
// @author       Matthew Batchelder & Nick Pelton
// @include      /https?:\/\/central.tri.be\/projects\/[^\/]+\/issues\/?/
// @grant        none
// ==/UserScript==

( function( $ ) {
    var my = {};

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

    my.statuses = [
        {
            code: 'status-33',
            name: 'Design QA',
            color: '#fad8c7'
        },
        {
            code: 'status-2',
            name: 'Proposed',
            color: '#fffff6'
        },
        {
            code: 'status-3',
            name: 'New',
            color: '#ffffe2'
        },
        {
            code: 'status-4',
            name: 'In Progress',
            color: '#bfd4f2'
        },
        {
            code: 'status-8',
            name: 'Pending Code Review',
            color: '#bfe5bf'
        },
        {
            code: 'status-9',
            name: 'Pending Merge',
            color: '#009800',
            text: '#fff'
        },
        {
            code: 'status-7',
            name: 'Pending Manager',
            color: '#76dbdf'
        },
        {
            code: 'status-',
            name: 'Pending Customer',
            color: '#e2c688'
        },
        {
            code: 'status-26',
            name: 'On Hold',
            color: '#dbc7e3'
        },
        {
            code: 'status-13',
            name: 'Pending Final Signoff',
            color: '#ccbfa2'
        },
        {
            code: 'status-6',
            name: 'Pending QA',
            color: '#fad8c7'
        },
        {
            code: 'status-11',
            name: 'Pending Smoketest',
            color: '#e9b398',
            text: '#fff'
        },
        {
            code: 'status-28',
            name: 'Declined',
            color: '#969696',
            text: '#fff'
        },
        {
            code: 'status-12',
            name: 'Pending Release',
            color: '#7e987b'
        },
        {
            code: 'status-27',
            name: 'Complete',
            color: '#91be9c',
            text: '#fff'
        }
    ];

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
        my.$table_rows = my.$table.find( 'tr.issue' );

        $( document ).on( 'keyup keydown', function ( e ) {
            my.shift = 16 === e.keyCode && ! my.shift;
            my.ctrl = 91 === e.keyCode && ! my.ctrl;
        } );

        $( document ).on( 'click', '.tribe-status.tribe-clickable', function ( event ) {
            var $this = $( this ),
                data = $this.data( 'bubble' ),
                $rows = my.$table_rows,
                filter = '';

            my.$table_rows.hide();

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

            console.log( filter );

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
        this.$issues = $('#issue-list');
        var issue_count = this.$issues.find( 'tr.issue' ).length;

        if ( ! issue_count ) {
            return;
        }

        // Ticket Count
        var $summary = $( '<div class="tribe-summary-text">Issue count: ' + issue_count + '</div>' );
        my.$summary_container.append( $summary );


        // Ticket Summary
        for ( var i in my.statuses ) {
            var $rows = this.$issues.find( 'tr.' + my.statuses[ i ].code );

            if ( ! $rows.length ) {
                continue;
            }

            var text_color = '';

            if ( 'undefined' !== my.statuses[ i ].text ) {
                text_color = 'color:' + my.statuses[ i ].text + ';';
            }

            my.addBubble( $rows.length, my.statuses[ i ].name, my.statuses[ i ].code, my.statuses[ i ].color, text_color );
        }

        // Estimate summary
        var that = this;
        that.$rows = this.$issues.find( '.estimated_hours' );

        if ( that.$rows.length ) {

            that.estimates = 0;
            $.each(this.$rows, function(index, $object){
                val = ( parseFloat( $($object).html() ) || 0 );
                that.estimates += val;
            });

            that.hours = 0;
            that.$rows = this.$issues.find( '.spent_hours' );
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
