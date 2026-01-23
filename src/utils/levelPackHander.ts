import { useLevelStore } from "@/stores/levelStore";
import golfCode from "./golfCode";
import type { LevelData } from "@/types/LevelTypes";
import { showToast } from "./toasts";

type NamedLevel = {name: string, code:string}
type LevelPack = NamedLevel[]

function savePack(level:LevelData[]) {
    const src = level;
    var out:LevelPack = src.map<NamedLevel>((l) => {
        return {
            name: l.name,
            code: golfCode.encode(l.segments.map((s) => [s.id,s.mod]))
        }
    })

    const ourJSON = JSON.stringify(out);
    console.log("Save Data: " + ourJSON);

    const blob = new Blob([ourJSON]);

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob)
    const date = new Date(Date.now());
    const dateString = `${date.getUTCFullYear()}-${date.getUTCDate()}-${date.getHours()}`
    link.download = "levelPack-" + dateString + ".mgc"
    link.click();
    link.remove();
}



function loadPack() {
    const fileInput = document.createElement("input");
    var resolve = (_:NamedLevel[]) => {};
    const prom = new Promise<NamedLevel[]>((r) => resolve = r)
    fileInput.type = "file"
    fileInput.accept = ".mgc"
    
    fileInput.addEventListener("change", (e) => handleLoad(fileInput,resolve))

    fileInput.click();
    return prom;
}

function handleLoad(fileInput:HTMLInputElement,resolve: (_:NamedLevel[]) => void) {
    if (!fileInput.files || !fileInput.files.length) {
        showToast("Please select a JSON file first.", "error");
        return;
    }

    const file = fileInput.files[0];
    if (!file) {
        showToast("Failed Reading", "error")
        return;
    }

    // Ensure it's a JSON file
    if (file.type !== "application/json" && !file.name.endsWith(".mgc")) {
        showToast("Invalid file type. Please select a .json file.", "error");
        return;
    }

    const reader = new FileReader();

    // Read file as text
    reader.onload = function (event) {
        try {
            const jsonData = JSON.parse(event.target?.result as string) as LevelPack; // Parse JSON
            console.log("Load Data: " + jsonData)
            resolve(jsonData);
        } catch (err) {
            showToast("Error parsing JSON", "error");
        }
    };

    reader.onerror = function () {
        showToast("Error reading file.", "error");
    };

    reader.readAsText(file);
}

export default {
    savePack,
    loadPack
}