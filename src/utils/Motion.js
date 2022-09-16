import { get } from "svelte/store";
import { outputClasses } from "./Store";
import { controls } from "../utils/Store";

export function animateOutput() {
    
    
    if (!get(controls).panel) {
        outputClasses.set("bg-pumpkin-500");
        setTimeout(() => {
            outputClasses.set("bg-azure-700");
        }, 500);
    }
}
/**
 * TODO: Better logic for success
 */
export function animateOutputSuccess() {
    setTimeout(() => {
        outputClasses.set("bg-green-600");
    }, 1000);
    setTimeout(() => {
        outputClasses.set("bg-azure-700");
    }, 5000);
}

export function animateOutputError() {
    setTimeout(() => {
        outputClasses.set("bg-red-600");
    }, 1000);
    setTimeout(() => {
        outputClasses.set("bg-azure-700");
    }, 5000);
}
