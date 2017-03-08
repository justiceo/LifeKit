import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import { Contacts, Contact, ContactField, ContactName } from "ionic-native";

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage {

    someContact: Contact;

    constructor(public navCtrl:NavController) {
        // uncomment below to create a new emergency contact        
        // dataService.createEmergencyContact("Wondering", "Boy", "123-456-7890");

        // uncomment below to get emergency Contacts
        // let contacts = dataService.getEmergencyContacts();
    }

}
