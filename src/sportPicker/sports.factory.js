(function(){
    'use strict';

    angular
        .module('floSportPicker')
        .factory('sportsFactory',sportsFactory);
        
        sportsFactory.$inject = [];
        
        function sportsFactory() {
            let self = this;
            
            self.sports = {
                team:{
                    baseball: {display:'Baseball', scoring: [{amount: 1, display: 'run'}]},
                    footbal:  {display: 'Football', scoring: [{   amount: 1, display: 'PAT'},  
                                                                { amount: 2, display: 'safety'},
                                                                { amount: 2, display: '2 point conversion'},
                                                                { amount: 3, display: 'field goal'},
                                                                { amount: 7, display: 'touchdown'},
                                                             ]},
                    hockey:   {display: 'Hockey', scoring: [{amount: 1, display: 'goal'}]},
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