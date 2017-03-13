import { Injectable } from '@angular/core';
import { environment } from "../../environment/environment";
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { JwtService } from './jwt.service';
import { SimpleMarker } from '../models/marker.model';

@Injectable()
export class ApiService {
  constructor(
    private http: Http,
    private jwtService: JwtService
  ) { }

  private setHeaders(): Headers {
    let headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this.jwtService.getAccessToken()) {
      headersConfig['Authorization'] = `Token ${this.jwtService.getAccessToken()}`;
    }
    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(), search: params })
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  // absolute get
  abs_get(path: string, params: URLSearchParams = new URLSearchParams(), cors: boolean): Observable<any> {
    let headers = this.setHeaders();
    if (cors) headers.append("Access-Control-Allow-Origin", "*");
    return this.http.get(`${path}`, { headers: headers, search: params })
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`,
      { headers: this.setHeaders() }
    )
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  getGooglePlaces(query, userLocation: SimpleMarker) {
    let example = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=AIzaSyDJ2gtLk2bgMvCwqBDWHJGilstJuKE87-Y";
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
    let searchParams = new URLSearchParams();
    Object.keys(query).forEach(k => {
      searchParams.append(k, query[k]);
    });
    searchParams.append("location", userLocation.lat + "," + userLocation.lng);
    searchParams.append("key", environment.maps_api_key);
    return this.abs_get(url, searchParams, true);
  }

}
