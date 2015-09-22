
  app.controller("RepsController", function (reps) {

  var self = this;
  self.members = [];
  self.congressType = 'reps';


    self.searchByZip = function(zip) {
      reps.allByZip(zip).then(function (data){
        self.members = data;
      });
    };

    self.searchRepByState = function(state) {
      reps.repsByState(state).then(function (data){
          self.members = data;
      });
    };

    self.searchRepByName = function(name) {
      reps.repsByName(name).then(function (data){
          self.members = data;
        });
    };


  self.searchSenByState = function(state) {
    reps.sensByState(state).then(function (data){
        self.members = data;
      });
  };


self.searchSenByName = function(name) {
  reps.sensByName(name).then(function (data){
      self.members = data;
    });
};

});


  app.factory('reps', function ($http){
    var host = 'http://dgm-representatives.herokuapp.com';

    function search(type, criteria, query){
      return $http
        .get(host + '/' + type + '/by-' + criteria + "/" + query)
        .then(function (response){
          return response.data;
        })
    };

    search.allByZip = search.bind(null, 'all', 'zip');
    search.repsByName = search.bind(null, 'reps', 'name');
    search.repsByState = search.bind(null, 'reps', 'state');
    search.sensBystate = search.bind(null, 'sens', 'state');
    search.sensByName = search.bind(null, 'sens', 'name');

    return search;

    /*
    return {
      repHttp: function (type, path){
        return $http
        .get(host + path + type)
        .then(function (res){
          return res.data;
        });
    };
  };
    */
  });
