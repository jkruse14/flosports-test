describe('Scoreboard Controller', function() {
    beforeEach(angular.mock.module('flosports-test'));

    let $controller,
        $firebaseArray, 
        ScoreBoardController;

    const RED = '#ff000c';
    const BLUE = '#0222f2';

    let mockScoreboardFactory = {
        0: {
            homeTeam: {
                name: 'red',
                color: RED
            },
            awayTeam: {
                name: 'blue',
                color: BLUE
            },
            home_score: 1,
            away_score: 0,
            final: false,
            match_time: 30,
            timer_running: false
        },
        1: {
            homeTeam: {
                name: 'red 2',
                color: RED
            },
            awayTeam: {
                name: 'blue 2',
                color: BLUE
            },
            home_score: 1,
            away_score: 0,
            final: true,
            match_time: 0,
            timer_running: false
        },
        $loaded: function () {
            return true;
        }
    }

    beforeEach(inject(function(_$controller_, _$firebaseArray_, _scoreboardFactory_, _$rootScope_, _$q_){
        $controller = _$controller_;

        ScoreBoardController = $controller('ScoreBoardController as vm', {
            $firebaseArray: _$firebaseArray_,
            scoreboardFactory: _scoreboardFactory_,
            $scope: _$rootScope_.$new()
        });


        // let deferred = _$q_.defer();
        // deferred.resolve(ScoreBoardController.matchupsLoaded = true)
        // spyOn(mockScoreboardFactory, '$loaded').and.returnValue(deferred.promise);
        
        // ScoreBoardController.matchups = mockScoreboardFactory;
    }));

    it('should be defined', function(){
        expect(ScoreBoardController).toBeDefined();
    });

    xit('should have a scoreboard factory and matchups', function(){
        expect(ScoreBoardController.scoreboardFactory).toBeDefined();
        expect(ScoreBoardController.matchupsLoaded).toBe(true);
        expect (mockScoreboardFactory.$loaded).toHaveBeenCalled();
    })
})