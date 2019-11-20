import { assignCriticicers, assignDiscusser, calculateSlot, forceAssignDiscusser, isVote } from './helpers';
import { Input, Session, Vote } from './model';
import { filterAndSortCandidatesByTopicId, toMapPrioByPersonAndTopic, toMapTopicSelectedByPerson } from './vote-transformer';

function onlyUnique(value: string, index: number, array: string[]) {
  return array.indexOf(value) === index;
}

export function validateInput(input: Input) {
  input.topics.forEach(topic => {
    if (input.sessionHolders[topic.id] === undefined) {
      throw new Error(`Topic ${topic.id} is not set. must be set to empty array, when there is no session holder`);
    }
  });
  const notVoted = Object.values(input.sessionHolders).reduce((sum, current: string[]) => {
    return (sum += current.length);
  }, 0);
  if (input.votes.length !== (input.config.participants - notVoted) * 3) {
    throw new Error(`Not enougth votes: ${input.votes.length} but must be ${(input.config.participants - notVoted) * 3} `);
  }
  const persons = input.votes.map(vote => vote.person).filter(onlyUnique);
  if (persons.length < input.config.participants - notVoted) {
    throw new Error(`Not all participants have voted. Found persons ${persons.length}. Expected: ${input.config.participants}`);
  }

  const votesWithoutValidName = input.votes.map(vote => vote.person).filter(p => p === '');
  if (votesWithoutValidName.length > 0) {
    throw new Error(`Found #${votesWithoutValidName.length} votes without valid person`);
  }

  const voterPrioMap: { [key: string]: number[] } = {};
  const voterTopicMap: { [key: string]: string[] } = {};

  input.votes.forEach(vote => {
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
      if (prios[index + 1] == prios[index]) {
        // console.error('duplicated prios', name, prios);
        throw new Error('Found duplicated prios for person: ' + name);
      }
    }
  });

  Object.keys(voterTopicMap).forEach(name => {
    const topicIds = voterTopicMap[name].slice().sort();
    for (let index = 0; index < topicIds.length; index++) {
      if (topicIds[index + 1] == topicIds[index]) {
        // console.error('duplicated topicIds', name, topicIds);
        throw new Error('Found duplicated topicIds for person: ' + name);
      }
    }
  });

  // expect(Object.keys(voterPrioMap).length).to.equal(input.);
  // expect(Object.keys(voterTopicMap).length).to.equal(15, 'criticers must be 15');
}

export function simpleMagic(input: Input): Session[] {
  const persons = toMapTopicSelectedByPerson(input.votes);
  const personvotes = toMapPrioByPersonAndTopic(input.votes, input.topics.map(t => t.id));
  const votesUsed: Vote[] = [];
  const sessions = input.topics.map(topic => {
    return {
      criticers: [],
      discussers: [],
      slot: topic.slot,
      topicId: topic.id,
    } as Session;
  });

  console.log('p', persons);
  console.log('v', personvotes);
  sessions.forEach(session => {
    if (session.discussers.length < input.config.discussers) {
      const diff = input.config.discussers - session.discussers.length;
      const candidates = filterAndSortCandidatesByTopicId(personvotes, persons, session.topicId);
      let bla = candidates.filter(c => !votesUsed.find(v => v.person === c));
      if (bla.length > 0) {
        // noop
        console.log('candidates', bla, session.topicId);
      } else {
        bla = Object.keys(persons).filter(c => !votesUsed.find(v => v.person === c));
        console.log('rest', bla, session.topicId);
      }
      bla.slice(0, diff).forEach(person => {
        const usedVote = input.votes.find(v => v.topicId === session.topicId && v.person === person);
        if (usedVote) {
          votesUsed.push(usedVote);
        }
        session.discussers.push(person);
        // delete persons[person];
      });
    }
  });

  console.log('votes used: ', votesUsed);
  return sessions;
}

export function magic(input: Input): Session[] {
  validateInput(input);
  const persons = input.votes.map(vote => vote.person).filter(onlyUnique);
  const topicsPerSlot = Math.round(input.topics.length / input.config.slots);
  let i = 0;
  const personBusy: { [key: string]: number[] } = {};
  const slottedTopics: { [key: string]: number } = input.topics.reduce<{
    [key: string]: number;
  }>((result, topic) => {
    const slot = calculateSlot(i, topicsPerSlot);
    i++;
    result[topic.id] = slot;
    return result;
  }, {});

  /* create sessions*/
  const sessions = input.topics.map(topic => {
    const slot = slottedTopics[topic.id];

    return {
      criticers: [],
      discussers: [],
      slot,
      topicId: topic.id,
    } as Session;
  });

  assignDiscusser(1, sessions, input, personBusy);
  assignDiscusser(2, sessions, input, personBusy);
  assignDiscusser(3, sessions, input, personBusy);
  // forceAssignDiscusser(sessions, input, personBusy);
  // assignCriticicers(1, sessions, input, personBusy);
  // assignCriticicers(2, sessions, input, personBusy);
  // assignCriticicers(3, sessions, input, personBusy);
  console.log('persons assigned: ', Object.keys(personBusy).length);
  // persons.forEach(p => console.log("busyd1", p,  personBusy[p]));
  // persons.forEach(p => console.log("busyc1", p,  personBusy[p]));
  // persons.forEach(p => console.log("busyd2", p,  personBusy[p]));
  // persons.forEach(p => console.log("busyc2", p,  personBusy[p]));
  // persons.forEach(p => console.log("busyd3", p,  personBusy[p]));
  // persons.forEach(p => console.log("busyc3", p,  personBusy[p]));

  sessions.forEach(session => {
    if (session.discussers.length < input.config.discussers) {
      const diff = input.config.discussers - session.discussers.length;
      const candidates = persons.filter(p => !personBusy[p] || !personBusy[p].includes(session.slot));
      // persons.forEach(p => console.log("busy?", p,  personBusy[p]));
      if (candidates.length < 1) {
        throw Error('Workshop creation failed, due to not able to find discussers');
      }
      candidates.slice(0, diff).forEach(person => {
        session.discussers.push(person);
        if (!personBusy[person]) {
          personBusy[person] = [session.slot];
        } else {
          personBusy[person].push(session.slot);
        }
      });
    }
  });

  /* Assign remaining persons to open criticicer chairs */
  sessions.forEach(session => {
    if (session.criticers.length < input.config.criticers) {
      const diff = input.config.criticers - session.criticers.length;
      // console.log("criticers missing: ", session.topicId, diff, session.criticers.length, input.config.criticers);
      const candidates = persons.filter(p => personBusy[p] === undefined || !personBusy[p].includes(session.slot));
      if (candidates.length < 1) {
        throw Error('Workshop creation failed, due to not able to find criticers');
      }
      // console.log("Additonal criticer candidates for topic/slot:", candidates, session.topicId, session.slot);
      candidates.slice(0, diff).forEach(person => {
        session.criticers.push(person);
        if (!personBusy[person]) {
          personBusy[person] = [session.slot];
        } else {
          personBusy[person].push(session.slot);
        }
      });
    }
  });

  return sessions;
}
