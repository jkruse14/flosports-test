(function(){
    'use strict';

    angular
        .module('floAuth')
        .factory('floAuthService', floAuthService);

    floAuthService.$inject = ['$firebaseAuth', '$location', '$uibModal']

    function floAuthService($firebaseAuth, $location, $uibModal) {
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
            showLogin: showLogin,
            showLoginModal: showLoginModal
        };

        return service;

        function signInSuccessCallBack(currentUser, credential, redirectUrl){
            $location.path('/');
            
            return false;
        }

/*
   * for whatever reason, when I use templateUrl here, it does not put
   * the firebaseui auth container in the modal, so sticking with this
   * messy workaround
   * Also, firebaseui currently does not have a direct sign-up, you have
   * to go through sign in -> add account. future feature is pending:
   * https://github.com/firebase/firebaseui-web/issues/35
   */
function showLoginModal(callback) {
    var modalInstance = $uibModal.open({
        animation: true,
        backdrop: 'static',
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        template: `<div class='modal-content'>
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
        opened: showLogin(uiConfig)
    });

    modalInstance
        .result
        .then(function (result) {
            //Flash.clear();
            if (result) {
                callback();
            } else {
                showLoginModal();
            }
        }, function (reason) {})
}

        function showLogin(config) {
            // The start method will wait until the DOM is loaded.
            if(!isLoggedIn()){
                ui.start('#firebaseui-auth-container', config);
            }
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