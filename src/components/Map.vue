<script setup lang="ts">
import { computed, watch } from 'vue';
import MapSection from './MapSection.vue';

import consts from '@/consts';
import { useLevelStore } from '@/stores/levelStore';

const levelState = useLevelStore();

const map = computed(() => {
    return levelState.segments
})

watch(map,(v) => {
    if (v.length == 0) {
        levelState.addLevel();
    }
}, {immediate: true})
</script>

<template>
    <div v-if="map.length > 0" class="map-grid" :style="{'--rows': consts.rows, '--cols': consts.cols}">
        <MapSection v-for="(value,index) in map" :index :segment="value"></MapSection>
    </div>
    <div v-else>
        <x-button @click="levelState.addLevel()">
            New Level
        </x-button>
    </div>
</template>


<style lang="css" scoped>

.map-grid {
    background-color: black;
    display: grid;
    grid-template-columns: repeat(var(--cols), 100px);
    grid-template-rows: repeat(var(--rows), 100px);
}
</style>