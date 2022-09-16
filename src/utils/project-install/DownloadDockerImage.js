/**
 * Imports modules
 */
import getStoragePath from "../Utils";

/**
 * Constant declaration/definition
 */
const download = require("download-git-repo");
const fs = require("fs-extra");

/**
 *
 * @param {*} stackName [Stack project name]
 * @param {*} image [Image which using for stack]
 * @param {*} latestVersionName [Get Github version Object]
 * @returns Promise object (Stack resource from github)
 */
export default function downloadDockerImage(
    stackName,
    image,
    latestVersionName
) {
    return new Promise(function (resolve, reject) {
        download(
            `direct:https://github.com/${image["@Github"]}/archive/${latestVersionName}.zip`,
            `${getStoragePath()}/apps/${stackName}`,
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            }
        );
    });
}

/**
 *
 * @description : Copy docker image for create new project
 * @param {*} stackName
 * @param {*} image
 * @returns
 */
export function copyLocalDockerImage(stackName, image) {
    return new Promise(function (resolve, reject) {
        copy(image["@LocalPath"], `${getStoragePath()}/apps/${stackName}`).then(
            (res) => {
                if (res === true) {
                    resolve(res);
                } else {
                    reject(false);
                }
            }
        );
    });
}

/**
 *
 * @description : Copy folder one path to other path locally
 * @param {String} source
 * @param {String} destination
 * @returns Boolean
 */
async function copy(source, destination) {
    let returnData = false;
    try {
        await fs.copy(source, destination);
        returnData = true;
    } catch (err) {
        console.error(err);
    }
    return returnData;
}
