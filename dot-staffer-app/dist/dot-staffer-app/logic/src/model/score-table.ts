export type ScoreTable = { [key in ScoreTableKey]: { [key in Priorities]: number } };

enum ScoreTableKeyEnum {
  Discusser,
  Criticizer,
  Viewer,
}
type ScoreTableKey = keyof typeof ScoreTableKeyEnum;
type Priorities = 1 | 2 | 3;
