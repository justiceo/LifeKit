
// appControllers.controller('deviceConnectionCtrl', function ($scope) {
//     $scope.message = 'hello world';
// });

appControllers.controller('deviceConnectionCtrl', function($scope, $interval, $location) {
	var isConnected = false;
    var job = null;
    var forwardAddress = "/app/emergency";

	var onSuccess = function(acceleration) {
		$scope.x = acceleration.x;
		$scope.y = acceleration.y;
		$scope.z = acceleration.z;
		$scope.timestamp = acceleration.timestamp;
        $scope.power = Math.sqrt( $scope.x*$scope.x + $scope.y*$scope.y + $scope.z*$scope.z );
        if($scope.power > 13) {
            $location.path(forwardAddress);
        }
	    isConnected = true;
	};

	var onError = function() {
		alert('onError!');
	    isConnected = false;
	};

	$scope.x = 0;
	$scope.y = 0;
	$scope.z = 0;
	$scope.timestamp = 0;
    $scope.power = 0;

    $scope.getStatus = function() {
        return isConnected ? "Connected" : "Disconnected";
    };

	$scope.getMotion = function() {
		try {
			navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
		} catch(e) {
			alert(e);
		}
	};

    $scope.connectDevice = function() {
        if(cordova.plugins.backgroundMode.isEnabled())
            return;

        // document.addEventListener('deviceready', function() {
        //     cordova.plugins.backgroundMode.enable();
        //     // cordova.plugins.backgroundMode.onactivate = $scope.timerMotion();
        // });
 
        cordova.plugins.backgroundMode.enable();
        job = $interval($scope.getMotion, 100);
    };

    $scope.disconnectDevice = function() {
        if(!cordova.plugins.backgroundMode.isEnabled())
            return;

        cordova.plugins.backgroundMode.disable();
        isConnected = false;
        $interval.cancel(job);
        $scope.job = null;
    };
});

