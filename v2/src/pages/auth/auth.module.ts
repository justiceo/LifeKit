import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoginPage} from "./login/login";
import {SignUpPage} from "./signup/signup";
import {StartPage} from "./start/start";

@NgModule({
    imports: [CommonModule],
    declarations: [
        LoginPage,
        SignUpPage,
        StartPage
    ],
    exports: [
        CommonModule,
        LoginPage,
        SignUpPage,
        StartPage
    ],
    entryComponents: [
        LoginPage,
        SignUpPage,
        StartPage
    ]
})
export class Auth {
}