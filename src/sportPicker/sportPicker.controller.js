import template from './_sportPicker.html'
(function() {
    'use strict';

    angular
        .module('floSportPicker')
        .controller('sportPickerController', sportPickerController);

    sportPickerController.$inject = ['$scope','sportsFactory'];

    function sportPickerController($scope, sportsFactory) {
        let vm = this;
        vm.sports = sportsFactory.sports;
        vm.sendSportData = sendSportData;
        
        vm.$onInit = onInit;
        
        function onInit() {
            vm.selected_sport = '<select a sport>';
            vm.sendSportData = sendSportData;
        }

        function sendSportData(sport) {
            vm.selected_sport = sport.display;
            vm.selectSport()(sport);
        }
    }
})();