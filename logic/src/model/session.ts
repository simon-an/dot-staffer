import { Vote } from "./vote";

export interface Session {
  topicId: string;
  discussers: (Vote | string)[];
  criticers: (Vote | string)[];
  slot: number;
}
