import {Component} from "@angular/core";
import {Flashlight, Vibration} from "ionic-native";

@Component({
    templateUrl: 'emergency.html'
})
export class Emergency {

    isEmergencyMode: boolean;

    constructor(private flashlight: Flashlight, private vibration: Vibration) {
        this.enableEmergencyMode();
    }

    enableEmergencyMode() {
        // switch on flashlight
        if(Flashlight.available() && !Flashlight.isSwitchedOn())
            Flashlight.switchOn();

        // enable vibration //todo: implement with observable
        setTimeout(() => {
            if(this.isEmergencyMode)
                Vibration.vibrate(1000);
        }, 1000);

    }

    disableEmergencyMode() {
        if(Flashlight.available() && Flashlight.isSwitchedOn())
            Flashlight.switchOff();

        this.isEmergencyMode = false;
    }
}
