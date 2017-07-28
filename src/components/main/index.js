'use strict';

//import routes from './index.routes';
import MainController from './main.controller';
import template from './_main.html'

export default angular
    .module('flosports-test')
    .component('main',{
        template: template,
        controller: 'MainController',
        controllerAs: 'vm',
        bindings: {}
    });
