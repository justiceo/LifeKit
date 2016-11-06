// For using flashlight you have to install $cordovaFlashlight by running the following
// command in your cmd.exe for windows or terminal for mac:
// $ cd your_project_path
// $ ionic plugin remove nl.x-services.plugins.flashlight
// $ ionic plugin add https://github.com/EddyVerbruggen/Flashlight-PhoneGap-Plugin.git
// 
// Learn more about $cordovaFlashlight :
// http://ngcordova.com/docs/plugins/flashlight/
//
// Controller of Flashlight page.
appControllers.controller('flashLightCtrl', function ($scope, $cordovaFlashlight, $timeout) {

    // initialForm is the first activity in the controller. 
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {
        //$scope.isTurnOn  is Flashlight status.
        $scope.destinationLocation = "-37.817364,144.955464";
        $scope.isTurnOn = false;

        //$scope.deviceInformation  is getting device platform.
        $scope.deviceInformation = ionic.Platform.device();
        //If you start your application with flash Light feature.
        //You have to add timeout for 2 sec before run it.
    }; // End initialForm.

    // flashLight for turn on and off flashLight.
    $scope.flashLight = function () {
        // turn on flashLight
        if ($scope.isTurnOn == false) {
                // turn on flashLight for Android
            if ($scope.deviceInformation.platform == "Android") {
                $scope.isTurnOn = true;
                $timeout(function () {
                    $cordovaFlashlight.switchOn();
                }, 50);
            } 
                // turn on flashLight for IOS
            else {
                $scope.isTurnOn = true;
                $cordovaFlashlight.switchOn();
            }
        } // End turn on flashLight.

        // turn off flashLight.
        else {
            $scope.isTurnOn = false;
            $cordovaFlashlight.switchOff();
        }// End turn off flashLight.
    };// End flashLight.

// You can learn more about google map for Android at:
// https://developers.google.com/maps/documentation/android-api/intents?hl=en#display_a_map
// at Display a map section.
	// initialForm is the first activity in the controller. 
    // It will initial all variable data and let the function works when page load.

    // openMap is for open Google Map application.
    // Parameter :  
    // targetDestinationLocation = latitude,longitude of the destination location.
    $scope.openMap = function (targetDestinationLocation) {

    	// window.open is to link to URL.
        // The format is geo:?q=targetDestinationLocation(latitude,longitude)&z=15(Specifies the zoom level of the map).
        //  '_system' is for open map application
        window.open('geo:?q=' + targetDestinationLocation + '&z=15', '_system');
        // If you would like to custom map you can use this parameter below:
  		// latitude and longitude set the center point of the map.
		// z optionally sets the initial zoom level of the map. Accepted values range from 0 (the whole world) to 21 (individual buildings).
		// The upper limit can vary depending on the map data available at the selected location.
    };// End openMap

    $scope.initialForm();

});// End androidMapConnectCtrl controller.
