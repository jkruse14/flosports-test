import template from './_matchup.html'

(function() {

    angular
        .module('flosports-test')
        .component('matchup',{
            template: template,
            controller: 'MatchupController',
            controllerAs: 'vm',
            bindings: {
                matchup: '<',
                unstarted: '<',
                final:     '<',
                editable:  '<',
                inModal: '<',
                filter: '<',
                match_time: '<'
            }
        });

})()
