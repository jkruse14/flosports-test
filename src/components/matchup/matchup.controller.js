import template from './_matchup.html'

(function() {

    angular
        .module('flosports-test')
        .controller('MatchupController', MatchupController)
    
    MatchupController.$inject = ['matchupsFactory'];

    function MatchupController(matchupsFactory) {
        let vm = this;
        const HOME = 'home';
        const AWAY = 'away';

        vm.$onInit = onInit;
        vm.incrementScore = incrementScore;
        vm.updateTeam = updateTeam;
        vm.toggleTimerRunning = toggleTimerRunning
        vm.setTimerRunning = setTimerRunning;
        vm.$onChanges = onChanges;

        function onInit() {
            vm.HOME = HOME;
            vm.AWAY = AWAY;
            
            vm.teamsEditable = vm.unstarted;  
            vm.matchups = matchupsFactory;  
        }

        function onChanges(changes) {
            if(angular.isDefined(changes.matchup.currentVaule) && vm.watchSet !== true) {
                vm.watchSet = true;
                matchupsFactory.$watch(function(event){
                    if(event.event === 'child_changed' && event.id === vm.matchup.$id) {
                        vm.setTimerRunning(vm.matchup.timer_running)
                    }
                })
            }
        }

        function toggleTimerRunning() {
            vm.matchup.timer_running = !vm.matchup.timer_running;
            let syncedElt = matchupsFactory.$getRecord(vm.matchup.$id)
            syncedElt.timer_running = vm.matchup.timer_running;
            matchupsFactory.$save(syncedElt);
        }

        function setTimerRunning(running) {
            vm.matchup.timer_running = running;
            let syncedElt = matchupsFactory.$getRecord(vm.matchup.$id)
            syncedElt.timer_running = vm.matchup.timer_running;
            matchupsFactory.$save(syncedElt);
        }

        function incrementScore(team, inc) {
            if(vm.matchup.timer_running) {
                let syncedElt = matchupsFactory.$getRecord(vm.matchup.$id)
                if(team === HOME) {
                    syncedElt.home_score += inc;
                } else if(team === AWAY) {
                    syncedElt.away_score += inc;
                }
                matchupsFactory.$save(syncedElt);
            }
        }

        function updateTeam(team, prop, value) {
            if(team === HOME) {
                vm.matchup.homeTeam[prop] = value;
            } else if(team === AWAY) {
                vm.matchup.awayTeam[prop] = value;
            }
        }
    }

})();