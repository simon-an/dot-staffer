export declare type ScoreTable = {
    [key in ScoreTableKey]: {
        [key in Priorities]: number;
    };
};
declare enum ScoreTableKeyEnum {
    Discusser = 0,
    Criticizer = 1,
    Viewer = 2
}
declare type ScoreTableKey = keyof typeof ScoreTableKeyEnum;
declare type Priorities = 1 | 2 | 3;
export {};
