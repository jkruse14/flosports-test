import template from './_team.html';
(function() {

    'use strict';

    angular
        .module('flosports-test')
        .component('team', {
            template: template,
            controller: 'TeamController',
            controllerAs: 'vm',
            bindings: {
                name: '<',
                score: '<',
                color: '<',
                sport: '<',
                updateTeam: '&',
                homeOrAway: '<',
                editable: '<'
            }
        });
})();