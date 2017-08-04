(function(){
    'use strict';

    angular
        .module('flosports-test')
        .factory('sportsFactory',sportsFactory);
        
        sportsFactory.$inject = [];
        
        function sportsFactory() {
            let self = this;
            
            self.sports = {
                team:{
                    baseball: {display:'Baseball', scoring: [{amount: 1, display: 'run'}]},
                    footbal:  {display: 'Football', scoring: [{   amount: 1, display: 'pat'},  
                                                                { amount: 2, display: 'Safety'},
                                                                { amount: 2, display: '2 Point Conversion'},
                                                                { amount: 3, display: 'Field Goal'},
                                                                { amount: 6, display: 'Touchdown'},
                                                             ]},
                    hockey:   {display: 'Hockey', scoring: [{amount: 1, display: 'Goal'}]},
                    basketball:{display: 'Basektball', scoring: [
                                                                    {amount: 1, display: 'free throw'},
                                                                    {amount: 2, display: '2 points'},
                                                                    {amount: 3, display: '3 points' }
                                                                ]},
                    soccer: {display: 'Soccer', scoring: [{amount: 1, display: 'goal'}]}
                },
                individual: {
                    track: {
                        m1500: { display: '1500m' },
                        m1600: { display: '1600m' },
                        mile:  { display: 'Mile' },
                        fivek: { display: '5k' },
                        tenk:  { display: '10k' }
                    },
                    running: {
                        mile: { display: 'Mile' },
                        fivek: { display: '5k' },
                        tenk:  { display: '10k'},
                        half_marathon: {display: 'Half Marathon'},
                        marathon: {display: 'Marathon'}
                    },
                    triathalon: {
                        iron_man: {display: 'Iron Man Triathalon'}
                    }
                }
            };

            return self;

        }
})();