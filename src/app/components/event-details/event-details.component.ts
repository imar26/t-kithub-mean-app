import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/events/events.service.client';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  eventID: string;
  event: Object;
  lat: number;
  lng: number;
  subscription: Subscription;
  
  constructor(private activatedRoute: ActivatedRoute, private eventService: EventService) { }

  
  ngOnInit() {
    //get the event id from the request
    this.activatedRoute.params.subscribe(
      params => {
        this.eventID = params['eventID'];
      });
      try{
        this.getEventDetails();
      }catch(err){
        console.log(err)
      }
      
  }

  /**
   * get the details of a single event
   * fetch latitude and longitude for this event to be displayed in map
   * pass data to child classes
   */
  getEventDetails() {
    
    this.eventService.getEventDetails(this.eventID).subscribe((eventDetails) => {
      this.event = eventDetails;
      console.log(this.event);
      this.eventService.setEvent(this.event);
      this.lat = this.eventService.getLat();
      this.lng = this.eventService.getLng();
    })    
  }
}
