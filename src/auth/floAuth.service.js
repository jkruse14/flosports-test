(function(){
    'use strict';

    angular
        .module('floAuth')
        .factory('floAuthService', floAuthService);

    floAuthService.$inject = ['$firebaseAuth', '$location']

    function floAuthService($firebaseAuth, $location) {
        //have firebaseUi and firebaseAuth point to the same object
        let authObject = firebase.auth();
        let firebaseAuthObject = $firebaseAuth(authObject);
        let ui = new firebaseui.auth.AuthUI(authObject);

        // FirebaseUI config.
        let uiConfig = {
            callbacks:{
                signInSuccess: signInSuccessCallBack
            },
            credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
            signInFlow: 'popup',
            signInOptions: [
              // Leave the lines as is for the providers you want to offer your users.
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
            // Terms of service url.
            tosUrl: '/'
          };

        let service = {
            firebaseAuthObject: firebaseAuthObject,
            authObject: authObject,
            firebaseUI: ui,
            firebaseUIConfig: uiConfig,
            register: register,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            sendWelcomeEmail: sendWelcomeEmail,
            showLogin: showLogin
        };

        return service;

        function signInSuccessCallBack(currentUser, credential, redirectUrl){
            $location.path('/');
            
            return false;
        }

        function showLogin(config) {
            // The start method will wait until the DOM is loaded.
            console.log('showlogin')
            ui.start('#firebaseui-auth-container', config);
        }

        function register(user) {
            return firebaseAuthObject.$createUserWithEmailAndPassword(user.email, user.password);
        }

        function login(user) {
            return firebaseAuthObject.$signInWithEmailAndPassword(user.email, user.password);
        }

        function logout() {
            firebaseAuthObject.$signOut();
        }

        function isLoggedIn() {
            return firebaseAuthObject.$getAuth() !== null ? true : false;
        }

        function sendWelcomeEmail(emailAddress) {
            firebaseDataService
                .emails
                .push({emailAddress: emailAddress});
        }
    }

})();