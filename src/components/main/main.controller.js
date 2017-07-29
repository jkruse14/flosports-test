import CreateMatchupModalController from '../matchup/createMatchupModal.controller'

( function() {
'use strict';

angular
  .module('flosports-test')
  .controller('MainController', MainController)

MainController.$inject = ['$firebaseArray','$firebaseAuth', '$scope', '$uibModal', 'matchupsFactory', 'floAuthService'];

function MainController($firebaseArray,$firebaseAuth, $scope, $uibModal, matchupsFactory, floAuthService) {
  let vm = this;

  vm.$onInit = onInit;
  vm.createNewMatchup = createNewMatchup;
  vm.showModal = showModal;

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

    vm.modal_template = '../modal/_createMatchup.html';
    vm.modal_title = 'Create New Match';
    vm.modal_actions = [];
    vm.show_modal_footer = false;
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

  function showModal(size) {
    var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'src/components/matchup/_createMatchup.html',
                controller : CreateMatchupModalController,
                controllerAs: 'vm',
                size: 'md',
                scope: $scope
            });

            modalInstance.result.then(function (result) {
                //Flash.clear();
                if(result){
                    
                }
            }, function(reason){

            })
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
})();