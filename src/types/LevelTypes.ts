export type LevelSegment = {
  id: number,
  mod: number
}


export interface LevelData {
  start: [number, number];
  end: [number, number];
  segments: LevelSegment[];
}
