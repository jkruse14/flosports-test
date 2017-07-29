export default function CreateMatchupModalController($uibModalInstance, matchupsFactory) {
    let vm = this;

    vm.addMatchup = addMatchup;
    vm.close = close;

    function addMatchup(home, away) {
        //TODO:make sure both teams do not have any active matchups
        vm.matchups.$add({
            homeTeam: vm.matchup.homeTeam,
            home_score: 0,
            awayTeam: vm.matchup.awayTeam,
            away_score: 0,
            match_time: vm.match_time,
            timer_running: false
        });

        close(true);
    }

    function close(result) {
        $uibModalInstance.close(result);
    }
}