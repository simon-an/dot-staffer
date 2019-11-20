import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Workshop, Topic, Vote, Session } from 'dot-staffer-logic';
import { onlyUnique, isVote } from 'dot-staffer-logic/lib/helpers';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.sass'],
})
export class ValidationComponent implements OnInit, OnChanges {
  @Input()
  config: Workshop;
  @Input()
  sessions: Session[];
  @Input()
  votes: Vote[];
  @Input()
  topics: Topic[];
  @Input()
  persons: string[];
  @Input()
  sessionHolders: { [key: string]: string[] };

  errors: string[] = [];
  info: string[] = [];
  warn: string[] = [];

  constructor() {}

  ngOnInit() {
    this.validate();
  }

  ngOnChanges() {
    this.validate();
  }

  validate() {
    this.errors = [];
    this.warn = [];
    this.info = [];

    const minimumSessions = Math.round(this.config.participants / (this.config.discussers * this.sessions.length));
    this.info.push('minimumSessions:' + minimumSessions);

    const assignments = this.sessions.map(s => s.discussers.length).reduce((sum, n) => sum + n, 0);
    this.info.push('Assignments:' + assignments);

    this.info.push('Persons valid for voting:' + this.persons.length);
    this.info.push(
      'SessionHolders:' +
        Object.values(this.sessionHolders).reduce((sum: number, current: string[]) => {
          return sum + current.length;
        }, 0),
    );
    this.info.push('Participants:' + this.config.participants);
    this.topics.forEach(topic => {
      if (this.sessionHolders[topic.id] === undefined) {
        this.errors.push(`Topic ${topic.id} is not set. must be set to empty array, when there is no session holder`);
      }
    });
    this.info.push('Votes:' + this.votes.length);
    const notVoted = Object.values(this.sessionHolders).reduce((sum, current) => {
      return (sum += current.length);
    }, 0);
    if (this.votes.length > (this.config.participants - notVoted) * 3) {
      this.errors.push(`Too much votes : ${this.votes.length} but must be ${(this.config.participants - notVoted) * 3}.`);
    }
    if (this.votes.length < (this.config.participants - notVoted) * 3) {
      this.errors.push(`Not enougth votes: ${this.votes.length} but must be ${(this.config.participants - notVoted) * 3}. `);
    }
    const personsByVotes = this.votes.map(vote => vote.person).filter(onlyUnique);
    if (personsByVotes.length < this.config.participants - notVoted) {
      this.errors.push(`Not all participants have voted. Found persons ${personsByVotes.length}. Expected: ${this.config.participants}`);
    }
    const votesWithoutValidName = this.votes.filter(v => !this.persons.includes(v.person));
    if (votesWithoutValidName.length > 0) {
      this.errors.push(`Found #${votesWithoutValidName.length} votes without valid person`);
      votesWithoutValidName.forEach((vote: Vote) => {
        this.errors.push(`Vote has a invalid name ${vote.person}`);
      });
    }
    const votesWithEmptyName = this.votes.map(vote => vote.person).filter(p => p === '');
    if (votesWithEmptyName.length > 0) {
      this.errors.push(`Found #${votesWithEmptyName.length} votes with empty person`);
    }
    const personsWithoutEnoughVotes = this.persons.filter(person => this.votes.filter(v => person === v.person).length > 3);
    if (personsWithoutEnoughVotes.length > 0) {
      this.errors.push(`Found #${personsWithoutEnoughVotes.length} of persons without enough votes`);
    }
    const personsVotes = this.persons
      .filter(person => this.votes.filter(v => person === v.person).length < 3)
      .reduce((map: { [key: string]: number }, person) => {
        return { ...map, [person]: this.votes.filter(v => person === v.person).length };
      }, {});
    Object.keys(personsVotes).forEach((person: string) => {
      this.errors.push(`Person ${person} has #${3 - personsVotes[person]} missing votes.`);
    });

    const voterPrioMap = {};
    const voterTopicMap = {};
    this.votes.forEach(vote => {
      const name = isVote(vote) ? vote.person : vote;
      if (voterPrioMap[name] === undefined) {
        voterPrioMap[name] = [vote.prio];
      } else {
        voterPrioMap[name].push(vote.prio);
      }
      if (voterTopicMap[name] === undefined) {
        voterTopicMap[name] = [vote.topicId];
      } else {
        voterTopicMap[name].push(vote.topicId);
      }
    });
    Object.keys(voterPrioMap).forEach(name => {
      const prios = voterPrioMap[name].slice().sort();
      for (let index = 0; index < prios.length; index++) {
        if (prios[index + 1] === prios[index]) {
          // console.error('duplicated prios', name, prios);
          this.errors.push('Found duplicated prios for person: ' + name);
        }
      }
    });
    Object.keys(voterTopicMap).forEach(name => {
      const topicIds = voterTopicMap[name].slice().sort();
      for (let index = 0; index < topicIds.length; index++) {
        if (topicIds[index + 1] === topicIds[index]) {
          // console.error('duplicated topicIds', name, topicIds);
          this.errors.push('Found duplicated topicIds for person: ' + name);
        }
      }
    });

    const personSessionCountMap = this.persons.reduce((res, person: string) => {
      const assignedSessions = this.sessions.filter(s => s.discussers.find(v => (isVote(v) ? v.person === person : v === person))).length;
      return { ...res, [person]: assignedSessions };
    }, {});
    Object.keys(personSessionCountMap).forEach((person: string) => {
      if (personSessionCountMap[person] < minimumSessions) {
        this.errors.push(`Person ${person} has not enough sessions assigned. ${personSessionCountMap[person]}/${minimumSessions}`);
      }
    });
  }
}
