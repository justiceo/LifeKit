import { Contact } from "ionic-native";
export class EmergencyContact {
    name: string;
    phone: string;

    constructor() {}

    static fromContact(contact: Contact): EmergencyContact {
        let emergencyContact = new EmergencyContact();
        emergencyContact.name = contact.displayName;
        emergencyContact.phone = contact.phoneNumbers.length > 1 ? contact.phoneNumbers[0].value : "";
        return emergencyContact;
    }
}