import {Component, ViewChild, ElementRef} from "@angular/core";
import { Platform } from "ionic-angular";
import { DeviceService } from "../../shared";

declare var google: any;

@Component({
    templateUrl: 'test.html'
})
export class TestPage {

    
    @ViewChild('mapCanvas') mapElement: ElementRef;
    constructor(private deviceService: DeviceService, private platform: Platform) {        
                
    }

    ionViewDidLoad() {
      this.deviceService.getMap().subscribe((mapData: any) => {
        let mapEle = this.mapElement.nativeElement;

        let map = new google.maps.Map(mapEle, {
          center: mapData.find((d: any) => d.center),
          zoom: 13
        });

        mapData.forEach((markerData: any) => {
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
        });
      });

  }

    
}