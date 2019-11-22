import { Input } from './model/input';
import { ScoreTable } from './model/score-table';
import { Session } from './model/session';
import { Vote } from './model/vote';
export declare function calculateSlot(index: number, topicsPerSlot: number): number;
export declare function isVote(vote: any): vote is Vote;
export declare function matchVoteAndPerson(v2: Vote | string, v1: Vote | string): boolean;
export declare function compareVoteByPriority(v1: Vote | string, v2: Vote | string): number;
export declare function sortVotesByDiscusserCombination(votes: Vote[], sessions: Session[], session: Session): Vote[];
export declare function onlyUnique(value: string, index: number, array: string[]): boolean;
export declare function forceAssignDiscusser(sessions: Session[], input: Input, personBusy: {
    [key: string]: number[];
}): Session[];
export declare function assignDiscusser(prio: number, sessions: Session[], input: Input, personBusy: {
    [key: string]: number[];
}): Session[];
export declare function assignCriticicers(prio: number, sessions: Session[], input: Input, personBusy: {
    [key: string]: number[];
}): Session[];
export declare function calculateScore(input: Input, sessions: Session[], scoreTable: ScoreTable): number;
export declare function countTopicsReducer(result: {
    [key: string]: number;
}, vote: Vote, index: number, array: Vote[]): {
    [key: string]: number;
};
