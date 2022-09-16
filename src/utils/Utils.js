import _ from "lodash";

const { remote } = require("electron");

const { app } = remote;
const { shell } = require("electron");
const fs = require("fs");
const os = require("os");

export default function getStoragePath() {
    let home = app.getPath("home");
    return `${home}/.deck`;
}

export function getStackPath(_stack) {
    return `${getStoragePath()}/apps/${_stack}`;
}

// Convert ENV to JSON and return
export function getEnvToJson(env) {
    let jsonData = {};
    var data_array = env.split("\n");
    data_array.forEach((item) => {
        var x = item.split("=");
        var y = {};
        jsonData[x[0]] = x[1];
    });
    return jsonData;
}

// Open url in external browser
export function openExternal(url) {
    shell.openExternal(url);
}

export function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return (
        rect.top != 0 && rect.left != 0 && rect.bottom != 0 && rect.right != 0
    );
}

export var isWindows = os.platform() === "win32" ? true : false;
export var isMac = os.platform() === "darwin" ? true : false;

/**
 * @description  Stack project open in external terminal this function work for win, linux and mac.
 * @param {String} projectName
 * @returns {void}
 */
export function openProjectInTerminal(projectName) {
    if (os.platform() === "win32") {
        let child_process = require("child_process");
        // Not using powershell because powershell.exe start and close in 1 sec.
        child_process.exec(
            "start cmd.exe /K cd /D " + getStackPath(projectName)
        );
    } else if (os.platform() === "darwin") {
        let { spawn } = require("child_process");
        let openTerminalAtPath = spawn("open", [
            "-a",
            "Terminal",
            getStackPath(projectName),
        ]);
        openTerminalAtPath.on("error", (err) => {});
    } else {
        let child_process = require("child_process");
        child_process.exec(
            "start " +
                process.env.SHELL +
                " /K cd /D " +
                getStackPath(projectName)
        );
    }
}

/**
 * @description  Project code path open in external terminal this function work for win, linux and mac.
 * @param {String} path
 * @returns {void}
 */
export function openTerminal(pathToOpen) {
    if (os.platform() === "win32") {
        let child_process = require("child_process");
        // Not using powershell because powershell.exe start and close in 1 sec.
        child_process.exec("start cmd.exe /K cd /D " + pathToOpen);
    } else if (os.platform() === "darwin") {
        let { spawn } = require("child_process");
        let openTerminalAtPath = spawn("open", ["-a", "Terminal", pathToOpen]);
        openTerminalAtPath.on("error", (err) => {});
    } else if (os.platform() === "linux") {
        const { spawn } = require("child_process");
        let openTerminalAtPath = spawn("gnome-terminal", { cwd: pathToOpen });
        openTerminalAtPath.on("error", (err) => {});
    } else {
        let child_process = require("child_process");
        child_process.exec(
            "start " + process.env.SHELL + " /K cd /D " + pathToOpen
        );
    }
}

/**
 *
 * @description Open code path on file explorer
 * @param {String} path
 * @returns { Void }
 */
export function openCodePath(path) {
    shell.openPath(path);
}

/**
 * @description Get the time elapsed
 * @param {new Date} startTime
 * @param {new Date} endTime
 * @returns {Sec} timeElapsed
 */
export function getTimeElapsed(startTime, endTime) {
    let seconds, timeDiff;
    timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff /= 1000;

    // get seconds
    seconds = Math.round(timeDiff);

    return getFormattedTime(seconds);
}

/**
 *
 * @description Get the formatted time by passing seconds
 * @param {String} value
 * @returns 00h 00m 00s
 */
function getFormattedTime(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    let result = "";

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (parseInt(hours)) {
        result = hours + "h ";
    }

    if (parseInt(minutes)) {
        result += minutes + "m ";
    }
    if (parseInt(seconds)) {
        result += seconds + "s ";
    }
    return result; // Return is HH : MM : SS
}

/**
 * @description Get Windows app top border class
 * @returns {String} Top border class
 */
export function getWinTopBorderClass() {
    return os.platform() === "win32" ? "border-t border-chillgray-100" : "";
}

/**
 * @description Can output show or not this function will return
 * @returns {Boolean} can output show or not?
 */
export function canOutputShow(currentRoute) {
    let showOutputArray = ["/stacks", "/installer", "/project"];
    let matchIndex = _.findIndex(showOutputArray, function (o) {
        if (currentRoute.match('wsl-status'))
            return 0;
        return _.startsWith(currentRoute, o);
    });
    return matchIndex >= 0 ? true : false;
}

/**
 * @description Can sidebar show or not this function will return
 * @returns {Boolean} can sidebar show or not?
 */
export function canSidebarShow(currentRoute) {
    let notShowArray = ["/entrypoint", "/installer"];
    let matchIndex = _.findIndex(notShowArray, function (o) {
        return _.startsWith(currentRoute, o);
    });
    return matchIndex >= 0 ? false : true;
}

/**
 * @description Is root url or not this function will return
 * @returns {Boolean} Is root url or not?
 */
export function isRootUrl(currentRoute) {
    let notShowArray = ["/entrypoint", "/"];
    return _.includes(notShowArray, currentRoute);
}

/**
 * Determine whether the given `path` points to an empty directory.
 *
 * @returns {Boolean}
 */
export function isEmptyDir(path) {
    return new Promise(async function (resolve, reject) {
        fs.readdir(path, function (err, files) {
            if (err) {
                reject(err);
            } else {
                if (!files.length) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        });
    });
}
