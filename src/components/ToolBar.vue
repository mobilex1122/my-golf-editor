<script setup lang="ts">
import { useLevelStore } from '@/stores/levelStore';
import ModEncoder from '@/utils/mod';

const levelState = useLevelStore();

function rotate(amm:number) {
    var rot = ModEncoder.getRotation(levelState.mod);
    console.log("Before: ",rot);

    rot +=  amm
    rot = rot % 4;
    var mod = ModEncoder.setRotation(levelState.mod,rot);
    levelState.setMod(mod);
}

</script>

<template>
    <x-box class="toolbar">
        <x-buttons>
            <x-button @click="rotate(-1)">
                <x-icon href="#rotate-left"></x-icon>
            </x-button>
             <x-button @click="rotate(1)">
                <x-icon href="#rotate-right"></x-icon>
            </x-button>
        </x-buttons>
        <x-buttons>
            <x-button disabled>
                <x-icon href="#flip-h"></x-icon>
            </x-button>
             <x-button disabled>
                <x-icon href="#flip-v"></x-icon>
            </x-button>
        </x-buttons>
    </x-box>
</template>

<style scoped>

.toolbar {
    gap: 0.5rem;
    padding: 0.5rem;
    border-bottom: 1px solid var(--border-color);
    align-items: start;
}
</style>