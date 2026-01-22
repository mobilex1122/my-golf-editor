<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue';
import ImportExportDialog from './ImportExportDialog.vue';
import { useLevelStore } from '@/stores/levelStore';

const levelState = useLevelStore()

const dialogE = useTemplateRef("importexportDialog")
const aboutModal = useTemplateRef("aboutModal")
const clearModal = useTemplateRef("clearModal")

const exportD = () => dialogE.value?.open("export")
const importD = () => dialogE.value?.open("import")


function shortcut(e:KeyboardEvent) {
    if (e.shiftKey && !e.ctrlKey && !e.altKey) {
        if (e.key.toLowerCase() == "e") {
            exportD();
        }
        if (e.key.toLowerCase() == "i") {
            importD();
        }
    }
}

onMounted(() => {
    window.addEventListener("keyup", shortcut)
})
</script>

<template>
    <x-menubar>
        <x-menuitem>
            <x-label>Level</x-label>

            <x-menu>
                <x-menuitem @click="clearModal?.showModal()">
                    <x-label>Clear</x-label>
                </x-menuitem>

                <hr>

                <x-menuitem @click="importD()">
                    <x-label>Import</x-label>
                </x-menuitem>
                <x-menuitem @click="exportD()">
                    <x-label>Export</x-label>
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