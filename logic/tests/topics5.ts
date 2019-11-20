// import { expect } from 'chai';
// import { Input, magic } from '../src';
// import { calculateScore, isVote } from '../src/helpers';
// import { ScoreTable, Session } from '../src/model';
// import scoreJson from '../src/score.json';

// describe('5 topics ', () => {
//   const scoreTable: ScoreTable = scoreJson;
//   it('magic function 5 topics', () => {
//     const input2: Input = {
//       config: {
//         criticers: 3,
//         discussers: 6,
//         participants: 30,
//         slots: 2,
//       },
//       sessionHolders: { '1': [], '2': [], '3': [], '4': [], '5': [] },
//       topics: [
//         {
//           id: '1',
//           name: 'topic1',
//         },
//         {
//           id: '2',
//           name: 'topic2',
//         },
//         {
//           id: '3',
//           name: 'topic3',
//         },
//         {
//           id: '4',
//           name: 'topic4',
//         },
//         {
//           id: '5',
//           name: 'topic5',
//         },
//       ],
//       votes: [
//         { topicId: '2', person: 'Simon P.', prio: 1 },
//         { topicId: '1', person: 'Michael W.', prio: 1 },
//         { topicId: '3', person: 'Minh N.', prio: 1 },
//         { topicId: '1', person: 'Simon P.', prio: 2 },
//         { topicId: '2', person: 'Michael W.', prio: 2 },
//         { topicId: '2', person: 'Minh N.', prio: 2 },
//         { topicId: '3', person: 'Simon P.', prio: 3 },
//         { topicId: '3', person: 'Michael W.', prio: 3 },
//         { topicId: '1', person: 'Minh N.', prio: 3 },
//       ],
//     };

//     for (let index = 0; index < 27; index++) {
//       input2.votes.push({
//         person: `Person ${index}`,
//         prio: 1,
//         topicId: `${Math.round(Math.random() * 4) + 1}`,
//       });
//       input2.votes.push({
//         person: `Person ${index}`,
//         prio: 2,
//         topicId: `${Math.round(Math.random() * 4) + 1}`,
//       });
//       input2.votes.push({
//         person: `Person ${index}`,
//         prio: 3,
//         topicId: `${Math.round(Math.random() * 4) + 1}`,
//       });
//     }

//     const discussions: Session[] = magic(input2);

//     calculateScore(input2, discussions, scoreTable);

//     // console.log('result:', JSON.stringify(discussions, undefined, 2));

//     expect(discussions[0].topicId).to.be.equal('1'), 'Discussion[0] topic id is wrong';
//     expect(discussions[0].discussers.length).to.be.equal(6, 'Discussion[0] discusser length is wrong');
//     expect(discussions[0].discussers.map(v => (isVote(v) ? v.person : v))).to.contain('Michael W.');
//     expect(discussions[0].criticers.length).to.be.equal(3, 'Discussion[0] criticers length is wrong');
//     expect(discussions[0].slot).to.be.equal(1, 'Discussion[0] slot is wrong');
//     expect(discussions[0].criticers.map(v => (isVote(v) ? v.person : v))).to.not.contain('Michael W.');

//     expect(discussions[1].topicId).to.be.equal('2', 'Discussion[1] topic id is wrong');
//     expect(discussions[1].discussers.length).to.be.equal(6, 'Discussion[1] discusser length is wrong');
//     if (input2.votes.filter(vote => vote.topicId === '2').length < input2.config.discussers) {
//       expect(discussions[1].discussers.map(v => (isVote(v) ? v.person : v))).to.contain('Simon P.');
//     }
//     expect(discussions[1].criticers.length).to.be.equal(3, 'Discussion[1] criticers length is wrong');
//     expect(discussions[1].slot).to.be.equal(1, 'Discussion[1] slot is wrong');
//     expect(discussions[1].discussers.map(v => (isVote(v) ? v.person : v))).to.not.contain('Michael W.');
//     expect(discussions[1].criticers.map(v => (isVote(v) ? v.person : v))).to.not.contain('Michael W.');

//     expect(discussions[2].topicId).to.be.equal('3', 'Discussion[2] topic id is wrong');
//     expect(discussions[2].discussers.length).to.be.equal(6);
//     expect(discussions[2].discussers.map(v => (isVote(v) ? v.person : v))).to.contain('Minh N.');
//     expect(discussions[2].criticers.length).to.be.equal(3);
//     expect(discussions[2].slot).to.be.equal(1);
//     expect(discussions[2].discussers.map(v => (isVote(v) ? v.person : v))).to.not.contain('Michael W.');
//     expect(discussions[2].criticers.map(v => (isVote(v) ? v.person : v))).to.not.contain('Michael W.');

//     expect(discussions[3].topicId).to.be.equal('4', 'Discussion[3] topic id is wrong');
//     expect(discussions[3].discussers.length).to.be.equal(6);
//     expect(discussions[3].criticers.length).to.be.equal(3);
//     expect(discussions[3].slot).to.be.equal(2);

//     expect(discussions[4].topicId).to.be.equal('5', 'Discussion[4] topic id is wrong');
//     expect(discussions[4].discussers.length).to.be.equal(6);
//     expect(discussions[4].criticers.length).to.be.equal(3, 'discussion[4].criticers length');
//     expect(discussions[4].slot).to.be.equal(2);
//   });
// });
