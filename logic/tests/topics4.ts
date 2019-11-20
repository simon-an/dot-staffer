// import { expect } from 'chai';
// import { Input, magic } from '../src';
// import { calculateScore, calculateSlot } from '../src/helpers';
// import { ScoreTable, Vote } from '../src/model';
// import scoreJson from '../src/score.json';

// describe('4 topics ', () => {
//   const scoreTable: ScoreTable = scoreJson;
//   it('magic function random votes', () => {
//     const input4: Input = {
//       config: {
//         criticers: 4,
//         discussers: 8,
//         participants: 30,
//         slots: 2,
//       },
//       sessionHolders: { '1': [], '2': [], '3': [], '4': [], '5': [] },
//       topics: [
//         {
//           id: '1',
//           name: 'topic1',
//           slot: 1,
//         },
//         {
//           id: '2',
//           name: 'topic2',
//           slot: 1,
//         },
//         {
//           id: '3',
//           name: 'topic3',
//           slot: 2,
//         },
//         {
//           id: '4',
//           name: 'topic4',
//           slot: 2,
//         },
//       ],
//       votes: [],
//     };

//     for (let index = 0; index < 30; index++) {
//       for (let prio = 1; prio < 4; prio++) {
//         const topic = Math.floor(Math.random() * 4) + 1;
//         input4.votes.push({ person: `${index + 1}`, prio, topicId: `${topic}` } as Vote);
//       }
//     }
//     // console.log(input4);
//     const discussions = magic(input4);

//     const score = calculateScore(input4, discussions, scoreTable);

//     expect(score).to.greaterThan(30 * 5); // Above Minimum Score
//     // expect(score).to.equal(30*8); // match Best Score
//     expect(score).to.greaterThan(180); // Event Better Score
//     // console.log('result:', JSON.stringify(discussions, undefined, 2));

//     let ind = 1;
//     discussions.forEach(d => {
//       expect(d.topicId).to.be.equal(`${ind}`, 'topic id is wrong' + ind);
//       expect(d.discussers.length).to.be.equal(8, 'discussers length is wrong' + ind);
//       expect(d.criticers.length).to.be.equal(4, 'criticier length is wrong' + ind);
//       expect(d.slot).to.be.equal(calculateSlot(ind - 1, 2), 'slot ' + ind);
//       // expect(d.discussers.map(v => (isVote(v) ? v.person : v))).to.contain(ind);
//       ind++;
//     });
//   });
//   it('magic function fixed votes', () => {
//     const input4: Input = {
//       config: {
//         criticers: 2,
//         discussers: 4,
//         participants: 12,
//         slots: 2,
//       },
//       sessionHolders: { '1': [], '2': [], '3': [], '4': [] },
//       topics: [
//         {
//           id: '1',
//           name: 'topic1',
//           slot: 1,
//         },
//         {
//           id: '2',
//           name: 'topic2',
//           slot: 1,
//         },
//         {
//           id: '3',
//           name: 'topic3',
//           slot: 2,
//         },
//         {
//           id: '4',
//           name: 'topic4',
//           slot: 2,
//         },
//       ],
//       votes: [],
//     };

//     input4.votes = [
//       { person: '1', prio: 1, topicId: '1' } as Vote,
//       { person: '1', prio: 2, topicId: '2' } as Vote,
//       { person: '1', prio: 3, topicId: '3' } as Vote,
//       { person: '2', prio: 1, topicId: '2' } as Vote,
//       { person: '2', prio: 2, topicId: '3' } as Vote,
//       { person: '2', prio: 3, topicId: '4' } as Vote,
//       { person: '3', prio: 1, topicId: '3' } as Vote,
//       { person: '3', prio: 2, topicId: '4' } as Vote,
//       { person: '3', prio: 3, topicId: '1' } as Vote,
//       { person: '4', prio: 1, topicId: '4' } as Vote,
//       { person: '4', prio: 2, topicId: '1' } as Vote,
//       { person: '4', prio: 3, topicId: '2' } as Vote,
//       { person: '5', prio: 1, topicId: '1' } as Vote,
//       { person: '5', prio: 2, topicId: '2' } as Vote,
//       { person: '5', prio: 3, topicId: '3' } as Vote,
//       { person: '6', prio: 1, topicId: '2' } as Vote,
//       { person: '6', prio: 2, topicId: '3' } as Vote,
//       { person: '6', prio: 3, topicId: '4' } as Vote,
//       { person: '7', prio: 1, topicId: '3' } as Vote,
//       { person: '7', prio: 2, topicId: '4' } as Vote,
//       { person: '7', prio: 3, topicId: '1' } as Vote,
//       { person: '8', prio: 1, topicId: '4' } as Vote,
//       { person: '8', prio: 2, topicId: '1' } as Vote,
//       { person: '8', prio: 3, topicId: '2' } as Vote,
//       { person: '9', prio: 1, topicId: '1' } as Vote,
//       { person: '9', prio: 2, topicId: '2' } as Vote,
//       { person: '9', prio: 3, topicId: '3' } as Vote,
//       { person: '10', prio: 1, topicId: '2' } as Vote,
//       { person: '10', prio: 2, topicId: '3' } as Vote,
//       { person: '10', prio: 3, topicId: '4' } as Vote,
//       { person: '11', prio: 1, topicId: '3' } as Vote,
//       { person: '11', prio: 2, topicId: '4' } as Vote,
//       { person: '11', prio: 3, topicId: '1' } as Vote,
//       { person: '12', prio: 1, topicId: '4' } as Vote,
//       { person: '12', prio: 2, topicId: '1' } as Vote,
//       { person: '12', prio: 3, topicId: '2' } as Vote,
//     ];
//     // console.log(input4);
//     const discussions = magic(input4);

//     const score = calculateScore(input4, discussions, scoreTable);

//     // expect(score).to.equal(9 * 12);
//     expect(score).to.greaterThan(70);
//     // console.log('result:', JSON.stringify(discussions, undefined, 2));

//     let ind = 1;
//     discussions.forEach(d => {
//       expect(d.topicId).to.be.equal(`${ind}`, 'topic id is wrong' + ind);
//       expect(d.discussers.length).to.be.equal(4, 'discussers length is wrong' + ind);
//       expect(d.criticers.length).to.be.equal(2, 'criticier length is wrong' + ind);
//       expect(d.slot).to.be.equal(calculateSlot(ind - 1, 2), 'slot ' + ind);
//       // expect(d.discussers.map(v => (isVote(v) ? v.person : v))).to.contain(ind);
//       ind++;
//     });
//   });
// });
