(function(){
    'use strict';

    angular
        .module('flosports-test')
        .controller('ScoreBoardController', ScoreBoardController)

    ScoreBoardController.$inject = ['$firebaseArray','$scope', 'floAuthService', 'scoreboardFactory'];

    function ScoreBoardController($firebaseArray, $scope, floAuthService, scoreboardFactory) {
        let vm = this;

        vm.$onInit = onInit;
        vm.$onChanges = onChanges; 

        function onInit() {
            if(floAuthService.isLoggedIn()){
                loadMatchups();
            }
        }

        function onChanges(changes){

        }

        function loadMatchups() {
            vm.matchups = scoreboardFactory;
        
            vm.matchups.$loaded().then(function(matchups){
                vm.matchupsLoaded = true;
            });
        }

        floAuthService.firebaseAuthObject.$onAuthStateChanged(function(firebaseUser) {
            if (firebaseUser) {
                vm.loggedIn = true;
                loadMatchups();
                $scope.$apply();
            }
        });
    }
})(); 