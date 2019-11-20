"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMapPrioByPersonAndTopic = (votes, topicIds) => {
    const personvotesx = {};
    const personvotes = votes.reduce((res, vote) => {
        if (res[vote.person] === undefined) {
            res[vote.person] = {};
            topicIds.forEach(topic => {
                res[vote.person][topic] = -1;
            });
            res[vote.person][vote.topicId] = vote.prio;
        }
        else {
            res[vote.person][vote.topicId] = vote.prio;
        }
        return res;
    }, personvotesx);
    return personvotes;
};
exports.toMapTopicSelectedByPerson = (votes) => {
    const topicsByPerson = {};
    const persons = votes.reduce((res, vote) => {
        if (res[vote.person] === undefined) {
            res[vote.person] = [];
        }
        res[vote.person][vote.prio] = vote.topicId;
        return res;
    }, topicsByPerson);
    return persons;
};
exports.filterAndSortCandidatesByTopicId = (mapPersonTopicPrio, mapPersonPrioTopics, topicId) => {
    return Object.keys(mapPersonPrioTopics)
        .filter(p => mapPersonPrioTopics[p][1] === topicId || mapPersonPrioTopics[p][2] === topicId || mapPersonPrioTopics[p][3] === topicId)
        .sort((p1, p2) => {
        return mapPersonTopicPrio[p1][topicId] - mapPersonTopicPrio[p2][topicId];
    });
};
