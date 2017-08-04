import template from './_scoreInput.html';

(function() {
    'use strict';

    angular
        .module('flosports-test')
        .component('scoreInput', {
            template: template,
            controller: 'scoreInputController',
            controllerAs: 'vm',
            bindings: {
                sport: '<',
                score: '<',
                onScoreChange: '&',
                homeOrAway: '<',
                scoreEditable: '<'
            }
        })
})();