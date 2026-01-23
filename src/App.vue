
<script setup lang="ts">
import { onMounted } from 'vue';
import Map from './components/Map.vue';
import MenuBar from './components/MenuBar.vue';
import SegmentSelector from './components/SegmentSelector.vue';
import SelectedPreview from './components/SelectedPreview.vue';
import ToolBar from './components/ToolBar.vue';
import symbolsSvg from './segments.svg?raw';
import LevelTabs from './components/LevelTabs.vue';
import Player from './components/Player.vue';

function confirmExit() {
  return "You have attempted to leave this page. Are you sure?";
}

onMounted(() => {
  window.onbeforeunload = confirmExit;
  
})
</script>
<template>

  <MenuBar></MenuBar>

  <ToolBar></ToolBar>
  <x-box style="align-items: stretch;flex-grow: 1; position: relative; flex-shrink: 1; min-height: 0;">
    <SegmentSelector></SegmentSelector>
    <x-box style="flex-grow: 1; flex-shrink: 1; min-width: 0; flex-direction: column;">
      <LevelTabs></LevelTabs>
      <x-box style="justify-content: center; flex-grow: 1; padding: 0.5rem; width: 100%; position: relative;">
        <Map></Map>
        <SelectedPreview></SelectedPreview>
      </x-box>
    </x-box>
  </x-box>

  <div style="display: none;" :innerHTML="symbolsSvg"></div>
</template>

<style scoped>
  
</style>

