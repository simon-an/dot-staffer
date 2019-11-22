import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Vote, Topic, Session } from 'dot-staffer-logic';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { isVote } from 'dot-staffer-logic/lib/helpers';

@Component({
  selector: 'app-dnd-picker',
  templateUrl: './dnd-picker.component.html',
  styleUrls: ['./dnd-picker.component.sass'],
})
export class DndPickerComponent implements OnInit {
  @Input()
  votes: Vote[];
  @Input()
  topics: Topic[];
  @Input()
  sessionHolders: { [key: string]: string[] };

  @Input()
  sessions$: BehaviorSubject<Session[]>;

  done;
  todo;
  result: { [key: string]: { person: string }[] } = {};
  maxItems = 6;
  numberOfVotesPerPerson = 1;

  currentTopic$ = new BehaviorSubject<string>('');

  constructor() {
    this.currentTopic$.pipe(filter(Boolean)).subscribe((topic: string) => {
      // console.log(topic);
      if (this.result[topic] === undefined) {
        this.result[topic] = [...this.sessionHolders[topic].map(p => ({ person: p }))];
        // this.result[topic] = [];
      }
      this.done = this.result[topic];
      this.todo = this.votes.filter(x => !this.enoughVotes(x.person)).sort(this.voteCompare);
    });
  }

  voteCompare = (v1: Vote, v2: Vote): number => {
    if (this.currentTopic$.value !== v1.topicId) {
      return 1;
    }
    if (this.currentTopic$.value !== v2.topicId) {
      return -1;
    }
    // return 0;
    return v1.prio - v2.prio;
  }

  ngOnInit() {
    this.todo = this.votes.filter(x => !this.enoughVotes(x.person)).sort(this.voteCompare);

    this.sessions$.subscribe((sessions: Session[]) => {
      sessions.forEach(session => {
        this.result[session.topicId] = session.discussers.map(d => ({
          person: isVote(d) ? d.person : d,
          topicId: session.topicId,
          prio: isVote(d) ? d.prio : 0,
        }));
      });
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.todo = this.votes.filter(x => !this.enoughVotes(x.person)).sort(this.voteCompare);
  }
  enoughVotes(person: string): boolean {
    const votesFound = Object.values(this.result).filter(v => v.map(p => p.person).includes(person)).length;
    // console.log(votesFound);
    return votesFound >= this.numberOfVotesPerPerson;
  }
}
