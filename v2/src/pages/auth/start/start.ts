import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {SignUpPage} from "../signup/signup";

@Component({
    templateUrl: 'start.html'
})

export class StartPage {
    login:{username?:string, password?:string} = {};
    submitted = false;

    constructor(public navCtrl:NavController) {
    }


    goToLogin() {
        this.navCtrl.push(LoginPage);
    }

    goToSignUp() {
        this.navCtrl.push(SignUpPage);
    }
}
