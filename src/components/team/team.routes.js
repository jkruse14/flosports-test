'use strict';
import template from './_team.html'
routes.$inject = ['$stateProvider', '$urlRouterProvider'];

/** @ngInject */
export default function routes($stateProvider, $urlRouterProvider) {
    //$urlRouterProvider.when('/', '/');
    var teamState = {
        name: 'team',
        url: '/',
        template: template,
        controller: 'TeamController as vm'
    };

    $stateProvider.state(teamState);
}
