(function() {
  function config($locationProvider, $stateProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

     $stateProvider
       .state('home', {
         url: '/',
         controller: 'HomeCtrl as home',
         templateUrl: '/templates/home.html'
       });
  }

  angular
    .module('hotTomato', ['ui.router', 'firebase'])
    .config(config)
    .constant('CLOCK_TIMES', {
      "totalWorkTime":1500,
      "totalBreakTime": 300,
      "totalLongBreakTime": 1800,
      "defaultWorkTime": 1500,
      "defaultBreakTime": 300,
      "defaultLongBreakTime": 1800
    });

})();
