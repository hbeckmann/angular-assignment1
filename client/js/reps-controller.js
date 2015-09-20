
  app.controller("RepsController", function (reps) {

  var self = this;
  self.members = [];


    self.searchByZip = function(zip) {
      reps.repHttp(zip, '/all/by-zip/').then(function (data){
        self.members = data;
      });
    };

    self.searchByState = function(state) {
      reps.repHttp(state, '/reps/by-state/').then(function (data){
          self.members = data;
      });
    };


    self.searchByName = function(name) {
      reps.repHttp(name, '/reps/by-name/').then(function (data){
          self.members = data;
        });
    };
  });

  app.factory('reps', function ($http){
    var host = 'http://dgm-representatives.herokuapp.com';
    return {
      repHttp: function (type, path){
        return $http
        .get(host + path + type)
        .then(function (res){
          return res.data;
        });
      }
    };
  });
