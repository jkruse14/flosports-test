(function() {
    angular
        .module('flosports-test')
        .factory('matchupsFactory', MatchupsFactory);

    MatchupsFactory.$inject = ['$firebaseArray'];

    function MatchupsFactory($firebaseArray) {
        
        //create a reference to the database node where the data will be stored
            var ref = firebase.database().ref().child("matchups");
            
            //return it as a synchronized object
            return $firebaseArray(ref);
    }
})();