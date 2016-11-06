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

var flasher;
var vibrator;
var timing = 1000;
var interval;
var start_message = new String('User is having an overdose, please assist if you can');
var end_message = new String('User is ok');
var tempMessageStore;
var cordovaSmsGlobal;
//google map stuff
var searchFor = ["pharmacy"];
var map;
var service; 
var infoWindow;


function doStuff() {
	
  flasher.toggle();
  vibrator.vibrate(1000);
}

appControllers.controller('emergencyCtrl', function ($scope,$ionicHistory, $http, $cordovaFlashlight, $cordovaVibration, $cordovaGeolocation, $cordovaSms, $timeout) {
	cordovaSmsGlobal = $cordovaSms;
	tempMessageStore = start_message;
	getContactList($scope, $http);
	//set up looping hell of alarms
	flasher = $cordovaFlashlight;
	vibrator = $cordovaVibration;
	interval = setInterval(doStuff, timing);
	//Stops all of this when leaving page
	 $scope.$on('$ionicView.beforeLeave', function(){
		clearInterval(interval);
		flasher.switchOff();
		tempMessageStore = end_message;
		getContactList($scope, $http);
	});
	
	//set up map
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

  

  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };


});// End androidMapConnectCtrl controller.


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


function getContactList($scope, $http) {
	// options for get contacts.
	console.log(tempMessageStore);
	$http.get('app-data/contact-list.json')
		.success(function(response){		
			sendContact(response);
		});
}

function sendContact(listContacts) {
		//listContacts = sampleList;
		var options = {
		replaceLineBreaks: true, // true to replace \n by a new line, false by default
	  };
		for (var i = 0, len = listContacts.length; i < len; i++) {
			var num = listContacts[i].phoneNumbers[0].value;
			num = num.replace('-','');
			cordovaSmsGlobal
      			.send(num, tempMessageStore            	, options)
      			.then(function() {
			}, function(error) {
			});
		}
	}
