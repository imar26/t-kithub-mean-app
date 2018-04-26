import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'sortResult' })
export class SortResults implements PipeTransform {

  transform(events: any[], sortBy: string): any {
    if (sortBy != null) {
      let valueSplit = sortBy.toString().split(": ");
      //Sorts Name of the event in Ascending Order
      if (valueSplit[1] == "Sort By Name(A-Z)") {
        let result = [];
        for (var i = 0; i < events.length; i++) {
          result.push(Array.of(events[i][0]));
        }
        let arr1 = [];
        for (let i = 0; i < result.length; i++) {
          result = result.sort();
          result.sort((a, b) => {
            if (a[0].name == b[0].name)
              return 0;
            else {
              if (a[0].name > b[0].name)
                return 1;
              else
                if (a[0].name < b[0].name)
                  return -1;
            }
          })
          arr1.push(result[i]);
        }
        return arr1;

      }
      //Sorts Event Name in descending order
      if (valueSplit[1] == "Sort By Name(Z-A)") {
        let result = [];
        for (var i = 0; i < events.length; i++) {
          result.push(Array.of(events[i][0]));
        }
        let arr1 = [];
        for (let i = 0; i < result.length; i++) {
          result = result.sort();
          result.sort((a, b) => {
            if (a[0].name == b[0].name)
              return 0;
            else {
              if (a[0].name > b[0].name)
                return -1;
              else
                if (a[0].name < b[0].name)
                  return 1;
            }
          })
          arr1.push(result[i]);
        }
        return arr1;
      }
      // Sorts Event Date in Ascending Order
      if (valueSplit[1] == "Sort By Date(Oldest to Newest)") {
        let result = [];
        for (var i = 0; i < events.length; i++) {
          result.push(Array.of(events[i][0]));
        }
        let arr1 = [];
        for (let i = 0; i < result.length; i++) {
          result = result.sort();
          result.sort((a, b) => {
            if (a[0].dates.start.localDate == b[0].dates.start.localDate)
              return 0;
            else {
              if (a[0].dates.start.localDate > b[0].dates.start.localDate)
                return 1;
              else
                if (a[0].dates.start.localDate < b[0].dates.start.localDate)
                  return -1;
            }
          })
          arr1.push(result[i]);
        }
        return arr1;
      }
      //Sorts Event Date in Descending Order
      if (valueSplit[1] == "Sort By Date(Newest to Oldest)") {

        let result = [];
        for (var i = 0; i < events.length; i++) {
          result.push(Array.of(events[i][0]));
        }
        let arr1 = [];
        for (let i = 0; i < result.length; i++) {
          result = result.sort();
          result.sort((a, b) => {
            if (a[0].dates.start.localDate == b[0].dates.start.localDate)
              return 0;
            else {
              if (a[0].dates.start.localDate > b[0].dates.start.localDate)
                return -1;
              else
                if (a[0].dates.start.localDate < b[0].dates.start.localDate)
                  return 1;
            }
          })
          arr1.push(result[i]);
        }
        return arr1;
      }
      // Sorts Event in various cities in Ascending order
      if (valueSplit[1] == "Sort By City Name(A-Z)") {
        let result = [];
        for (var i = 0; i < events.length; i++) {
          result.push(Array.of(events[i][0]));
        }
        let arr1 = []
        for (let i = 0; i < result.length; i++) {
          result = result.sort();
          result.sort((a, b) => {
            if (a[0]._embedded.venues[0].city.name == b[0]._embedded.venues[0].city.name)
              return 0;
            else {
              if (a[0]._embedded.venues[0].city.name > b[0]._embedded.venues[0].city.name)
                return 1;
              else
                if (a[0]._embedded.venues[0].city.name < b[0]._embedded.venues[0].city.name)
                  return -1;
            }
          })
          arr1.push(result[i]);
        }
        return arr1;
      }
      // Sorts Event in various cities in Descending order
      if (valueSplit[1] == "Sort By City Name(Z-A)") {
        let result = [];
        for (var i = 0; i < events.length; i++) {
          result.push(Array.of(events[i][0]));
        }
        let arr1 = [];
        for (let i = 0; i < result.length; i++) {
          result = result.sort();
          result.sort((a, b) => {
            if (a[0]._embedded.venues[0].city.name == b[0]._embedded.venues[0].city.name)
              return 0;
            else {
              if (a[0]._embedded.venues[0].city.name > b[0]._embedded.venues[0].city.name)
                return -1;
              else
                if (a[0]._embedded.venues[0].city.name < b[0]._embedded.venues[0].city.name)
                  return 1;
            }
          })
          arr1.push(result[i]);
        }
        return arr1;
      }
    }
    return events;
  }
}