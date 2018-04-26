import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';
import { DATE } from "ngx-bootstrap/chronos/units/constants";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs/Rx";


@Injectable()
export class EventService {
    city = new BehaviorSubject<string>('Boston'); //variable city might change. Hence BehaviorSsubject is used 
                                            //so that it's value is updated and shared among components.
    event = new BehaviorSubject<Object>('');
    lat: number;
    lng: number;
    constructor(private http: Http) {
        
    }
    getAllEvents() {
        return this.http.get('https://app.ticketmaster.com/discovery/v2/events.json?size=200&apikey=qmwPXKusYa3jELwQBmPkUKIhKAYCliYH')
            .map((response: Response) => {
                return response.json();
            })
    }

    /**
     * Function to retrieve top three events based on current date and user's location. Takes in 
     * input as date and city.
     * @param date 
     * @param city 
     */
    getTopThreeEventsAfterCurrentDate(date, city){        
        return this.http.get('https://app.ticketmaster.com/discovery/v2/events.json?startDateTime='+date+'&city='+city+'&size=3&apikey=qmwPXKusYa3jELwQBmPkUKIhKAYCliYH')
            .map((response:Response) => {
                return response.json();
            })
    }

    getEventDetails(eventID){        
        return this.http.get('https://app.ticketmaster.com/discovery/v2/events/'+eventID+'.json?apikey=qmwPXKusYa3jELwQBmPkUKIhKAYCliYH')
            .map((response:Response) => {
                return response.json();
            })
    }

    /**
     * Retrieve events from the API based on keyword entered by the user.
     * @param name 
     */
    getAllRelevantEvents(name){
        
        return this.http.get('https://app.ticketmaster.com/discovery/v2/events.json?keyword='+name+'&size=200&apikey=qmwPXKusYa3jELwQBmPkUKIhKAYCliYH')
            .map((response:Response) => {
                return response.json();
            })
    }

    /**
     * Setter to set the value of the city which is being listened for any changes.
     * @param city 
     */
    setCity(city){
        this.city.next(city); //next sets the new value of the variable city      
    }

    /**
     * return the updated city to take action and get updated top 3 events in the particular location
     */
    getCity(){
        return this.city.asObservable();
    }

    //set the event to be passed on to the child
    setEvent(event){
        this.event.next(event);
        this.setLatLng(event);
    }

    getEvent(){
        return this.event.asObservable();
    }

    setLatLng(event){
               
        this.lat = event._embedded.venues[0].location.latitude;
        this.lng = event._embedded.venues[0].location.longitude;
        
    }
    getLat(){
        
        return this.lat;
    }

    getLng(){
        return this.lng;
    }
}