//import './main.controller'
/* istanbul ignore next */
describe('Main Controller', function(){

let $controller,
    $firebaseArray,
    $firebaseAuth,
    $uibModal,
    $rootScope,
    MainController;

let mockFloAuthService = {
    isLoggedIn: function(){return true}
}

const RED = '#ff000c';
const BLUE = '#0222f2';
    
let mockMatchupsFactory = {
    0: {
        homeTeam : {
            name: 'red',
            color: RED
        },
        awayTeam : {
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
        homeTeam : {
            name: 'red 2',
            color: RED
        },
        awayTeam : {
            name: 'blue 2',
            color: BLUE
        },
        home_score: 1,
        away_score: 0,
        final: true,
        match_time: 0,
        timer_running: false
    },
    $loaded: function(){return true;},
    $add: function(elt){return true}
}

    beforeEach(angular.mock.module('flosports-test'));

    beforeEach(inject(function (_$controller_, _$firebaseArray_, _$firebaseAuth_, 
                            _$uibModal_, _$rootScope_, _$q_) {
        $controller = _$controller_;
        $uibModal = _$uibModal_;
        $firebaseArray = _$firebaseArray_;
        $firebaseAuth = _$firebaseAuth_;
        $rootScope = _$rootScope_;

        MainController = $controller('MainController as vm', {
            $firebaseArray: $firebaseArray,
            $firebaseAuth: $firebaseAuth,
            $scope: $rootScope.$new(),
            $uibModal: $uibModal,
            matchupsFactory: mockMatchupsFactory,
            floAuthService: mockFloAuthService
        })
        spyOn(mockFloAuthService, 'isLoggedIn' ).and.returnValue(true);

        let deferred = _$q_.defer();
        deferred.resolve(MainController.matchupsLoaded = true)
        spyOn(mockMatchupsFactory, '$loaded').and.returnValue(deferred.promise);

        MainController.matchups = mockMatchupsFactory;
        
    }));

    it('should be defined', function() {
            expect(MainController).toBeDefined();
        });

    describe('MainController $onInit', function() {

        beforeEach(function(){
            MainController.$onInit()
        });

        it('should not showLogin', function(){
            expect(MainController.showLogin).toBe(false);
        });

        it('should load matchups', function() {
            expect(MainController.matchups[0]).toBeDefined();
            expect(MainController.matchups[1]).toBeDefined();
            expect(MainController.matchupsLoaded).toBe(true);
        });

        it('should have two tabs: Edit Scores and Scoreboard ', function() {
            expect(MainController.tabs.length).toBe(2);
            expect(MainController.tabs[0].heading).toBe('Edit Scores');
            expect(MainController.tabs[1].heading).toBe('Scoreboard');
        });
    });

    describe('create a new matchup', function() {
        let new_match;
        beforeAll( function(){
            new_match = {
                homeTeam:{name: 'Badgers', color: 'red'},
                awayTeam: {name: 'Gophers', color: 'maroon'},
                home_score: 0,
                away_score: 0,
                final: false,
                match_time: 30,
                timer_running: false,
                id: 14 //for testing purposes only
            }

            MainController.unstartedMatch = new_match;

            spyOn(mockMatchupsFactory, '$add').and.callFake(function(unstartedMatch){
                mockMatchupsFactory[unstartedMatch.id] = unstartedMatch;
            });

            MainController.createNewMatchup(new_match)
        });

        it('should add the matchup', function(){
            expect(mockMatchupsFactory[new_match.id]).toBeDefined();
        });
    });

});