<script setup lang="ts">
import { useLevelStore } from '@/stores/levelStore';
import ModEncoder from '@/utils/mod';
import { computed } from 'vue';
const levelState = useLevelStore();


const segmentHrefID = computed(() => {
    return "#segment-" + levelState.selectedId
})

const rotation = computed(() => {
    const rot = ModEncoder.getRotation(levelState.mod)


    return (rot * 90) + "deg"
})


</script>

<template>
    <div class="box">
        <svg :style="{'rotate':rotation}" v-if="levelState.selectedId != 0" width="100%" height="100%" view-box="0 0 80 80"><use :href="segmentHrefID"></use></svg>
        <div v-else style="display: flex;justify-content: center; align-items: center;width: 100%; height: 100%;">
            <x-label>None</x-label>
        </div>
    </div>
</template>

<style scoped>
.box {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    opacity: 0.8;
    border: 1px solid var(--border-color);
}
</style>