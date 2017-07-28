AppRoutes.$inject = ['$urlRouterProvider', '$locationProvider'];

export default function AppRoutes($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
}