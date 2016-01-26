/*
 Developer: Abhishek Das | INDIA
 Published Date: 27 Dec, 2015
 Linkedin: www.linkedin.com/in/zestyart
 Purpose: Application initializer
*/
;(function(){

  var app = angular.module("processAnalysisApp",[
    "ngRoute",
    "appSrv",
    "appControllers"
  ]);

  app.config(["$routeProvider", function($rtProvider){

      $rtProvider
      .when("/processstatus",{
          templateUrl : "partials/buildstatus.html",
          controller: "BuildStatusController"
      })
      .otherwise({
        redirectTo : "/processstatus"
      })

  }]);


})();