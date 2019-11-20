// import { expect } from 'chai';
// import { Input, magic, validateInput } from '../../src';
// import { calculateScore, isVote, onlyUnique } from '../../src/helpers';
// import { ScoreTable, Session, VoteTable, Workshop } from '../../src/model';
// import configJson from './config.json';
// import testCase1 from './input-szenario1-1.json';
// import scoreJson from './score.json';
// import votesJson from './votes.json';

// describe('test szenario 1 ', () => {
//   const workshop: Workshop = configJson;
//   const voteTable: VoteTable = votesJson;
//   const scoreTable: ScoreTable = scoreJson;

//   // it('generate szenario 1 json', () => {
//   //   const votes: Vote[] = generateVotes(voteTable);

//   //   const input: Input = {
//   //     topics: Object.keys(voteTable).map(topic => ({
//   //       id: topic,
//   //       name: commerce.productName(),
//   //     })),
//   //     votes: votes,
//   //     config: workshop,
//   //   };

//   //   // fs.writeFile('./test-szenario-1/test/input-szenario1.json', JSON.stringify(input), err => {
//   //   //   if (err) {
//   //   //     console.error(err);
//   //   //     return;
//   //   //   }
//   //   //   console.log('File has been created');
//   //   // });

//   //   console.log(input);

//   //   const discussions: Session[] = magic(input);

//   //   calculateScore(input, discussions);
//   //   validateResult(input, discussions);
//   // });

//   it('test szenario 1 testcase 1', () => {
//     const input: Input = testCase1 as Input;

//     // console.log(input);

//     const discussions: Session[] = magic(input);

//     calculateScore(input, discussions, scoreTable);
//     validateResult(input, discussions);
//   });
// });

// export function validateResult(input: Input, discussions: Session[]): void {
//   // console.log('result:', JSON.stringify(discussions, undefined, 2));
//   const discusserMap: { [key: string]: string } = {};
//   const criticizerMap: { [key: string]: string } = {};
//   let i = 1;
//   discussions.forEach(discussion => {
//     console.log('=============================================');
//     console.log(discussion.topicId, discussion.discussers.length);
//     console.log(discussion.discussers);
//     expect(discussion.topicId).to.be.equal(`TopicId ${i}`), 'Discussion[0] topic id is wrong';
//     expect(discussion.discussers.length).to.be.equal(6, 'Discussion[0] discusser length is wrong');
//     discussion.discussers.forEach(discusser => {
//       const name = isVote(discusser) ? discusser.person : discusser;
//       // expect(discusserMap).to.not.have(name, `${name} is already a discusser`);
//       expect(discusserMap[name]).to.equal(undefined, `${name} is already a discusser`);
//       discusserMap[name] = discussion.topicId;
//     });
//     discussion.criticers.forEach(criticizier => {
//       const name = isVote(criticizier) ? criticizier.person : criticizier;
//       expect(criticizerMap).to.not.haveOwnProperty(name, `${name} is already a criticizier`);
//       criticizerMap[name] = discussion.topicId;
//     });
//     expect(discussion.criticers.length).to.be.equal(3, 'Discussion[0] criticers length is wrong');
//     // expect(discussion.slot).to.be.equal(1, 'Discussion[0] slot is wrong');
//     // if (input.votes.filter(vote => vote.topicId === `${i}`).length < input.config.discussers) {
//     // }
//     i++;
//   });

//   const persons = input.votes.map(v => v.person).filter(onlyUnique);
//   expect(persons.length).to.equal(30, 'persons discussers must be 30');
//   persons.forEach(p => {
//     expect(discusserMap[p]).to.not.equal(undefined, `${p} is no discusser`);
//   });

//   expect(Object.keys(discusserMap).length).to.equal(30, 'discussers must be 30');
//   expect(Object.keys(criticizerMap).length).to.equal(15, 'criticers must be 15');
// }
