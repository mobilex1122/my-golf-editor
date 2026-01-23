<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue';
import ImportExportDialog from './ImportExportDialog.vue';
import { useLevelStore } from '@/stores/levelStore';
import levelPackHander from '@/utils/levelPackHander';
import golfCode from '@/utils/golfCode';
import type { LevelSegment } from '@/types/LevelTypes';
import { showToast } from '@/utils/toasts';
import segments from '../segments.svg?seg';

const levelState = useLevelStore()

const dialogE = useTemplateRef("importexportDialog")
const aboutModal = useTemplateRef("aboutModal")
const clearModal = useTemplateRef("clearModal")

const exportD = () => {
    if (levelState.hasErrors) {
        showToast("Can't Export: " + levelState.hasErrors, "error")
    } else {
        dialogE.value?.open("export")
    }
}
const importD = () => dialogE.value?.open("import")


function shortcut(e:KeyboardEvent) {
    if (e.shiftKey && !e.ctrlKey && !e.altKey) {
        if (e.key.toLowerCase() == "e") {
            exportD();
        }
        if (e.key.toLowerCase() == "i") {
            importD();
        }
        e.preventDefault()
    }

    if (!e.shiftKey && e.ctrlKey && !e.altKey) {
        if (e.key.toLowerCase() == "o") {
            openPack();
            e.preventDefault()
        }
        if (e.key.toLowerCase() == "s") {
            e.preventDefault()
            levelPackHander.savePack(levelState.levels)
        }
        if (e.key.toLowerCase() == "a") {
            e.preventDefault()
            levelState.addLevel();
        }
    }
}

async function openPack() {
    try {
        const data = await levelPackHander.loadPack();
        if (data) {
            levelState.levels = [];
            data.forEach((level) => {
                const c = golfCode.decode(level.code);
                const segments = c.map<LevelSegment>((s) => {
                    return {
                        id: s[0] ?? 0,
                        mod: s[1] ?? 0,
                    }
                })
                levelState.addLevel(segments,level.name) 
                showToast("Pack Loaded")

            })
        }
    } catch (e) {
        showToast("Failed to Open Pack", "error")
    }
    
}

onMounted(() => {
    window.addEventListener("keydown", shortcut)
})
</script>

<template>
    <x-menubar>
        <x-menuitem>
            <x-label>File</x-label>

            <x-menu>
                <x-menuitem @click="levelState.addLevel()">
                    <x-label>New Level</x-label>
                    <x-shortcut :value="['Control','A']"></x-shortcut>
                </x-menuitem>

                <hr>

                <x-menuitem @click="openPack()">
                    <x-label>Open Level Pack</x-label>
                    <x-shortcut :value="['Control','O']"></x-shortcut>

                </x-menuitem>
                <x-menuitem @click="levelPackHander.savePack(levelState.levels)">
                    <x-label>Save Level Pack</x-label>
                    <x-shortcut :value="['Control','S']"></x-shortcut>

                </x-menuitem>
            </x-menu>
        </x-menuitem>
        <x-menuitem>
            <x-label>Level</x-label>

            <x-menu>
                <x-menuitem @click="clearModal?.showModal()">
                    <x-label>Clear</x-label>
                </x-menuitem>

                <hr>

                <x-menuitem @click="importD()">
                    <x-label>Import</x-label>
                    <x-shortcut :value="['Shift','I']"></x-shortcut>
                </x-menuitem>
                <x-menuitem @click="exportD()">
                    <x-label>Export</x-label>
                    <x-shortcut :value="['Shift','E']"></x-shortcut>
                </x-menuitem>
            </x-menu>
        </x-menuitem>

        <x-menuitem>
            <x-label>Tools</x-label>

            <x-menu>
                <x-menuitem>
                    <x-label>Rotate</x-label>
                    <x-menu>

                        <x-menuitem @click="levelState.rotate(-1);">
                            <x-label>Left</x-label>
                            <x-shortcut :value="['Shift','R']"></x-shortcut>
                        </x-menuitem>
                        <x-menuitem @click="levelState.rotate(1);">
                            <x-label>Right</x-label>
                            <x-shortcut :value="['R']"></x-shortcut>
                        </x-menuitem>
                    </x-menu>
                </x-menuitem>
                <x-menuitem>
                    <x-label>Flip</x-label>
                    <x-menu>
                        <x-menuitem disabled>
                            <x-label>Horizontaly</x-label>
                        </x-menuitem>
                        <x-menuitem disabled>
                            <x-label>Verticaly</x-label>
                        </x-menuitem>
                    </x-menu>
                </x-menuitem>
                <x-menuitem>
                    <x-label>Segment</x-label>
                    <x-menu>
                        <x-menuitem @click="levelState.select(0)"
                            :toggled="0 == levelState.selectedId">
                            <x-label>None</x-label>
                        </x-menuitem>
                        <x-menuitem v-for="segment in segments"
                            @click="levelState.select(segment.id)"
                            :toggled="segment.id == levelState.selectedId">
                            <x-label>{{ segment.title }}</x-label>
                        </x-menuitem>
                    </x-menu>
                </x-menuitem>
            </x-menu>
        </x-menuitem>

        <x-menuitem>
            <x-label>Help</x-label>

            <x-menu>
                <x-menuitem @click="aboutModal?.showModal()">
                    <x-label>About</x-label>
                </x-menuitem>
            </x-menu>
        </x-menuitem>
        <x-menuitem slot="aside" disabled>
            My Golf Editor
        </x-menuitem>
    </x-menubar>



    <dialog ref="aboutModal">
        <h3>About</h3>
        <p>
            <b>Used Software</b>
        </p>
        <ul>
            <li>Vue</li>
            <li>Xel Toolkit</li>
        </ul>
        <footer>
            <div>Made by Jan Palma</div>
        </footer>
    </dialog>

    <dialog ref="clearModal">
        <h3>Clear?</h3>
        <p>
            Do you really want to clear the level?
        </p>
        <footer>
            <x-button @click="clearModal?.close()">
                <x-label>NO!!!</x-label>
            </x-button>
            <x-button @click="levelState.clear(); clearModal?.close()">
                <x-label>Yes</x-label>
            </x-button>
        </footer>
    </dialog>
    <import-export-dialog ref="importexportDialog"></import-export-dialog>
</template>