import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Topic } from 'dot-staffer-logic';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.sass']
})
export class AddTopicComponent implements OnInit {

  @Output()
  addNewTopic: EventEmitter<Topic> = new EventEmitter<Topic>();

  constructor() {}

  ngOnInit() {}

  addTopic(topic: Topic) {
    this.addNewTopic.emit(topic);
  }

}
