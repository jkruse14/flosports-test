import template from './_sportPicker.html'

(function(){
    'use strict';

    angular
        .module('floSportPicker')
        .component('sportpicker', {
            template: template,
            controller: 'sportPickerController',
            controllerAs: 'vm',
            bindings: {
                getSport: '&'
            }
        })
})();