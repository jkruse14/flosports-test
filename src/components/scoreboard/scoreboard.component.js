import template from './_scoreboard.html'

(function(){
    'use strict';

    angular
        .module('flosports-test')
        .component('scoreboard', {
            template: template,
            controller: 'ScoreBoardController',
            controllerAs: 'vm',
            bindings: {
                filter: '<'
            }
        })
})();