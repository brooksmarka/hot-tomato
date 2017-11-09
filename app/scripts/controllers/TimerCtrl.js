(function() {

    function TimerCtrl($scope, $interval) {
      this.startButton = "Start a Session";
      this.resetButton = "Reset Session";
      this.breakButton = "Take a Break";
      $scope.time = 1500;
      console.log("I hear you!")

      $scope.onBreak = false; //boolean value to trigger button change
      var stop;

      var timer;

      var countdown = function() {
        $scope.time = $scope.time - 1000

        if($scope.time <= 0) {
          $interval.cancel(timer);
        }
      }

      $scope.session = function() {
        timer = $interval(countdown, 2000)
      };

      $scope.stopSession = function() {
        //making sure a session is active
        if (angular.isDefined(stop)) {
          $interval.cancel(stop);
          stop = undefined;
        }
      };

      $scope.resetSession = function() {
        console.log("I hear you too!")
        $scope.count = 1500;
      };

      $scope.$on('$destroy', function(){
        //Make sure that the interval is destroyed as well
        $scope.stopSession();
      });

    };

    angular
        .module('hotTomato')
        .controller('TimerCtrl', ['$scope', '$interval', TimerCtrl]);
})();
