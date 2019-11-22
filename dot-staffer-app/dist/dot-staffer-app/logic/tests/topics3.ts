import { expect } from 'chai';
import { Input, magic } from '../src';
import { calculateScore, isVote } from '../src/helpers';
import { ScoreTable } from '../src/model/score-table';
import { Session } from '../src/model/session';
import { simpleMagic } from '../src/workshop';

describe('3 topics simple magic', () => {
  const scoreTable: ScoreTable = {
    Criticizer: { '1': 2, '2': 1, '3': 0 },
    Discusser: { '1': 3, '2': 2, '3': 1 },
    Viewer: { '1': 1, '2': 0, '3': 0 },
  } as ScoreTable;
  it('magic function 3 topics', () => {
    const input3: Input = {
      config: {
        criticers: 1,
        discussers: 2,
        participants: 3,
        slots: 3,
      },
      sessionHolders: { '1': [], '2': [], '3': [] },
      topics: [
        {
          id: '1',
          name: 'topic1',
          slot: 1,
        },
        {
          id: '2',
          name: 'topic2',
          slot: 2,
        },
        {
          id: '3',
          name: 'topic3',
          slot: 3,
        },
      ],
      votes: [
        { topicId: '2', person: 'Minh N.', prio: 2 },
        { topicId: '1', person: 'Michael W.', prio: 1 },
        { topicId: '1', person: 'Simon P.', prio: 2 },
        { topicId: '1', person: 'Minh N.', prio: 3 },
        { topicId: '2', person: 'Simon P.', prio: 1 },
        { topicId: '2', person: 'Michael W.', prio: 2 },
        { topicId: '3', person: 'Minh N.', prio: 1 },
        { topicId: '3', person: 'Simon P.', prio: 3 },
        { topicId: '3', person: 'Michael W.', prio: 3 },
        { topicId: '1', person: 'A', prio: 1 },
        { topicId: '1', person: 'B', prio: 2 },
        { topicId: '1', person: 'C', prio: 3 },
        { topicId: '2', person: 'B', prio: 1 },
        { topicId: '2', person: 'C', prio: 2 },
        { topicId: '2', person: 'A', prio: 2 },
        { topicId: '3', person: 'C', prio: 1 },
        { topicId: '3', person: 'A', prio: 3 },
        { topicId: '3', person: 'B', prio: 3 },
      ],
    };
    const discussions = simpleMagic(input3);
    // const discussions = magic(input3);

    calculateScore(input3, discussions, scoreTable);

    // console.log('result:', JSON.stringify(discussions, undefined, 2));

    expect(discussions[0].topicId).to.be.equal('1', 'Discussion[0] topic id is wrong');
    expect(discussions[0].discussers.length).to.be.equal(2, 'Discussion[0] discussers length is wrong');
    expect(discussions[0].discussers.map(v => (isVote(v) ? v.person : v))).to.contain('Michael W.');
    expect(discussions[0].discussers.map(v => (isVote(v) ? v.person : v))).to.contain('A');
    expect(discussions[0].discussers.map(v => (isVote(v) ? v.person : v))).to.not.contain('Minh N.');
    // expect(discussions[0].criticers.length).to.be.equal(1, 'Discussion[0] criticers.length');
    expect(discussions[0].slot).to.be.equal(1, 'Discussers[0] slot');
    // expect(discussions[0].criticers.map(v => (isVote(v) ? v.person : v))).to.not.contain('Michael W.');
    // expect(discussions[0].criticers.map(v => (isVote(v) ? v.person : v))).to.not.contain('Simon P.');
    // expect(discussions[0].criticers.map(v => (isVote(v) ? v.person : v))).to.contain('Minh N.');

    expect(discussions[1].topicId).to.be.equal('2', 'Discussion[1] topic id is wrong');
    expect(discussions[1].discussers.length).to.be.equal(2), 'Discussion[1] discussers length is wrong';
    expect(discussions[1].discussers.map(v => (isVote(v) ? v.person : v))).to.contain('Simon P.');
    expect(discussions[1].discussers.map(v => (isVote(v) ? v.person : v))).to.contain('B');
    expect(discussions[1].discussers.map(v => (isVote(v) ? v.person : v))).to.not.contain('Michael W.');
    // expect(discussions[1].criticers.length).to.be.equal(1, 'Discussion[1] criticers.length');
    expect(discussions[1].slot).to.be.equal(2, 'Discussion[1] slot');
    // expect(discussions[1].criticers.map(v => (isVote(v) ? v.person : v))).to.contain('Michael W.');

    expect(discussions[2].topicId).to.be.equal('3');
    expect(discussions[2].discussers.length).to.be.equal(2);
    expect(discussions[2].discussers.map(v => (isVote(v) ? v.person : v))).to.contain('Minh N.');
    expect(discussions[2].discussers.map(v => (isVote(v) ? v.person : v))).to.contain('C');
    expect(discussions[2].discussers.map(v => (isVote(v) ? v.person : v))).to.not.contain('Simon P.');
    // expect(discussions[2].criticers.length).to.be.equal(1);
    expect(discussions[2].slot).to.be.equal(3);
    // expect(discussions[2].criticers.map(v => (isVote(v) ? v.person : v))).to.contain('Simon P.');
  });
});
