(function() {
    'use strict'

    angular
        .module('flosports-test')
        .controller('TeamController', TeamController);
    
    TeamController.$inject = ['$scope','teamFactory'];

function TeamController($scope, teamFactory) {
    let vm = this;
    
    vm.$onInit = onInit;
    vm.update = update;

    function onInit() {
    }

    function update(prop, value){
        if(value) {
            vm.updateTeam()(vm.homeOrAway, prop, value)
        }
    }

    $scope.$watch('vm.name', function(){
        if($scope.vm && $scope.vm.name && vm.editable) {
            vm.update('name', $scope.vm.name)
        }
        })
    $scope.$watch('vm.color', function() {
        if($scope.vm && $scope.vm.color && vm.editable) {
            vm.update('color', $scope.vm.color)
        }
    })

    }
})();