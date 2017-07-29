(function(){
    'use strict';

    angular
        .module('floAuth')
        .factory('floAuthService', floAuthService);

    floAuthService.$inject = ['$firebaseAuth']

    function floAuthService($firebaseAuth) {
        //have firebaseUi and firebaseAuth point to the same object
        let authObject = firebase.auth();
        let firebaseAuthObject = $firebaseAuth(authObject);
        let ui = new firebaseui.auth.AuthUI(authObject);

        let service = {
            firebaseAuthObject: firebaseAuthObject,
            authObject: authObject,
            firebaseUI: ui,
            register: register,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            sendWelcomeEmail: sendWelcomeEmail
        };

        return service;

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
            return firebaseAuthObject.$getAuth();
        }

        function sendWelcomeEmail(emailAddress) {
            firebaseDataService
                .emails
                .push({emailAddress: emailAddress});
        }
    }

})();