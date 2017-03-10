import {Component} from "@angular/core";
import { DeviceService } from "../../shared";
import {Geolocation, Geoposition} from "ionic-native";
import {
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapsLatLng,
 CameraPosition,
 GoogleMapsMarkerOptions,
 GoogleMapsMarker
} from 'ionic-native';

@Component({
    templateUrl: 'test.html'
})
export class TestPage {

    // geoposition object looks like this
    position = {
        timestamp: 123,
        coords: {
            latitude: 12343,
            longitude: 5432342
        }
    };

    constructor(private deviceService: DeviceService) {        
                
    }

    ngAfterViewInit() {
        this.deviceService.getCurrentPosition().then(
            pos => {
                this.position = pos;
                this.displayMap(this.position);
            }
        );
    }

    coordToGmap(geoCoord): GoogleMapsLatLng {
        return new GoogleMapsLatLng(geoCoord.coords.latitude, geoCoord.coords.longitude)
    }

    displayMap(coords) {
        let element: HTMLElement = document.getElementById('mapContainer');
        console.log("el is: ", element);
        let map = new GoogleMap(element);
        console.log("map is: ", map);
        let ionic = this.coordToGmap(coords);
        let position: CameraPosition = {
            target: ionic,
            zoom: 18,
            tilt: 30
        };
        
        map.addEventListener(GoogleMapsEvent.MAP_READY).subscribe((e) => {
            console.log("map e: ", e);
        });
        /*
        map.one(GoogleMapsEvent.MAP_READY).then((resp) => {
            console.log("map res: ", resp);
            map.moveCamera(position);
        });
        
        // create new marker
        let markerOptions: GoogleMapsMarkerOptions = {
                position: marker,
                title: 'Test position'
            };

        map.addMarker(markerOptions)
            .then((marker: GoogleMapsMarker) => {
                marker.showInfoWindow();
            });
        */
        
    }

    yell() {

    }

    
}