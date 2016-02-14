/*
 Developer: Abhishek Das | INDIA
 Published Date: 27 Dec, 2015
 Linkedin: www.linkedin.com/in/zestyart
 Purpose: Application HTTP service Provider
*/
;(function(){

	var appServices = angular.module("appSrv",[]);

	appServices.factory("BuildStatusSrv",["$http", function($http){

		var statusService = {};

		statusService.getBuildStatus = function(){

			return $http.get("data_source/build-process-status.json");
		};

		return statusService;

	}]);



})();