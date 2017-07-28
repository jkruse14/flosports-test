    'use strict';
    import template from './_main.html'
    routes.$inject = ['$stateProvider', '$urlRouterProvider'];

    /** @ngInject */
    export default function routes($stateProvider, $urlRouterProvider) {
        //$urlRouterProvider.when('/', '/');
        var indexState = {
            name: 'main',
            url: '/',
            template: template,
            controller: 'MainController',
            controllerAs: 'vm'
        };

        $stateProvider.state(mainState);
    }
