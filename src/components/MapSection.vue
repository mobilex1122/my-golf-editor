<script setup lang="ts">
import { useLevelStore } from '@/stores/levelStore';
import type { LevelSegment } from '@/types/LevelTypes';
import ModEncoder from '@/utils/mod';
import { computed } from 'vue';
const levelState = useLevelStore();

const props = defineProps<{
    segment: LevelSegment,
    index: number,
}>()


const segmentHrefID = computed(() => {
    return "#segment-" + props.segment.id
})

const rotation = computed(() => {
    const rot = ModEncoder.getRotation(props.segment.mod)


    return (rot * 90) + "deg"
})


function rightClick() {
    levelState.unsetSegment(props.index)
}

</script>

<template>
    <div class="box" @click="levelState.setSegment(index)" @contextmenu.stop.prevent="rightClick()">
        <svg :style="{'rotate':rotation}" v-if="props.segment.id != 0" width="100%" height="100%" view-box="0 0 80 80"><use :href="segmentHrefID"></use></svg>
    </div>
</template>

<style scoped>
.box {
    margin:0;width: 100%; height: 100%;
    position: relative;
}
.box::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid var(--background-color);
    box-sizing: border-box;
}
.box:hover::after {
    border: 1px solid var(--selection-background-color);
}
</style>