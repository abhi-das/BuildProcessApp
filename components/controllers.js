/*
 Developer: Abhishek Das | INDIA
 Published Date: 27 Dec, 2015
 Linkedin: www.linkedin.com/in/zestyart
 Purpose: Application Controllers
*/
;(function(){

	var appCtrl = angular.module("appControllers",["appSrv"]);

	appCtrl.controller("BuildStatusController", ["$scope", "BuildStatusSrv", function($scope, BuildStatusSrv){

		$scope.statusData = null;
		$scope.status = null;
		$scope.statusIcon = {
			pending: 'fa-exclamation-circle',
			running: 'fa-refresh',
			passed: 'fa-check-square',
			failed: 'fa-close',
			clock: 	'fa-clock-o',
			folder: 'fa-folder-o',
			pi: 	'fa-pie-chart',
			square: 'fa-square'
		};

		$scope.buildTaskStatus = {
			build: false,
			ut: false,
			ft: false,
			taskId: '',
			processfailedId: ''
		};

		BuildStatusSrv.getBuildStatus()
		.success(function(resp, status) {
            
			$scope.statusData = resp;
			//$scope.taskStatus();
        })
        .error(function (data, status, headers, config) {
            $scope.status = status;
            console.log("Error Found > "+$scope.status);
        });


        $scope.getStatusClass = function(itm, idx,lastIdx){

        	var className = (lastIdx) ? 'tbl-bottom-border ' : '';

    		if( $scope.statusData[idx].status == 'pending') {

    			className += 'warning'
				className += (itm.selected) ? ' selected' : ' info-cell-warning' ;
    		}
    		if( $scope.statusData[idx].status == 'running') {

    			className +='info';
    			className += (itm.selected) ? ' selected' : ' info-cell-info' ;
    		}
    		if($scope.statusData[idx].status == 'passed') {
    			className +='success';
    			className += (itm.selected) ? ' selected' : ' info-cell-success' ;
    		}
    		if($scope.statusData[idx].status == 'failed') {
    			className += 'danger';
    			className += (itm.selected) ? ' selected' : ' info-cell-danger' ;
    		}
    		
        	return className;
        };

        $scope.getStatusIcon = function(idx){
        	
        	var iconClass = '';

        	iconClass += ($scope.statusData[idx].status == 'pending') ? $scope.statusIcon.pending : '' ;
    		iconClass += ($scope.statusData[idx].status == 'running') ? $scope.statusIcon.running : '' ;
    		iconClass += ($scope.statusData[idx].status == 'passed') ? $scope.statusIcon.passed : '' ;
    		iconClass += ($scope.statusData[idx].status == 'failed') ? $scope.statusIcon.failed : '' ;

        	return iconClass;
        };

        $scope.selectRowHandler = function(itm){
        	itm.selected = !itm.selected;
        };

        $scope.selectedRowTopBarTheme = function(idx){

        	var topBarClass = '';

        	topBarClass += ($scope.statusData[idx].status == 'pending') ? 'info-cell-open-warning' : '' ;
    		topBarClass += ($scope.statusData[idx].status == 'running') ? 'info-cell-open-info' : '' ;
    		topBarClass += ($scope.statusData[idx].status == 'passed') ? 'info-cell-open-success' : '' ;
    		topBarClass += ($scope.statusData[idx].status == 'failed') ? 'info-cell-open-danger' : '' ;

        	return topBarClass;
        };

        //Check Build Status
        $scope.checkBuildHandler = function(idx){

        	// $scope.buildTaskStatus 

        	if ($scope.statusData[idx].process.build.pending == '0'){
        		if($scope.statusData[idx].process.build.running  == '0'){
        			if($scope.statusData[idx].process.build.completed == '1'){
        				$scope.buildTaskStatus.build = true;
        				$scope.buildTaskStatus.taskId = 'passed';
        			}else{
        				$scope.buildTaskStatus.build = false;
        				$scope.buildTaskStatus.processfailedId = $scope.statusData[idx].process.build.id;
        				// Some network issue cause to land here..
        				$scope.buildTaskStatus.taskId = 'failed';
        			}
        		}else{
        			$scope.buildTaskStatus.build = false;
        			$scope.buildTaskStatus.processfailedId = $scope.statusData[idx].process.build.id;
        			$scope.buildTaskStatus.taskId = 'running';
        		}
        	}else{
        		$scope.buildTaskStatus.build = false;
        		$scope.buildTaskStatus.processfailedId = $scope.statusData[idx].process.build.id;
        		$scope.buildTaskStatus.taskId = 'pending';
        	}

        	return $scope.buildTaskStatus.build;
        }

        //Check UT
        $scope.checkUtHandler = function(idx){

        	if ($scope.statusData[idx].process.unitTest.pending == '0'){
        		if($scope.statusData[idx].process.unitTest.running  == '0'){
        			if($scope.statusData[idx].process.unitTest.completed == '1'){
        				$scope.buildTaskStatus.ut = true;
        				$scope.buildTaskStatus.taskId = 'passed';
        			}else{
        				$scope.buildTaskStatus.ut = false;
        				$scope.buildTaskStatus.processfailedId = $scope.statusData[idx].process.unitTest.id;
        				// Some network issue cause to land here..
        				$scope.buildTaskStatus.taskId = 'failed';
        			}
        		}else{
        			$scope.buildTaskStatus.ut = false;
        			$scope.buildTaskStatus.processfailedId = $scope.statusData[idx].process.unitTest.id;
        			$scope.buildTaskStatus.taskId = 'running';
        		}
        	}else{
        		$scope.buildTaskStatus.ut = false;
        		$scope.buildTaskStatus.processfailedId = $scope.statusData[idx].process.unitTest.id;
        		$scope.buildTaskStatus.taskId = 'pending';
        	}

        	return $scope.buildTaskStatus.ut;
        }

        //Check FT
        $scope.checkFtHandler = function(idx){

        	
        	if ($scope.statusData[idx].process.functionalTest.pending == '0'){
        		if($scope.statusData[idx].process.functionalTest.running  == '0'){
        			if($scope.statusData[idx].process.functionalTest.completed == '1'){
        				$scope.buildTaskStatus.ft = true;
        				$scope.buildTaskStatus.taskId = 'passed';
        			}else{
        				$scope.buildTaskStatus.ft = false;
        				$scope.buildTaskStatus.processfailedId = $scope.statusData[idx].process.functionalTest.id;
        				// Some network issue cause to land here..
        				$scope.buildTaskStatus.taskId = 'failed';
        			}
        		}else{
        			$scope.buildTaskStatus.ft = false;
        			$scope.buildTaskStatus.processfailedId = $scope.statusData[idx].process.functionalTest.id;
        			$scope.buildTaskStatus.taskId = 'running';
        		}
        	}else{
        		$scope.buildTaskStatus.ft = false;
        		$scope.buildTaskStatus.processfailedId = $scope.statusData[idx].process.functionalTest.id;
        		$scope.buildTaskStatus.taskId = 'pending';
        	}

        	return $scope.buildTaskStatus.ft;
        };

        //Check Task Status
        $scope.taskStatus = function(idx){

        	// console.log( $scope.statusData[0].process );
        	var taskTrackerClass = '';

        	if( $scope.checkBuildHandler(0) ){

        		// taskTrackerClass = 'success';
        		// console.log( "Build Successful !!" );
        		//completed build process
        		if( $scope.checkUtHandler(0) ){

        			// taskTrackerClass = 'success';
        			// console.log( "UT Successful !!" );
        			//completed UT process
        			if( $scope.checkFtHandler(0) ){

        				// taskTrackerClass = 'success';
        				// console.log( "FT Successful !!" );
        				//completed FT process
        			}else{

        				// taskTrackerClass = 'danger';
        				//failed FT process
        				// console.log( "FT Failed !! " + $scope.buildTaskStatus.processfailedId + " >> "+$scope.buildTaskStatus.taskId);

        			}
        		}else{

        			// taskTrackerClass = 'danger';
        			//failed UT process
        			// console.log( "UT Failed !!  " + $scope.buildTaskStatus.processfailedId + " >> "+$scope.buildTaskStatus.taskId );
        		}

        	}else{


        		//failed build process
        	}
        		console.log( "Build Failed !! "+ $scope.buildTaskStatus.processfailedId + " >> "+$scope.buildTaskStatus.taskId );

        	// taskTrackerClass = 'danger';
    		taskTrackerClass += ($scope.buildTaskStatus.taskId == 'pending') ? 'pending' : '' ;
    		taskTrackerClass += ($scope.buildTaskStatus.taskId == 'running') ? 'running' : '' ;
    		taskTrackerClass += ($scope.buildTaskStatus.taskId == 'passed') ? 'success' : '' ;
    		taskTrackerClass += ($scope.buildTaskStatus.taskId == 'failed') ? 'danger' : '' ;

        	return taskTrackerClass;
        };


	}]);

})();