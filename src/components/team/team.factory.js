(function(){
    'use strict';

    angular
        .module('flosports-test')
        .factory('teamFactory', teamFactory);

    teamFactory.$inject = ['$firebaseObject'];

    function teamFactory($firebaseObject){
        return function(team) {
            //create a reference to the database node where the data will be stored
            var ref = firebase.database().ref("teams").push();
            var teamRef = ref.child(team);

            //return it as a synchronized object
            return $firebaseObject(teamRef);
        }
    }
})();