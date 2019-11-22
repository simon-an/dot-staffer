import { Component, OnInit, Input } from '@angular/core';
import { Vote } from 'dot-staffer-logic';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.sass']
})
export class VotesComponent implements OnInit {

  @Input()
  votes: Vote[];

  constructor() { }

  ngOnInit() {
  }

}
