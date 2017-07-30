describe('Timer Controller', function(){
    beforeEach(angular.mock.module('floTimer'));

    let TimerController;

    beforeEach(inject(function(_$controller_, _$interval_, _$rootScope_){

        TimerController = _$controller_('TimerController', {
            $interval: _$interval_,
            $rootScope: _$rootScope_.$new(),
        });
    }));

    xit('should be defined', function(){
        expect(TimerController).toBeDefined();
    })
})