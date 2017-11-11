(function() {

    function TimerCtrl($scope, $interval) {
      $scope.buttonMsg = "Start a Session";
      $scope.time = 1500;
      $scope.format = 'mm:ss';
      console.log("TimerCtrl Hears you!")

      var timer;

      $scope.timerTrigger = function() {
          console.log("This is timer trigger!")
          if( $scope.buttonMsg === "Reset Session" ) {
          resetSession();
          }else{
          $scope.session();
          }
        };

      $scope.session = function() {
          timer = $interval(countdown, 1000) // this is the delay
        };

      var countdown = function() {
        $scope.time = $scope.time - 1
        $scope.buttonMsg = "Reset Session";
        if($scope.time <= 0) {
          resetSession();
        }
      };

      var resetSession = function() {
        console.log("This is resetSession!")
        $interval.cancel(timer);
        $scope.time = 1500;
        $scope.buttonMsg = "Start a Session"
      };

    };

    angular
        .module('hotTomato')
        .controller('TimerCtrl', ['$scope', '$interval', TimerCtrl]);
})();
