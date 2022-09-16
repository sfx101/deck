const os = require("os");
const shell = process.env[os.platform() === "win32" ? "COMSPEC" : "SHELL"];
let pty = require("node-pty");

/**
 * TODO:
 * Fix issue with Store not updating value correctly
 */

export function getPtyProcess() {
    return pty.spawn(shell, [], {
        name: "xterm-color",
        cols: 120,
        rows: 30,
        cwd: process.env.HOME,
        env: process.env
        // handleFlowControl: true,
    });
}
