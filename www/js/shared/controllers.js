//This is google maps
appControllers.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
	var yourLocation = new google.maps.Marker({
          position: latLng,
          map: $scope.map,
          title: 'Current Location',
		  animation: google.maps.Animation.DROP
        });
		
	var request = {
	location: latLng,
	radius: '500',
	type: 'store'
	  };
	
    service = new google.maps.places.PlacesService($scope.map);
    service.textSearch(request, callback, $scope.map);	
	  
  }, function(error){
    console.log("Could not get location");
  });
});

function createMarkers(places, map) {
  var bounds = new google.maps.LatLngBounds();
  var placesList = document.getElementById('places');
  for (var i = 0, place; place = places[i]; i++) {
    var image = {
	  map: $scope.map,
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };
  }
}

function callback(results, status, map) {
	//console.log(results);
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarkers(results[i], map);
    }
  }
}



//This is Controller for Dialog box.
appControllers.controller('DialogController', function ($scope, $mdDialog, displayOption) {

    //This variable for display wording of dialog.
    //object schema:
    //displayOption: {
    //        title: "Confirm to remove all data?",
    //        content: "All data will remove from local storage.",
    //        ok: "Confirm",
    //        cancel: "Close"
    //}
    $scope.displayOption = displayOption;

    $scope.cancel = function () {
        $mdDialog.cancel(); //close dialog.
    };

    $scope.ok = function () {
        $mdDialog.hide();//hide dialog.
    };
});// End Controller for Dialog box.

//Controller for Toast.
appControllers.controller('toastController', function ($scope, displayOption) {

    //this variable for display wording of toast.
    //object schema:
    // displayOption: {
    //    title: "Data Saved !"
    //}

    $scope.displayOption = displayOption;
});// End Controller for Toast.

