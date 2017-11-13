(function() {

    function TimerCtrl($scope, $interval, CLOCK_TIMES) {
      $scope.buttonMsg = "Start a Session";
      $scope.breakButtonMsg = "Start a Break";
      //$scope.time = 1500;
      $scope.time = CLOCK_TIMES.totalWorkTime;
      $scope.onBreak = false;
      $scope.format = 'mm:ss';

      console.log("TimerCtrl Hears you!")

      var sessionCount = 0;

      var timer;

      $scope.timerTrigger = function() {
          console.log("This is timer trigger!")
          console.log($scope.buttonMsg)
          console.log($scope.breakButtonMsg)
          if( $scope.buttonMsg === "Reset Session" && $scope.onBreak == false ) {
            resetSession();
          }else if( ($scope.breakButtonMsg === "Start a Break" || $scope.breakButtonMsg === "Start a Long Break") && $scope.onBreak == true) {
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
        $scope.time = $scope.time - 100
        console.log(sessionCount);
        $scope.buttonMsg = "Reset Session";
        if($scope.time <= 0 && $scope.onBreak == false ) {
          sessionCount++;
          console.log(sessionCount);
          setBreak();
        }else if ($scope.time <= 0 && $scope.onBreak == true){
          resetSession();
        }
      };

      //currently it is resetting to a long break only after an break session. This is when onBreak has been set to true on setBreak and not after an actual session.

      // first session ticks down.

      var resetSession = function() {
        console.log("This is resetSession!")
        $interval.cancel(timer);
        //$scope.time = 1500;
        $scope.time = CLOCK_TIMES.totalWorkTime;
        $scope.buttonMsg = "Start a Session"
        $scope.onBreak = false;
      };

      var setBreak = function() {
        console.log("This is setBreak")
        if(sessionCount < 4){
          $interval.cancel(timer);
          //$scope.time = 300;
          $scope.time = CLOCK_TIMES.totalBreakTime;
          $scope.breakButtonMsg = "Start a Break"
          $scope.onBreak = true;
        }else{
          $interval.cancel(timer);
          //$scope.time = 1800;
          $scope.time = CLOCK_TIMES.totalLongBreakTime;
          $scope.breakButtonMsg = "Start a Long Break"
          $scope.onBreak = true;
          sessionCount = 0;
        }
      };

    };


    angular
        .module('hotTomato')
        .controller('TimerCtrl', ['$scope', '$interval', 'CLOCK_TIMES', TimerCtrl]);
})();
