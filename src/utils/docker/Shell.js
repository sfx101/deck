/**
 * Imports
 */
import _ from "lodash";
import { get } from "svelte/store";
import { getStackPath } from "./../Utils";
import { settingsStore } from "./../store/Settings";

/**
 * Constant variables
 */
const logger = require("electron-timber");
const { exec } = require("child_process");
const { remote } = require("electron");
const { app } = remote;
const path = require("path");
const os = require("os");
const dockerComposePath = !app.isPackaged
    ? path.join(app.getAppPath(), "bin", "docker-compose")
    : path.join(process.resourcesPath, "bin", "docker-compose");

/**
 * Export Login to shell
 */
export default function LogIntoShell(projectName, container) {
    let cmd;
    if (os.platform() === "win32") {
        cmd = getWinCmd(projectName, container);
    } else if (os.platform() === "linux") {
        cmd = getLinuxCmd(projectName, container);
    } else {
        cmd = getDefaultCmd(projectName, container);
    }
    exec(cmd);
}

/**
 *
 * @param {String} projectName
 * @param {String} container
 * @returns {String} cmd
 */
function getWinCmd(projectName, container) {
    const dockerComposeCmd = `\"${dockerComposePath}\"`;
    return `start cmd.exe /K "cd /d ${getStackPath(
        projectName
    )} && ${dockerComposeCmd} exec ${container} bash"`;
}

/**
 *
 * @param {String} projectName
 * @param {String} container
 * @returns {String} cmd
 */
function getDefaultCmd(projectName, container) {
    let cmd;
    let terminalOpenCmd = `osascript -e 'tell app "Terminal" to do script`;
    let cdPathCmd = `cd ${getStackPath(projectName)}`;

    if (_.get(get(settingsStore), "remoteEngine", false) === true) {
        cmd =
            `${terminalOpenCmd} "${cdPathCmd} && DOCKER_HOST=tcp://` +
            _.get(get(settingsStore), "host", false) +
            `:` +
            _.get(get(settingsStore), "port", false) +
            ` ${dockerComposePath} exec ${container} bash" & activate'`;
    } else {
        cmd = `${terminalOpenCmd} "${cdPathCmd} && docker-compose exec ${container} bash" & activate'`;
    }
    return cmd;
}

/**
 * @description : get linux command
 *
 * @param {String} projectName
 * @param {String} container
 * @returns {String} cmd
 */
function getLinuxCmd(projectName, container) {
    return `gnome-terminal -- /bin/bash -c 'cd ${getStackPath(
        projectName
    )} ; docker-compose exec ${container} bash'`;
}
