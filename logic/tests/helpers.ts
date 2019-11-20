import { expect } from 'chai';
import { calculateSlot, sortVotesByDiscusserCombination } from '../src/helpers';
import { Session } from '../src/model/session';
import { Vote } from '../src/model/vote';

describe('test calculateSlot', () => {
  it('test calculateSlot topicsPerSlot 1', () => {
    expect(calculateSlot(0, 1)).to.equal(1, 'first');
    expect(calculateSlot(1, 1)).to.equal(2, 'second');
    expect(calculateSlot(2, 1)).to.equal(3, 'third');
    expect(calculateSlot(3, 1)).to.equal(4, 'forth');
    expect(calculateSlot(4, 1)).to.equal(5, 'fifth');
    expect(calculateSlot(5, 1)).to.equal(6, 'six');
    expect(calculateSlot(6, 1)).to.equal(7, 'seventh');
    expect(calculateSlot(7, 1)).to.equal(8, 'eigth');
  });
  it('test calculateSlot topicsPerSlot 2', () => {
    expect(calculateSlot(0, 2)).to.equal(1, 'first');
    expect(calculateSlot(1, 2)).to.equal(1, 'second');
    expect(calculateSlot(2, 2)).to.equal(2, 'third');
    expect(calculateSlot(3, 2)).to.equal(2, 'forth');
    expect(calculateSlot(4, 2)).to.equal(3, 'fifth');
    expect(calculateSlot(5, 2)).to.equal(3, 'six');
    expect(calculateSlot(6, 2)).to.equal(4, 'seventh');
    expect(calculateSlot(7, 2)).to.equal(4, 'eigth');
  });
  it('test calculateSlot topicsPerSlot 3', () => {
    expect(calculateSlot(0, 3)).to.equal(1, 'first');
    expect(calculateSlot(1, 3)).to.equal(1, 'second');
    expect(calculateSlot(2, 3)).to.equal(1, 'third');
    expect(calculateSlot(3, 3)).to.equal(2, 'forth');
    expect(calculateSlot(4, 3)).to.equal(2, 'fifth');
    expect(calculateSlot(5, 3)).to.equal(2, 'six');
    expect(calculateSlot(6, 3)).to.equal(3, 'seventh');
    expect(calculateSlot(7, 3)).to.equal(3, 'eigth');
    expect(calculateSlot(8, 3)).to.equal(3, 'ninth');
  });
  it('test calculateSlot topicsPerSlot 4', () => {
    expect(calculateSlot(0, 4)).to.equal(1, 'first');
    expect(calculateSlot(1, 4)).to.equal(1, 'second');
    expect(calculateSlot(2, 4)).to.equal(1, 'third');
    expect(calculateSlot(3, 4)).to.equal(1, 'forth');
    expect(calculateSlot(4, 4)).to.equal(2, 'fifth');
    expect(calculateSlot(5, 4)).to.equal(2, 'six');
    expect(calculateSlot(6, 4)).to.equal(2, 'seventh');
    expect(calculateSlot(7, 4)).to.equal(2, 'eigth');
    expect(calculateSlot(8, 4)).to.equal(3, 'ninth');
  });
});

describe('sortVotesByDiscusserCombination', () => {
  it('x', () => {
    const votes: Vote[] = [
    //   { topicId: '1', person: 'Simon P.', prio: 2 },
      { topicId: '2', person: 'Michael W.', prio: 2 },
      { topicId: '2', person: 'Minh N.', prio: 2 },
    ];
    const sessions = [
      {
        criticers: [],
        discussers: [
          { topicId: '1', person: 'Michael W.', prio: 1 } as Vote,
          { topicId: '1', person: 'Simon P.', prio: 2 } as Vote,
        ],
        slot: 1,
        topicId: '1',
      } as Session,
      {
        criticers: [],
        discussers: [{ topicId: '2', person: 'Simon P.', prio: 1 } as Vote],
        slot: 2,
        topicId: '2',
      } as Session,
      {
        criticers: [],
        discussers: [{ topicId: '3', person: 'Minh N.', prio: 1 } as Vote],
        slot: 3,
        topicId: '3',
      } as Session,
    ];
    const sorted = sortVotesByDiscusserCombination(votes, sessions, sessions[1]);
    expect(sorted[0].person).to.equal('Minh N.');
  });
});
