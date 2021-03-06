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
  vm.updateFilters = updateFilters;
  vm.setTab = setTab;

  function onInit() {
    vm.loggedIn = floAuthService.isLoggedIn()
    if(!vm.loggedIn) {
      showLoginModal();
    } else {
      loadMatchups();

      vm.tabs = [{heading:'Edit Scores'}, {heading:'Scoreboard'}];
      vm.filterOptions = [{display: 'All', value:'ALL'}, {display: 'Active', value:'ACTIVE'}, {display: 'Final', value: 'FINAL'}]
      vm.selectedFilter = vm.filterOptions[0];
      vm.tab = 0;
    }
  }

  function onChanges(changes) {
    console.log(changes)
    if(changes.loggedIn && changes.loggedIn.currentValue === true) {
      vm.matchups = matchupsFactory;
      vm.matchups.$loaded().then(function(matchups){
        vm.matchupsLoaded = true;
      })
    }
  }

  function loadMatchups() {
    if(vm.loggedIn){
      vm.matchups = matchupsFactory;
      vm.matchupsLoaded = true;
      vm.matchups.$loaded().then(function(matchups){
        vm.matchupsLoaded = true;
      })
    }
  }

  function createNewMatchup(match) {
    if(match.homeTeam.name && match.awayTeam.name) {
      vm.matchups.$add(match);
    }
  }

  function updateFilters(filter) {
    console.log(filter)
    vm.selectedFilter = filter;
  }

  function setTab(tab) {
    switch(tab) {
      case 0:
        vm.tab = 0;
        break;
      case 1: 
        vm.tab = 1;
        break;
      default:
        vm.tab = 0;
        break;
    }
  }

  function showCreateMatchupModal(size) {
    var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'src/components/matchup/_createMatchup.html',
                controller : 'CreateMatchupModalController as vm',
                //controllerAs: 'vm',
                size: 'lg',
                scope: $scope
            });

      modalInstance.result.then(function (result) {
          //Flash.clear();
          if(result){
              createNewMatchup(result)
          }
      }, function(reason){

      });
  }

  /*
   * for whatever reason, when I use templateUrl here, it does not put 
   * the firebaseui auth container in the modal, so sticking with this
   * messy workaround
   * Also, firebaseui currently does not have a direct sign-up, you have 
   * to go through sign in -> add account. future feature is pending:
   * https://github.com/firebase/firebaseui-web/issues/35
   */
function showLoginModal() {
  var modalInstance = $uibModal.open({
    animation: true,
    ariaLabelledBy: 'modal-title',
    ariaDescribedBy: 'modal-body',
    template : `<div class='modal-content'>
                  <div class='modal-header'> 
                    <h4>Login to FloSports Scoreboard</h4> 
                  </div>
                  <div class='modal-body'>
                    <div id="firebaseui-auth-container"></div> 
                  </div> 
                </div>`,
    controller: 'floAuthController',
    controllerAs: 'vm',
    size: 'sm',
    scope: $scope,
    opened: floAuthService.showLogin(floAuthService.firebaseUIConfig)
  });

  modalInstance.result.then(function (result) {
      //Flash.clear();
      if (result) {
        onInit();
      } else {
        showLoginModal();
      }
    }, function (reason) {})
  }

}
})();