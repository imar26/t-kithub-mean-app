import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category/category.service.client';
import { GeolocationService } from '../../services/geolocation/geolocation.service.client';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  //properties
  id: string;
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
  categoryName : string;
 
  constructor(private activatedRoute: ActivatedRoute, private router : Router, private categoryService: CategoryService, private geoLocation: GeolocationService) { }
  
  //To fetch the value of the route param in the init method 
  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.id = params['categoryId'];
        
      });
      this.getEventsByCategory(this.id);
      this.getAllStates();
      console.log(this.events);
  }
  
  //Fetch values the list of events based on the category
  getEventsByCategory(categoryId){
    this.categoryService.getEventsByCategory(this.id)
    .subscribe((events) => {
     // console.log(events);
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
                                // if(i == 0){
                                  this.categoryName =this.events[i][0].classifications[0].segment.name;
                                  console.log(this.categoryName);
                                // }
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
