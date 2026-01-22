<script setup lang="ts">
import { computed } from 'vue';
import MapSection from './MapSection.vue';

import consts from '@/consts';
import { useLevelStore } from '@/stores/levelStore';

const levelState = useLevelStore();

const map = computed(() => {
    return levelState.segments
})
</script>

<template>
    <div class="map-grid" :style="{'--rows': consts.rows, '--cols': consts.cols}">
        <MapSection v-for="(value,index) in map" :index :segment="value"></MapSection>
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