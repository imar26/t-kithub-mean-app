import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AgmMap } from '@agm/core';
import { Subscription } from 'rxjs/Subscription';
import { EventService } from '../../../services/events/events.service.client';


@Component({
  selector: 'app-location-event-details',
  templateUrl: './location-event-details.component.html',
  styleUrls: ['./location-event-details.component.scss']
})
export class LocationEventDetailsComponent implements OnInit {

  @Input() event: Object;
  @Input('lat') _lat: string;

  // get latitude
  get lat(): number {
    return parseFloat(this._lat);
  }

  @Input('lng') _lng: string;

  //get longitude
  get lng(): number {

    return parseFloat(this._lng);

  }
  
  zoom: number = 8;
  subscription: Subscription;
  flag: boolean = false;
  dir = undefined;
  @ViewChild(AgmMap)
  public agmMap: AgmMap

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
  }
  
}
