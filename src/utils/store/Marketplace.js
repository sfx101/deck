import { readable } from "svelte/store";
import { getNominalStackList, getStacks } from "./../models/Marketplace";
const _ = require("lodash");

/**
 *
 * @returns
 */
export let nominalStackStore;

/**
 * Installation of nominal stacks in store
 */
export function initNominalStackStore() {
    if (!_.isArray(nominalStackStore)) {
        let stacks = getNominalStackList();
        nominalStackStore = stacks.length > 0 ? readable(stacks) : false;
    }
    return nominalStackStore;
}

/**
 *
 * @returns
 */
export let stackStore;

/**
 * Installation of stacks in store
 */
export function initStackStoreStore() {
    if (!_.isArray(stackStore)) {
        let stacks = getStacks();
        stackStore = stacks.length > 0 ? readable(stacks) : false;
    }
    return stackStore;
}
