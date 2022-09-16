/**
 * Utilities for working w/ Docker container
 * Depends on: dockerode
 * TODO: Handle multiple ports mapped by container
 */

import _ from "lodash";
import { getDockerodeObject } from "./../Dockerode";
import { getHost } from "./../models/Settings";

const Docker = require("dockerode");
const os = require("os");

/**
 * @description Get the container list of stack
 * @param {String} projectName
 * @returns {Promise} resultArray
 */
export function connections(projectName) {
    return new Promise(function (resolve, reject) {
        getDockerodeObject().then((dockerode) => {
            dockerode.listContainers(
                {
                    filters: {
                        name: [projectName],
                        // status: ["exited", "running", "dead", "paused"],
                    },
                },
                async function (err, containers) {
                    let resultArray = [];

                    let privateHostName = await getHost();
                    try {
                        _.forEach(containers, function (container) {
                            console.log(
                                "🚀 LOG | file: Container.js | line 38 | container",
                                container
                            );

                            let title = _.get(
                                container,
                                "Labels['com.docker.compose.service']",
                                "Empty"
                            );
                            let resultData = {
                                indicatorStatus: _.get(
                                    container,
                                    "State",
                                    "exited"
                                ),
                                title: title,
                                privateHostName: privateHostName,
                                privateHostPort: getPortByContainer(
                                    container,
                                    "private"
                                ),
                                publicHostName: title + "-" + projectName,
                                publicHostPort: getPortByContainer(
                                    container,
                                    "public"
                                ),
                                showPublicPort: true,
                                container: container,
                            };
                            resultArray.push(resultData);
                        });
                        resolve(resultArray);
                    } catch (error) {
                        reject(error);
                    }
                }
            );
        });
    });
}

/**
 * Get port by container
 */
function getPortByContainer(container, type = "public") {
    let containerPorts = _.get(container, "Ports", []);
    let returnData = "";
    _.forEach(containerPorts, function (port_obj) {
        if (returnData === "") {
            if (
                _.get(port_obj, "PrivatePort", false) &&
                _.get(port_obj, "PublicPort", false)
            ) {
                returnData =
                    type === "private"
                        ? port_obj.PrivatePort
                        : port_obj.PublicPort;
            }
        }
    });
    return returnData;
}

// @TODO: This need to delete after confirming rakesh da.
// Get container by id
// export function connections(Id) {
//     return new Promise(function (resolve, reject) {
//         if (!Id) {
//             reject('Container Id is missing');
//         }
//         let container = docker.getContainer(Id);
//         container.inspect(function (err, data) {
//             let ports = data.HostConfig.PortBindings;
//             try {
//                 resolve({
//                     hostname: data.Config.Hostname,
//                     ports: {
//                         /**
//                          * { '3306/tcp': [ { HostIp: '', HostPort: '52737' } ] }
//                          * Get position of the object, match only digits
//                          */
//                         /** @type {int} */
//                         internal: _.keys(ports)[0].match(/\d+/)[0],
//                         /** @type {int} */
//                         external: _.values(ports)[0][0].HostPort,
//                     }
//                 });
//             } catch (error) {
//                 reject(error);
//             }
//         });
//     })
// }
