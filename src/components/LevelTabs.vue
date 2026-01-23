<script setup lang="ts">
import { useLevelStore } from '@/stores/levelStore';
import type { LevelData, LevelRef } from '@/types/LevelTypes';
import type { XelPopover } from '@/types/Xel';
import { computed, ref, useTemplateRef } from 'vue';


const levelState = useLevelStore();
const renamePopover = useTemplateRef<XelPopover>("renamePopover")
const closePopover = useTemplateRef<XelPopover>("closePopover")

const levels = computed(() => levelState.levels.map<LevelRef>((l) => {
    return {id: l.id, name:l.name}
}))



const renameValue = ref<LevelRef>({name:"",id:-1});
function rename(event:Event,level:LevelRef) {
    renameValue.value = {...level};
    if (event.currentTarget) {
        renamePopover.value?.open(event.currentTarget,true)
    }
}


const closeID = ref<number>(-1);
function close(event:Event,id:number) {
    closeID.value = id;
    if (event.currentTarget) {
        closePopover.value?.open(event.currentTarget,true)
    }
}


</script>


<template>
    <x-box class="tabs" style="">
        <x-buttons class="tab" v-for="level in levels" :key="level.id" :class="{'cur':levelState.tab == level.id}">
            <x-button class="tab-main" @click="levelState.setTab(level.id)" @dblclick="rename($event,level)" :toggled="levelState.tab == level.id">
                <x-label style="text-overflow: clip;">{{ level.name }}</x-label>

            </x-button>
            <x-button :toggled="levelState.tab == level.id" @click="close($event,level.id)">
                <x-icon size="small" href="#close"/>
            </x-button>            
        </x-buttons>
        <x-button @click="levelState.addLevel()">
            <x-icon size="small" href="#add"/>
        </x-button>
    </x-box>
    <x-popover modal ref="renamePopover">
        <x-box style="gap: 0.2rem">
            <x-input v-model="renameValue.name"></x-input>
            <x-button @click="levelState.renameLevel(renameValue); renamePopover?.close()"><x-icon href="#edit"/></x-button>
        </x-box>
    </x-popover>
    <x-popover modal ref="closePopover">    
        <x-button @click="closePopover?.close();levelState.closeLevel(closeID)"><x-icon href="#delete"/></x-button>
    </x-popover>
</template>

<style lang="css" scoped>
    .tab-main {
        width: 20ch;
        overflow: hidden;
        
        animation: tab-show 400ms;
    }
    @keyframes tab-show {
        from {
            width: 0ch
        }
    }
    .tabs {
        width: 100%; padding: 0.2rem; gap: 0.2rem;
        border-bottom: 1px solid var(--border-color);
        overflow-y: hidden;

        overflow-x: auto;
    }
    .cur {
        position: relative;
    }
</style>