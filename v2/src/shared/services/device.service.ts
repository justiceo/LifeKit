import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Contacts, Contact, ContactName, ContactField } from "ionic-native";
import { Carrier, Device, Reading, EmergencyContact, User } from "../models";
import { Geolocation, Geoposition } from "ionic-native";
import { Observable } from 'rxjs/Rx';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class DeviceService {

    emergencyContacts: Array<EmergencyContact> = [];
    allContacts: Array<Contact> = [];
    devices: Array<Device> = [];
    carriers: Array<Carrier> = [];
    data: any;

    constructor(public http: Http) {
    }

    getCarrierLocations() {
        // load some sample locations (synonymous to carriers)
        return this.load().map((data: any) => {
            return data.map;            
        });
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

    getCurrentPosition(): Observable<Geoposition> {
        // issue an update request on the update
        var x = new ReplaySubject<Geoposition>(1);
        Geolocation.getCurrentPosition().then((resp) => {
            x.next(resp);
        });
        return x.asObservable();
    }

    positionSubj = new ReplaySubject<Geoposition>(1)
    getPosition(): Observable<Geoposition> {
        Geolocation.getCurrentPosition().then((resp) => {
            this.positionSubj.next(resp);
        });
        return this.positionSubj.asObservable()
    }

    // when user enter address, resolve their coordinates

    // when user has overdose, send the address
}