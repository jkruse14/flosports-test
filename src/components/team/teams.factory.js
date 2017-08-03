(function(){
    'use strict';

    angular
        .module('flosports-test')
        .factory('teamsFactory', teamsFactory);

    teamsFactory.$inject = ['$firebaseArray', '$firebaseObject'];

    function teamsFactory($firebaseArray, $firebaseObject){
        //create a reference to the database node where the data will be stored
        let ref = firebase.database().ref().child("teams");
        
        function getAllTeams() {    
            //return it as a synchronized array
            return $firebaseArray(ref);;
        }

        function getAllTeamsForSport(sport){
            return $firebaseArray(ref.orderByChild('sport').equalTo(sport))
        }

        function getTeam(team){
            return ref.orderByChild("name").equalTo(team.name).once("value")
        }
            
        return {
            getAllTeams: getAllTeams,
            getAllTeamsForSport: getAllTeamsForSport,
            getTeam: getTeam
        }
}
})();