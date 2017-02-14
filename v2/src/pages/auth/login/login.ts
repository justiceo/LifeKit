import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {NavController} from "ionic-angular";
import {ResetPage} from "./reset";
import {Dashboard} from "../../dashboard/dashboard";


@Component({
    templateUrl: 'login.html'
})

export class LoginPage {
    login:{username?:string, password?:string} = {};
    submitted = false;

    constructor(public navCtrl:NavController) {
    }

    onLogin(form:NgForm) {
        this.submitted = true;

        if (form.valid) {
            //this.userData.login(this.login.username);
            this.navCtrl.push(Dashboard);
        }
    }

    modelOk(form:NgForm):boolean {
        return (this.login.username && this.login.password) ? true : false;
    }

    goToResetPage() {
        this.navCtrl.push(ResetPage);
    }
}
