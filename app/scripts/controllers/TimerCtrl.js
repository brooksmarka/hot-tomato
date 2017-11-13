(function() {

    function TimerCtrl($scope, $interval, CLOCK_TIMES) {
      $scope.buttonMsg = "Start a Session";
      $scope.breakButtonMsg = "Start a Break";
      $scope.time = CLOCK_TIMES.totalWorkTime;
      $scope.onBreak = false;
      $scope.format = 'mm:ss';

      console.log("TimerCtrl Hears you!")

      var timer;

      $scope.timerTrigger = function() {
          console.log("This is timer trigger!")
          console.log($scope.buttonMsg)
          console.log($scope.breakButtonMsg)
          if( $scope.buttonMsg === "Reset Session" && $scope.onBreak == false ) {
            resetSession();
          }else if( $scope.breakButtonMsg === "Start a Break" && $scope.onBreak == true) {
            $scope.breakButtonMsg = "Reset Break";
            $scope.session();
          }else if ($scope.breakButtonMsg === "Reset Break" && $scope.onBreak == true ){
            setBreak();
            $scope.breakButtonMsg = "Start a Break";
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
        if($scope.time <= 0 && $scope.onBreak == true) {
          resetSession();
        }else if ($scope.time <= 0 && $scope.onBreak == false) {
          setBreak();
        }
      };

      var resetSession = function() {
        console.log("This is resetSession!")
        $interval.cancel(timer);
        $scope.time = CLOCK_TIMES.totalWorkTime;
        $scope.buttonMsg = "Start a Session"
        $scope.onBreak = false;
      };

      var setBreak = function() {
        console.log("This is setBreak")
        $interval.cancel(timer);
        $scope.time = CLOCK_TIMES.totalBreakTime;
        console.log($scope.onBreak)
        $scope.onBreak = true;
      };

    };

    angular
        .module('hotTomato')
        .controller('TimerCtrl', ['$scope', '$interval', 'CLOCK_TIMES', TimerCtrl]);
})();
