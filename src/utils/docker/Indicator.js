import { get } from "svelte/store";
import _ from "lodash";
import { projectStore, nominalProjectStore } from "../store/Projects";
import { checkStackHealth } from "../../utils/docker/Health";

/**
 *
 * @description : Set indicator colors in global object of nominalProjectStore
 * @param String project
 * @returns Promise
 */
export async function setIndicatorColor(project) {
    //Delay a bit and wait for containers to start
    //Or it results to unhealthy projects
    await new Promise((resolve) =>
        setTimeout(resolve, 1000)
    );
    let stackObject;
    let indicatorColors = "gray";

    stackObject = get(projectStore).find(
        (item) => item["COMPOSE_PROJECT_NAME"] === project
    );

    if (_.get(stackObject, "COMPOSE_PROJECT_NAME", false)) {
        let stackHealth = await checkStackHealth(
            stackObject.COMPOSE_PROJECT_NAME,
            stackObject.STACK_HTTP_PORT
        );

        console.log(`🚀 LOG | file: Indicator.js | line 23 | setIndicatorColor | COMPOSE_PROJECT_NAME`, stackObject.COMPOSE_PROJECT_NAME)
        console.log(`🚀 LOG | file: Indicator.js | line 25 | setIndicatorColor | stackHealth`, stackHealth)

        indicatorColors = getIndicatorColor(stackHealth);

        // Global indicator color update
        updateColorInStore(project, indicatorColors);
    }

    return indicatorColors;
}

/**
 * @description : Get the color according to stackHealth object.
 * @param {*} stackHealth
 * @returns String indicatorColors
 */
function getIndicatorColor(stackHealth) {
    console.log(`🚀 LOG | file: Indicator.js | line 41 | getIndicatorColor | stackHealth`, stackHealth);
    let indicatorColors;
    // Check docker status
    if (_.get(stackHealth, "docker", false) === false) {
        indicatorColors = "gray";
    } else {
        if (_.get(stackHealth, "status", false) === true) {
            indicatorColors = "green";
        }
        if (stackHealth.connection === false || stackHealth.notRunningContainerCount > 0) {
            indicatorColors = "pumpkin";
        }
        if (stackHealth.notRunningContainerCount === stackHealth.containers.length) {
            indicatorColors = "red";
        }
        if (stackHealth.containers.length === 0) {
            indicatorColors = "gray";
        }

    }
    return indicatorColors;
}

/**
 * @description : Update the color in global nominalProjectStore object using project name and color.
 * @param String project
 * @param String color
 * @returns nominalProjectStore
 */
function updateColorInStore(project, color) {
    return nominalProjectStore.update((items) => {
        let stackObj = items.find(
            (item) => item["COMPOSE_PROJECT_NAME"] === project
        );
        if (_.get(stackObj, "COMPOSE_PROJECT_NAME", false)) {
            // Set color
            stackObj.indicatorColors = color;

            // Find item index using _.findIndex
            var index = _.findIndex(items, {
                COMPOSE_PROJECT_NAME: project,
            });

            // Replace item at index using native splice
            items.splice(index, 1, stackObj);
        }
        return items;
    });
}
