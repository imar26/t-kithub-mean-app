import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class CategoryService {
    constructor(private http: Http) {

    }
    getCategories() {
        return this.http.get('https://app.ticketmaster.com/discovery/v2/classifications.json?apikey=qmwPXKusYa3jELwQBmPkUKIhKAYCliYH')
            .map((response: Response) => {
                return response.json();
            })
    }
    getEventsByCategory(categoryId){
        
        return this.http.get('https://app.ticketmaster.com/discovery/v2/events.json?size=200&classificationId='+categoryId+'&apikey=qmwPXKusYa3jELwQBmPkUKIhKAYCliYH')
            .map((response: Response) => {
                return response.json();
            })
    }
}