import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/events/events.service.client';
import { Router } from '@angular/router';
import { GeolocationService } from '../../services/geolocation/geolocation.service.client';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  //properties
  events = [];
  cleanedData = [];
  searchCount : number;
  eventID: number;
  selectedState: string;
  sortBy: string;
  dropdownValues: Array<any> = ['Sort By Name(A-Z)', 'Sort By Name(Z-A)', 'Sort By Date(Oldest to Newest)', 'Sort By Date(Newest to Oldest)', 'Sort By City Name(A-Z)', 'Sort By City Name(Z-A)'];
  searchValue: string;
  states: Set<string> = new Set<string>();
  selectedSegment: string;
  someRange = [1,50];
  genres = [];
  categories = [];
  p: number = 1;
  startDate: Date;
  endDate: Date;
  minAmt: number;
  maxAmt: number;
 
  constructor(private router: Router, private eventService : EventService, private geoLocation: GeolocationService) { }

  ngOnInit() {
    this.getAllEvents();
  }

  //Function to fetch all the events
  getAllEvents() {
   
    this.eventService.getAllEvents()
      .subscribe((events) => {
        if (events._embedded != undefined) {
          for (var i = 0; i < events._embedded.events.length; i++) {
            this.events.push(Array.of(events._embedded.events[i]));          
                if(this.events[i][0].hasOwnProperty('name')
                  && this.events[i][0].hasOwnProperty('dates')
                  && this.events[i][0].hasOwnProperty('priceRanges') 
                  && this.events[i][0].hasOwnProperty('classifications')
                  && this.events[i][0].hasOwnProperty('_embedded')){
                    if(this.events[i][0]._embedded.hasOwnProperty('venues')){
                      if(this.events[i][0]._embedded.venues[0].hasOwnProperty('state')){
                        if(this.events[i][0].priceRanges[0].hasOwnProperty('min') && this.events[i][0].priceRanges[0].hasOwnProperty('max')){
                          if(this.events[i][0].dates.hasOwnProperty('start')){
                          if(this.events[i][0].dates.start.hasOwnProperty('localDate')){
                            if(this.events[i][0].dates.start.hasOwnProperty('dateTime')){
                              if(this.events[i][0].dates.hasOwnProperty('timezone')){
                                if(this.events[i][0].classifications[0].hasOwnProperty('segment')){
                                  if(this.events[i][0].classifications[0].segment.hasOwnProperty('name')){
                                    // this.relevantEvents[i]
                                    // ee?.dates?.start.dateTime
                                    this.cleanedData.push(this.events[i]); //array of cleaned data
                                  }
                                }
                              }
                            }
                            
                          }
                        } 
                        }
                        
                      }
                      
                    }
                    
                  }
          }
          this.searchCount = this.cleanedData.length;
        
        }
      })
      this.events.length = 0;
      this.cleanedData.length = 0;
    }
 //function to redirect to single event detail page
 onKeyDown(event: any) {
  this.eventID = event.id;
  this.router.navigate(['/details/'+ this.eventID]);
}
 /**
 * Function to fetch all the states to be displayed in the filters
 */
getAllStates() {
  this.states.add('');
  this.geoLocation.getAllStatesInUs().subscribe((states) => {
    for (var i = 0; i < states._embedded.venues.length; i++) {
      this.states.add((states._embedded.venues[i].state.name));
    }
    // console.log(this.states);
  })
}
// Get the selected value from the state dropdown
onChange(newValue){
  this.selectedState = newValue;
}
//Sort 
onSortChange(value){
  this.sortBy = value;
  //console.log(this.sortBy);
}

}
