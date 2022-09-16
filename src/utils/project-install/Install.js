/**
 * @author : DECK Contributors
 * @description : Here stack install and updated related logical function defined
 */

import { get } from "svelte/store";
import _ from "lodash";
import { docker_custom_domain } from "../Store";
import { getGitVersionsObj } from "../project-install/RepositoryUtils";
import downloadDockerImage, {
    copyLocalDockerImage,
} from "./DownloadDockerImage";
import {
    setProjectEnv,
    saveProjectOnStackFile,
    updateDockerComposeYml,
} from "./FileHandlers";
import { insertDefaultPage } from "../BrandedPage";

const { ipcRenderer } = require("electron");

/**
 * @param {*} data [Form date]
 * @param {*} image [Image which using for stack]
 * @param {*} settings [Settings.yml data as a JSON]
 * @returns promise
 */
export default async function saveNewProject(data, image, settings) {
    const stackName = _.get(data, "stack_name", false)
        ? data["stack_name"]
        : "";

    let gitVersionsObj = await getGitVersionsObj(image["@Github"]);

    if (_.get(image, "@LocalPath", false)) {
        await copyLocalDockerImage(stackName, image);
    } else {
        // Download docker image (Stack)
        await downloadDockerImage(
            stackName,
            image,
            gitVersionsObj.latestVersion.name
        );
    }

    // Set project ENV
    let envData = await setProjectEnv(stackName, settings, data);

    // Save project on stack file for listing
    await saveProjectOnStackFile(stackName, image, envData, data);

    //
    if (_.get(data, "network_driver", false)) {
        await updateDockerComposeYml(stackName, data["network_driver"]);
    }

    if (get(docker_custom_domain) && _.get(envData, "httpPort", false)) {
        //Register redbird proxy
        // proxy.send({
        //     action: "init",
        //     args: {
        //         stack: stackName,
        //         port: envData.httpPort,
        //     },
        // });

        ipcRenderer.send("register-proxy", {
            action: "register",
            args: {
                stack: stackName,
                port: envData.httpPort,
            },
        });
    }

    sessionStorage.setItem("canShowVSCode_" + stackName, true);

    insertDefaultPage(
        _.get(image, "@AppName", null),
        _.get(data, "project_path", "")
    );
}
