/**
 * Utils to work w/ Multipass
 */
import { get } from "svelte/store";
import { settingsStore } from "./store/Settings";
import { isEmptyDir } from "../utils/Utils";
import _ from "lodash";
import { getMountPath } from "../utils/Mount";

const os = require("os");
const path = require("path");
const { exec } = require("child_process");
const fs = require("fs");
const rimraf = require("rimraf");
const sudo = require("sudo-prompt");

export function hasRemoteEngine() {
    return _.get(get(settingsStore), "remoteEngine", false);
}

//Mounts user selected path to the VM
export function mountPath(localPath, projectName) {
    //path: /Users/sfx101/my-project
    return new Promise((resolve, reject) => {
        if (os.platform() === "win32") {
            getWinVmPath(localPath, projectName).then(
                (res) => {
                    resolve(res);
                },
                (err) => {
                    reject(err);
                }
            );
        } else {
            let basePath = path.basename(localPath);
            console.log(
                `🚀 LOG | file: VM.js | line 35 | returnnewPromise | basePath`,
                basePath
            );
            let vmPath = getMountPath(localPath);
            let mountCmd = `multipass exec deck-app -- stat ${vmPath}`;
            console.log(
                `🚀 LOG | file: VM.js | line 40 | returnnewPromise | vmPath`,
                vmPath
            );
            exec(mountCmd, (error, stdout, stderr) => {
                const err = {
                    error: "multipassMountError",
                    context: error,
                };
                //Added error object for showing Full Disk Access modal
                if (error) reject(err);
                console.log(
                    `🚀 LOG | file: VM.js | line 46 | exec | stderr`,
                    stderr
                );
                if (stderr) reject(err);
                resolve(vmPath);
            });
        }
    });
}

// @TODO: Remove after final new function getWinVmPath
// export function getWinVmPath(localPath) {
//     let resultPath = "",
//         resultPathArr = [];
//     resultPath = _.replace(localPath, ":", "");
//     resultPathArr = resultPath.split("\\");
//     if (_.get(resultPathArr, "[0]", "")) {
//         resultPathArr[0] = _.toLower(resultPathArr[0]);
//     }
//     resultPath = "/mnt/" + resultPathArr.join("/");
//     return resultPath;
// }

export function getWinVmPath(localPath, projectName) {
    return new Promise(async function (resolve, reject) {
        isEmptyDir(localPath).then(
            (response) => {
                if (response === true) {

                    // Empty folder logic
                    createSymlink(localPath, projectName).then(
                        (res) => {
                            console.log(`🚀 LOG | file: VM.js | line 86 | res`, res)
                            exec(`wsl -d deck-app mkdir -p ${res.path}`, (error, stdout, stderr) => {
                                console.log(`🚀 LOG | file: VM.js | line 88 | exec | error`, error)
                                console.log(`🚀 LOG | file: VM.js | line 88 | exec | stderr`, stderr)
                                console.log(`🚀 LOG | file: VM.js | line 88 | exec | stdout`, stdout)
                            });
                            resolve(_.get(res, "path", false));
                        },
                        (err) => {
                            reject(err);
                        }
                    );
                } else {
                    //
                    reject('The selected project path is not empty, select an empty path');
                    // let path1 = getLocalDriveToWslMntPath(localPath);
                    // let path2 =
                    //     "/" + ["home", "deck-projects", projectName].join("/");
                    // let runCmd =
                    //     "wsl -d deck-app ln -s '" + path1 + "' '" + path2 + "'";
                    // exec(runCmd, (error, stdout, stderr) => {
                    //     if (error) reject(error);
                    //     if (stderr) reject(stderr);
                    //     resolve(path2);
                    // });
                }
            },
            (err) => {
                reject(err);
            }
        );
    });
}

/**
 *
 * @description : Get local path array to MNT path
 * @param {*} localPath
 * @returns {String} mnt path
 */
export function getLocalDriveToWslMntPath(localPath) {
    let trimLocalPath = "",
        localPathArray = [];
    trimLocalPath = _.replace(localPath, ":", "");
    localPathArray = trimLocalPath.split("\\");
    if (_.get(localPathArray, "[0]", "")) {
        localPathArray[0] = _.toLower(localPathArray[0]);
    }
    return "/mnt/" + localPathArray.join("/");
}

/**
 *
 * @description : Create a link of given path
 * @param {String} localPath
 * @param {String} projectName
 * @returns {Promise} envPath
 */
function createSymlink(localPath, projectName) {
    return new Promise(async function (resolve, reject) {
        let options = {
            name: "DECK"
        };
        let returnData = "/" + ["home", "deck-projects", projectName].join("/");
        let makeLinkCommend =
            `mklink /D "` +
            localPath +
            `" "\\\\wsl$\\deck-app\\home\\deck-projects\\` +
            projectName +
            `"`;

        // Get status of folder delete
        let deleteFolderStatus = await deleteFolder(localPath);

        if (deleteFolderStatus === true) {
            sudo.exec(
                makeLinkCommend,
                options,
                function (error, stdout, stderr) {
                    if (error) {
                        reject({
                            message: "Something is wrong, mklink failed.",
                            data: error
                        });
                    } else {
                        resolve({
                            message: "Link successfully created.",
                            path: returnData,
                            status: 100
                        });
                    }
                }
            );
        } else {
            reject({
                message: "Something is wrong. Folder delete failed",
                data: deleteFolderStatus,
            });
        }
    });
}

/**
 *
 * @description : Delete the given path folder
 * @param {String} localPath
 * @returns {Boolean}
 */
function deleteFolder(localPath) {
    return new Promise(function (resolve, reject) {
        rimraf(
            localPath,
            function () {
                resolve(true);
            },
            function (err) {
                reject(err);
            }
        );
    });
}
