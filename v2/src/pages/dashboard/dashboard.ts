import {Component} from "@angular/core";
import {HomePage} from "../home/home";
import {AboutPage} from "../about/about";
import {ContactPage} from "../contacts/contact";

@Component({
    templateUrl: 'dashboard.html'
})
export class Dashboard {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    tab1Root:any = HomePage;
    tab2Root:any = AboutPage;
    tab3Root:any = ContactPage;

    constructor() {

    }
}
