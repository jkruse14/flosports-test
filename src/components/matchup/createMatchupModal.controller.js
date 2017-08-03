(function(){
'use strict';

    angular
        .module('flosports-test')
        .controller('CreateMatchupModalController', CreateMatchupModalController);

    CreateMatchupModalController.$inject = ['$firebaseArray', '$uibModalInstance', 'teamsFactory']
    
    function CreateMatchupModalController($firebaseArray, $uibModalInstance, teamsFactory) {
        let vm = this;

        vm.matchup = {homeTeam:{},awayTeam:{}}
        vm.match_time = 30;
        vm.addMatchup = addMatchup;
        vm.close = close;
        vm.setSport = setSport;

        function onInit() {
            
        }


        function addMatchup() {
            //TODO:make sure both teams do not have any active matchups
            vm.matchup.homeTeam.sport = vm.matchup.sport.display.toLowerCase();
            vm.matchup.awayTeam.sport = vm.matchup.sport.display.toLowerCase();
            close({
                homeTeam: vm.matchup.homeTeam,
                home_score: 0,
                awayTeam: vm.matchup.awayTeam,
                away_score: 0,
                match_time: vm.match_time * 60,
                timer_running: false,
                final: false,
                sport: vm.matchup.sport
            });
        }

        function close(result) {
            $uibModalInstance.close(result);
        }

        function setSport(sport) {
            vm.matchup.sport = sport;
        }
    }

})();