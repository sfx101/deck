import run from "../RunCommand";
import { DOCKER_COMPOSE_STOP } from "./Commands";
import { getStackPath } from "./../../utils/Utils";
import { setIndicatorColor } from "./Indicator";
import { animateOutputSuccess } from "./../Motion";
import { updateStatusInStore } from "./ButtonLoader";
import { headerLoaderStore } from "./../store/Projects";

export default function stop(project) {
    run(`cd "${getStackPath(project)}" ; ${DOCKER_COMPOSE_STOP}`).then(
        (ptyProcess) => {
            headerLoaderStore.update((obj) => {
                obj.loading = true;
                obj.message = "Stopping project, time elapsed";
                obj.projectName = project;
                return obj;
            });

            updateStatusInStore(project, true);
            ptyProcess.on("exit", () => {
                setIndicatorColor(project).then((res) => {
                    if (res === "red") {
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
            });
        },
        (err) => {
            setIndicatorColor(project).finally(() => {
                updateStatusInStore(project, false);
            });
        }
    );
}
