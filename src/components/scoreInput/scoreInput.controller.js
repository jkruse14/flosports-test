(function() {
'use strict';

angular
    .module('flosports-test')
    .controller('scoreInputController', scoreInputController);

    scoreInputController.$inject = [];

    function scoreInputController() {
        let vm = this;

        vm.$onInit = onInit;
        vm.updateScore = updateScore;

        function onInit(){
            console.log(vm.scoreEditable)
            if(!vm.sport || !vm.sport.scoring) {
                vm.sport = {
                    sport: 'Uncategorized',
                    scoring: {
                        display: 'increment',
                        amount: 1
                    }
                }
                console.log(vm.sport)
            }
        }

        function updateScore(amt) {
            vm.score += amt;
            vm.onScoreChange()(vm.homeOrAway, amt);
        }
        
    }
})();