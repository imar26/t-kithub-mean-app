import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { EventService } from '../../../services/events/events.service.client';
@Component({
  selector: 'app-hero-image-event-details',
  templateUrl: './hero-image-event-details.component.html',
  styleUrls: ['./hero-image-event-details.component.scss']
})
export class HeroImageEventDetailsComponent implements OnInit{

  @Input() event: Object;
  subscription: Subscription;
  constructor(private eventService: EventService) { }

  ngOnInit() {
    /**
     * Subscribing to the getEvent method in service
     */
    this.subscription = this.eventService.getEvent().subscribe((event) => {      
        this.event = event; //assign local variable as the updated value
      });
  }
  

}
