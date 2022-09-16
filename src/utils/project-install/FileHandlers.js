/**
 * @author : DECK Contributors
 * @description : Here stack install and updated related logical function defined
 */

import _ from "lodash";
import getStoragePath, { isWindows, isMac, getStackPath } from "../Utils";
import { nominalProjectStore, projectStore } from "../store/Projects";
import { updateProject, addNewProject } from "./../../utils/models/Projects";
import { getFormattedName } from "../models/PHPExtensions";
import { hasRemoteEngine, mountPath, getLocalDriveToWslMntPath } from "../VM";

const envFile = require("envfile");
const getPort = require("get-port");
const fs = require("fs");
const yaml = require("js-yaml");
const jsonYaml = require("json-to-pretty-yaml");
const FileSync = require("lowdb/adapters/FileSync");

/**
 *
 * @param {*} stackName
 * @param {*} settings
 * @param {*} data
 * @returns  Promise object (Set ENV file data)
 */
export async function setProjectEnv(stackName, settings, data) {
    //Load the .env file in project directory
    var ENV = envFile.parseFileSync(
        `${getStoragePath()}/apps/${stackName}/.env`
    );

    //Set values based on user input
    if (_.get(settings, "user", false)) {
        _.forEach(settings.user, function (user, i) {
            if (user.type === "select") {
                ENV[user.target] = data[i];
            } else if (user.type === "checkbox") {
                ENV[user.target] = data[i] === undefined ? false : data[i];
            } else {
                ENV[user.target] = data[i];
            }
        });
    }

    //Get project path, convert to VM path when using Multipass
    //TODO: Add conditions for Docker desktop [Added]
    let projectPath = _.get(data, "project_path", "");

    if (hasRemoteEngine() && projectPath.length > 0) {
        ENV.APP_CODE_PATH_HOST = await mountPath(projectPath, stackName);
    } else {
        ENV.APP_CODE_PATH_HOST = projectPath;
    }

    ENV.DATA_PATH_HOST = await getDataPathHost(stackName);

    if (_.get(data, "network_driver", false)) {
        ENV.NETWORKS_DRIVER = data["network_driver"];
    }

    if (_.get(data, "php_extensions", false)) {
        ENV.INSTALL_ADDITIONAL_EXTENSIONS = getFormattedName(
            data["php_extensions"],
            _.get(ENV, "PHP_VERSION", "8")
        );
    }

    //For storing open ports in stack json
    var openPorts = [];
    var httpPort = null;

    //Generate ports
    if (_.get(settings, "system.ports.http", false)) {
        ENV[settings.system.ports.http] = await getPort();
        openPorts.push(ENV[settings.system.ports.http]);
        httpPort = ENV[settings.system.ports.http];
    }
    if (_.get(settings, "system.ports.others", false)) {
        await new Promise(function (resolve, reject) {
            _.forEach(settings.system.ports.others, async function (ports, i) {
                ENV[ports] = await getPort();
                openPorts.push(ENV[ports]);
                if (i === settings.system.ports.others.length - 1) {
                    resolve();
                }
            });
        });
    }

    //Set DB credentials
    ENV.DB_NAME = _.get(data, "db_name", false) ? data["db_name"] : "";
    ENV.DB_USER = _.get(data, "db_user", false) ? data["db_user"] : "";
    ENV.DB_PASSWORD = _.get(data, "db_password", false)
        ? data["db_password"]
        : "";

    fs.writeFileSync(
        `${getStoragePath()}/apps/${stackName}/.env`,
        envFile.stringifySync(ENV)
    );
    return { ENV: ENV, openPorts: openPorts, httpPort: httpPort };
}

/**
 *
 * @param {*} stackName
 * @param {*} settings
 * @param {*} data
 * @returns  Promise object (Update project ENV file data)
 */
export async function updateProjectEnv(stackName, settings, data) {
    //Load the .env file in project directory
    var ENV = envFile.parseFileSync(
        `${getStoragePath()}/apps/${stackName}/.env`
    );

    //Set values based on user input
    if (_.get(settings, "user", false)) {
        _.forEach(settings.user, function (user, i) {
            if (user.type === "select") {
                ENV[user.target] = data[i];
            } else if (user.type === "checkbox") {
                ENV[user.target] = data[i] === undefined ? false : data[i];
            } else {
                ENV[user.target] = data[i];
            }
        });
    }

    //Get project path, convert to VM path when using Multipass
    //TODO: Add conditions for Docker desktop [Added]
    let projectPath = _.get(data, "project_path", "");

    if (hasRemoteEngine()) {
        try {
            ENV.APP_CODE_PATH_HOST = await mountPath(projectPath, stackName);
        } catch (error) {
            console.error("A mount error has occurred, more info ", error);
        }
    } else {
        ENV.APP_CODE_PATH_HOST = projectPath;
    }

    ENV.DATA_PATH_HOST = await getDataPathHost(stackName);

    if (_.get(data, "network_driver", false)) {
        ENV.NETWORKS_DRIVER = data["network_driver"];
    }

    //Set DB credentials
    ENV.DB_NAME = _.get(data, "db_name", false)
        ? data["db_name"]
        : _.get(ENV, "DB_NAME", "");
    ENV.DB_USER = _.get(data, "db_user", false)
        ? data["db_user"]
        : _.get(ENV, "DB_USER", "");
    ENV.DB_PASSWORD = _.get(data, "db_password", false)
        ? data["db_password"]
        : _.get(ENV, "DB_PASSWORD", "");

    // PHP EXTENSIONS
    if (_.get(data, "php_extensions", false)) {
        ENV.INSTALL_ADDITIONAL_EXTENSIONS = getFormattedName(
            data["php_extensions"],
            _.get(ENV, "PHP_VERSION", "8")
        );
    }

    fs.writeFileSync(
        `${getStoragePath()}/apps/${stackName}/.env`,
        envFile.stringifySync(ENV)
    );
    return { ENV: ENV };
}

/**
 *
 * @param {*} stackName
 * @param {*} image
 * @param {*} envData
 * @returns Promise object (Add new project on stack.json file)
 */
export async function saveProjectOnStackFile(stackName, image, envData, data) {
    let openPorts = _.get(envData, "openPorts", false);
    let httpPort = _.get(envData, "httpPort", false);

    //TODO, update data structure in stacks.json
    const DockerCompose = yaml.load(
        fs.readFileSync(
            `${getStoragePath()}/apps/${stackName}/docker-compose.yml`,
            "utf8"
        )
    );
    let stackData = {
        AppID: image["@AppID"],
        containers: _.keys(DockerCompose.services),
        tags: _.get(image, "@Tags", []),
        COMPOSE_PROJECT_NAME: stackName,
        STACK_OPEN_PORTS: openPorts,
        APP_CODE_PATH_HOST: _.get(data, "project_path", ""),
        STACK_HTTP_PORT: httpPort,
        PMA_PORT: null,
    };

    // Add new project on project.json file
    addNewProject(stackData);

    // Update nominalProjectStore store data
    nominalProjectStore.update(function (stackObjects) {
        let newStackObject = {
            AppID: stackData.AppID,
            COMPOSE_PROJECT_NAME: stackData.COMPOSE_PROJECT_NAME,
            indicatorColors: "gray",
            isButtonLoading: false,
        };
        stackObjects.push(newStackObject);
        return stackObjects;
    });

    // Update stack store
    projectStore.update(function (stacks) {
        stacks.push(stackData);
        return stacks;
    });

    return stackData;
}

/**
 *
 * @param {*} projectName
 * @param {*} networkName
 * @returns Promise object (Update project on stack.json file)
 */
export async function updateDockerComposeYml(projectName, networkName) {
    if (!projectName) return null;

    const dockerCompose = yaml.load(
        fs.readFileSync(
            `${getStackPath(projectName)}/docker-compose.yml`,
            "utf8"
        )
    );
    let containers = _.keys(dockerCompose.services);

    _.forEach(containers, function (service) {
        let hostname = service + "-" + projectName; //  + ".deck-app";
        _.set(dockerCompose, "services." + service + ".hostname", hostname);
    });

    _.set(dockerCompose, "networks.default.name", networkName);
    _.set(dockerCompose, "networks.default.external", true);

    let dockerYaml = jsonYaml.stringify(dockerCompose);
    fs.writeFileSync(
        `${getStackPath(projectName)}/docker-compose.yml`,
        dockerYaml
    );
}

/**
 *
 * @param {*} stackName
 * @param {*} image
 * @param {*} envData
 * @returns Promise object (Update project on stack.json file)
 */
export async function updateProjectOnStackFile(
    stackName,
    image,
    envData,
    formData
) {
    let openPorts = _.get(envData, "openPorts", false);
    let httpPort = _.get(envData, "httpPort", false);

    //TODO, update data structure in stacks.json
    const DockerCompose = yaml.load(
        fs.readFileSync(
            `${getStoragePath()}/apps/${stackName}/docker-compose.yml`,
            "utf8"
        )
    );

    let stackData = {
        AppID: image["@AppID"],
        containers: _.keys(DockerCompose.services),
        tags: _.get(image, "@Tags", []),
        COMPOSE_PROJECT_NAME: stackName,
        APP_CODE_PATH_HOST: _.get(formData, "project_path", ""),
        PMA_PORT: null,
    };

    if (openPorts !== false) {
        stackData.STACK_OPEN_PORTS = openPorts;
    }

    if (httpPort !== false) {
        stackData.STACK_HTTP_PORT = httpPort;
    }

    // Update project.json file
    updateProject(stackName, stackData);

    return stackData;
}

/**
 *
 * @param {String} projectName
 * @param {String} extensions
 * @param {String} phpVersion
 * @returns Promise object (Update project env INSTALL_ADDITIONAL_EXTENSIONS)
 */
export async function updatePPHExtensions(projectName, extensions, phpVersion) {
    //Load the .env file in project directory
    let ENV = envFile.parseFileSync(
        `${getStoragePath()}/apps/${projectName}/.env`
    );

    ENV.INSTALL_ADDITIONAL_EXTENSIONS = getFormattedName(
        extensions,
        phpVersion
    );

    fs.writeFileSync(
        `${getStoragePath()}/apps/${projectName}/.env`,
        envFile.stringifySync(ENV)
    );

    return ENV;
}

/**
 * Get data host path for project env
 */
async function getDataPathHost(stackName) {
    let path,
        localPath = `${getStoragePath()}/data/${stackName}`;

    if (hasRemoteEngine()) {
        if (isWindows) {
            // path = getLocalDriveToWslMntPath(localPath);
            path = `/home/volumes/${stackName}`;
        } else if (isMac) {
            path = `/home/ubuntu/volumes/${stackName}`;
        } else {
            path = localPath;
        }
    } else {
        path = localPath;
    }
    return path;
}
