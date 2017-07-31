(function(){
'use strict';

    angular
        .module('flosports-test')
        .controller('CreateMatchupModalController', CreateMatchupModalController);

    CreateMatchupModalController.$inject = ['$uibModalInstance', 'matchupsFactory']
    
    function CreateMatchupModalController($uibModalInstance, matchupsFactory) {
        let vm = this;

        vm.matchup = {homeTeam:{},awayTeam:{}}
        vm.match_time = 30;
        vm.addMatchup = addMatchup;
        vm.close = close;



        function addMatchup() {
            //TODO:make sure both teams do not have any active matchups
            close({
                homeTeam: vm.matchup.homeTeam,
                home_score: 0,
                awayTeam: vm.matchup.awayTeam,
                away_score: 0,
                match_time: vm.match_time * 60,
                timer_running: false,
                final: false
            });
        }

        function close(result) {
            $uibModalInstance.close(result);
        }
    }

})();