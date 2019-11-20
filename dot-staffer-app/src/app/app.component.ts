import { Component } from '@angular/core';
import { magic, validateInput, Vote, Topic, assignDiscusser, Workshop, Session } from 'dot-staffer-logic';
import { Input as WorkshopInput, Session as WorkshopSession, Workshop as WorkshopConfig } from 'dot-staffer-logic/lib';
import { BehaviorSubject, Subject, zip, of, Observable } from 'rxjs';
import { take, map, withLatestFrom } from 'rxjs/operators';
import { data } from './test-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dot-staffer-app';
  error$ = new BehaviorSubject('');
  sessions$ = new BehaviorSubject<WorkshopSession[]>([]);
  votes: Vote[] = [...data.votes] as Vote[];
  personsList$ = new BehaviorSubject(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q']);
  persons$ = this.personsList$.pipe(map((l: string[]) => l.filter(p => !this.votes.find(v => v.person === p))));
  config$: BehaviorSubject<WorkshopConfig> = new BehaviorSubject({ ...data.config });
  topics$: BehaviorSubject<Topic[]> = new BehaviorSubject<Topic[]>([...data.topics]);
  sessionHolders: { [key: string]: string[] } = { ...data.sessionHolders };
  personBusy: { [key: string]: number[] } = {};
  input$: Observable<WorkshopInput> = zip(
    this.config$.asObservable(),
    of({ ...data.sessionHolders } as { [key: string]: string[] }),
    this.topics$,
    of(this.votes),
  ).pipe(
    map(([config, sessionHolders, topics, votes]) => {
      return {
        config,
        sessionHolders,
        topics,
        votes,
      };
    }),
  );

  constructor() {
    this.topics$
      .pipe(
        map((topics: Topic[]) =>
          topics.map(topic => {
            return {
              criticers: [],
              discussers: [],
              slot: 1,
              topicId: topic.id,
            } as WorkshopSession;
          }),
        ),
      )
      .subscribe(x => this.sessions$.next(x));
  }

  sessionSelected$ = new BehaviorSubject<string>('');

  public validate(input: WorkshopInput) {
    try {
      validateInput(input);
    } catch (error) {
      console.error(error);
      this.error$.next(error);
    }
  }

  public async onAssignPrio(prio: number) {
    if (
      !(await this.error$
        .asObservable()
        .pipe(take(1))
        .toPromise())
    ) {
      if (prio === 1) {
        // reset topics
        this.topics$.next([...this.topics$.getValue()]);
        this.personBusy = {};
      }
      this.sessions$.pipe(take(1), withLatestFrom(this.input$)).subscribe(([sessions, input]) => {
        if (prio === 1) {
          this.assignSlotHolders(0, sessions, this.sessionHolders);
        }
        this.assignPrio(sessions, input, this.personBusy, prio);
        this.sessions$.next(sessions);
      });
    }
  }

  assignPrio(sessions: WorkshopSession[], input: WorkshopInput, personBusy, prio: number) {
    assignDiscusser(prio, sessions, input, personBusy);
    console.log('persons assigned: ', Object.keys(personBusy).length);
    return sessions;
  }

  assignSlotHolders(usePrio: number, sessions: WorkshopSession[], holderMap: { [key: string]: string[] }) {
    sessions.forEach(session => {
      holderMap[session.topicId].forEach(holder => {
        session.discussers.push({
          person: holder,
          prio: usePrio,
          topicId: session.topicId,
        } as Vote);
      });
      // session.discussers = [...holderMap[session.topicId]];
    });
  }

  addVote(vote: Vote) {
    this.votes.push(vote);
  }

  addPerson(person: string) {
    if (person && !this.personsList$.getValue().find(p => p === person)) {
      this.personsList$.next([...this.personsList$.getValue(), person]);
    }
  }

  deletePerson(name: string) {
    this.personsList$.next([...this.personsList$.getValue().filter(p => p !== name)]);
  }

  deleteAllPersons() {
    this.personsList$.next([]);
  }

  newSettings(settings: WorkshopConfig) {
    this.config$.next({ ...settings });
  }

  addTopic(topic: Topic) {
    if (topic && !this.topics$.getValue().find(t => t.id === topic.id)) {
      this.topics$.next([...this.topics$.getValue(), topic]);
    }
  }

  deleteTopic(id: string) {
    this.topics$.next([...this.topics$.getValue().filter(p => p.id !== id)]);
  }

  deleteAllTopics() {
    this.topics$.next([]);
  }
}
