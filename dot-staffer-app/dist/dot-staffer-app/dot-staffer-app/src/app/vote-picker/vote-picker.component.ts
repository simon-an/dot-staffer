import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Vote } from 'dot-staffer-logic';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-vote-picker',
  templateUrl: './vote-picker.component.html',
  styleUrls: ['./vote-picker.component.sass'],
})
export class VotePickerComponent implements OnInit {
  @Output()
  vote: EventEmitter<Vote> = new EventEmitter<Vote>();

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      topicId: new FormControl('', { updateOn: 'blur',  validators: Validators.required, }),
      person: new FormControl('', { updateOn: 'blur',  validators: Validators.required, }),
      prio: new FormControl('', { updateOn: 'blur',  validators: [Validators.required, Validators.min(1), Validators.max(3)], })
    });
  }

  ngOnInit() {}

  addVote() {
    this.vote.emit(this.form.value);
  }
}
