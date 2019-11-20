import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { Vote, Topic } from 'dot-staffer-logic';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-person-vote-picker',
  templateUrl: './person-vote-picker.component.html',
  styleUrls: ['./person-vote-picker.component.sass'],
})
export class PersonVotePickerComponent implements OnInit {
  @Output()
  vote: EventEmitter<Vote> = new EventEmitter<Vote>();

  @Input()
  topics: Topic[];

  @Input()
  persons: string[];

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      topicId1: new FormControl('', { updateOn: 'blur', validators: Validators.required }),
      topicId2: new FormControl('', { updateOn: 'blur', validators: Validators.required }),
      topicId3: new FormControl('', { updateOn: 'blur', validators: Validators.required }),
      person: new FormControl('', { updateOn: 'blur', validators: Validators.required }),
    });
  }

  ngOnInit() {}

  addVote() {
    this.vote.emit({ person: this.form.get('person').value, prio: 1, topicId: this.form.get('topicId1').value } as Vote);
    this.vote.emit({ person: this.form.get('person').value, prio: 2, topicId: this.form.get('topicId2').value } as Vote);
    this.vote.emit({ person: this.form.get('person').value, prio: 3, topicId: this.form.get('topicId3').value } as Vote);
  }
}
