import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.sass'],
})
export class AddPersonComponent implements OnInit {
  @Output()
  newPerson: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  addPerson(name: string) {
    this.newPerson.emit(name);
  }
}
