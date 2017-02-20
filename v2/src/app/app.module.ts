import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler, DeepLinkConfig} from "ionic-angular";
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

const deepLinkConfig: DeepLinkConfig = <DeepLinkConfig>{
    links: [
        {component: ContactPage, name: "contact", segment: "contact"},
        {component: AboutPage, name: "about", segment: "about"},
        {component: HomePage, name: "home", segment: "home"},
        {component: LoginPage, name: "login", segment: "login"},
        {component: StartPage, name: "start", segment: "start"},
        {component: SignUpPage, name: "signup", segment: "signup"},
        {component: ResetPage, name: "reset", segment: "reset"},
        {component: Devices, name: "devices", segment: "devices"},
        {component: Emergency, name: "emergency", segment: "emergency"},
        {component: Help, name: "help", segment: "help"},
        {component: Carriers, name: "carriers", segment: "carriers"},
        {component: Profile, name: "profile", segment: "profile"},
        {component: Settings, name: "settings", segment: "settings"},
        {component: Vitals, name: "vitals", segment: "vitals"},
        {component: Dashboard, name: "dashboard", segment: "dashboard"}
    ]
};

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
        IonicModule.forRoot(MyApp, {}, deepLinkConfig)
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
