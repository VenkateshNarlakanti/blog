import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class DashboardService {
    private _baseUrl = 'http://api.openweathermap.org';
    constructor(private _http: Http) { }

    getWeather(city: any): Observable<any> {
        const url = this._baseUrl + '/data/2.5/weather?appid=d0b1ba8ed87fbbc667697a90f4180fa2&q=' + city;
        console.log(url);
        return this._http.get(url)
            .map((response: Response) => response.json())
            .do(data => console.log(JSON.stringify(data)));
    }
    getForeCast(city: any): Observable<any> {
        const url = this._baseUrl + '/data/2.5/forecast?appid=d0b1ba8ed87fbbc667697a90f4180fa2&q=' + city;
        console.log(url);
        return this._http.get(url)
            .map((response: Response) => response.json())
            .do(data => console.log(JSON.stringify(data)));
    }
    getGeoName(lat: any, long: any): Observable<any> {
        console.log(lat);
        console.log(long);
        const url = 'http://maps.googleapis.com/maps/api/geocode/json?sensor=true&latlng=' + lat + ',' + long;
        console.log(url);
        return this._http.get(url)
            .map((response: Response) => response.json())
            .do(data => console.log(JSON.stringify(data)));
    }
    getNews(): Observable<any> {
        const url =  'https://newsapi.org/v1/articles?source=business-insider&sortBy=top&apiKey=10ffc00b364045c68ce33a7c73bfe17b';
        return this._http.get(url)
        .map((response: Response) => response.json())
        .do(data => console.log(JSON.stringify(data)));
    }
    getCnnNews(): Observable<any> {
        const url =  'https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=10ffc00b364045c68ce33a7c73bfe17b';
        return this._http.get(url)
        .map((response: Response) => response.json())
        .do(data => console.log(JSON.stringify(data)));
    }
}
