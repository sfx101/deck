/**
 * @author : DECK Contributors
 * @description : This is store file for settings all shared values are define here.
 */

import { writable } from "svelte/store";

/**
 *
 * @returns:
 * 	{
 *      remoteEngine: false,
 *      host: null,
 *      port: null,
 * 	}
 */
export let settingsStore = writable({
    remoteEngine: false,
    host: null,
    port: null,
});

/**
 * Return JSON
 */
export let defaultEditorStore = writable(null);

/**
 * Return string
 */
export let defaultTerminalStore = writable(null);
