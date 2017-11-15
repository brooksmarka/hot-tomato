(function() {
  function Task($firebaseArray) {
    var Task ={};
    var ref = firebase.database().ref().child("tasks");
    //download tasks into a synchronized array - populated from remote server
    var tasks = $firebaseArray(ref);

    Task.all = tasks;

    Task.add = function(taskName){
      tasks.$add({$value:taskName});
    }
      return Task;
  };

  angular
    .module('hotTomato')
    .factory('Task', ['$firebaseArray', Task]);

})();
