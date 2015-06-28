var app = angular.module('app', []);

app.controller('searchCtrl', function($scope, $http) {

		// Simple GET request example :
		$scope.handleSearch =  function() {
			if($scope.username == undefined || $scope.username.length < 2 || $scope.username.length > 4) {
				$scope.validate = true;
				return;
			} else {
				$scope.validate = false;
			}

			// if($scope.username.length == 2) {
			// 	$scope.fuzzName = $scope.username.replace($scope.username[1], "○");
			// } else {
			$scope.fuzzName = $scope.username.replace($scope.username[1], "○");
			//}

			$http.get('/js/patient.json').
			  success(function(data, status, headers, config) {
			    // this callback will be called asynchronously
			    // when the response is available
			    $scope.patients = data;
				var matchFound = false;

				for (var i = 0, len = data.length; i < len; i++)
				{
				    if(data[i]["姓名"] == $scope.fuzzName) {
				    	$scope.match = true;
				    	$scope.patient = data[i];
				    	$scope.patientList = true;
				    	$scope.notFound = false;
				    	break;
				    }
				    if(i == len-1) {
				    	$scope.patientList = false;
				    	$scope.notFound = true;
				    	alert("d");
				    }
				}  
			  }).
			  error(function(data, status, headers, config) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });
		}
});