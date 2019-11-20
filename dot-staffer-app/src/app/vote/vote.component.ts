import { Component, OnInit, Input } from '@angular/core';
import { Vote } from 'dot-staffer-logic';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.sass'],
})
export class VoteComponent implements OnInit {
  @Input()
  vote: Vote;

  constructor() {}

  ngOnInit() {}
}
