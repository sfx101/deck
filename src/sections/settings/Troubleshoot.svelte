<script>
    import _ from "lodash";
    import Alert from "./../../components/modals/Alert.svelte";
    import Notification from "./../../components/notification/Notification.svelte";
    import run from "./../../utils/RunCommand";
    import getStoragePath from "./../../utils/Utils";
    import { resetProject } from "./../../utils/models/Projects";

    import {
        getNominalProjectList,
        getProjects,
    } from "./../../utils/models/Projects";
    import {
        nominalProjectStore,
        projectStore,
    } from "../../utils/store/Projects";

    // IPC renderer const decliration
    const { ipcRenderer } = require("electron");
    const rimraf = require("rimraf");
    const appSettings = require("electron-settings");

    let alertObject = {
        title: "Deactivate account",
        description:
            "Are you sure you want to deactivate your account? All of your data will be permanently removed from our servers forever. This action cannot be undone.",
        successButtonText: "Deactivate",
        cancelButtonText: "Cancel",
        show: false,
        action: false,
    };
    let notificationObject = {
        title: "",
        description: "",
        type: "success",
        show: false,
    };
    let purgeLoading = false;

    /**
     * @description Ask for restart
     */
    function askForRestart(e) {
        alertObject = {
            title: "Restart DECK",
            description: "Are you sure you want to restart DECK?",
            successButtonText: "Restart",
            cancelButtonText: "Cancel",
            show: true,
            action: "restart",
        };
    }

    /**
     * @description Ask for purge data
     */
    function askForPurgeData(e) {
        alertObject = {
            title: "Clean / Purge data",
            description: "Are you sure you want to clean/purge data?",
            successButtonText: "Clean / Purge",
            cancelButtonText: "Cancel",
            show: true,
            action: "purgeData",
        };
    }

    /**
     * @description Ask for reset defaults
     */
    function askForResetDefaults(e) {
        alertObject = {
            title: "Reset to factory defaults",
            description: "Are you sure you want reset to factory defaults?",
            successButtonText: "Reset to factory defaults",
            cancelButtonText: "Cancel",
            show: true,
            action: "resetDefaults",
        };
    }

    /**
     * @description Ask for uninstall
     */
    function askForUninstall(e) {
        alertObject = {
            title: "Uninstall",
            description: "Are you sure you want to uninstall?",
            successButtonText: "Uninstall Now",
            cancelButtonText: "Cancel",
            show: true,
            action: "uninstall",
        };
    }

    /**
     * After confirmation perform actions.
     */
    async function action(e) {
        let key = _.get(alertObject, "action", false);
        switch (key) {
            case "restart":
                // Restart the app using ipcRenderer
                ipcRenderer.send("restart-app");
                break;
            case "purgeData":
                purgeLoading = true;
                run(
                    "multipass delete deck-app && multipass purge && rm -rf ~/.deck"
                ).then((ptyProcess) => {
                    ptyProcess.on("exit", async (response) => {
                        purgeLoading = false;
                        if (response === 0) {
                            notificationObject = {
                                title: "DECK-APP",
                                description:
                                    "Purged successfully, app will restart in 5 secs",
                                type: "success",
                                show: true,
                            };
                            await appSettings.set(
                                "settings.dockerEngine.remoteEngine",
                                false
                            );
                            await appSettings.set(
                                "settings.dockerEngine.host",
                                "127.0.0.1"
                            );
                            await new Promise((resolve) =>
                                setTimeout(resolve, 5000)
                            );
                            ipcRenderer.send("restart-app");
                        } else {
                            notificationObject = {
                                title: "DECK-APP",
                                description: "Purge data failed!",
                                type: "error",
                                show: true,
                            };
                        }
                    });
                });

                break;
            case "resetDefaults":
                // Notification
                if (await resetDefaults()) {
                    notificationObject = {
                        title: "DECK-APP",
                        description: "Reset defaults successfully!",
                        type: "success",
                        show: true,
                    };
                } else {
                    notificationObject = {
                        title: "DECK-APP",
                        description: "Reset defaults filed!",
                        type: "error",
                        show: true,
                    };
                }

                // Update stack list
                nominalProjectStore.update(() => getNominalProjectList());
                projectStore.update(() => getProjects(false));
                break;
            case "uninstall":
                notificationObject = {
                    title: "DECK-APP",
                    description: "Uninstall clicked.",
                    type: "success",
                    show: true,
                };
                break;
            default:
                console.log(
                    "🚀 LOG | file: Troubleshoot.svelte | line 158 | action | default"
                );
                break;
        }
    }

    /**
     * Reset defaults will delete apps and data folder and stacks.json file
     */
    async function resetDefaults() {
        let status = {
            apps: false,
            data: false,
            stacks: false,
        };
        // Remove apps folder all data
        status.apps = await resetApps();

        // Remove data folder all data
        status.data = await resetData();

        // Remove stacks.json form storage folder
        status.stacks = await resetProject();

        if (
            status.apps === true &&
            status.data === true &&
            status.stacks === true
        ) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Reset apps delete the apps folder.
     */
    function resetApps() {
        return new Promise(function (resolve, reject) {
            rimraf(
                getStoragePath() + "/apps",
                function () {
                    resolve(true);
                },
                function (err) {
                    reject(err);
                }
            );
        });
    }

    /**
     * Reset data delete the data folder.
     */
    function resetData() {
        return new Promise(function (resolve, reject) {
            rimraf(
                getStoragePath() + "/data",
                function () {
                    resolve(true);
                },
                function (err) {
                    reject(err);
                }
            );
        });
    }
</script>

<main class="flex-1 overflow-y-auto h-screen">
    <section
        aria-labelledby="primary-heading"
        class="
            bg-gray-100
            min-w-0
            flex-1
            h-full
            flex flex-col
            relative
            overflow-hidden
        "
    >
        <div
            class="flex flex-col gap-4 justify-center items-center px-4 py-12 container mx-auto"
        >
            <div
                class="flex items-center p-6 justify-between bg-white rounded-md border border-gray-200 gap-6 w-3/4"
            >
                <span class="flex-grow flex flex-col">
                    <span
                        class="text-sm font-medium text-gray-900"
                        id="availability-label">Restart DECK</span
                    >
                    <span
                        class="text-sm text-gray-500"
                        id="availability-description"
                        >Restarting should fix an exception which might have occurred in the app</span
                    >
                </span>

                <!-- Restart App -->
                <button
                    on:click={askForRestart}
                    type="button"
                    class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-blue-600 hover:text-white text-white border border-blue-300 hover:border-transparent bg-white hover:bg-blue-600 focus:outline-none"
                >
                    Restart
                </button>
            </div>
            <!-- <div
                class="flex items-center p-6 justify-between bg-white rounded-md border border-gray-200 gap-6 w-3/4"
            >
                <span class="flex-grow flex flex-col">
                    <span
                        class="text-sm font-medium text-gray-900"
                        id="availability-label">Clean / Purge data</span
                    >
                    <span
                        class="text-sm text-gray-500"
                        id="availability-description"
                        >This will solve problems with disk corruption.</span
                    >
                </span>
                <button
                    on:click={askForPurgeData}
                    type="button"
                    class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-chillcerise-600 hover:text-white border border-chillcerise-300 hover:border-transparent bg-white hover:bg-chillcerise-600 focus:outline-none"
                >
                    <svg
                        class="animate-spin h-4 w-4 text-chillcerise-600 {purgeLoading ===
                        false
                            ? 'hidden'
                            : ''}"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        ><circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                        /><path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        /></svg
                    >
                    &nbsp;
                    {purgeLoading === false
                        ? "Clean / Purge data"
                        : "Cleaning..."}
                    &nbsp;
                </button>
            </div>
            <div
                class="flex items-center p-6 justify-between bg-white rounded-md border border-gray-200 gap-6 w-3/4"
            >
                <span class="flex-grow flex flex-col">
                    <span
                        class="text-sm font-medium text-gray-900"
                        id="availability-label">Reset to factory defaults</span
                    >
                    <span
                        class="text-sm text-gray-500"
                        id="availability-description"
                        >All settings and data will be removed.</span
                    >
                </span>
                <button
                    on:click={askForResetDefaults}
                    type="button"
                    class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-chillcerise-600 hover:text-white border border-chillcerise-300 hover:border-transparent bg-white hover:bg-chillcerise-600 focus:outline-none"
                >
                    Reset to factory defaults
                </button>
            </div>
            <div
                class="flex items-center p-6 justify-between bg-white rounded-md border border-gray-200 gap-6 w-3/4"
            >
                <span class="flex-grow flex flex-col">
                    <span
                        class="text-sm font-medium text-gray-900"
                        id="availability-label">Uninstall</span
                    >
                    <span
                        class="text-sm text-gray-500"
                        id="availability-description"
                        >We are sorry to see you go.</span
                    >
                </span>
                <button
                    on:click={askForUninstall}
                    type="button"
                    class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-coral-600 hover:text-white border border-coral-300 hover:border-transparent bg-white hover:bg-coral-600 focus:outline-none"
                >
                    Uninstall
                </button>
            </div> -->
        </div>
    </section>

    <Alert on:successNotification={action} {...alertObject} />
    <Notification {...notificationObject} />
</main>
