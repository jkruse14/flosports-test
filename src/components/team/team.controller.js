(function() {
    'use strict'

    angular
        .module('flosports-test')
        .controller('TeamController', TeamController);
    
    TeamController.$inject = ['$scope','teamsFactory'];

function TeamController($scope, teamsFactory) {
    let vm = this;
    
    vm.$onInit = onInit;
    vm.$onChanges = onChanges;
    vm.update = update;
    vm.selectTeam = selectTeam;

    function onInit() {
        vm.teams = []
    }

    function onChanges(changes) {
        if(vm.editable && changes.sport && 
            changes.sport.previousValue !== changes.sport.currentValue && 
            changes.sport.currentValue !== undefined && 
            changes.sport.currentValue.scoring !== undefined) {
            vm.teams = teamsFactory.getAllTeamsForSport(vm.sport.display.toLowerCase());
        }
    }

    function selectTeam($item, $model, $label, $event){
        vm.color = $item.color;
        vm.sport = $item.sport;
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