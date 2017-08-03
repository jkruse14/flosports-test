import template from './_sportPicker.html'

(function(){
    'use strict';

    angular
        .module('floSportPicker')
        .component('sportPicker', {
            template: template,
            controller: 'sportPickerController',
            controllerAs: 'vm',
            bindings: {
                selectSport: '&',
            }
        })
})();