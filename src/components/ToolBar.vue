<script setup lang="ts">
import { useLevelStore } from '@/stores/levelStore';
import ModEncoder from '@/utils/mod';
import { computed, onMounted, ref, useTemplateRef } from 'vue';
import Player from './Player.vue';
import { showToast } from '@/utils/toasts';
import segments from '../segments.svg?seg';

const levelState = useLevelStore();
const playerModal = useTemplateRef("player")


const readableRotation = computed(() => {
    var rot = ModEncoder.getRotation(levelState.mod);
    return (rot * 90) + "deg"
})


var shiftHeld = false;
function shortcut(e:KeyboardEvent) {
    if (e.key.toLowerCase() == "r" && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        if (e.shiftKey) {
            levelState.rotate(-1);
            
        } else {
            levelState.rotate(1);
        }
    }
}



function checkValid(e:Event) {
    if (levelState.hasErrors) {
        e.preventDefault()
        e.stopPropagation()
        showToast("Can't Play: " + levelState.hasErrors, "error")
    } else {
        playerModal.value?.showModal()
    }
}

var playerOpen = ref(false);
onMounted(() => {
    window.addEventListener("keydown", shortcut)
})

</script>

<template>
    <x-box class="toolbar">
        <x-buttons>
            <x-button @click="levelState.rotate(-1)">
                <x-icon href="#rotate-left"></x-icon>
                <x-tooltip style="--align: bottom;">Rotate Left</x-tooltip>
            </x-button>
            <x-button @click="levelState.rotate(1)">
                <x-icon href="#rotate-right"></x-icon>
                <x-tooltip style="--align: bottom;">Rotate Right</x-tooltip>
            </x-button>
        </x-buttons>
        <x-buttons>
            <x-button disabled>
                <x-icon href="#flip-h"></x-icon>
                <x-tooltip style="--align: bottom;">Horizontal Flip</x-tooltip>

            </x-button>
            <x-button disabled>
                <x-icon href="#flip-v"></x-icon>
                <x-tooltip style="--align: bottom;">Vertical Flip</x-tooltip>
            </x-button>
        </x-buttons>
        <x-button @click="levelState.mod = 0">
            <x-icon href="#refresh"></x-icon>
            <x-tooltip style="--align: bottom;">Reset Transforms</x-tooltip>
        </x-button>
        <div style="flex-grow:1"></div>
        <x-button @click="checkValid($event)">
            <x-icon href="#play"/>
            <x-tooltip>Playtest</x-tooltip>
            
        </x-button>
    </x-box>
    <dialog ref="player" @toggle="playerOpen = $event.newState == 'open'">
        <player v-if="playerOpen"></player>
    </dialog>
</template>

<style scoped>

.toolbar {
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem;
    border-bottom: 1px solid var(--border-color);
    align-items: start;
}
</style>