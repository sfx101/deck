/**
 * @author : DECK Contributors
 * @description : Here stack install and updated related logical function defined
 */
import { get } from "svelte/store";
import _ from "lodash";
import { getProjects, getProjectSettings } from "../models/Projects";
import { getStacks } from "../models/Marketplace";
import { docker_custom_domain } from "../Store";
import { updateProjectEnv, updateProjectOnStackFile } from "./FileHandlers";

/**
 *
 * @param {*} stackName [Stack project name]
 * @param {*} data  [Form data]
 * @returns void [Update project configuration like env and stack.json]
 */
export async function updateProject(stackName, data) {
    try {
        let settings = await getProjectSettings(stackName);

        // Set project ENV
        let envData = await updateProjectEnv(stackName, settings, data);

        let stack = getProjects(stackName);
        let image = getStacks(stack.AppID);

        // Save project on stack file for listing
        await updateProjectOnStackFile(stackName, image, envData, data);

        if (get(docker_custom_domain) && _.get(envData, "httpPort", false)) {
            // //Register redbird proxy
            // proxy.send({
            //     action: "init",
            //     args: {
            //         stack: stackName,
            //         port: envData.httpPort,
            //     },
            // });
        }
    } catch (error) {
        alert("Something is not right, could you try that again?\n" + error);
    }
}
