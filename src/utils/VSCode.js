import { openCodePath } from "./Utils";

const child_process = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

function getBinPath(escapeSpaces) {
    if (os.platform() === "win32" || os.platform() === "linux") return "code";
    return `open -n -b "com.microsoft.VSCode" --args`;
    // let VSCode = escapeSpaces
    //     ? "Visual\\ Studio\\ Code.app"
    //     : "Visual Studio Code.app";
    // return path.join(
    //     "/Applications",
    //     VSCode,
    //     "Contents/Resources/app/bin/code"
    // );
    //open -n -b "com.microsoft.VSCode" --args /Users/sfx101/my-test-projects
}

/**
 * Using either code:// protocol or code executable in bin
 */
export function isInstalled() {
    return new Promise((resolve, reject) => {
        if (os.platform() === "win32" || os.platform() === "linux") {
            resolve(true);
        } else {
            fs.promises
                .access(getBinPath())
                .then(() => {
                    resolve(true);
                })
                .catch(() => {
                    reject(false);
                });
        }
    });
}

export function open(projectPath) {
    child_process.exec(
        `${getBinPath(true)} ${projectPath}`,
        (err, stdout, stderr) => {
            if (err) {
                openCodePath(projectPath);
            }
        }
    );
}
