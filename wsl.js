const child_process = require("child_process");
const logger = require("electron-timber");
const wslLogger = logger.create({ name: "wsl" });

exports.runWSLDaemon = function (command, args, callback) {
    var child = child_process.spawn("wsl", ["-d", "deck-app", "dockerd"], {});

    child.on("error", (error) => {
        wslLogger.error("Stream ERR >>>");
        wslLogger.error(error);
    });

    //The data on stdout is sent to stderr, it's a node js child_process behavior
    //So, stream stdout can be ignored here
    //TODO: R&D on how to get unified stream
    child.stderr.setEncoding("utf8");
    child.stderr.on("data", (data) => {
        wslLogger.log("Stream >>>");
        wslLogger.log(data);
    });

    child.on("close", (code) => {
        //Here you can get the exit code of the script
        switch (code) {
            case 0:
                wslLogger.error("Process exited w/o any errors");
                break;
            case 1:
                wslLogger.log(
                    "Process is already running, this message can be ignored"
                );
                break;
            default:
                wslLogger.error("Process exited w/ err code: ", code);
        }
    });
    if (typeof callback === "function") callback();
};
