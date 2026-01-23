import { defineStore } from "pinia";
import type { LevelData, LevelRef, LevelSegment } from "../types/LevelTypes";
import consts from "@/consts";
import ModEncoder from "@/utils/mod"

function generateSegmentArray() {
  var arr:LevelSegment[] = [];
  for (let index = 0; index < consts.cols * consts.rows; index++) {
    arr.push({id:0,mod:0});
  }
  return arr;
}




var idCount = 0;
export const useLevelStore = defineStore("level", {
  state: ():  {
    selectedId: number;
    mod: number,
    levels: (LevelData & {id:number})[];
    tab: number,
    tool: "select" | "wall" | "bouncer";
  } => ({
    levels: [],
    tab: -1,
    mod: 0,
    selectedId: 1,
    tool: "select"
  }),

  getters: {
    segments: (state) => state.levels.find(v => v.id == state.tab)?.segments ?? [],
    hasErrors: (state) => {
      const segments = state.levels.find(v => v.id == state.tab)?.segments ?? []
      if (segments.findIndex(v => v.id > 0) == -1) {
        return "No Map"
      }
      if (segments.findIndex(v => v.id == 1) == -1) {
        return "No Start"
      }
      if (segments.findIndex(v => v.id == 4) == -1) {
        return "No End"
      }

      return false
    }
  },

  actions: {
    rotate(amm:number) {
      var rot = ModEncoder.getRotation(this.mod);
      console.log("Before: ",rot);

      rot +=  amm
      rot = rot % 4;
      var mod = ModEncoder.setRotation(this.mod,rot);
      this.setMod(mod);
    },

    setSegment(segmentNumber: number) {
      if (segmentNumber >= 0 && segmentNumber < consts.cols * consts.rows) {
        this.segments[segmentNumber] = {
          id: this.selectedId > 0 ? this.selectedId : 0,
          mod: this.mod
        }
      }
    },
    addLevel(segments?: LevelSegment[],name?:string) {
      if (!segments) {
        segments = generateSegmentArray();
      }
      if (!name) {
        name = "Level " + (this.levels.length + 1)
      }
      this.levels.push({name, id: ++idCount, segments })
      this.tab = idCount;
    },
    setSegments(segments: LevelSegment[]) {
      const l = this.levels.find(v => v.id == this.tab)
      if (l) {
        l.segments = segments;
      }
      
    },
    renameLevel(r:LevelRef) {
      const l = this.levels.find(v => v.id == r.id)
      if (l) {
        l.name = r.name
      }
    },
    closeLevel(id:number) {
      const level = this.levels.findIndex(v => v.id == id) - 1;
      this.levels = this.levels.filter(v => v.id != id);
      
      this.tab = this.levels[level >= 0 ? level : 0]?.id ?? -1;
    },
    setTab(n:number) {
      this.tab = n;
    },
    clear() {
      const level = this.levels.find(l => l.id == this.tab);
      if (level) {
        level.segments = generateSegmentArray();
      }
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
