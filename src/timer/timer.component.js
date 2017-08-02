import template from './_timer.html';

(function() {
    'use strict';

    angular
        .module('floTimer')
        .component('timer', {
            template: template,
            controller: 'TimerController',
            controllerAs: 'vm',
            bindings: {
                countdownStart: '<', //in minutes
                timerRunning: '<',
                timerObjId: '@',
                timerComplete: '&',
                timerPaused:'&'
            }
        })


})();