import getStoragePath from "../Utils";
import low from "lowdb";
import _ from "lodash";

import { getProjectEnv } from "./Projects";

const fs = require("fs");
const yaml = require("js-yaml");

const FileSync = require("lowdb/adapters/FileSync");

/**
 * @Description :  Array of stack list all properties from stacks.json
 * @returns: []
 */
export function getNetworks() {
    const filePath = getStoragePath() + "/storage/networks.json";

    let DB = false;
    let stacks = [];
    let returnData = [];

    try {
        DB = low(new FileSync(filePath));
        stacks = DB.get("networks").value();
        returnData = _.uniqWith(stacks, _.isEqual);
        returnData = _.reverse(returnData);
    } catch (error) {
        returnData = [];
    }
    return returnData;
}

/**
 * @Description : This object for network custom select form its used on install form on marketplace
 * @returns: [
 * {
 *		label: "Network driver",
 *		hint: "",
 *		values: ['netqwork-1', 'netqwork-2' ...],
 *		target: "NETWORKS_DRIVER",
 *	}
 * ]
 */
export function getNetworkFieldObject() {
    let networks = getNetworkOptions();

    return {
        label: "Network",
        hint: "Select a network",
        values: networks,
        target: "NETWORKS_DRIVER",
        default: "deck-app",
    };
}

/**
 * @description:Get the list of networks for select option
 * @returns ['network_name_1','network_name_2' ...]
 */
export function getNetworkOptions() {
    let networks = [];
    _.forEach(getNetworks(), function (network) {
        networks.push(network.name);
    });
    return networks;
}

export function getSelectedNetwork(projectName) {
    let env = getProjectEnv(projectName);
    let returnData = false;

    if (_.get(env, "NETWORKS_DRIVER", false)) {
        returnData = env["NETWORKS_DRIVER"];
    }
    return returnData;
}
