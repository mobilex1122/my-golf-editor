<script setup lang="ts">
import { useTemplateRef } from 'vue';
import ImportExportDialog from './ImportExportDialog.vue';

const dialogE = useTemplateRef("importexportDialog")

const exportD = () => dialogE.value?.open("export")
const importD = () => dialogE.value?.open("import")
</script>

<template>
    <x-menubar>
        <x-menuitem>
            <x-label>File</x-label>

            <x-menu>
                <x-menuitem>
                    <x-label>New</x-label>
                   
                </x-menuitem>

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
                <x-menuitem>
                    <x-label>About</x-label>
                </x-menuitem>
            </x-menu>
        </x-menuitem>

    </x-menubar>
    <import-export-dialog ref="importexportDialog"></import-export-dialog>
</template>