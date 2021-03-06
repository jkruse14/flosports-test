(function() {
    'use strict';

    angular
        .module('floTimer')
        .controller('TimerController', TimerController)

TimerController.$inject = ['$interval', '$scope', '$rootScope'];

function TimerController($interval, $scope, $rootScope) {
    let vm = this;
    let endInterval;

    vm.$onInit = onInit;
    vm.startTimer = startTimer;
    vm.stopTimer = stopTimer;

    function onInit() {
        //default to 30 minutes
        vm.countdownStart = vm.countdownStart === undefined
            ? 1800
            : vm.countdownStart
        vm.time_remaining = vm.countdownStart;
        vm.minutes = Math.floor(vm.time_remaining / 60)
        vm.seconds = vm.time_remaining - (vm.minutes * 60);
        vm.minutes = vm.minutes < 10
            ? '0' + vm.minutes
            : vm.minutes
        vm.seconds = vm.seconds < 10
            ? '0' + vm.seconds
            : vm.seconds
    }

    function startTimer(start_time) {
        endInterval = $interval(updateTimer, 1000, start_time)
    }

    function updateTimer() {
        vm.time_remaining -= 1;
        vm.minutes = Math.floor(vm.time_remaining / 60)
        vm.seconds = vm.time_remaining - (vm.minutes * 60);
        vm.minutes = vm.minutes < 10
            ? '0' + vm.minutes
            : vm.minutes
        vm.seconds = vm.seconds < 10
            ? '0' + vm.seconds
            : vm.seconds

        if (vm.time_remaining === 0) {
            stopTimer();
            vm.timerComplete()();
            //$rootScope.$broadcast('FLOTIMER_END',vm.timerObjId)
        }
    }

    function stopTimer() {
        if (angular.isDefined(endInterval)) {
            $interval.cancel(endInterval);
        }
    }

    function setRunning(running) {
        vm.running = running;
        if (running === true) {
            startTimer(vm.countdown_start)
        } else if (running === false) {
            if (vm.time_remaining !== 0) {
                vm.countdown_start = vm.time_remaining
                vm.timerPaused()(vm.time_remaining);
            }
            stopTimer();
        }
    }

    $scope
        .$watch('vm.timerRunning', function () {
            setRunning(vm.timerRunning)
        })


}
})();