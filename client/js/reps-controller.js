
  app.controller("RepsController", function (reps) {

  var self = this;
  self.loading = false;
  self.members = [];
  self.congressType = 'reps';
  self.apis = [{
      label:"Zip",
      method: function (zip) {
        self.loading = true;
        reps('all', 'zip', zip).then(function (data){
          self.loading = false;
          self.members = data;
        });
      }
    },{
      label:"Last Name",
      method: function (name) {
        self.loading = true;
        reps(self.congressType, 'name', name).then(function (data){
          self.loading = false;
          self.members = data;
        });
      }
    },{
      label: "State",
      method: function (state) {
        self.loading = true;
        reps(self.congressType, 'state', state).then(function (data){
          self.loading = false;
          self.members = data;
        });
      }
    }];

  self.criteria = self.apis[0];

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
