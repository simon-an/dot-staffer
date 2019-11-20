"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const jstat = __importStar(require("jStat"));
function calculateSlot(index, topicsPerSlot) {
    const v1 = Math.floor((index + 1) / topicsPerSlot);
    const rest = (index + 1) % topicsPerSlot;
    if (rest === 0) {
        return v1;
    }
    else {
        return v1 + 1;
    }
}
exports.calculateSlot = calculateSlot;
function isVote(vote) {
    return vote.person !== undefined;
}
exports.isVote = isVote;
function matchVoteAndPerson(v2, v1) {
    const p1 = isVote(v1) ? v1.person : v1;
    const p2 = isVote(v2) ? v2.person : v2;
    return p1 === p2;
}
exports.matchVoteAndPerson = matchVoteAndPerson;
function compareVoteByPriority(v1, v2) {
    const p1 = isVote(v1) ? v1.prio : 0;
    const p2 = isVote(v2) ? v2.prio : 0;
    return p1 - p2;
}
exports.compareVoteByPriority = compareVoteByPriority;
function sortVotesByDiscusserCombination(votes, sessions, session) {
    const foundSession = sessions.find(s => !!s.discussers.find(d => !!session.discussers.find(v => matchVoteAndPerson(v, d))));
    return votes.sort((a, b) => {
        if (!foundSession) {
            return 0;
        }
        const personA = !!foundSession.discussers.find(d => matchVoteAndPerson(d, a));
        const personB = !!foundSession.discussers.find(d => matchVoteAndPerson(d, b));
        if (personA && personB) {
            return 0;
        }
        if (personA) {
            return 1;
        }
        if (personB) {
            return -1;
        }
        return 0;
    });
}
exports.sortVotesByDiscusserCombination = sortVotesByDiscusserCombination;
function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}
exports.onlyUnique = onlyUnique;
function forceAssignDiscusser(sessions, input, personBusy) {
    const noDiscusserYet = (person, index, array) => {
        return !sessions.find(s => !!s.discussers.find(v => matchVoteAndPerson(v, person)));
    };
    console.log('noDiscusserYet', noDiscusserYet);
    sessions
        .filter(s => s.discussers.length < input.config.discussers)
        .forEach(session => {
        // console.log('session', session.topicId);
        // console.log('d', session.discussers.length);
        // console.log('c', session.criticers.length);
        // console.log('slot', session.slot);
        const notCriticerInSameSlot = (person, index, array) => {
            return !sessions.find(s => s.slot === session.slot && !!s.criticers.find(v => matchVoteAndPerson(v, person)));
        };
        const diff = input.config.discussers - session.discussers.length;
        const neededpersons = input.votes
            .map(v => v.person)
            .filter(onlyUnique)
            .filter(noDiscusserYet)
            .filter(notCriticerInSameSlot)
            .slice(0, diff);
        // console.log('neededpersons', neededpersons, session.discussers);
        session.discussers = [...session.discussers, ...neededpersons];
        // console.log('discussers', session.discussers);
        neededpersons.forEach(person => {
            // console.log('personBusy[person]', personBusy[person]);
            if (!personBusy[person]) {
                personBusy[person] = [session.slot];
            }
            else {
                personBusy[person].push(session.slot);
            }
            // console.log('personBusy[person]', personBusy[person]);
        });
    });
    return sessions;
}
exports.forceAssignDiscusser = forceAssignDiscusser;
function assignDiscusser(prio, sessions, input, personBusy) {
    sessions
        .filter(s => s.discussers.length < input.config.discussers)
        .forEach(session => {
        const votes = input.votes
            .filter(vote => vote.topicId === session.topicId)
            .filter(vote => !personBusy[vote.person] || !personBusy[vote.person].includes(session.slot))
            // .sort((a, b) => a.prio - b.prio)
            .filter(vote => vote.prio === prio);
        const sortedVotes = sortVotesByDiscusserCombination(votes, sessions, session);
        const neededVotes = sortedVotes.slice(0, input.config.discussers - session.discussers.length);
        // console.log(`prio ${prio}, new discussers ${JSON.stringify(votes)}, prev: ${JSON.stringify(session.discussers)}`);
        session.discussers = [...session.discussers, ...neededVotes];
        neededVotes.forEach(vote => {
            if (!personBusy[vote.person]) {
                personBusy[vote.person] = [session.slot];
            }
            else {
                personBusy[vote.person].push(session.slot);
            }
        });
    });
    return sessions;
}
exports.assignDiscusser = assignDiscusser;
function assignCriticicers(prio, sessions, input, personBusy) {
    sessions.forEach(session => {
        const criticers = input.votes
            .filter(vote => vote.topicId === session.topicId)
            .filter(vote => !session.discussers.find(v => matchVoteAndPerson(v, vote)))
            .filter(vote => !session.criticers.find(v => matchVoteAndPerson(v, vote)))
            .filter(vote => !personBusy[vote.person] || !personBusy[vote.person].includes(session.slot))
            // .sort((a, b) => a.prio - b.prio)
            .filter(vote => vote.prio === prio)
            .slice(0, input.config.criticers - session.criticers.length);
        criticers.forEach(vote => {
            if (!personBusy[vote.person]) {
                personBusy[vote.person] = [session.slot];
            }
            else {
                personBusy[vote.person].push(session.slot);
            }
        });
        session.criticers = [...session.criticers, ...criticers];
    });
    return sessions;
}
exports.assignCriticicers = assignCriticicers;
function calculateScore(input, sessions, scoreTable) {
    const topicScoreReducer = (result, vote, index, array) => {
        if (index < input.config.discussers) {
            return (result += scoreTable.Discusser[vote.prio]);
        }
        else if (index < input.config.discussers + input.config.criticers) {
            return (result += scoreTable.Criticizer[vote.prio]);
        }
        return result;
    };
    const topicScoreTextReducer = (result, vote, index, array) => {
        if (index === 0) {
            return `${result} [ ${scoreTable.Discusser[vote.prio]} + `;
        }
        else if (index < input.config.discussers - 1) {
            return `${result} ${scoreTable.Discusser[vote.prio]} +`;
        }
        else if (index === input.config.discussers - 1) {
            return `${result}  ${scoreTable.Discusser[vote.prio]} ]+[`;
        }
        else if (index < input.config.discussers + input.config.criticers - 1) {
            return `${result} ${scoreTable.Criticizer[vote.prio]} +`;
        }
        else if (index === input.config.discussers + input.config.criticers - 1) {
            return `${result} ${scoreTable.Criticizer[vote.prio]} ]`;
        }
        return result;
    };
    console.log('=========================================== ');
    console.log('config:', input.config);
    console.log('topics:', input.topics.length);
    console.log('votes:', input.votes.length);
    const votesWhichCanbeUsedBySlots = input.config.participants * Math.min(3, input.config.slots);
    const overallChairs = input.topics.length * (input.config.discussers + input.config.criticers);
    const personsAvailableToChairs = input.config.participants * input.config.slots;
    const quota = overallChairs / input.config.participants;
    // let betterScore =
    //   input.config.participants * 5 +
    //   (overallChairs - input.config.participants) * 3 +
    //   (overallChairs - 2 * input.config.participants) * 1;
    // console.log('betterScore ', betterScore);
    console.log('votesWhichCanbeUsedBySlots ', votesWhichCanbeUsedBySlots);
    console.log('personsAvailableToChairs ', personsAvailableToChairs);
    console.log('overallChairs: ', overallChairs);
    console.log('quota: ', quota);
    console.log('input.votes.length: ', input.votes.length);
    const stdev1 = jstat.stdev(Object.values(input.votes.filter(v => v.prio === 1).reduce(countTopicsReducer, {})));
    const stdev2 = jstat.stdev(Object.values(input.votes.filter(v => v.prio === 2).reduce(countTopicsReducer, {})));
    const stdev3 = jstat.stdev(Object.values(input.votes.filter(v => v.prio === 3).reduce(countTopicsReducer, {})));
    console.log('standardabweichung:', stdev1, stdev2, stdev3);
    const var1 = jstat.variance(Object.values(input.votes.filter(v => v.prio === 1).reduce(countTopicsReducer, {})));
    const var2 = jstat.variance(Object.values(input.votes.filter(v => v.prio === 2).reduce(countTopicsReducer, {})));
    const var3 = jstat.variance(Object.values(input.votes.filter(v => v.prio === 3).reduce(countTopicsReducer, {})));
    console.log('varianz:', var1, var2, var3);
    const maxSessions = input.topics.map(topic => input.votes
        .sort(compareVoteByPriority)
        .filter(v => v.topicId === topic.id)
        .reduce(topicScoreReducer, 0));
    const maxSessionsText = input.topics.map(topic => input.votes
        .sort(compareVoteByPriority)
        .filter(v => v.topicId === topic.id)
        .reduce(topicScoreTextReducer, ''));
    const maxscore = maxSessions.reduce((sum, val) => (sum += val), 0);
    console.log('max possible score', maxSessions, maxSessionsText, maxscore);
    // const totalVoteValue2 = input.votes.reduce((sum: number, vote) => {
    //   return (sum += scoreTable.Discusser[vote.prio]);
    // }, 0);
    // let max = input.config.criticers * 5 * input.topics.length + input.config.discussers * 5 * input.topics.length;
    let points = 0;
    sessions.forEach(s => s.criticers.forEach(v => (points += isVote(v) ? scoreTable.Criticizer[v.prio] : 0)));
    sessions.forEach(s => s.discussers.forEach(v => (points += isVote(v) ? scoreTable.Discusser[v.prio] : 0)));
    const sessionScore = sessions.map(s => [...s.discussers, ...s.criticers]
        .filter(isVote)
        .sort(compareVoteByPriority)
        .filter(v => v.topicId === s.topicId)
        .reduce(topicScoreReducer, 0));
    const sessionScoreText = sessions.map(s => [...s.discussers, ...s.criticers]
        .filter(isVote)
        .sort(compareVoteByPriority)
        .filter(v => v.topicId === s.topicId)
        .reduce(topicScoreTextReducer, ''));
    const score = sessionScore.reduce((sum, val) => (sum += val), 0);
    console.log('sessionScore', sessionScoreText, sessionScore, score, points);
    // console.log(`Score is ${points} of expected value ${erwartungsWert}. Total vote value is: ${totalVoteValue} ... ${totalVoteValue2}`);
    // const ignoredVotes = input.votes.reduce((result: Vote[], vote) => {
    //   if (
    //     !sessions.find(
    //       session =>
    //         !!session.criticers.find(v => isVote(v) && v.person === vote.person && v.topicId === vote.topicId && vote.prio === v.prio) ||
    //         !!session.discussers.find(v => isVote(v) && v.person === vote.person && v.topicId === vote.topicId && vote.prio === v.prio),
    //     )
    //   ) {
    //     result.push(vote);
    //   }
    //   return result;
    // }, []);
    // const r2 = ignoredVotes.reduce((sum: number, vote: Vote) => {
    //   return (sum += scoreTable.Discusser[vote.prio]);
    // }, 0);
    // console.log('ignored votes: ' + ignoredVotes.length + ' Missed Score: ' + r2);
    return points;
}
exports.calculateScore = calculateScore;
function countTopicsReducer(result, vote, index, array) {
    if (result[vote.topicId] === undefined) {
        result[vote.topicId] = 1;
    }
    else {
        result[vote.topicId] += 1;
    }
    return result;
}
exports.countTopicsReducer = countTopicsReducer;
