import run from "../RunCommand";
import { DOCKER_COMPOSE_RESTART } from "./Commands";
import { getStackPath } from "../Utils";
import { setIndicatorColor } from "./Indicator";
import { animateOutputSuccess } from "./../Motion";
import { updateStatusInStore } from "./ButtonLoader";
import { headerLoaderStore } from "./../store/Projects";

const { ipcRenderer } = require("electron");

export default function restart(project, loaderMessage = false) {
    return new Promise(function (resolve, reject) {
        headerLoaderStore.update((obj) => {
            obj.loading = true;
            obj.projectName = project;
            obj.message = loaderMessage
                ? loaderMessage
                : "Restarting project, time elapsed";
            return obj;
        });

        updateStatusInStore(project, true);
        run(`cd "${getStackPath(project)}" ; ${DOCKER_COMPOSE_RESTART}`).then(
            (ptyProcess) => {
                ptyProcess.on("exit", (exitCode) => {
                    ipcRenderer.send("dock-bounce", { type: "informational" });
                    setIndicatorColor(project).then((res) => {
                        if (res === "green") {
                            animateOutputSuccess();
                        }
                    });
                    updateStatusInStore(project, false);

                    headerLoaderStore.update((obj) => {
                        obj.loading = false;
                        obj.message = "";
                        obj.projectName = false;
                        return obj;
                    });

                    if (exitCode === 0) {
                        run(
                            `cd "${getStackPath(project)}" ; docker-compose logs -f`,
                            false,
                            false
                        );
                    }
                });
                resolve(ptyProcess);
            },
            (err) => {
                updateStatusInStore(project, false);

                headerLoaderStore.update((obj) => {
                    obj.loading = false;
                    obj.message = "";
                    obj.projectName = false;
                    return obj;
                });
                reject(err);
            }
        );
    });
}
