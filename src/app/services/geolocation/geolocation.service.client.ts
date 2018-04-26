import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from "@angular/http";


@Injectable()
export class GeolocationService {
    constructor(private http: Http) {

    }
    getLocation(): Observable<any> {

        return Observable.create(observer => {

            if (window.navigator && window.navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition(
                    (position) => {
                        observer.next(position);
                        observer.complete();
                    }, (error) => {
                        observer.next(error);
                    }
                );
               
            }
            
        });
    }
    getCityName(latitude, longitude){
        return this.http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true')
            .map((response: Response) => {
                return response.json();
            })
    }

    getAllStatesInUs(){
    
        return this.http.get('https://app.ticketmaster.com/discovery/v2/venues.json?countryCode=US&size=200&apikey=qmwPXKusYa3jELwQBmPkUKIhKAYCliYH')
        .map((response: Response) => {
            return response.json();
        })
    }
    getAllCitiesInUS(){
        return this.http.get('https://app.ticketmaster.com/discovery/v2/venues.json?size=200&apikey=qmwPXKusYa3jELwQBmPkUKIhKAYCliYH')
        .map((response: Response) => {
            return response.json();
        })
    }

}

