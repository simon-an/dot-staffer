import { expect } from 'chai';
import { fake } from 'faker';
import { Vote, VoteTable } from '../src/model';

export function generateVotes(table: VoteTable): Vote[] {
  const votes: Vote[] = [];

  const topics: string[] = Object.keys(table);

  const allVotes = Object.values(table).reduce<number[]>(
    (sum: number[], prios1: { [key: string]: number }) => {
      return [(sum[0] += prios1['1']), (sum[1] += prios1['2']), (sum[2] += prios1['3'])];
    },
    [0, 0, 0],
  );

  //   console.log('allVotes', allVotes);
  expect(allVotes).to.deep.equal([30, 30, 30], 'votes sum must be 30');
  const persons: string[] = generatePersons(allVotes[0]);
  console.log('persons', persons.length);
  expect(persons).to.have.lengthOf(30, 'votes sum must be 30');

  const prios: string[] = ['1', '2', '3'];

  prios.forEach((prioString: string) => {
    topics.forEach((topicId: string) => {
      const prio = prioFromString(prioString);
      for (let unused = 0; unused < table[topicId][prioString]; unused++) {
        votes.push({
          topicId: topicId,
          person: '',
          prio: prio,
        });
      }
    });
  });

  shuffle(votes);

  for (let index = 0; index < persons.length; index++) {
    const topics: string[] = [];
    const v1 = votes.find(v => v.prio === 1 && v.person == '');
    if (v1) {
      v1.person = persons[index];
      topics.push(v1.topicId);
    } else {
      console.log('1', index, persons[index]);
    }
    const v2 = votes.find(v => v.prio === 2 && v.person == '' && !topics.includes(v.topicId));
    if (v2) {
      v2.person = persons[index];
      topics.push(v2.topicId);
    } else {
      console.log('2', index, persons[index]);
    }
    const v3 = votes.find(v => v.prio === 3 && v.person == '' && !topics.includes(v.topicId));
    if (v3) {
      v3.person = persons[index];
    } else {
      console.log('3', index, persons[index]);
    }
  }

  console.log(votes);

  return votes;
}

function prioFromString(prio: string): 1 | 2 | 3 {
  switch (prio) {
    case '1':
      return 1;
    case '2':
      return 2;
    case '3':
      return 3;
    default:
      throw new Error('invalid prio');
  }
}

function prioFromNumber(prio: number): 1 | 2 | 3 {
  switch (prio) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 3;
    default:
      throw new Error('invalid prio');
  }
}

function generatePersons(N: number) {
  const persons: string[] = [];
  for (let index = 0; index < N; index++) {
    persons.push(fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'));
  }

  return persons;
}

function shuffle(array: any[]): any[] {
  var currentIndex: number = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
