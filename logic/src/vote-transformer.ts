import { Vote } from './model/vote';

export const toMapPrioByPersonAndTopic = (votes: Vote[], topicIds: string[]) => {
  const personvotesx: { [key: string]: { [key: string]: number } } = {};
  const personvotes = votes.reduce((res, vote) => {
    if (res[vote.person] === undefined) {
      res[vote.person] = {};
      topicIds.forEach(topic => {
        res[vote.person][topic] = -1;
      });
      res[vote.person][vote.topicId] = vote.prio;
    } else {
      res[vote.person][vote.topicId] = vote.prio;
    }
    return res;
  }, personvotesx);
  return personvotes;
};

export const toMapTopicSelectedByPerson = (votes: Vote[]) => {
  const topicsByPerson: { [key: string]: string[] } = {};
  const persons = votes.reduce((res, vote) => {
    if (res[vote.person] === undefined) {
      res[vote.person] = [];
    }
    res[vote.person][vote.prio] = vote.topicId;
    return res;
  }, topicsByPerson);
  return persons;
};

export const filterAndSortCandidatesByTopicId = (
  mapPersonTopicPrio: { [key: string]: { [key: string]: number } },
  mapPersonPrioTopics: { [key: string]: string[] },
  topicId: string,
) => {
  return Object.keys(mapPersonPrioTopics)
    .filter(p => mapPersonPrioTopics[p][1] === topicId || mapPersonPrioTopics[p][2] === topicId || mapPersonPrioTopics[p][3] === topicId)
    .sort((p1, p2) => {
      return mapPersonTopicPrio[p1][topicId] - mapPersonTopicPrio[p2][topicId];
    });
};
