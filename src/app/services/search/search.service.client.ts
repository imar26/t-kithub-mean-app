import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EventEmitter } from 'events';

@Injectable()
export class SearchKeywordService {

  relevantEvents = [];
  keyword: string;
  constructor() { }

  //set the event list
  setRelevantEvents(events: any[]) {    
    this.relevantEvents = events;
    
  }

  //retrieve the list
  getRelevantEvents(){
    return this.relevantEvents;
  }
  
  setKeyword(keyword: string){
    this.keyword = keyword;
  }

}