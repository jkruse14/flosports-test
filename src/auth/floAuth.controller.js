(function(){

    angular
        .module('floAuth')
        .controller('floAuthController', flowAuthController)

    flowAuthController.$inject = ['floAuthService']

    function flowAuthController(floAuthService) {
        let vm = this;

        vm.error = null;
        vm.login = login;
        vm.register = register;
        vm.signInSuccessCallBack = signInSuccessCallBack;

        // FirebaseUI config.
        var uiConfig = {
            callbacks: {
                signInSuccess : vm.signInSuccessCallBack,
            },
            redirectUrl: '/',
            credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
            queryParameterForWidgetMode: 'mode',
            signInFlow: 'popup',
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ]
        };

        
        // The start method will wait until the DOM is loaded.
        authService.firebaseUI.start('#firebaseui-auth-container', uiConfig);

        function signInSuccessCallBack(currentUser, credential, redirectUrl){
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {});
            $location.path('/');
            
            return false;
        }

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
                    $location.path('/citytimer');
                })
                .catch(function(error) {
                    vm.error = error;
                });
        }
    }
})();