import { expect } from 'chai';
import { filterAndSortCandidatesByTopicId, toMapPrioByPersonAndTopic, toMapTopicSelectedByPerson } from '../src';
import { Vote } from '../src/model/vote';

describe('test transformers', () => {
  it('toMapPrioByPersonAndTopic', () => {
    const votes: Vote[] = [
      { topicId: '1', person: 'A', prio: 1 },
      { topicId: '2', person: 'A', prio: 2 },
      { topicId: '3', person: 'A', prio: 3 },
      { topicId: '4', person: 'B', prio: 1 },
      { topicId: '5', person: 'B', prio: 2 },
      { topicId: '1', person: 'B', prio: 3 },
      { topicId: '2', person: 'C', prio: 1 },
      { topicId: '3', person: 'C', prio: 2 },
      { topicId: '4', person: 'C', prio: 3 },
    ];

    const map = toMapPrioByPersonAndTopic(votes, ['1', '2', '3', '4', '5']);

    expect(map.A['1']).to.equal(1);
    expect(map.A['2']).to.equal(2);
    expect(map.A['3']).to.equal(3);
    expect(map.A['4']).to.equal(-1);
    expect(map.A['5']).to.equal(-1);
    expect(map.B['1']).to.equal(3);
    expect(map.B['2']).to.equal(-1);
    expect(map.B['3']).to.equal(-1);
    expect(map.B['4']).to.equal(1);
    expect(map.B['5']).to.equal(2);
    expect(map.C['1']).to.equal(-1);
    expect(map.C['2']).to.equal(1);
    expect(map.C['3']).to.equal(2);
    expect(map.C['4']).to.equal(3);
    expect(map.C['5']).to.equal(-1);
  });

  it('toMapTopicSelectedByPerson', () => {
    const votes: Vote[] = [
      { topicId: '1', person: 'A', prio: 1 },
      { topicId: '2', person: 'A', prio: 2 },
      { topicId: '3', person: 'A', prio: 3 },
      { topicId: '4', person: 'B', prio: 1 },
      { topicId: '5', person: 'B', prio: 2 },
      { topicId: '1', person: 'B', prio: 3 },
      { topicId: '2', person: 'C', prio: 1 },
      { topicId: '3', person: 'C', prio: 2 },
      { topicId: '4', person: 'C', prio: 3 },
    ];

    const map = toMapTopicSelectedByPerson(votes);
    expect(map.A[0]).to.equal(undefined);
    expect(map.A[0]).to.equal(undefined);
    expect(map.A[0]).to.equal(undefined);

    expect(map.A[1]).to.equal('1');
    expect(map.A[2]).to.equal('2');
    expect(map.A[3]).to.equal('3');
    expect(map.B[1]).to.equal('4');
    expect(map.B[2]).to.equal('5');
    expect(map.B[3]).to.equal('1');
    expect(map.C[1]).to.equal('2');
    expect(map.C[2]).to.equal('3');
    expect(map.C[3]).to.equal('4');
  });

  it('sort and filter', () => {
    const votes: Vote[] = [
      { topicId: '1', person: 'A', prio: 1 },
      { topicId: '2', person: 'A', prio: 2 },
      { topicId: '3', person: 'A', prio: 3 },
      { topicId: '4', person: 'B', prio: 1 },
      { topicId: '5', person: 'B', prio: 2 },
      { topicId: '1', person: 'B', prio: 3 },
      { topicId: '2', person: 'C', prio: 1 },
      { topicId: '3', person: 'C', prio: 2 },
      { topicId: '4', person: 'C', prio: 3 },
    ];

    const map = toMapPrioByPersonAndTopic(votes, ['1', '2', '3', '4', '5']);
    const map2 = toMapTopicSelectedByPerson(votes);

    const result1 = filterAndSortCandidatesByTopicId(map, map2, '1');
    expect(result1[0]).to.equal('A');
    expect(result1[1]).to.equal('B');

    const result2 = filterAndSortCandidatesByTopicId(map, map2, '2');
    expect(result2[0]).to.equal('C');
    expect(result2[1]).to.equal('A');

    const result3 = filterAndSortCandidatesByTopicId(map, map2, '3');
    expect(result3[0]).to.equal('C');
    expect(result3[1]).to.equal('A');

    const result4 = filterAndSortCandidatesByTopicId(map, map2, '4');
    expect(result4[0]).to.equal('B');
    expect(result4[1]).to.equal('C');

    const result5 = filterAndSortCandidatesByTopicId(map, map2, '5');
    expect(result5[0]).to.equal('B');
  });
  it('sort and filter', () => {
    const votes: Vote[] = [
      { topicId: '2', person: 'A', prio: 2 },
      { topicId: '3', person: 'A', prio: 3 },
      { topicId: '1', person: 'B', prio: 3 },
      { topicId: '2', person: 'C', prio: 1 },
      { topicId: '3', person: 'C', prio: 2 },
      { topicId: '1', person: 'D', prio: 1 },
      { topicId: '1', person: 'E', prio: 1 },
      { topicId: '1', person: 'F', prio: 1 },
      { topicId: '1', person: 'G', prio: 1 },
      { topicId: '1', person: 'A', prio: 1 },
      { topicId: '1', person: 'H', prio: 1 },
    ];

    const map = toMapPrioByPersonAndTopic(votes, ['1', '2', '3', '4', '5']);
    const map2 = toMapTopicSelectedByPerson(votes);

    const result1 = filterAndSortCandidatesByTopicId(map, map2, '1');
    expect(result1[0]).to.equal('A');
    expect(result1[1]).to.equal('D');
    expect(result1[2]).to.equal('E');
    expect(result1[3]).to.equal('F');
    expect(result1[4]).to.equal('G');
    expect(result1[5]).to.equal('H');
    expect(result1[6]).to.equal('B');
  });
});
