import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {NavController, ToastController} from "ionic-angular";
import {LoginPage} from "../login/login";


@Component({
    templateUrl: 'reset.html'
})

export class ResetPage {
    login:{username?:string, password?:string} = {};
    submitted = false;

    constructor(public navCtrl:NavController, public toastCtrl:ToastController) {
    }

    modelOk(form:NgForm):boolean {
        return form.valid;
    }

    reset(form:NgForm) {
        // grab the form input and make request then return to home
        this.showToast().then(() => this.navCtrl.popTo(LoginPage));

    }

    showToast():Promise<any> {
        let toast = this.toastCtrl.create({
            message: 'Password reset email sent.',
            duration: 4000,
            position: 'bottom'
        });

        return toast.present(toast);
    }

}
