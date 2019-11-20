import { Component, OnInit, Input } from '@angular/core';
import { Session } from 'dot-staffer-logic';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.sass'],
})
export class ResultComponent implements OnInit {
  @Input()
  sessions: Session[];

  @Input()
  sessionSelected: string;

  constructor() {}

  ngOnInit() {}
}
