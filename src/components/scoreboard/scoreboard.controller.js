(function(){
    'use strict';

    angular
        .module('flosports-test')
        .controller('ScoreBoardController', ScoreBoardController)

    ScoreBoardController.$inject = ['$firebaseArray', 'scoreboardFactory'];

    function ScoreBoardController($firebaseArray, scoreboardFactory) {
        let vm = this;

        vm.matchups = scoreboardFactory;
    
        vm.matchups.$loaded().then(function(matchups){
            vm.matchupsLoaded = true;
        });
    }
})(); 