import AppRoutes from './app.routes'

angular
    .module('flosports-test', [
      'firebase',
      'ui.router',
      'ui.bootstrap',
      'colorpicker.module',
      'floAuth',
      'floTimer',
      'floSportPicker'
])
.config(AppRoutes)
