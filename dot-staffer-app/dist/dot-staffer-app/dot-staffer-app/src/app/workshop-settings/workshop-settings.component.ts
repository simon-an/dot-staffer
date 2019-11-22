import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Workshop } from 'dot-staffer-logic';

@Component({
  selector: 'app-workshop-settings',
  templateUrl: './workshop-settings.component.html',
  styleUrls: ['./workshop-settings.component.sass'],
})
export class WorkshopSettingsComponent implements OnInit, OnChanges {
  @Input()
  currentSettings: Workshop;

  @Output()
  newSettings = new EventEmitter<Workshop>();

  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      participants: new FormControl(),
      criticers: new FormControl(),
      discussers: new FormControl(),
      slots: new FormControl(),
    });
  }

  ngOnInit() {
    this.formGroup.controls.participants.setValue(this.currentSettings.participants);
    this.formGroup.controls.criticers.setValue(this.currentSettings.criticers);
    this.formGroup.controls.discussers.setValue(this.currentSettings.discussers);
    this.formGroup.controls.slots.setValue(this.currentSettings.slots);
  }

  ngOnChanges(x) {
    console.log('changes', x);
    this.formGroup.controls.participants.setValue(this.currentSettings.participants);
    this.formGroup.controls.criticers.setValue(this.currentSettings.criticers);
    this.formGroup.controls.discussers.setValue(this.currentSettings.discussers);
    this.formGroup.controls.slots.setValue(this.currentSettings.slots);
  }

  onSubmit() {
    this.newSettings.emit(this.formGroup.getRawValue());
  }
}
