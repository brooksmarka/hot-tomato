(function() {

    function TimerCtrl($scope, $interval) {
      this.startButton = "Start a Session";
      this.resetButton = "Reset Session";
      this.breakButton = "Take a Break";
      this.count = 1500;

      $scope.onBreak = false; //boolean value to trigger button change
      var stop;

      $scope.session = function() {
        stop = $interval(function() {
          if ($scope.count > 0 ){
            $scope.count--;
          } else {
            $scope.stopSession();
          }
        }, 100); //this is the delay
      };

      $scope.stopSession = function() {
        //making sure a session is active
        if (angular.isDefined(stop)) {
          $interval.cancel(stop);
          stop = undefined;
        }
      };

      $scope.resetSession = function() {
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
