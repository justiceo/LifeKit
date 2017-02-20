import {Component} from "@angular/core";
import {NavController} from "ionic-angular";

@Component({
    templateUrl: 'dashboard.html'
})
export class Dashboard {
    constructor(public navCtrl:NavController) {
    }
    
    open(url){
        this.navCtrl.push(url);
    }
}
