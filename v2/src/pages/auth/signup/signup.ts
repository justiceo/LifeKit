import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {NavController} from "ionic-angular";


@Component({
    templateUrl: 'signup.html'
})

export class SignUpPage {
    login:{username?:string, password?:string} = {};
    submitted = false;
    modelOk = false;

    constructor(public navCtrl:NavController) {
    }

    onLogin(form:NgForm) {
        this.submitted = true;

        if (form.valid) {
            //this.userData.login(this.login.username);
            //this.navCtrl.push(Dashboard);
        }
    }

    activateButton() {
        this.modelOk = (this.login.username && this.login.password) ? true : false;
        ;
    }
}
