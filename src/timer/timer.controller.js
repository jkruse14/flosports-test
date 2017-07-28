(function() {
    'use strict';

    angular
        .module('floTimer')
        .controller('TimerController', TimerController)

    TimerController.$inject = ['$interval'];

    function TimerController($interval) {
        let vm = this;
        let endInterval;

        vm.$onInit = onInit;
        vm.startTimer = startTimer;
        vm.stopTimer = stopTimer;

        function onInit() {
            vm.countdown_start ? vm.countdown_start : 1800 //30 minutes
            vm.time_remaining = vm.countdown_start;
            vm.minutes = vm.time_remaining % 60
            vm.seconds = vm.time_remaining - (vm.minutes * 60);
        }
        

        function startTimer() {
            endInterval = $interval(updateTimer, 1000, vm.countdown_start)
        }

        function updateTimer() {
            vm.time_remaining -= 1;
            

            if(vm.time_remaining === 0) {
                stopTimer();
            }
        }

        function stopTimer(){
            if(angular.isDefined(endInterval)){
                $interval.cancel(endInterval);
            }
        }
    }
});