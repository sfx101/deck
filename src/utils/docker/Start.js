import run from "../RunCommand";
import { getStackPath } from "./../../utils/Utils";
import { animateOutputSuccess } from "./../Motion";
import { headerLoaderStore } from "./../store/Projects";
import { updateStatusInStore } from "./ButtonLoader";
import { DOCKER_COMPOSE_UP } from "./Commands";
import { setIndicatorColor } from "./Indicator";

const { ipcRenderer } = require("electron");

export default function start(project) {
    run(`cd "${getStackPath(project)}" ; ${DOCKER_COMPOSE_UP}`).then(
        (ptyProcess) => {
            headerLoaderStore.update((obj) => {
                obj.loading = true;
                obj.projectName = project;
                obj.message = "Starting project, time elapsed";
                return obj;
            });
            updateStatusInStore(project, true);
            ptyProcess.on("exit", (exitCode) => {
                ipcRenderer.send("dock-bounce", { type: "informational" });
                setIndicatorColor(project)
                    .then((res) => {
                        if (res === "green") {
                            animateOutputSuccess();
                        }
                    })
                    .finally(() => {
                        updateStatusInStore(project, false);
                    });

                if (exitCode === 0) {
                    run(
                        `cd "${getStackPath(
                            project
                        )}" ; docker-compose logs -f`,
                        false,
                        false
                    );
                }

                headerLoaderStore.update((obj) => {
                    obj.loading = false;
                    obj.message = "";
                    obj.projectName = false;
                    return obj;
                });
            });
        },
        (err) => {
            setIndicatorColor(project).finally(() => {
                updateStatusInStore(project, false);
            });
        }
    );
}
