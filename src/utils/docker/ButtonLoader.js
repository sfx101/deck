import _ from "lodash";
import { nominalProjectStore } from "../store/Projects";

/**
 * @description : Update the status in globle nominalProjectStore object using project name and status.
 * @param String project
 * @param String status
 * @returns nominalProjectStore
 */
export function updateStatusInStore(project, status) {
    return nominalProjectStore.update((items) => {
        let stackObj = items.find(
            (item) => item["COMPOSE_PROJECT_NAME"] === project
        );

        if (_.get(stackObj, "COMPOSE_PROJECT_NAME", false)) {
            // Set status
            stackObj.isButtonLoading = status;

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
