import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.sass'],
})
export class PersonListComponent implements OnInit {
  @Input()
  persons: string[];

  @Output()
  deletePerson: EventEmitter<string> = new EventEmitter();

  @Output()
  deleteAllPersons: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public clearList() {
    this.deleteAllPersons.emit('bla');
  }

  public deleteOne(name: string) {
    this.deletePerson.emit(name);
  }
}
