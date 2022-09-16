import _ from "lodash";
import run from "../RunCommand";
import { DOCKER_COMPOSE_DOWN } from "./Commands";
import { getStackPath } from "./../../utils/Utils";
import { setIndicatorColor } from "./Indicator";
import { animateOutputSuccess } from "./../Motion";
import { removeProject } from "./../models/Projects";
import { nominalProjectStore, projectStore } from "../store/Projects";

const rimraf = require("rimraf");

/**
 * @description : This function destroys the stack project and also remove project
 *                from stack list and its run the docker-compose down.
 * @param {*} project
 * @returns ptyProcess
 */
export default function down(project) {
    return new Promise(function (resolve, reject) {
        run(`cd "${getStackPath(project)}" ; ${DOCKER_COMPOSE_DOWN}`).then(
            (ptyProcess) => {
                ptyProcess.on("exit", (response) => {
                    setIndicatorColor(project).then((res) => {
                        if (res === "green") {
                            animateOutputSuccess();
                        }
                    });
                    if (response === 0) {
                        rimraf(getStackPath(project), function () {
                            let isRemoved = removeProject(project);
                            if (isRemoved) {
                                // @TODO: Will remove this comment when list work after remove stack/project
                                // nominalProjectStore.set(getNominalProjectList());
                                // projectStore.set(getProjects());
                                nominalProjectStore.update((result) => {
                                    _.remove(result, function (obj) {
                                        return (
                                            obj.COMPOSE_PROJECT_NAME == project
                                        );
                                    });
                                    return result;
                                });
                                projectStore.update((res) => {
                                    _.remove(res, function (obj) {
                                        return (
                                            obj.COMPOSE_PROJECT_NAME == project
                                        );
                                    });
                                    return res;
                                });
                                setTimeout(() => {
                                    resolve({
                                        status: "success",
                                        message:
                                            "Successfully power off & destroy.",
                                    });
                                }, 500);
                            } else {
                                reject({
                                    message:
                                        "Project couldn't be removed, view logs for more info",
                                });
                            }
                        });
                    } else {
                        reject({
                            message:
                                "Docker compose down failed. Please check log for more information.",
                        });
                    }
                });
            },
            (err) => {
                reject(err);
            }
        );
    });
}
