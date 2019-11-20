import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Topic } from 'dot-staffer-logic';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.sass'],
})
export class TopicListComponent implements OnInit {
  @Input()
  topics: Topic[];

  @Output()
  deleteTopic: EventEmitter<string> = new EventEmitter();

  @Output()
  deleteAllTopics: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  clearList() {
    this.deleteAllTopics.emit('bla');
  }

  removeTopic(name: string) {
    this.deleteTopic.emit(name);
  }
}
