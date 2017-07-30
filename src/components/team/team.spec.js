/* istanbul ignore next */
describe('Team Controller', function() {
    beforeEach(angular.mock.module('flosports-test'));

    let $controller, teamFactory, $scope, TeamController;

    beforeEach(inject(function(_$controller_, _teamFactory_, _$rootScope_){
        $controller = _$controller_;
        $scope = _$rootScope_.$new();

        TeamController = $controller('TeamController', {
            $scope: $scope,
            teamFactory: _teamFactory_
        });

        $scope.vm = TeamController;
        $scope.vm.editable = true;
        $scope.vm.$onInit();
        $scope.$digest();
    }));

    it('should be defined', function(){
        expect(TeamController).toBeDefined();
    });

    xit('should watch for updates on name', function(){
        
        spyOn($scope, '$watch');
        spyOn($scope.vm, 'update');
        $scope.$apply('vm.name="Wild"')
        console.log($scope.vm);
        //$scope.$digest();

        expect($scope.$watch).toHaveBeenCalled();
        expect($scope.$watch).toHaveBeenCalledWith('vm.name');
        expect($scope.vm.update).toHaveBeenCalled();
    });
});