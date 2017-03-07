
import {Injectable} from "@angular/core";

@Injectable()
export class JWT {

    getToken(): String {
        return window.localStorage['jwtToken'];
    }

    saveToken(token: String) {
        window.localStorage['jwtToken'] = token;
    }

    destroyToken() {
        window.localStorage.removeItem('jwtToken');
    }

}
