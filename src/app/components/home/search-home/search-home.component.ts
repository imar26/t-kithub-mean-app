import {Component, OnInit} from '@angular/core';
import {EventService} from '../../../services/events/events.service.client';
import {SearchKeywordService} from '../../../services/search/search.service.client';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {GeolocationService} from '../../../services/geolocation/geolocation.service.client';

@Component({selector: 'app-search-home', templateUrl: './search-home.component.html', styleUrls: ['./search-home.component.scss']})
export class SearchHomeComponent implements OnInit {
  //properties
  location : string = "Boston"; //default location
  message : string;
  citiesInUS : Set < string > = new Set < string > ();
  flag : boolean = false;
  subscription : Subscription;

  constructor(private router : Router, private geoService : GeolocationService, private eventService : EventService, private data : SearchKeywordService) {}

  ngOnInit() {
    this.getLocation();
    this.getCitiesList();
  }

  // get users location
  getLocation() {
    this
      .geoService
      .getLocation()
      .subscribe((position) => {
        if (position.code == 1) {
          this.location = "Boston";
          this
            .eventService
            .setCity(this.location); //set the city value as soon as we get user's input
        } else {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;

          this
            .geoService
            .getCityName(latitude, longitude)
            .subscribe((data) => {
              let address = data.results[0];
              if (address) {
                let formatted_address = address.formatted_address;
                let value = formatted_address.split(",");
                let count = value.length;
                let city = value[count - 3];
                this.location = city;
              }

              this
                .eventService
                .setCity(this.location); //set this city which wll be listened continuously
            })

        }

      })

  }

  // get list of cities
  getCitiesList() {
    this
      .geoService
      .getAllCitiesInUS()
      .subscribe((cities) => {
        //this.citiesInUS.add('');
        let venuesArr = cities._embedded.venues;
        //console.log(venuesArr.length);
        for (let i = 0; i < venuesArr.length; i++) {
          this
            .citiesInUS
            .add(venuesArr[i].city.name);
        }
      })

  }

  /**
   * Function to navigate user to search page as soon as he clicks on search button.
   * The search results based on keyword are displayed in different component.
   * @param event
   */
  onKeyDown(event : any) {
    this
      .router
      .navigate(['/search/' + this.message]);
  }
  onclick(event : any) {
    this.flag = true;
    //console.log(this.flag);
  }
  // Function to fetch the city name on selection of the city name from dropdown
  // list
  onChange(value) {
    let valueStr = value.split(": ")
    this.location = valueStr[1];
    this
      .eventService
      .setCity(this.location);
    this.flag = false;
  }

}
