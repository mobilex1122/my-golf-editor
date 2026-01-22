<script setup lang="ts">
import consts from '@/consts';
import { useLevelStore } from '@/stores/levelStore';
import ModEncoder from '@/utils/mod';
import { computed } from 'vue';
const levelState =useLevelStore()


const rotation = computed(() => {
    const rot = ModEncoder.getRotation(levelState.mod)


    return (rot * 90) + "deg"
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
            <span style="user-select: none; cursor:default;">None</span>
            <x-tooltip style="--align: right;">Right Button</x-tooltip>
        </x-button>
        <x-button v-for="segment in consts.segments" size="large"
            class="sidebar-button"
            :toggled="levelState.selectedId == segment"
            skin="dock"
            @click="levelState.select(segment)"
        >
            <svg class="segment" :style="{'rotate': rotation}" width="90%" height="90%"><use :href="'#segment-'+segment"></use></svg>
        </x-button>
    </x-box>
</template>
<style scoped>

.sidebar {
    flex-direction: column;
    overflow-y: auto;
    border-right: 1px solid var(--border-color);
    height: 100%;
    align-items: start;
}
.sidebar-button {
    margin-top: -1px;
    margin-right: -1px;
}
</style>