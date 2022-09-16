import _ from "lodash";
import { get } from "svelte/store";
import { cmdProcess } from "./../store/Notification";

/**
 * Check if any process is running or not
 */
export function isProcessRunning() {
    return _.get(get(cmdProcess), "isProcessRunning", false) === true
        ? true
        : false;
}

/**
 * Set start the process in store var to manage the process
 */
export function startProcess() {
    cmdProcess.update((obj) => {
        obj.title = "Hold on a sec";
        obj.description = "A process is already running, try after the previous process has ended";
        obj.cancelButtonText = "Dismiss";
        obj.show = false;
        obj.isProcessRunning = true;
        return obj;
    });
}

/**
 * Stop the process
 */
export function stopProcess() {
    cmdProcess.update((obj) => {
        obj.isProcessRunning = false;
        return obj;
    });
}

/**
 * Show alert message by setting store variable
 */
export function showProcessAlert() {
    cmdProcess.update((obj) => {
        obj.show = true;
        return obj;
    });
}
