import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'filterResult', pure: false })
export class FilterResults implements PipeTransform {

    transform(events: any[], name: any[], state: string, minPrice: number, maxPrice: number, music: boolean, film: boolean, sports: boolean, at: boolean, startDate: Date, endDate: Date): any {
        if (name && (!state || state == "0: ") && !minPrice && !maxPrice && !music && !film && !startDate && !endDate && !sports && !at) {

            //filter on the basis of name


            let result = [];
            for (var i = 0; i < events.length; i++) {

                result.push(Array.of(events[i][0]));
            }
            let arr2 = [];
            for (var i = 0; i < result.length; i++) {

                if (result[i][0].name.toLowerCase().indexOf(name.toString().toLowerCase()) != -1) {
                    arr2.push(result[i]);
                }
            }

            return arr2;
        }

        if (state != "0: ") {
            if (!name && state && !minPrice && !maxPrice && !music && !film && !startDate && !endDate && !sports && !at) {

                //filter on the basis of state          

                // console.log(events);
                // if(state){            

                let st = state.toString();
                let st1 = st.split(": ", st.length);
                let result = [];
                for (var i = 0; i < events.length; i++) {
                    result.push(Array.of(events[i][0]));
                }
                let arr2 = [];
                for (var i = 0; i < result.length; i++) {
                    if (result[i][0]._embedded.venues[0].state.name.indexOf(st1[1]) != -1) {
                        arr2.push(result[i]);
                    }
                }
                return arr2;
            }
        }


        /*if (name && state) {
            let st = state.toString();
            console.log(st);
            let st1 = st.split(": ", st.length);
            let result = [];
            for (var i = 0; i < events.length; i++) {
                result.push(Array.of(events[i][0]));
            }
            let arr2 = [];
            console.log("result");
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                if ((result[i][0]._embedded.venues[0].state.name.indexOf(st1[1]) != -1) && (result[i][0].name.toLowerCase().indexOf(name) != -1)) {
                    arr2.push(result[i]);
                }
            }
            console.log(arr2);
            return arr2;
        }*/
        if (!name && (!state || state == "0: ") && minPrice && maxPrice && !music && !film && !startDate && !endDate && !sports && !at) {
            //filter on the basis of price
            console.log(maxPrice);
            let result = [];
            for (var i = 0; i < events.length; i++) {
                result.push(Array.of(events[i][0]));
            }
            let arr2 = [];
            for (var i = 0; i < result.length; i++) {
                if ((result[i][0].priceRanges[0].min >= minPrice) && (result[i][0].priceRanges[0].max <= maxPrice)) {
                    arr2.push(result[i]);
                }
            }
            return arr2;
        }

        if (!name && (!state || state == "0: ") && !minPrice && !maxPrice && music && !startDate && !endDate) {

            //filter on the basis of segment : Music

            let result = [];
            for (var i = 0; i < events.length; i++) {
                result.push(Array.of(events[i][0]));
            }
            let arr2 = [];
            for (var i = 0; i < result.length; i++) {
                if (result[i][0].classifications[0].segment.name.toLowerCase().indexOf("music") != -1) {
                    arr2.push(result[i]);
                }
            }
            return arr2;

        }
        if (!name && (!state || state == "0: ") && !minPrice && !maxPrice && !startDate && !endDate && sports) {

            //filter on the basis of segment : Sports

            let result = [];
            for (var i = 0; i < events.length; i++) {
                result.push(Array.of(events[i][0]));
            }
            let arr2 = [];

            for (var i = 0; i < result.length; i++) {
                if (result[i][0].classifications[0].segment.name.toLowerCase().indexOf("sports") != -1) {
                    arr2.push(result[i]);
                }
            }
            return arr2;

        }
        if (!name && (!state || state == "0: ") && !minPrice && !maxPrice && !startDate && !endDate && at) {
            //filter on the basis of segment : Arts & Theatre
            let result = [];
            for (var i = 0; i < events.length; i++) {
                result.push(Array.of(events[i][0]));
            }
            let arr2 = [];

            for (var i = 0; i < result.length; i++) {
                if (result[i][0].classifications[0].segment.name.toLowerCase().indexOf("at") != -1) {
                    arr2.push(result[i]);
                }
            }
            return arr2;
        }
        if (!name && (!state || state == "0: ") && !minPrice && !maxPrice && !startDate && !endDate && film) {

            //filter on the basis of segment : Film

            let result = [];
            for (var i = 0; i < events.length; i++) {
                result.push(Array.of(events[i][0]));
            }
            let arr2 = [];
            for (var i = 0; i < result.length; i++) {
                if (result[i][0].classifications[0].segment.name.toLowerCase().indexOf("film") != -1) {
                    arr2.push(result[i]);
                }
            }
            return arr2;
        }

        /*if (startDate && !endDate) {
            let result = [];
            for (var i = 0; i < events.length; i++) {
                result.push(Array.of(events[i][0]));
            }
            console.log(result);
            let arr2 = [];

            for (var i = 0; i < result.length; i++) {
                if (result[i][0].dates.start.localDate >= startDate) {
                    arr2.push(result[i]);
                }
            }
            console.log(arr2);
            return arr2;
        }*/

        /*if (endDate && !startDate) {
            let result = [];
            for (var i = 0; i < events.length; i++) {
                result.push(Array.of(events[i][0]));
            }
            console.log(result);
            let arr2 = [];

            for (var i = 0; i < result.length; i++) {
                if (result[i][0].dates.start.localDate <= endDate) {
                    arr2.push(result[i]);
                }
            }
            console.log(arr2);
            return arr2;
        }*/
        /*if(!name && !state && !minPrice && !maxPrice && music && film && startDate && endDate && sports && at){
            let result = [];
            for (var i = 0; i < events.length; i++) {
                result.push(Array.of(events[i][0]));
            }
            console.log(result);
            let arr2 = [];

            for (var i = 0; i < result.length; i++) {
                if ((result[i][0].classifications[0].segment.name.toLowerCase().indexOf("film") != -1)
                    && (result[i][0].classifications[0].segment.name.toLowerCase().indexOf("music") != -1)
                    && (result[i][0].classifications[0].segment.name.toLowerCase().indexOf("sports") != -1)
                    && (result[i][0].classifications[0].segment.name.toLowerCase().indexOf("arts") != -1)) {
                    arr2.push(result[i]);
                }
            }
            console.log(arr2);
            return arr2;
        }*/


        if (!name && (!state || state == "0: ") && !minPrice && !maxPrice && !music && !film && startDate && endDate && !sports && !at) {
            //filter on the basis of start date and end date
            let result = [];
            for (var i = 0; i < events.length; i++) {
                result.push(Array.of(events[i][0]));
            }
            let arr2 = [];
            for (var i = 0; i < result.length; i++) {
                if ((result[i][0].dates.start.localDate >= startDate) && (result[i][0].dates.start.localDate <= endDate)) {
                    arr2.push(result[i]);
                }
            }
            return arr2;
        }

        if (name && state && minPrice && maxPrice && startDate && endDate && !music && !film && !sports && !at) {
            let result = [];
            let st = state.toString();
            let st1 = st.split(": ", st.length);
            for (var i = 0; i < events.length; i++) {
                result.push(Array.of(events[i][0]));
            }
            let arr2 = [];

            for (var i = 0; i < result.length; i++) {
                if (
                    (result[i][0].dates.start.localDate >= startDate)
                    && (result[i][0].dates.start.localDate <= endDate)
                    && (result[i][0]._embedded.venues[0].state.name.indexOf(st1[1]) != -1)
                    && (result[i][0].name.toLowerCase().indexOf(name) != -1)
                    && (result[i][0].priceRanges[0].min >= minPrice)
                    && (result[i][0].priceRanges[0].max <= maxPrice)
                ) {
                    arr2.push(result[i]);
                }
            }
            return arr2;
        }
        //return default array if no filter is selected
        return events;
    }
}