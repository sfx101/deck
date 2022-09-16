import slash from "slash";
import { isWindows } from "../utils/Utils";

const path = require("path");
const localPath = isWindows
    ? path.join("\\\\wsl$", "deck-app", "mnt", "wsl", "deck-projects")
    : process.env.HOME;
const vmPath = isWindows
    ? "/mnt/wsl/deck-projects"
    : `/home/ubuntu/${process.env.USER}`;
const _ = require("lodash");

/**
 *  Translate mount path on VM
 *  userSelectedPath = /Users/sfx101/deck-projects/test101
 *  \\wsl$\deck-app\mnt\wsl\ďeck-projects\wp
 */
export function getMountPath(userSelectedPath) {
    //Does the user selected dir match the `localPath`?
    if (!userSelectedPath.startsWith(localPath)) {
        return null;
    }

    //Remove trailing slash
    userSelectedPath = _.trimEnd(userSelectedPath, "/");
    //Get path w/o mount point
    let trimmedPath = _.replace(userSelectedPath, localPath, "");
    //Merge w/ vmPath
    return vmPath + slash(trimmedPath);
}

export function getHostPath(mountPath) {
    //Does the user selected dir match the `localPath`?
    if (!_.startsWith(mountPath, vmPath)) return null;

    //Remove trailing slash
    mountPath = _.trimEnd(mountPath, "/");
    //Get path w/o mount point
    let trimmedPath = _.replace(mountPath, vmPath, "");
    //Merge w/ `localPath`
    return localPath + trimmedPath;
}

export function isMountPath(userSelectedPath) {
    return _.startsWith(userSelectedPath, vmPath) ? true : false;
}
