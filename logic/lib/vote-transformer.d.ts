import { Vote } from './model/vote';
export declare const toMapPrioByPersonAndTopic: (votes: Vote[], topicIds: string[]) => {
    [key: string]: {
        [key: string]: number;
    };
};
export declare const toMapTopicSelectedByPerson: (votes: Vote[]) => {
    [key: string]: string[];
};
export declare const filterAndSortCandidatesByTopicId: (mapPersonTopicPrio: {
    [key: string]: {
        [key: string]: number;
    };
}, mapPersonPrioTopics: {
    [key: string]: string[];
}, topicId: string) => string[];
