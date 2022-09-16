/**
 * @author : DECK Contributors
 * @description : This is store file for notification.
 * all shared values are define here.
 */

import { writable } from "svelte/store";

/**
 *
 * @returns:
 * 	{
 *      title: "",
 *      description: "",
 *      successButtonText: "Ok",
 *      cancelButtonText: "Dismiss",
 *      action: false,
 *      cancel: false,
 *      show: false,
 *      meta: null,
 * 	}
 */
export let confirmNotificationStore = writable({
    title: "",
    description: "",
    successButtonText: "Ok",
    cancelButtonText: "Dismiss",
    action: false,
    cancel: false,
    show: false,
    meta: null,
});

/**
 * Process alert
 */
export let cmdProcess = writable({
    title: "Opps some other process is running!",
    description:
        "Some other process is running. Please wait and try again after process done.",
    cancelButtonText: "Dismiss",
    show: false,
    isProcessRunning: false,
});
