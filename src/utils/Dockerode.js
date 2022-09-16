import _ from "lodash";

const appSettings = require("electron-settings");
let dockerode = require("dockerode");

/**
 * @description Get dockerode object
 * @returns dockerode object
 */
export async function getDockerodeObject() {
    let params = await getDockerParams();
    
    return new dockerode(params);
}

/**
 * @description Get param for dockerode
 * @returns {
 *      protocol: 'https',
 *      host: 127.0.0.1,
 *      port: Number
 * }
 */
export async function getDockerParams() {
    let dockerEngine = await appSettings.get("settings.dockerEngine");
    
    return _.get(dockerEngine, "remoteEngine", false) &&
        dockerEngine.remoteEngine === true
        ? {
              protocol: "http",
              host: dockerEngine.host,
              port: Number(dockerEngine.port),
          }
        : null;
}
