!function(){var a=angular.module("processAnalysisApp",["ngRoute","appSrv","appControllers"]);a.config(["$routeProvider",function(a){a.when("/processstatus",{templateUrl:"partials/buildstatus.html",controller:"BuildStatusController"}).otherwise({redirectTo:"/processstatus"})}])}(),function(){var a=angular.module("appControllers",["appSrv"]);a.controller("BuildStatusController",["$scope","BuildStatusSrv",function(a,b){a.statusData=null,a.status=null,a.statusIcon={pending:"fa-exclamation-circle",running:"fa-refresh",passed:"fa-check-square",failed:"fa-close",clock:"fa-clock-o",folder:"fa-folder-o",pi:"fa-pie-chart",square:"fa-square"},a.buildTaskStatus={build:!1,ut:!1,ft:!1,taskId:"",processfailedId:""},b.getBuildStatus().success(function(b,c){a.statusData=b}).error(function(b,c,d,e){a.status=c,console.log("Error Found > "+a.status)}),a.getStatusClass=function(b,c,d){var e=d?"tbl-bottom-border ":"";return"pending"==a.statusData[c].status&&(e+="warning",e+=b.selected?" selected":" info-cell-warning"),"running"==a.statusData[c].status&&(e+="info",e+=b.selected?" selected":" info-cell-info"),"passed"==a.statusData[c].status&&(e+="success",e+=b.selected?" selected":" info-cell-success"),"failed"==a.statusData[c].status&&(e+="danger",e+=b.selected?" selected":" info-cell-danger"),e},a.getStatusIcon=function(b){var c="";return c+="pending"==a.statusData[b].status?a.statusIcon.pending:"",c+="running"==a.statusData[b].status?a.statusIcon.running:"",c+="passed"==a.statusData[b].status?a.statusIcon.passed:"",c+="failed"==a.statusData[b].status?a.statusIcon.failed:""},a.selectRowHandler=function(a){a.selected=!a.selected},a.selectedRowTopBarTheme=function(b){var c="";return c+="pending"==a.statusData[b].status?"info-cell-open-warning":"",c+="running"==a.statusData[b].status?"info-cell-open-info":"",c+="passed"==a.statusData[b].status?"info-cell-open-success":"",c+="failed"==a.statusData[b].status?"info-cell-open-danger":""},a.checkBuildHandler=function(b){return"0"==a.statusData[b].process.build.pending?"0"==a.statusData[b].process.build.running?"1"==a.statusData[b].process.build.completed?(a.buildTaskStatus.build=!0,a.buildTaskStatus.taskId="passed"):(a.buildTaskStatus.build=!1,a.buildTaskStatus.processfailedId=a.statusData[b].process.build.id,a.buildTaskStatus.taskId="failed"):(a.buildTaskStatus.build=!1,a.buildTaskStatus.processfailedId=a.statusData[b].process.build.id,a.buildTaskStatus.taskId="running"):(a.buildTaskStatus.build=!1,a.buildTaskStatus.processfailedId=a.statusData[b].process.build.id,a.buildTaskStatus.taskId="pending"),a.buildTaskStatus.build},a.checkUtHandler=function(b){return"0"==a.statusData[b].process.unitTest.pending?"0"==a.statusData[b].process.unitTest.running?"1"==a.statusData[b].process.unitTest.completed?(a.buildTaskStatus.ut=!0,a.buildTaskStatus.taskId="passed"):(a.buildTaskStatus.ut=!1,a.buildTaskStatus.processfailedId=a.statusData[b].process.unitTest.id,a.buildTaskStatus.taskId="failed"):(a.buildTaskStatus.ut=!1,a.buildTaskStatus.processfailedId=a.statusData[b].process.unitTest.id,a.buildTaskStatus.taskId="running"):(a.buildTaskStatus.ut=!1,a.buildTaskStatus.processfailedId=a.statusData[b].process.unitTest.id,a.buildTaskStatus.taskId="pending"),a.buildTaskStatus.ut},a.checkFtHandler=function(b){return"0"==a.statusData[b].process.functionalTest.pending?"0"==a.statusData[b].process.functionalTest.running?"1"==a.statusData[b].process.functionalTest.completed?(a.buildTaskStatus.ft=!0,a.buildTaskStatus.taskId="passed"):(a.buildTaskStatus.ft=!1,a.buildTaskStatus.processfailedId=a.statusData[b].process.functionalTest.id,a.buildTaskStatus.taskId="failed"):(a.buildTaskStatus.ft=!1,a.buildTaskStatus.processfailedId=a.statusData[b].process.functionalTest.id,a.buildTaskStatus.taskId="running"):(a.buildTaskStatus.ft=!1,a.buildTaskStatus.processfailedId=a.statusData[b].process.functionalTest.id,a.buildTaskStatus.taskId="pending"),a.buildTaskStatus.ft},a.taskStatus=function(b){var c="";return a.checkBuildHandler(0)&&a.checkUtHandler(0)&&a.checkFtHandler(0),console.log("Build Failed !! "+a.buildTaskStatus.processfailedId+" >> "+a.buildTaskStatus.taskId),c+="pending"==a.buildTaskStatus.taskId?"pending":"",c+="running"==a.buildTaskStatus.taskId?"running":"",c+="passed"==a.buildTaskStatus.taskId?"success":"",c+="failed"==a.buildTaskStatus.taskId?"danger":""}}])}(),function(){var a=angular.module("appSrv",[]);a.factory("BuildStatusSrv",["$http",function(a){var b={};return b.getBuildStatus=function(){return a.get("data_source/build-process-status.json")},b}])}();