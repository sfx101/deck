<script>
    import _ from "lodash";
    import { router } from "tinro";
    import { fly, slide } from "svelte/transition";
    import { clickOutside } from "./../../../utils/ClickOutside";
    import { projectStore } from "../../../utils/store/Projects";
    import { openCodePath, getStackPath, getWinTopBorderClass } from "./../../../utils/Utils";
    import {
        openEditor,
        getDefaultEditorLogo,
        getOpenInEditorText,
        openTerminal,
        getOpenInTerminalText,
        getDefaultTerminalLogo,
    } from "./../../../utils/Integrations";
    import { controls } from "../../../utils/Store";
    import down from "./../../../utils/docker/Down";
    import Containers from "./Containers.svelte";
    import Notification from "../../../components/notification/Notification.svelte";
    import Confirm from "../../../components/notification/Confirm.svelte";
    import { confirmNotificationStore } from "./../../../utils/store/Notification";
    import { open } from "../../../utils/VSCode";
    import restart from "./../../../utils/docker/Restart";
    import Alert from "./../../../components/modals/Alert.svelte";

    export let show = false;
    export let projectName;

    const { dialog } = require("electron").remote;
    const os = require("os");

    let notificationObject = {
        title: "",
        description: "",
        type: "",
        show: false,
    };
    let confirmObject = {
        title: "Receive notifications",
        description: "",
        successButtonText: "View Log",
        cancelButtonText: "Cancel",
        show: false,
    };
    let alertObject = {
        title: "",
        description: "",
        successButtonText: "Destroy",
        cancelButtonText: "Cancel",
        show: false,
        action: false,
    };

    let stack;
    $: stack = $projectStore.find(
        (item) => item.COMPOSE_PROJECT_NAME === projectName
    );

    // Confirm notification action
    $: {
        if (
            _.get($confirmNotificationStore, "action", false) === true &&
            _.get($confirmNotificationStore, "meta.action", false) ===
                "view-log"
        ) {
            $confirmNotificationStore.action = false;
            viewLog();
            router.goto("/stacks/");
        }

        // Notification cancel action
        if (
            _.get($confirmNotificationStore, "cancel", false) === true &&
            _.get($confirmNotificationStore, "meta.action", false) ===
                "view-log"
        ) {
            router.goto("/stacks/");
        }
    }

    /**
     * Close this slider
     */
    function close(e) {
        show = false;
    }

    /**
     * @description : Destroy stack
     * @todo : Need to remove this comment after alert final.
     */
    // function destroy() {
    //     let options = {
    //         buttons: ["Yes", "No", "Cancel"],
    //         message:
    //             "Are you sure you want to remove this stack?\n\nRemoving a stack cleans up the space it occupied. Your document root is not deleted in this process",
    //     };
    //     dialog.showMessageBox(options).then(function (result) {
    //         if (result.response === 0) {
    //         }
    //     });
    // }

    /**
     * Asck for confirmation project destroy function
     */
    function askForDestory() {
        router.goto("/project/delete/" + projectName);
        // alertObject = {
        //     title: "Power off & destroy",
        //     description:
        //         "Are you sure you want to remove this stack?\n\nRemoving a stack cleans up the space it occupied. Your document root is not deleted in this process",
        //     successButtonText: "Destroy",
        //     cancelButtonText: "Cancel",
        //     show: true,
        //     action: "power-off-destroy",
        // };
    }

    /**
     * After confirmation perform actions.
     */
    async function action() {
        let key = _.get(alertObject, "action", false);
        switch (key) {
            case "power-off-destroy":
                // "Powering off and destroying..."
                down(projectName).then(
                    (res) => {
                        // Confirm notification init
                        $confirmNotificationStore = {
                            title: "Receive notifications",
                            description: res.message,
                            successButtonText: "View Log",
                            cancelButtonText: "Cancel",
                            show: true,
                            meta: { action: "view-log" },
                        };
                    },
                    (error) => {
                        confirmObject = {
                            title: "Receive notifications",
                            description: error.message,
                            successButtonText: "View Log",
                            cancelButtonText: "Cancel",
                            show: true,
                        };
                    }
                );
                break;
            default:
                console.log(
                    "🚀 LOG | file: Slideover.svelte | line 146 | action | default"
                );
                break;
        }
    }

    /**
     * @description Show the output bar when notification button click.
     * @param e
     */
    function viewLog(e) {
        $controls.panel = true;
        $controls.output = true;
        $controls.terminal = false;
    }
</script>

{#if show}
    <div
        class="fixed inset-0 overflow-hidden pb-6"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
    >
        <div class="absolute inset-0 overflow-hidden pb-6">
            <!-- Background overlay, show/hide based on slide-over state. -->
            <div class="absolute inset-0" aria-hidden="true">
                <div
                    class="fixed inset-y-0 right-0 pl-10 max-w-full flex"
                    in:fly={{ x: 500, duration: 500, opacity: 1 }}
                    out:fly={{ x: 500, duration: 500, opacity: 1 }}
                    use:clickOutside
                    on:clickOutside={close}
                >
                    <div class="w-screen max-w-sm {getWinTopBorderClass()}">
                        <div
                            class="h-full flex flex-col pt-6 pb-16 bg-white shadow-xl overflow-y-scroll"
                        >
                            <div class="px-4">
                                <div class="flex items-start justify-between">
                                    <h2
                                        class="text-lg font-medium text-gray-700"
                                        id="slide-over-title"
                                    >
                                        Actions & Insights
                                    </h2>
                                    <div class="ml-3 h-7 flex items-center">
                                        <button
                                            on:click={close}
                                            type="button"
                                            class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none p-1 hover:bg-gray-100 ease-transition cursor-pointer"
                                        >
                                            <span class="sr-only"
                                                >Close panel</span
                                            >
                                            <svg
                                                class="h-6 w-6"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div
                                class="mt-6 relative px-4 flex flex-wrap gap-6"
                            >
                                <!-- Actions -->
                                <div
                                    class="gap-4 flex flex-wrap items-start justify-start"
                                >
                                    {#if _.get(stack, "APP_CODE_PATH_HOST", false)}
                                        <button
                                            type="button"
                                            class="sidebar-action-btn border-btn-azure ease-transition"
                                            on:click={() => {
                                                openCodePath(
                                                    stack.APP_CODE_PATH_HOST
                                                );
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="-ml-0.5 mr-2 h-4 w-4"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                                                    clip-rule="evenodd"
                                                />
                                                <path
                                                    d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                                                />
                                            </svg>
                                            Open project
                                        </button>

                                        <button
                                            type="button"
                                            class="sidebar-action-btn border-btn-azure ease-transition"
                                            on:click={() => {
                                                // open(stack.APP_CODE_PATH_HOST);
                                                openEditor(
                                                    stack.APP_CODE_PATH_HOST,
                                                    projectName
                                                );
                                            }}
                                        >
                                            <img
                                                alt=""
                                                class="-ml-0.5 mr-2 h-4 w-4"
                                                src={getDefaultEditorLogo()}
                                            />
                                            {getOpenInEditorText()}
                                        </button>
                                    {/if}

                                    <button
                                        on:click={() => {
                                            router.goto(
                                                "/marketplace/" + stack.AppID
                                            );
                                        }}
                                        type="button"
                                        class="sidebar-action-btn border-btn-island ease-transition"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="-ml-0.5 mr-2 h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                        Documentation
                                    </button>

                                    {#if _.get(stack, "APP_CODE_PATH_HOST", false)}
                                        <button
                                            on:click={() => {
                                                openTerminal(
                                                    stack.APP_CODE_PATH_HOST,
                                                    projectName
                                                );
                                            }}
                                            type="button"
                                            class="sidebar-action-btn border-btn-chillindigo ease-transition"
                                        >
                                            <!-- <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="-ml-0.5 mr-2 h-4 w-4"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg> -->
                                            <img
                                                src={getDefaultTerminalLogo()}
                                                alt={getOpenInTerminalText()}
                                                class="-ml-0.5 mr-2 h-4 w-4"
                                            />
                                            {getOpenInTerminalText()}
                                        </button>
                                    {/if}

                                    <button
                                        type="button"
                                        class="sidebar-action-btn border-btn-azure ease-transition"
                                        on:click={() => {
                                            restart(projectName);
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="-ml-0.5 mr-2 h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                            />
                                        </svg>
                                        Restart
                                    </button>

                                    <button
                                        type="button"
                                        class="sidebar-action-btn border-btn-island ease-transition"
                                        on:click={() => {
                                            openEditor(
                                                getStackPath(projectName),
                                                projectName
                                            );
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="ml-0.5 mr-2 h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                                            />
                                        </svg>
                                        Edit Dockerfile
                                    </button>

                                    <button
                                        on:click={askForDestory}
                                        type="button"
                                        class="sidebar-action-btn border-btn-chillcerise ease-transition"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="-ml-0.5 mr-2 h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                        Power off & destroy
                                    </button>
                                </div>

                                <!-- Insights -->
                                <Containers {projectName} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}

{#if _.has(notificationObject, "show") && notificationObject.show === true}
    <Notification {...notificationObject} />
{/if}

<Confirm on:successNotification={viewLog} {...confirmObject} />
<Alert on:successNotification={action} {...alertObject} />
