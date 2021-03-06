import template from './_matchup.html'

(function() {

    angular
        .module('flosports-test')
        .controller('MatchupController', MatchupController)
    
    MatchupController.$inject = ['matchupsFactory', '$rootScope'];

    function MatchupController(matchupsFactory, $rootScope) {
        let vm = this;
        const HOME = 'home';
        const AWAY = 'away';
        const TEAM_PROPS = {NAME: 'name', COLOR: 'color'};

        vm.$onInit = onInit;
        vm.incrementScore = incrementScore;
        vm.setScore = setScore;
        vm.updateTeam = updateTeam;
        vm.setTimerRunning = setTimerRunning;
        vm.$onChanges = onChanges;
        vm.finalizeMatch = finalizeMatch;
        vm.setMatchTime = setMatchTime;

        function onInit() {
            vm.HOME = HOME;
            vm.AWAY = AWAY;
            
            vm.teamsEditable = vm.unstarted;  
        }

        function onChanges(changes) {
            if(changes.matchup && changes.matchup.currentVaule && vm.watchSet !== true) {
                vm.watchSet = true;
                matchupsFactory.$watch(function(event){
                    if(event.event === 'child_changed' && event.id === vm.matchup.$id) {
                        vm.setTimerRunning(vm.matchup.timer_running)
                    }
                })
            }
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

        function setScore(team) {
            if(vm.matchup.timer_running) {
                let syncedElt = matchupsFactory.$getRecord(vm.matchup.$id)
                if(team === HOME) {
                    syncedElt.home_score = vm.matchup.home_score;
                } else if(team === AWAY) {
                    syncedElt.away_score = vm.matchup.away_score;
                }
                matchupsFactory.$save(syncedElt);
            }
        }

        function updateTeam(team, prop, value) {
            if(Object.keys(TEAM_PROPS).indexOf(prop.toUpperCase()) !== -1){
                if(team === HOME) {
                    vm.matchup.homeTeam[prop] = value;
                } else if(team === AWAY) {
                    vm.matchup.awayTeam[prop] = value;
                }
            }
        }

        function finalizeMatch() {
            vm.matchup.final = true;
            vm.match_time = 0;
            let syncedElt = matchupsFactory.$getRecord(vm.matchup.$id)
            syncedElt.final = true;
            matchupsFactory.$save(syncedElt);
        }
        
        function setMatchTime(time) {
            //comes through in seconds
            vm.matchup.match_time = time;
            let syncedElt = matchupsFactory.$getRecord(vm.matchup.$id)
            syncedElt.match_time = time;
            matchupsFactory.$save(syncedElt);
        }
    }

})();