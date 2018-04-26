import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/events/events.service.client';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-home',
  templateUrl: './event-home.component.html',
  styleUrls: ['./event-home.component.scss']
})
export class EventHomeComponent implements OnInit {
  //properties
  topEvents = [];
  dates = [];
  location: string;
  subscription: Subscription;
  eventID: string;
  text: any = { 
    "Weeks": "Weeks", 
    "Days": "Days", 
    "Hours": "Hours",
    "Minutes": "Minutes", 
    "Seconds": "Seconds",
    "MilliSeconds":"MilliSeconds" };
    
  constructor(private router: Router,private eventService: EventService) { 
  }

  ngOnInit() {
    /**
     * Subscribe to the getCity() method as it returns
     * the most updated value of the location. Location value might change and accordingly 
     * top three events should also change.
     * 
     */
    this.subscription = this.eventService.getCity().subscribe((location) => {      
      this.location = location; //assign local variable as the updated value
      this.getTopThreeEventsAfterCurrentDate(this.location); //as soon as value changes call this method
      // console.log(this.location);
    });
    
  }

  /**
   * Function to get top 3 events after a current date. It then makes a call to the method in 
   * service to GET data from API.
   */
  getTopThreeEventsAfterCurrentDate(location) {
    var currentDate = new Date();   //retrieve the current date and time
    var year = currentDate.getFullYear();//retrieve the year from current date
    var month = currentDate.getMonth() + 1; //add 1 because January starts with 0
    var mth, d, h, m, s;
    var day = currentDate.getDate();  //retrieve the date from current date  
    var hours = currentDate.getHours();//retrieve the hours from current date
    var minutes = currentDate.getMinutes();//retrieve the minutes from current date
    var seconds = currentDate.getSeconds();//retrieve the seconds from current date

    /**
     * check if month, day, hours, minutes or seconds 
     * are less than 9. If they are less than 9 then append a 0 
     * at the start.
     */
    if (month <= 9) {
      mth = '0' + month;
    } else {
      mth = month;
    }

    if (hours <= 9) {
      h = '0' + hours;
    } else {
      h = hours;
    }

    if (day <= 9) {
      d = '0' + day;
    } else {
      d = day;
    }

    if (minutes <= 9) {
      m = '0' + minutes;
    } else {
      m = minutes;
    }

    if (seconds <= 9) {
      s = '0' + seconds;
    } else {
      s = seconds;
    }
    var date = year + '-' + mth + '-' + d + 'T' + h + ':' + m + ':' + s + 'Z';
    
    /**
     * call the function that will get top three events after current date from the API
     */
    this.eventService.getTopThreeEventsAfterCurrentDate(date, location)
      .subscribe((topEvents) => {
        if (topEvents._embedded != undefined) {
          this.topEvents = topEvents._embedded.events; //add the data to the array for processing
          for(var i=0; i<this.topEvents.length; i++){
            if(this.topEvents[i].dates.start.dateTime) {
              this.topEvents[i].dates.start.showDateTime = true;
              this.topEvents[i].dates.start.dateTime = new Date(this.topEvents[i].dates.start.dateTime); 
            } else {
              this.topEvents[i].dates.start.showDateTime = false;
            }
          }
        }
        
        this.sortByDate(this.topEvents);        
      })
      this.dates.length = 0;
      
  }

  /**
   * Sort the top three events array in ascending order by dates
   * @param topEvents 
   */
  sortByDate(topEvents) {
    this.dates.length = 0;
    for(var i=0; i<topEvents.length; i++){
      this.dates.push(topEvents[i]);
    }
    this.dates = this.dates.sort();
    this.dates.sort((a,b)=>{
      if(a.dates.start.localDate == b.dates.start.localDate)
        return 0;
        else{
          if(a.dates.start.localDate > b.dates.start.localDate)
          return 1;
          else
          if(a.dates.start.localDate < b.dates.start.localDate)
          return -1;
        }
    })    
  }

  //function to route to single event details page to view details of a single event
  onKeyDown(event: any) {
    this.eventID = event.id; //get the particular event id
    this.router.navigate(['/details/'+ this.eventID]); //redirect to different page
  }
  
}
