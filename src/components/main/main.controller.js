import template from '../matchup/_createMatchup.html';


( function() {
'use strict';

angular
  .module('flosports-test')
  .controller('MainController', MainController)

MainController.$inject = ['$firebaseArray','$firebaseAuth', '$window', '$scope', '$uibModal', 'matchupsFactory', 'teamsFactory', 'floAuthService'];

function MainController($firebaseArray,$firebaseAuth, $window, $scope, $uibModal, matchupsFactory, teamsFactory, floAuthService) {
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
      floAuthService.showLoginModal(onInit);
    } else {
      loadMatchups();
      loadTeams();

      vm.tabs = [{heading:'Edit Scores'}, {heading:'Scoreboard'}];
      vm.filterOptions = [{display: 'All', value:'ALL'}, {display: 'Active', value:'ACTIVE'}, {display: 'Final', value: 'FINAL'}]
      vm.selectedFilter = vm.filterOptions[0];
      vm.tab = 0;
    }
  }

  function onChanges(changes) {
    if(changes.loggedIn && changes.loggedIn.currentValue === true) {
      loadMatchups();
      loadTeams();
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

  function loadTeams() {
    if(vm.loggedIn) {
      vm.teams = teamsFactory.getAllTeams();
    }
  }

  function createNewMatchup(match) {
    if(match.homeTeam.name && match.awayTeam.name) {

      teamsFactory.getTeam(match.homeTeam).then(function(resp){
        if(resp.val() === null){
          vm.teams.$add(match.homeTeam);
        }
      });

      teamsFactory.getTeam(match.awayTeam).then(function(resp){
        if(resp.val() === null){
          vm.teams.$add(match.awayTeam);
        }
      });

      vm.matchups.$add(match);
    }
  }

  function updateFilters(filter) {
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
                template: template,
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

}
})();