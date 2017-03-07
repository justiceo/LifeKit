import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Contacts, Contact, ContactName, ContactField } from "ionic-native";

@Injectable()
export class DataService {

    emergencyContacts: Array<Contact> = [];  
    devices: Array<Device> = [];
    carriers: Array<Carrier> = [];

    constructor(public http: Http) {}

    getNaxloneCarriers(): Array<Carrier> { 
        // first refresh carrier cache from google then return. 
        return this.carriers;      
    }

    getEmergencyContacts(): Array<Contact> {
        return this.emergencyContacts;
    }
    addEmergencyContact(contact: Contact) {        
        this.emergencyContacts.push(contact);
    }
    createEmergencyContact(lastName, firstName, phone) {
        let contact: Contact = Contacts.create();
        contact.name = new ContactName(null, lastName, firstName);
        contact.phoneNumbers = [new ContactField("phone", phone)];
        this.addEmergencyContact(contact);
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
}