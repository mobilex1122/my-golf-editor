<script setup lang="ts">
import consts from '@/consts';
import { useLevelStore } from '@/stores/levelStore';
import ModEncoder from '@/utils/mod';
import { computed, onMounted } from 'vue';
import segments from '../segments.svg?seg';


const levelState =useLevelStore()

console.log(segments)

const rotation = computed(() => {
    const rot = ModEncoder.getRotation(levelState.mod)


    return (rot * 90) + "deg"
})

function scrollHandler(e:WheelEvent)  {
    if ( !e.shiftKey && !e.ctrlKey && e.altKey && e.deltaY != 0) {
        var seg = segments.findIndex(s => s.id == levelState.selectedId);

        seg += (e.deltaY > 0 ? 1 : -1);
        seg = Math.max(-1,Math.min(segments.length - 1,seg));
        console.log(segments.length, seg)
        levelState.select(segments[seg]?.id ?? 0)
    }
}
onMounted(() => {
    window.addEventListener("wheel", scrollHandler)
})

</script>

<template>
    <x-box class="sidebar">
        <x-button size="large"
            class="sidebar-button"
            :toggled="levelState.selectedId == 0"
            skin="dock"
            @click="levelState.select(0)"
        >
            <x-label>None</x-label>
            <x-tooltip style="--align: right;">None</x-tooltip>
        </x-button>
        <x-button v-for="segment in segments" size="large"
            class="sidebar-button"
            :toggled="levelState.selectedId == segment.id"
            skin="dock"
            @click="levelState.select(segment.id)"
        >
            <svg class="segment" style="pointer-events: none;" :style="{'rotate': rotation}" width="90%" height="90%"><use :href="'#segment-'+segment.id"></use></svg>
            <x-tooltip v-if="segment.title" style="--align: right">{{ segment.title }}</x-tooltip>
        </x-button>

        <div class="filler">

        </div>
    </x-box>
</template>
<style scoped>

.sidebar {
    flex-direction: column;
    overflow-y: auto;
    height: 100%;
    align-items: start;
    overflow-x: hidden;
    z-index: 1;
    flex-shrink: 0;
}
.filler {
    flex-grow: 1;
    width: 100%;
    box-sizing: border-box;
    border-right: 1px solid var(--border-color);
}
</style>