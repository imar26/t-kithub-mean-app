import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SearchKeywordService } from '../../services/search/search.service.client';
import { EventService } from '../../services/events/events.service.client';
import { GeolocationService } from '../../services/geolocation/geolocation.service.client';
// import { CategoryService } from '../../services/category/category.service.client';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']

})
export class SearchComponent implements OnInit {
  //properties
  sortBy: string;
  dropdownValues: Array<any> = ['Sort By Name(A-Z)', 'Sort By Name(Z-A)', 'Sort By Date(Oldest to Newest)', 'Sort By Date(Newest to Oldest)', 'Sort By City Name(A-Z)', 'Sort By City Name(Z-A)'];
  searchValue: string;
  searchCount: number;
  keyword: string;
  relevantEvents = [];
  cleanedData = [];
  states: Set<string> = new Set<string>();
  selectedState: string;
  selectedSegment: string;
  someRange = [1,50];
  genres = [];
  categories = [];
  p: number = 1;
  startDate: Date;
  endDate: Date;
  minAmt: number;
  maxAmt: number;
  eventID: number;

  constructor(private activatedRoute: ActivatedRoute, private eventService: EventService, private router: Router, private data: SearchKeywordService, private geoLocation: GeolocationService) {
  }

  ngOnInit() {

    // Calculate height
    var windowHeight = window.innerHeight;
    var footerHeight = document.getElementById('footer').clientHeight;
    var totalHeight = windowHeight - footerHeight;

    document.getElementById("section-refine-search").setAttribute('style', 'min-height: ' + totalHeight + 'px');
    
    // Get keyword from url
    this.activatedRoute.params.subscribe(
      params => {
        this.searchValue = params['keyword'];
        this.keyword = params['keyword'];
      });
    this.getAllRelevantEvents();
    this.getAllStates();
  }

  //function to redirect to single event detail page
  onKeyDown(event: any) {
    this.eventID = event.id;
    this.router.navigate(['/details/'+ this.eventID]);
  }

  /**
   * fetch all the events based on keyword provided by the user.
   */
  getAllRelevantEvents() {
    
    this.eventService.getAllRelevantEvents(this.keyword).subscribe((relevantEvents) => {

      if (relevantEvents._embedded != undefined) {
        for (var i = 0; i < relevantEvents._embedded.events.length; i++) {
          this.relevantEvents.push(Array.of(relevantEvents._embedded.events[i]));          
              if(this.relevantEvents[i][0].hasOwnProperty('name')
                && this.relevantEvents[i][0].hasOwnProperty('dates')
                && this.relevantEvents[i][0].hasOwnProperty('priceRanges') 
                && this.relevantEvents[i][0].hasOwnProperty('classifications')
                && this.relevantEvents[i][0].hasOwnProperty('_embedded')){
                  if(this.relevantEvents[i][0]._embedded.hasOwnProperty('venues')){
                    if(this.relevantEvents[i][0]._embedded.venues[0].hasOwnProperty('state')){
                      if(this.relevantEvents[i][0].priceRanges[0].hasOwnProperty('min') && this.relevantEvents[i][0].priceRanges[0].hasOwnProperty('max')){
                        if(this.relevantEvents[i][0].dates.hasOwnProperty('start')){
                        if(this.relevantEvents[i][0].dates.start.hasOwnProperty('localDate')){
                          if(this.relevantEvents[i][0].dates.start.hasOwnProperty('dateTime')){
                            if(this.relevantEvents[i][0].dates.hasOwnProperty('timezone')){
                              if(this.relevantEvents[i][0].classifications[0].hasOwnProperty('segment')){
                                if(this.relevantEvents[i][0].classifications[0].segment.hasOwnProperty('name')){
                                  // this.relevantEvents[i]
                                  // ee?.dates?.start.dateTime
                                  this.cleanedData.push(this.relevantEvents[i]); //array of cleaned data
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
        // this.data.setRelevantEvents(this.relevantEvents);
      }


    })
    this.relevantEvents.length = 0;
    this.cleanedData.length = 0;
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

  // change category filter
  onChange(newValue){
    this.selectedState = newValue;
  }

  // on changing sort by value
  onSortChange(value){
    this.sortBy = value;
    console.log(this.sortBy);
  }


}
