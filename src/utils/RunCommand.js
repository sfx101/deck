import output from "./Output";
import {
    animateOutput,
    animateOutputSuccess,
    animateOutputError,
} from "./Motion";
import { get } from "svelte/store";
import { settingsStore } from "../utils/store/Settings";
import {
    isProcessRunning,
    startProcess,
    stopProcess,
    showProcessAlert,
} from "./../utils/models/Notification";

const { remote } = require("electron");
const { app } = remote;
const path = require("path");
const os = require("os");
const pty = require("node-pty");
const _ = require("lodash");
const platform = os.platform();

let shell = platform === "win32" ? "powershell.exe" : process.env.SHELL;

/**
 * If Docker desktop is installed, docker & docker-compose should
 * already be in the path.
 * If not then add docker-compose to path
 */
function importDockerCompose(cmd) {
    const settings = get(settingsStore);
    if (settings.remoteEngine === false) return cmd;

    let dockerComposePath = !app.isPackaged
        ? path.join(app.getAppPath(), "bin")
        : path.join(process.resourcesPath, "bin");

    if (platform !== "win32") {
        cmd = `export PATH="$PATH:${dockerComposePath}" ; ${cmd}`;
    } else if (platform === "win32") {
        //Issue with spaces in the user name
        // let dockerComposeBin = path.join(dockerComposePath, "docker-compose");
        // dockerComposeBin = `"${dockerComposeBin}"`;
        cmd = cmd.replaceAll(
            "docker-compose",
            path.join(dockerComposePath, "docker-compose").replaceAll(" ", "` ")
        );
    }
    return cmd;
}

export default function run(command, exit, canManageProcess = true) {
    return new Promise(function (resolve, reject) {
        if (isProcessRunning() === false || canManageProcess === false) {
            command = importDockerCompose(command);

            if (canManageProcess) {
                startProcess();
            }

            if (platform === "win32") {
                // command = `CLS ; ${command}`;
            } else {
                command = `echo -e '\\x1bc' && ${command}`;
            }

            let ptyProcess = pty.spawn(shell, [], {
                name: "xterm-color",
                cols: 80,
                rows: 30,
                cwd: process.env.HOME,
                env: process.env,
            });
            //Execute shell command
            const cmd = `${command} ; ${typeof exit === "undefined" ? "exit" : ""}\r`;
            console.log(`🚀 LOG | file: RunCommand.js | line 74 | Executing command ... `, cmd)
            ptyProcess.write(cmd);

            let debouncedTransition = _.debounce(() => {
                animateOutput();
            }, 200);

            ptyProcess.on("data", (data) => {
                debouncedTransition();
                if (data.trim() != "exit") {
                    output(data);
                }
            });

            ptyProcess.on("exit", (code) => {
                if (canManageProcess) {
                    stopProcess();
                }
                if (code === 0) {
                    animateOutputSuccess();
                } else {
                    animateOutputError();
                }
                ptyProcess.kill();
            });

            resolve(ptyProcess);
        } else {
            showProcessAlert();
            reject({ code: 2, message: "A process is already running." });
        }
    });
}
