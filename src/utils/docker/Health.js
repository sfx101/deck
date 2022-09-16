import _ from "lodash";
import { getDockerodeObject } from "./../Dockerode";

const net = require('net');
const request = require("request");
const appSettings = require("electron-settings");

export const getConnectionStatus = function (host, port) {
    return new Promise(function (resolve, reject) {
        try {
            const client = net.connect({ host: host, port: port },
                function (data) { //'connect' listener
                    console.log(`🚀 LOG | file: Health.js | line 13 | data`, data)
                    client.end();
                    resolve({
                        connection: true
                    });
                });
            client.on('error', function (err) {
                resolve({
                    connection: false
                });

            });
        } catch (error) {
            resolve({
                connection: false
            });
        }
    });
}

export const getHTTPConnectionStatus = function (connectionURL) {
    return new Promise(function (resolve, reject) {
        request(
            { uri: connectionURL, followRedirect: false },
            function (error, response, body) {
                // Todo: If i add this then yellow and red indicator not display that's why commented
                // if (error) {
                //     reject(error);
                // }
                resolve({
                    url: connectionURL,
                    error: error,
                    statusCode: response && response.statusCode,
                    body: body,
                    connection:
                        typeof (response && response.statusCode) !== "undefined"
                            ? true
                            : false,
                });
            }
        );
    });
};

/**
 * @return object
 * {
 *  status : true/false (bool)
 *  runningContainerCount: {}
 *  notRunningContainerCount: {}
 *  containers: {}
 * }
 */
export const getStackStatus = function (stackName) {
    return new Promise(function (resolve, reject) {
        getDockerodeObject().then((dockerode) => {
            dockerode.listContainers(
                {
                    filters: {
                        name: [stackName],
                        status: ["exited", "running", "dead", "paused"],
                    },
                },
                async function (err, containers) {
                    let returnStat = {
                        status: false,
                        containers: containers,
                        unhealthyContainers: [],
                        error: err,
                    };
                    if (containers === null) {
                        resolve(returnStat);
                    } else if (containers.length < 1) {
                        resolve(returnStat);
                    } else {
                        let notRunningContainer = 0;
                        let runningContainer = 0;
                        _.forEach(containers, function (container, i) {
                            if (container.State !== "running") {
                                returnStat.unhealthyContainers.push(container);
                                notRunningContainer++;
                            } else {
                                runningContainer++;
                            }
                        });
                        returnStat.status =
                            notRunningContainer > 0 ? false : true;
                        returnStat.runningContainerCount = runningContainer;
                        returnStat.notRunningContainerCount =
                            notRunningContainer;
                        returnStat.containers = containers;
                        resolve(returnStat);
                    }
                }
            );
        });
    });
};

const startDocker = function () {
    new Docker({
        socketPath: "/var/run/docker.sock",
    });
};

/**
 *
 * @param {*} project
 * @param {*} projectLocalPort
 * @param {*} pma - true/false(open pma / open app)
 *
 * @return object
 * {
 *  status : true/false (bool)
 *  docker: true/false (bool)
 *  runningContainerCount: {}
 *  notRunningContainerCount: {}
 *  containers: {}
 *  connectionError: true/false (bool)
 * }
 */
export async function checkStackHealth(project, projectLocalPort, pma) {
    let host = await appSettings.get("settings.dockerEngine.host");

    let res = {
        status: false,
        docker: false,
        runningContainerCount: {},
        notRunningContainerCount: {},
        containers: {},
        connection: false,
        connectionDetails: {},
    };
    try {
        let dockerStat = await getDockerStatus();
        if (dockerStat.status === false) {
            return res;
        }

        let containerStat = await getStackStatus(project);
        res = containerStat;

        res.docker = true;
        let connectionStat = projectLocalPort ? await getConnectionStatus(host, projectLocalPort) : { connection: true };
        console.log(`🚀 LOG | file: Health.js | line 157 | checkStackHealth | projectLocalPort`, projectLocalPort)
        console.log(`🚀 LOG | file: Health.js | line 157 | checkStackHealth | connectionStat`, connectionStat)
        res.connection = connectionStat.connection;
        res.connectionDetails = connectionStat;
        res.status = containerStat.connection;

        return res;
    } catch (error) {

    }
}

export function getDockerStatus() {
    return new Promise(function (resolve, reject) {
        try {
            getDockerodeObject().then((dockerode) => {

                dockerode.info(function (err, info) {
                    let returnStat = {
                        status: false,
                        info: info,
                        error: err,
                    };
                    if (err === null && info !== null) {
                        returnStat.status = true;
                    }
                    resolve(returnStat);
                });
            });
        } catch (error) {
            throw error;
        }
    });
}
