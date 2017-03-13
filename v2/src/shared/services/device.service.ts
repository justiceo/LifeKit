import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Contacts, Contact, ContactName, ContactField } from "ionic-native";
import { Carrier, Device, Reading, EmergencyContact, User, SimpleMarker } from "../models";
import { Geolocation, Geoposition } from "ionic-native";
import { Observable } from 'rxjs/Rx';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ApiService } from "./api.service";

@Injectable()
export class DeviceService {

    emergencyContacts: Array<EmergencyContact> = [];
    allContacts: Array<Contact> = [];
    devices: Array<Device> = [];
    carriers: Array<Carrier> = [];
    data: any;
    currentLocation: SimpleMarker;

    constructor(public http: Http, private apiService: ApiService) {
    }

    getCarrierLocations(): Observable<SimpleMarker[]> {
        if (this.currentLocation) { // we hope this is the case 99.99% of the time
            return this.apiService.getGooglePlaces({ keyword: "pharmacy", type: "store" }, this.currentLocation)
                .map(this.processGooglePlaces)
        }
        else {
            return this.getCurrentPosition().flatMap(
                position => {
                    return this.apiService.getGooglePlaces({ keyword: "pharmacy" }, position)
                        .map(this.processGooglePlaces);
                }
            )
        }

        // load some sample locations (synonymous to carriers)
        /*return this.load().map((data: any) => {
            return data.map;            
        });*/
    }

    processGooglePlaces(data): Array<SimpleMarker> {
        let accum: Array<SimpleMarker> = [];
        data.result.forEach(p => {
            accum.push({
                lat: p.geometry.location.lat,
                lng: p.geometry.location.lng,
                name: p.name
            });
        });
        return accum;
    }

    load(): Observable<any> {
        if (this.data) {
            return Observable.of(this.data);
        } else {
            return this.http.get('assets/data/map-data.json')
                .map(this.processData);
        }
    }

    // this function is not "owned" by this class, but by the load function above. 
    processData(data: any) {
        console.log("proc data: ", data);
        this.data = data.json();
        // do any further preprocessing here, don't forget this function is not owned by this class.
        return this.data;
    }


    getNaxloneCarriers(): Array<Carrier> {
        // first refresh carrier cache from google then return. 
        return this.carriers;
    }

    getEmergencyContacts(): Array<EmergencyContact> {
        return this.emergencyContacts;
    }
    addEmergencyContact(contact: Contact) {
        let emerg = EmergencyContact.fromContact(contact);
        this.emergencyContacts.push(emerg);
        return contact;
    }
    createEmergencyContact(lastName, firstName, phone) {
        let contact: Contact = Contacts.create();
        contact.name = new ContactName(null, lastName, firstName);
        contact.phoneNumbers = [new ContactField("phone", phone)];
        return this.addEmergencyContact(contact);
    }

    // devices
    getDevices(): Array<Device> {
        return this.devices;
    }
    getConnectedDevices(): Array<Device> {
        return this.devices.filter(d => d.connected);
    }
    getReadings(): Array<Reading> {
        return this.getConnectedDevices().map(d => d.reading);
    }

    getCurrentPosition(): Observable<SimpleMarker> {
        if (this.currentLocation) {
            return Observable.of(this.currentLocation);
        }
        else {
            // issue an update request on the update
            var marker = new ReplaySubject<SimpleMarker>(1);
            Geolocation.getCurrentPosition().then((resp) => {
                let pos = {
                    lat: resp.coords.latitude,
                    lng: resp.coords.longitude,
                    name: "Your location"
                }
                marker.next(pos);
                this.currentLocation = pos;
            });
            return marker.asObservable();
        }
    }

    // when user enter address, resolve their coordinates

    // when user has overdose, send the address
}