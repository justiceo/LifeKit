
// appControllers.controller('backgroundJobCtrl', function ($scope) {
//     $scope.message = 'hello world';
// });

appControllers.controller('connectionCtrl', function($scope, $interval, $location) {
	$scope.count = 0;
	$scope.x = 0;
	$scope.y = 0;
	$scope.z = 0;
	$scope.timestamp = 0;
    $scope.power = 0;

	var onSuccess = function(acceleration) {
		$scope.count++;
		$scope.x = acceleration.x;
		$scope.y = acceleration.y;
		$scope.z = acceleration.z;
		$scope.timestamp = acceleration.timestamp;
        $scope.power = Math.sqrt( $scope.x*$scope.x + $scope.y*$scope.y + $scope.z*$scope.z );
        if($scope.power > 11) {
            $location.path("/app/welcome");
        }
	};

	var onError = function() {
		alert('onError!');
	};

	$scope.getMotion = function() {
		try {
			navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
		} catch(e) {
			alert(e);
		}
	};

    $interval($scope.getMotion, 1000);

    document.addEventListener('deviceready', function() {
        cordova.plugins.backgroundMode.enable();
        // cordova.plugins.backgroundMode.onactivate = $scope.timerMotion();
    });
});

