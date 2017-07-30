(function(){

    angular
        .module('floAuth')
        .controller('floAuthController', flowAuthController)

    flowAuthController.$inject = ['$scope','$uibModalInstance', 'floAuthService']

    function flowAuthController($scope, $uibModalInstance, floAuthService) {
        let vm = this;

        vm.error = null;
        vm.login = login;
        vm.register = register;
        vm.close = close;

        function register(user) {
            return floAuthService.register(user)
                .then(function() {
                    return vm.login(user);
                })
                .then(function() {
                    return floAuthService.sendWelcomeEmail(user.email);
                })
                .catch(function(error) {
                    vm.error = error;
                });
        }

        function login(user) {
            return floAuthService.login(user)
                .then(function() {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {});
                    $location.path('/');
                })
                .catch(function(error) {
                    vm.error = error;
                });
        }

        function close(result) {
            $uibModalInstance.close(result);
        }

        floAuthService.firebaseAuthObject.$onAuthStateChanged(function(firebaseUser) {
            if (firebaseUser) {
               close(firebaseUser);
            }
        });
    }
})();