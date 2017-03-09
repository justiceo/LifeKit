import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Contacts, Contact, ContactName, ContactField } from "ionic-native";
import { Carrier, Device, Reading, EmergencyContact, User } from "../models";

@Injectable()
export class DeviceService {

    emergencyContacts: Array<EmergencyContact> = [];
    allContacts: Array<Contact> = [];  
    devices: Array<Device> = [];
    carriers: Array<Carrier> = [];

    constructor(public http: Http) {

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
}