import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Session } from 'dot-staffer-logic';

@Component({
  selector: 'app-session-result',
  templateUrl: './session-result.component.html',
  styleUrls: ['./session-result.component.sass'],
})
export class SessionResultComponent implements OnInit {
  @Input()
  sessions: Session[];

  @Output()
  sessionSelected = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}
}
