/**
 * @author : DECK Contributors
 * @description : This is settings model to perform Utils function
 */

/**
 * Import dependencies
 */
import _ from "lodash";
import { settingsStore } from "./../store/Settings";

/**
 * Declaration of constant variables
 */
const appSettings = require("electron-settings");
const os = require("os");

/**
 * @author : DECK Contributors
 * @description : Initialization of electron settings to store variable
 */
export async function initDockerEngineSettings() {
    let data = await appSettings.get("settings");
    let defaultSettings = getDefaultSettings();

    if (_.get(data, "dockerEngine", false)) {
        if (_.get(data, "dockerEngine.remoteEngine", false)) {
            defaultSettings.dockerEngine.remoteEngine =
                data.dockerEngine.remoteEngine;
        }

        if (_.get(data, "dockerEngine.host", false)) {
            defaultSettings.dockerEngine.host = data.dockerEngine.host;
        }

        if (_.get(data, "dockerEngine.port", false)) {
            defaultSettings.dockerEngine.port = data.dockerEngine.port;
        }
    }
    settingsStore.update((storeData) => {
        storeData.remoteEngine = defaultSettings.dockerEngine.remoteEngine;
        storeData.host = defaultSettings.dockerEngine.host;
        storeData.port = defaultSettings.dockerEngine.port;
        return storeData;
    });
    return data;
}

/**
 * @author : DECK Contributors
 * @description : Set settings
 * @param {String} key
 * @param {String} value
 */
export async function setSettings(key, value) {
    await appSettings.set(key, value);
    await initDockerEngineSettings();
}

/**
 * @author : DECK Contributors
 * @description : Get default settings according to operating system
 * @returns {
 *       dockerEngine: {
 *           remoteEngine: true,
 *           host: "127.0.0.1",
 *           port: "2376",
 *       },
 *   }
 */
export function getDefaultSettings() {
    // @TODO: Set OS dependent default settings
    // if (os.platform() === "win32") {
    // } else if (os.platform() === "darwin") {
    // }
    return {
        dockerEngine: {
            remoteEngine: false,
            host: "127.0.0.1",
            port: "2376",
        },
    };
}

/**
 * @author : DECK Contributors
 * @description : Get get docker engine settings and set default if not.
 * @returns {
 *           remoteEngine: true,
 *           host: "127.0.0.1",
 *           port: "2376"
 * }
 */
export async function getDockerEngine() {
    let defaultSettings = getDefaultSettings();
    let settings = await appSettings.get("settings.dockerEngine");
    if (!_.get(settings, "remoteEngine", false)) {
        await appSettings.set(
            "settings.dockerEngine.remoteEngine",
            defaultSettings.dockerEngine.remoteEngine
        );
    }
    if (!_.get(settings, "host", false)) {
        await appSettings.set(
            "settings.dockerEngine.host",
            defaultSettings.dockerEngine.host
        );
    }
    if (!_.get(settings, "port", false)) {
        await appSettings.set(
            "settings.dockerEngine.port",
            defaultSettings.dockerEngine.port
        );
    }
    settings = await appSettings.get("settings.dockerEngine");

    settingsStore.update((storeData) => {
        storeData.remoteEngine = settings.remoteEngine;
        storeData.host = settings.host;
        storeData.port = settings.port;
        return storeData;
    });

    return settings;
}

/**
 * @author : DECK Contributors
 * @description : Get get host
 * @returns {
 *           remoteEngine: true,
 *           host: "127.0.0.1",
 *           port: "2376"
 * }
 */
export async function getHost() {
    let host = await appSettings.get("settings.dockerEngine.host");
    if (host === undefined) {
        host = "127.0.0.1";
        // if (os === "win32") {
        //     privateHostName = "localhost";
        // } else {
        //     privateHostName = "192.168.64.14";
        // }
    }
    return host;
}
