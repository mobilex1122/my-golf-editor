<script setup lang="ts">
import { useLevelStore } from '@/stores/levelStore';
import golfCode from '@/utils/golfCode';
import { computed, ref } from 'vue';



const levelState = useLevelStore();

const mapUrl = computed(() => {
    return "https://apps.janp.cz/mygolf/#" + golfCode.encode(levelState.segments.map(v => [v.id,v.mod])) 
})
const hasData = computed(() => levelState.segments.findIndex(d => d.id > 0) != -1)
</script>


<template>

    <iframe v-if="hasData"class="base" :src="mapUrl">

    </iframe>
    <div v-else class="base nodata" >
        NO MAP TO PLAY!
    </div>
</template>

<style lang="css" scoped>
    .base {
        border: none;
        display: block;
        border-radius: 5px;
        background-color: black;
        color: white;
        width: 600px;
        height: 600px;
    }
    .nodata {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>