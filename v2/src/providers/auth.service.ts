
import {Injectable} from "@angular/core";
import {JWT} from "./jwt.service";
import {Http, Response } from "@angular/http";

@Injectable()
export class AuthService {
    current = {};

    constructor(private _JWT: JWT, private _$http: Http) {
    }

    /**
     * If user has been logged in before, re-authenticate them silently,
     * otherwise, it's probably a first-timer to the app
     * @returns {any}
     */
    verifyAuth() {
        let deferred = new Promise();

        // Check for JWT token first
        if (!this._JWT.get()) {
            deferred.resolve(false);
            return deferred.promise;
        }

        // If there's a JWT & user is already set
        if (this.current) {
            deferred.resolve(true);

            // If current user isn't set, get it from the server.
            // If server doesn't 401, set current user & resolve promise.
        } else {
            let url = "http://localhost:15088/api/Account/Register";
            let payload = {
                "username": "Justice",
                "password": "password"
            };
            this._$http.post(url, payload).then(
                (response: Response) => {
                    console.log(response.json().data);
                    deferred.resolve(true);
                },
                // If an error happens, that means the user's token was invalid.
                (error) => {
                    this._JWT.destroy();
                    deferred.resolve(false);
                    console.log("The user's token was invalid: \n" + error.message);
                }
            );
        }

        return deferred.promise;
    }
}