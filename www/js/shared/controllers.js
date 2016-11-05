//This is google maps

var searchFor = ["pharmacy"];
var map;
var service; 
var infoWindow;

appControllers.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
	infowindow = new google.maps.InfoWindow();
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
	var yourLocation = new google.maps.Marker({
          position: latLng,
          map: map,
          title: 'Current Location',
		  animation: google.maps.Animation.DROP
        });
		
	var request = {
		location: latLng,
		radius: '1000',
		type: searchFor
	  };
	
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);	
  }, function(error){
    console.log("Could not get location");
  });
});

function callback(results, status) {
	console.log(results);
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      makeMarker(results[i]);
	
	
    }
  }
}

function makeMarker(place){
	var marker = new google.maps.Marker({
		  position: place.geometry.location,
		  map: map,
		  title: place.name,
		  animation: google.maps.Animation.DROP,
		  icon: place.icon,
	});
	
	google.maps.event.addListener(marker, 'click', function() {
		  var contentString = "";
		  //console.log(place);
		  contentString = contentString + "<b>"+place.name+"</b><br>" + place.formatted_address + "<br>" ;
          infowindow.setContent(contentString);
          infowindow.open(map, this);
        });
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

