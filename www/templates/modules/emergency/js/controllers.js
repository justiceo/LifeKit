// For using flashlight you have to install $cordovaFlashlight by running the following
// command in your cmd.exe for windows or terminal for mac:
// $ cd your_project_path
// $ ionic plugin remove nl.x-services.plugins.flashlight
// $ ionic plugin add https://github.com/EddyVerbruggen/Flashlight-PhoneGap-Plugin.git
// 
// Learn more about $cordovaFlashlight :
// http://ngcordova.com/docs/plugins/flashlight/

// $ ionic plugin remove cordova-plugin-vibration
// $ ionic plugin add cordova-plugin-vibration
// 
// Learn more about $cordovaVibration :
// http://ngcordova.com/docs/plugins/vibration/
//
// Controller of Flashlight page.

// TODO: Integrate with sound, maps (khoi), and contacts (ahn)

appControllers.controller('emergencyCtrl', function ($scope, $cordovaFlashlight, $cordovaVibration, $timeout) {


    // initialForm is the first activity in the controller. 
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {
        //$scope.isTurnOn  is Flashlight status.
        $scope.deviceInformation = ionic.Platform.device();
        $scope.vibrateing = false;
        $scope.isTurnOn = false;
    }; // End initialForm.

    // flashLight for turn on and off flashLight.
    $scope.flashLight = function () {
        // turn on flashLight
        if ($scope.isTurnOn == false) {
                // turn on flashLight for Android
            if ($scope.deviceInformation.platform == "Android") {
		alert("The if");
                $scope.isTurnOn = true;
                $timeout(function () {
                    $cordovaFlashlight.switchOn();
                }, 50);
            } 
                // turn on flashLight for IOS
            else {
		alert("The first else");
                $scope.isTurnOn = true;
                $cordovaFlashlight.switchOn();
            }
        } // End turn on flashLight.

        // turn off flashLight.
        else {
            alert("hello world");
            $scope.isTurnOn = false;
            $cordovaFlashlight.switchOff();
        }// End turn off flashLight.
    };// End flashLight.

    $scope.vibrate = function () {
        $scope.vibrateing = true;
        $cordovaVibration.vibrate(400);
        $timeout(function () {
            $scope.vibrateing = false;
        }, 400);
    };// End vibrate.

    $scope.initialForm();
    $( document ).ready(function() {
	//alert( "ready!" );
	//$scope.flashLight();
	/*while (true)
	{
		$scope.vibrate();
	}*/
    });

});//End of controller
