export default function CreateMatchupModalController($uibModalInstance, matchupsFactory) {
    let vm = this;

    vm.matchup = {homeTeam:{},awayTeam:{}}
    vm.addMatchup = addMatchup;
    vm.close = close;

    function addMatchup() {
        //TODO:make sure both teams do not have any active matchups
        close({
            homeTeam: vm.matchup.homeTeam,
            home_score: 0,
            awayTeam: vm.matchup.awayTeam,
            away_score: 0,
            match_time: vm.match_time,
            timer_running: false
        });
    }

    function close(result) {
        $uibModalInstance.close(result);
    }
}