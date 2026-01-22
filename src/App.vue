
<script setup lang="ts">
import Map from './components/Map.vue';
import MenuBar from './components/MenuBar.vue';
import SegmentSelector from './components/SegmentSelector.vue';
import SelectedPreview from './components/SelectedPreview.vue';
import ToolBar from './components/ToolBar.vue';
import symbolsSvg from './segments.svg?raw'
</script>
<template>

  <MenuBar></MenuBar>

  <ToolBar></ToolBar>
  <x-box style="align-items: stretch;flex-grow: 1; position: relative;">
    <SegmentSelector></SegmentSelector>

    <x-box style="justify-content: center; flex-grow: 1;">
      <Map></Map>
    </x-box>
    <SelectedPreview></SelectedPreview>
  </x-box>



  <div style="display: none;" :innerHTML="symbolsSvg"></div>
</template>

<style scoped>
  
</style>

