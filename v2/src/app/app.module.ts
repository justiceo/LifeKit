import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import {MyApp} from "./app.component";
import {AboutPage} from "../pages/about/about";
import {ContactPage} from "../pages/contacts/contact";
import {HomePage} from "../pages/home/home";
import {Dashboard} from "../pages/dashboard/dashboard";
import {StartPage} from "../pages/auth/start/start";
import {LoginPage} from "../pages/auth/login/login";
import {ResetPage} from "../pages/auth/login/reset";
import {SignUpPage} from "../pages/auth/signup/signup";
import {Devices} from "../pages/devices/devices";
import {Emergency} from "../pages/emergency/emergency";
import {Help} from "../pages/help/help";
import {Carriers} from "../pages/naloxone-carriers/carriers";
import {Profile} from "../pages/profile/profile";
import {Settings} from "../pages/settings/settings";
import {Vitals} from "../pages/vitals-monitor/vitals";
//import { Auth } from '../pages/auth/auth.module';

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        Dashboard,
        StartPage,
        LoginPage,
        ResetPage,
        SignUpPage,
        Devices,
        Emergency,
        Help,
        Carriers,
        Profile,
        Settings,
        Vitals
    ],
    imports: [
        //Auth,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        Dashboard,
        StartPage,
        LoginPage,
        ResetPage,
        SignUpPage,
        Devices,
        Emergency,
        Help,
        Carriers,
        Profile,
        Settings,
        Vitals
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
