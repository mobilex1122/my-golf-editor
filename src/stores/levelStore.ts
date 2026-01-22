import { defineStore } from "pinia";
import type { LevelData, LevelSegment } from "../types/LevelTypes";
import consts from "@/consts";

function generateSegmentArray() {
  var arr:LevelSegment[] = [];
  for (let index = 0; index < consts.cols * consts.rows; index++) {
    arr.push({id:0,mod:0});
  }
  return arr;
}



export const useLevelStore = defineStore("level", {
  state: (): LevelData & {
    selectedId: number;
    mod: number,
    tool: "select" | "wall" | "bouncer";
  } => ({
    start: [50, 50],
    end: [300, 200],
    segments: generateSegmentArray(),
    mod: 0,
    selectedId: 1,
    tool: "select"
  }),

  actions: {
    setSegment(segmentNumber: number) {
      if (segmentNumber >= 0 && segmentNumber < consts.cols * consts.rows) {
        this.segments[segmentNumber] = {
          id: this.selectedId,
          mod: this.mod
        }
      }
    },
    clear() {
      this.segments = generateSegmentArray();
    }, 
    unsetSegment(segmentNumber: number) {
      if (segmentNumber >= 0 && segmentNumber < consts.cols * consts.rows) {
        this.segments[segmentNumber] = {
          id: 0,
          mod: 0
        }
      }
    },

    setMod(mod:number) {
      this.mod = mod;
    },


    select(id: number) {
      this.selectedId = id;
    }
  }
});
