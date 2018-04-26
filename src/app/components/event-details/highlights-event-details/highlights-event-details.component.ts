import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-highlights-event-details',
  templateUrl: './highlights-event-details.component.html',
  styleUrls: ['./highlights-event-details.component.scss']
})
export class HighlightsEventDetailsComponent implements OnInit {

  @Input() event: Object;
  constructor() { }

  ngOnInit() {
  }

}
