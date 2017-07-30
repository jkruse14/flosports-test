import CreateMatchupModalController from '../matchup/createMatchupModal.controller'

( function() {
'use strict';

angular
  .module('flosports-test')
  .controller('MainController', MainController)

MainController.$inject = ['$firebaseArray','$firebaseAuth', '$window', '$scope', '$uibModal', 'matchupsFactory', 'floAuthService'];

function MainController($firebaseArray,$firebaseAuth, $window, $scope, $uibModal, matchupsFactory, floAuthService) {
  let vm = this;

  vm.$onInit = onInit;
  vm.$onChanges = onChanges;
  vm.createNewMatchup = createNewMatchup;
  vm.showCreateMatchupModal = showCreateMatchupModal;

  function onInit() {
    console.log('init')
    if(!floAuthService.isLoggedIn()) {
      showLoginModal('md');
    } else {
      console.log('logged in')
      vm.showLogin = false;
      vm.matchups = matchupsFactory;
      vm.matchups.$loaded().then(function(matchups){
        vm.matchupsLoaded = true;
      })

      vm.creatingNewMatchup = false;
      vm.tabs = [{heading:'Edit Scores'}, {heading:'Scoreboard'}]
      resetUnstartedMatch();
    }
  }

  function onChanges(changes) {
    console.log(changes)
    if(floAuthService.isLoggedIn() && changes.showLogin && changes.showLogin.previousValue === true) {
      console.log('loading matchups')
      vm.showLogin = false;
      vm.matchups = matchupsFactory;
      vm.matchups.$loaded().then(function(matchups){
        vm.matchupsLoaded = true;
      })
    }
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

  function showCreateMatchupModal(size) {
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

function showLoginModal(size) {
  var modalInstance = $uibModal.open({
    animation: true,
    ariaLabelledBy: 'modal-title',
    ariaDescribedBy: 'modal-body',
    template: '<div id="firebaseui-auth-container"></div>',
    controller: 'floAuthController',
    controllerAs: 'vm',
    size: 'md',
    scope: $scope,
    opened: floAuthService.showLogin(floAuthService.firebaseUIConfig)
  });

  modalInstance.result.then(function (result) {
      //Flash.clear();
      if (result) {
        //there seems to be a race condition with logging in and close
        //if I called onInit here, I still could not make a call to matchupsFactory
        //it would say the client does not have permission. reloading the location 
        //fixed the issue. It's ugly, but it works.
        //I tried to use the firebaseAuth onAuthStateChange event, but still had the issue
        $window.location.reload();
      } else {
        showLoginModal();
      }
    }, function (reason) {})
  }

}
})();