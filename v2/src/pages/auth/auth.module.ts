import {NgModule, ErrorHandler} from "@angular/core";
import {IonicModule, IonicErrorHandler} from "ionic-angular";
import {LoginPage} from "./login/login";
import {SignUpPage} from "./signup/signup";
import {StartPage} from "./start/start";
import {ResetPage} from "./login/reset";

@NgModule({
    imports: [
        IonicModule
    ],
    declarations: [
        LoginPage,
        SignUpPage,
        StartPage,
        ResetPage
    ],
    exports: [
        LoginPage,
        SignUpPage,
        StartPage,
        ResetPage
    ],
    entryComponents: [
        LoginPage,
        SignUpPage,
        StartPage,
        ResetPage
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AuthModule {
}