export type LevelSegment = {
  id: number,
  mod: number
}

export interface LevelRef {id:number,name:string}

export interface LevelData {
  name: string,
  segments: LevelSegment[];
}
