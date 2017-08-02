import template from './_sportPicker.html'
(function() {
    'use strict';

    angular
        .module('floSportPicker')
        .controller('sportPickerController', sportPickerController);

    sportPickerController.$inject = ['sportsFactory'];

    function sportPickerController(sportsFactory) {
        let vm = this;
        vm.sports = sportsFactory.sports;
        vm.sendSportData = sendSportData;
        
        vm.$onInit = onInit;
        
        function onInit() {
            
        }

        function sendSportData(sport) {
            vm.getSport()(sport);
        }
    }
})();