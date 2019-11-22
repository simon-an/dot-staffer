import { Topic } from './topic';
import { Vote } from './vote';
import { Workshop } from './workshop';
export interface Input {
    topics: Topic[];
    config: Workshop;
    votes: Vote[];
    sessionHolders: {
        [key: string]: string[];
    };
}
