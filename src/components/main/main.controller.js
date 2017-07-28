'use strict';

angular
  .module('flosports-test')
  .controller('MainController', MainController)

MainController.$inject = ['$firebaseArray','$firebaseAuth', '$scope', 'matchupsFactory', 'floAuthService'];

function MainController($firebaseArray,$firebaseAuth, $scope, matchupsFactory, floAuthService) {
    let vm = this;

    vm.$onInit = onInit;
    vm.createNewMatchup = createNewMatchup

    let matchupsRef = firebase.database().ref().child("matchups");
    vm.matchups = $firebaseArray(matchupsRef)
    
    vm.matchups.$loaded().then(function(matchups){
      vm.matchups = matchups
      vm.matchupsLoaded = true;
    })

    function onInit() {
      vm.creatingNewMatchup = false;
      vm.tabs = [{heading:'Edit Scores'}, {heading:'Scoreboard'}]
      resetUnstartedMatch();
    }

    function createNewMatchup() {
      if(vm.creatingNewMatchup === false) {
        vm.creatingNewMatchup = true;
      } else {
        if(vm.unstartedMatch.homeTeam.name && vm.unstartedMatch.awayTeam.name) {
          vm.matchupsFactory.$add(unstartedMatch);
          vm.creatingNewMatchup = false;
          resetUnstartedMatch();
        }
      }
    }

    function resetUnstartedMatch() {
      vm.unstartedMatch = { homeTeam:{
                                  name:'',
                                  color:''
                           },
                           home_score: 0, 
                           awayTeam:{
                                name : '',
                                color : ''
                          },
                          away_score : 0
                        }
    }

  floAuthService.firebaseAuthObject.$onAuthStateChanged(function (authData) {
    if (!authData) {
      authService.logout();
      vm.showLogin = true;
    } else {
      vm.showLogin = false;
    }
  });

}
