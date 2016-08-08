(function() {
  'use strict';

  angular
    .module('template')

    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])



    .service('MainControllerDataService',function($resource){
      var self = this;



      var myFriendsResourse = $resource('http://bustime.mta.info/api/where/routes-for-agency/MTA%20NYCT.json?key=31faa966-c918-4d03-9562-07604d4abfed&%20Ref=MTA%20NYCT_:busNumber')


        self.getRoute = function(address){
          return myFriendsResourse.get({
            busNumber: address
          }).$promise
        };// get Route


    })

    .controller('MainController', function (MainControllerDataService) 
      {
        var self = this;
        self.greeting = "Hello World";



        self.showRoute = function(person){
          MainControllerDataService.getRoute(person)
          .then(function(response){
            console.log(response.results);
            self.routes = response.results;
          })
        }

        

        
      });


  
})();
