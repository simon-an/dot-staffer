import { expect } from 'chai';
import { Input, magic } from '../src';

describe('Index', () => {
  const bla: Input = {
    config: {
      criticers: 3,
      discussers: 6,
      participants: 30,
      slots: 2,
    },
    sessionHolders: { '1': [] },
    topics: [
      {
        id: '1',
        name: 'topic1',
        slot: 1,
      },
    ],
    votes: [
      { topicId: '1', person: 'Simon P.', prio: 1 },
      { topicId: '1', person: 'Michael W.', prio: 1 },
      { topicId: '1', person: 'Minh N.', prio: 1 },
    ],
  };

  it('test input not enought votes throw error', () => {
    expect(magic.bind(null, bla)).to.throw('Not enougth votes: 3 but must be 90');
  });
});
