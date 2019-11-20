// import { Input, magic } from '../src';
// import { Session } from '../src/model/session';
// import { calculateScore, isVote } from '../src/helpers';
// import { expect } from 'chai';

// describe('generate test data ', () => {
//   it('generate 5 topics', () => {
//     const input: Input = {
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
//       votes: [],
//       config: {
//         participants: 30,
//         criticers: 3,
//         discussers: 6,
//         slots: 2,
//       },
//     };

//     for (let index = 0; index < 30; index++) {
//       input.votes.push({
//         topicId: `${Math.round(Math.random() * 4) + 1}`,
//         person: `Person ${index}`,
//         prio: 1,
//       });
//       input.votes.push({
//         topicId: `${Math.round(Math.random() * 4) + 1}`,
//         person: `Person ${index}`,
//         prio: 2,
//       });
//       input.votes.push({
//         topicId: `${Math.round(Math.random() * 4) + 1}`,
//         person: `Person ${index}`,
//         prio: 3,
//       });
//     }

//     const discussions: Session[] = magic(input);

//     calculateScore(input, discussions);

//     // console.log('result:', JSON.stringify(discussions, undefined, 2));
//     const discusserMap: { [key: string]: string } = {};
//     const criticizerMap: { [key: string]: string } = {};
//     let i = 1;
//     discussions.forEach(discussion => {
//       expect(discussion.topicId).to.be.equal(`${i}`), 'Discussion[0] topic id is wrong';
//       expect(discussion.discussers.length).to.be.equal(6, 'Discussion[0] discusser length is wrong');
//       discussion.discussers.forEach(discusser => {
//         const name = isVote(discusser) ? discusser.person : discusser;
//         expect(discusserMap).to.not.haveOwnProperty(name, `${name} is already a discusser`);
//         discusserMap[name] = discussion.topicId;
//       });
//       discussion.criticers.forEach(criticizier => {
//         const name = isVote(criticizier) ? criticizier.person : criticizier;
//         expect(criticizerMap).to.not.haveOwnProperty(name, `${name} is already a criticizier`);
//         criticizerMap[name] = discussion.topicId;
//       });
//       expect(discussion.criticers.length).to.be.equal(3, 'Discussion[0] criticers length is wrong');
//       // expect(discussion.slot).to.be.equal(1, 'Discussion[0] slot is wrong');
//       if (input.votes.filter(vote => vote.topicId === `${i}`).length < input.config.discussers) {
//       }
//       i++;
//     });

//     expect(Object.keys(discusserMap).length).to.equal(30);
//     expect(Object.keys(criticizerMap).length).to.equal(15);
//   });
// });
