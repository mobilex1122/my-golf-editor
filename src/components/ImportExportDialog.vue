<script setup lang="ts">
import consts from '@/consts';
import { useLevelStore } from '@/stores/levelStore';
import type { LevelSegment } from '@/types/LevelTypes';
import golfCode, { type GolfCodeString } from '@/utils/golfCode';
import { computed, ref, useTemplateRef } from 'vue';

type DialogMode = "export" | "import"

const levelState = useLevelStore();

const dialog = useTemplateRef<HTMLDialogElement>("dialog");
const dialogMode = ref<DialogMode>("export")

const importCode = ref<GolfCodeString>("")
const importError = ref<string>("")

defineExpose({
    open: (type:DialogMode) => {
        dialogMode.value = type;
        dialog.value?.showModal()
    }
})

const exportCode = computed(() => {
 
    var golfcode = levelState.segments.map(seg => [seg.id,seg.mod])

    return golfCode.encode(golfcode)
})


function close() {
    importCode.value = "";
    dialog.value?.close()
}

function importClose() {

    try {
        var code = golfCode.decode(importCode.value)
        
        var segments = code.map<LevelSegment>(seg => {return {id: seg[0],mod: seg[1]} as LevelSegment})
        if (segments.length == consts.cols * consts.rows) {
            importCode.value = "";
            levelState.segments = segments;
            dialog.value?.close()
        } else {
            importError.value = "Wrong Code Size"
        }
    } catch (e) {
        importError.value = "Import Error"
    }
    
    
}

</script>

<template>
    <dialog ref="dialog">
        <template v-if="dialogMode == 'export'">
            <h3>Export</h3>
            <p>Your GolfCode:</p>
            <code class="export-code">{{ exportCode }}</code>
            <footer>
                <x-button @click="close()">Close</x-button>
            </footer>
        </template>

        <template v-if="dialogMode == 'import'">
            <h3>Import</h3>
            <p>Enter GolfCode:</p>
            <x-input style="max-width: 100%;" v-model="importCode"></x-input>
            <div v-if="importError" style="color: var(--error-color)">
                {{ importError }}
            </div>
            <footer>
                <x-button @click="close()">Cancel</x-button>
                <x-button toggled @click="importClose()">Import</x-button>
            </footer>
        </template>
        
    </dialog>
</template>

<style scoped>
  dialog::backdrop {
    pointer-events: none;
  }
  .export-code {
    margin-inline: auto;
    user-select:all;
    display:block;width: 24ch;word-break: break-all;
  }
</style>