(function() {
    'use strict';

    angular
        .module('flosports-test')
        .factory('scoreboardFactory', scoreboardFactory);

        scoreboardFactory.$inject = ['$firebaseArray']

        function scoreboardFactory($firebaseArray) {
            //create a reference to the database node where the data will be stored
            let ref = firebase.database().ref().child("matchups");
            
            //return it as a synchronized object
            return $firebaseArray(ref);
        }
})();