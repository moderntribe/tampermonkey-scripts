// ==UserScript==
// @name         Central issue summary
// @namespace    http://central.tri.be/
// @version      0.1
// @description  Twiddle the styles in the Central tickets
// @author       Matthew Batchelder
// @include      /https?:\/\/central.tri.be\/projects\/[^\/]+\/issues\/?/
// @grant        none
// ==/UserScript==

( function( $ ) {
    var my = {};

    my.init = function() {
        this.$issues = $('#issue-list');
        
        var statuses = [
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
                code: 'status-7',
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
                code: 'status-6',
                name: 'Pending Manager',
                color: '#76dbdf'
            },
            {
                code: 'status-12',
                name: 'Pending Customer',
                color: '#e2c688'
            },
            {
                code: 'status-25',
                name: 'On Hold',
                color: '#dbc7e3'
            },
            {
                code: 'status-13',
                name: 'Pending Final Signoff',
                color: '#ccbfa2'
            },
            {
                code: 'status-5',
                name: 'Pending QA',
                color: '#fad8c7'
            },
            {
                code: 'status-10',
                name: 'Pending Smoketest',
                color: '#e9b398'
            },
            {
                code: 'status-26',
                name: 'Complete',
                color: '#91be9c',
                text: '#fff'
            },
            {
                code: 'status-11',
                name: 'Pending Release',
                color: '#7e987b',
                text: '#fff'
            },
            {
                code: 'status-27',
                name: 'Declined',
                color: '#969696',
                text: '#fff'
            }
        ];
        
        var issue_count = this.$issues.find( 'tr.issue' ).length;
        
        var $summary_container = $( '<div class="tribe-status-summary"/>' );
        var $summary = $( '<div class="tribe-summary-text">Issue count: ' + issue_count + '</div>' );
        $summary_container.append( $summary );
        
        for ( var i in statuses ) {
            var $rows = this.$issues.find( '.' + statuses[ i ].code );
            
            if ( ! $rows.length ) {
                continue;
            }
            
            var text_color = '';
            
            if ( 'undefined' !== statuses[ i ].text ) {
                text_color = 'color:' + statuses[ i ].text + ';';
            }
            
            var html = '<div class="tribe-status ' + statuses[ i ].code + '" style="border:1px solid #eee;border-radius:5px;box-shadow:0 0 3px 0px rgba( 0, 0, 0, 0.1 );display:inline-block;margin:.25rem;text-align:center;">';
            html += '<div class="tribe-status-count" style="font-size: 1.5rem;padding: .5rem;">' + $rows.length + '</div>';
            html += '<div class="tribe-status-label" style="font-size:.7rem;padding:0 .5rem .5rem"><span style="background:' + statuses[ i ].color + ';border-radius:5px;padding: 5px;' + text_color + '">' + statuses[ i ].name + '</span></div>';
            html += '</div>';
            
            $summary_container.append( html );
        }
        
        if ( issue_count ) {
            $( '#content .title-bar' ).append( $summary_container );
        }
        
        $( '.tribe-status-summary .tribe-status:first' ).css( { 'margin-left': '0' } );
    };

    $( function() {
        my.init();
    } );
} )( jQuery );
