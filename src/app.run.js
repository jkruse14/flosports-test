(function() {
    'use strict';

    angular
        .module('flosports-test')
        run(RunFunction)

    RunFunction.$inject['$location','floAuthService']

    function RunFunction($location, floAuthService) {
    floAuthService.firebaseAuthObject.$onAuthStateChanged(function(authData) {
      if (!authData) {
        floAuthService.logout();
        $location.path('/');
      }
    });
    }
})