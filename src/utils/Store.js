import { writable } from "svelte/store";

export const compactLog = writable("");
export const outputIO = writable("");
export const terminalReader = writable("");
export const terminalWriter = writable("");
export const controls = writable({
    panel: false,
    output: false,
    terminal: false,
});

export const docker_custom_domain = writable(true);

export let outputClasses = writable("bg-azure-700");
