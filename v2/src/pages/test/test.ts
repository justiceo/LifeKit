import { Component, ViewChild, ElementRef } from "@angular/core";
import { Platform } from "ionic-angular";
import { DeviceService } from "../../shared";
import { Geoposition } from "ionic-native";

declare var google: any;

@Component({
    templateUrl: 'test.html'
})
export class TestPage {


    @ViewChild('mapCanvas') mapElement: ElementRef;
    constructor(private deviceService: DeviceService, private platform: Platform) {
    }

    ionViewDidLoad() {
        let mapEle = this.mapElement.nativeElement;
        let map;
        
        this.deviceService.getCurrentPosition().subscribe(
            geoPosition => {
                let userPosition = this.flattenGeoposition(geoPosition);
                // center map on user's location
                map = new google.maps.Map(mapEle, {
                    center: userPosition,
                    zoom: 13
                });

                // add user's location marker to map
                this.addToMap(userPosition, map);

                // get other marker's and add
                this.deviceService.getCarrierLocations().subscribe((mapData: any) => {
                    mapData.forEach((markerData: any) => {
                        this.addToMap(markerData, map);
                    });
                });

            })
    }

    flattenGeoposition(geoPos: Geoposition) {
        return {
            lat: geoPos.coords.latitude,
            lng: geoPos.coords.longitude,
            timestamp: geoPos.timestamp,
            name: "Your location"
        }
    }

    addToMap(markerData, map) {
        let infoWindow = new google.maps.InfoWindow({
            content: `<h5>${markerData.name}</h5>`
        });

        let marker = new google.maps.Marker({
            position: markerData,
            map: map,
            title: markerData.name
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    }

}