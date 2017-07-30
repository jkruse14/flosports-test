import {SimpleChange} from '@angular/core';

/* istanbul ignore next */
describe('Matchup Controller', function(){
    const RED = '#ff000c';
    const BLUE = '#0222f2';

    let mockMatchupsFactory = {
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
        },
        $getRecord: function(id){
            return true;
        },
        $save: function(elt) {
            return true;
        }
    }

    beforeEach(angular.mock.module('flosports-test'));

    let $controller, $scope, $rootScope, MatchupController;

    beforeEach(inject(function (_$controller_, _matchupsFactory_, _$rootScope_) {
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;

        MatchupController = $controller('MatchupController as vm', {
            $rootScope: $scope,
            $scope: $scope,
            matchupsFactory: mockMatchupsFactory,
        });

        MatchupController.matchup = mockMatchupsFactory[0]
    }));

    if('should be defined', function(){
        expect(MatchupController).toBeDefined()
    });

    describe('$onInit', function() {
        beforeEach(function(){
            MatchupController.$onInit()
        });

        it('should have constant HOME', function() {
            expect(MatchupController.HOME).toBeDefined();
            expect(MatchupController.HOME).toBe('home')
        });

        it('should have constant AWAY', function() {
            expect(MatchupController.AWAY).toBeDefined();
            expect(MatchupController.AWAY).toBe('away')
        });
    });

    xdescribe('onChanges', function() {
        beforeEach(function(){
            MatchupController.$onInit();

            mockMatchupsFactory.$watch = jasmine.createSpy('$watch');
            $scope.vm.matchup = mockMatchupsFactory[0];
            let isFirstChange = function() {return false}
            MatchupController.$onChanges({
                matchup: {previousValue: {}, currentValue:mockMatchupsFactory[0], isFirstChange:false}
            })
        });

        it('should set watchSet to true', function(){
            expect(MatchupController.watchSet).toBeDefined();
            expect(MatchupController.watchSet).toBe(true);
        })
    })

    it('should set the match timer', function(){
        spyOn(mockMatchupsFactory, '$getRecord').and.returnValue(MatchupController.matchup)
        spyOn(mockMatchupsFactory, '$save')

        expect(MatchupController.matchup.timer_running).toBe(false);
        MatchupController.setTimerRunning(true);
        expect(MatchupController.matchup.timer_running).toBe(true);
        expect(mockMatchupsFactory.$getRecord).toHaveBeenCalled();
        expect(mockMatchupsFactory.$save).toHaveBeenCalled();
    })

    it('should increment the score if the timer is running', function(){
        MatchupController.matchup.timer_running = true;
        spyOn(mockMatchupsFactory, '$getRecord').and.returnValue(MatchupController.matchup)
        spyOn(mockMatchupsFactory, '$save');

        MatchupController.incrementScore('home', 1);
        expect(MatchupController.matchup.home_score).toBe(2);

        MatchupController.incrementScore('away', 2);
        expect(MatchupController.matchup.away_score).toBe(2);

    });

    it('should update the home team name', function(){
        MatchupController.updateTeam('home', 'name', 'Badgers')
        expect(MatchupController.matchup.homeTeam.name).toBe('Badgers');
    });

    it('should update the away team name', function(){
        MatchupController.updateTeam('away', 'name', 'Gophers')
        expect(MatchupController.matchup.awayTeam.name).toBe('Gophers');
    });

    it('should update the home team color', function(){
        MatchupController.updateTeam('home', 'color', 'red')
        expect(MatchupController.matchup.homeTeam.color).toBe('red');
    });

    it('should update the away team name', function(){
        MatchupController.updateTeam('away', 'color', 'maroon')
        expect(MatchupController.matchup.awayTeam.color).toBe('maroon');
    });

    it('should not affect the team properties if an unknown property is set', function(){
        MatchupController.updateTeam('home', 'danger', '<insert evil laugh>');
        expect(MatchupController.matchup.homeTeam.danger).toBeUndefined();
    });

    it('should set final to true on timer end', function() {
        expect(MatchupController.matchup.final).toBe(false);

        spyOn(mockMatchupsFactory, '$getRecord').and.returnValue(mockMatchupsFactory[0]);
        spyOn(mockMatchupsFactory, '$save');
        $rootScope.$broadcast('FLOWTIMER_END', 0);

        expect(MatchupController.matchup.final).toBe(true);
        expect(mockMatchupsFactory.$getRecord).toHaveBeenCalled();
        expect(mockMatchupsFactory.$save).toHaveBeenCalledWith(mockMatchupsFactory[0]);
    });
})