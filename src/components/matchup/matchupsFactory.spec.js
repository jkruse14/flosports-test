describe('Matchups Factory', function() {
    beforeEach(angular.mock.module('flosports-test'));

    let matchupsFactory;
    beforeEach(inject(function(){
        angular.mock.inject(function($injector){
            matchupsFactory = $injector.get('matchupsFactory')
        })
    }));

    it('should be defined', function(){
        expect(matchupsFactory).toBeDefined();
    })
})