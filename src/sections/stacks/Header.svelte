<script>
    /**
     * @author : DECK Contributors
     * @description : This is header component of stack route. It is common for stack route
     * This component used on Main.svelte file of stack folder.
     */

    import _ from "lodash";
    import { createEventDispatcher } from "svelte";
    import Indicator from "./Indicator.svelte";
    import { updateProject } from "../../utils/project-install/Update";
    import restart from "./../../utils/docker/Restart";
    import { setIndicatorColor } from "./../../utils/docker/Indicator";
    import {
        openEditor,
        getDefaultEditorLogo,
        getOpenInEditorText,
    } from "./../../utils/Integrations";

    import Notification from "./../../components/notification/Notification.svelte";
    import { getSelectedNetwork } from "./../../utils/models/Networks";
    import { controls } from "../../utils/Store";
    import {
        formFieldsStore,
        isFormUpdated,
        stackUpdateErrors,
    } from "../../utils/store/Projects";
    import {
        getProjectDetails,
        getProjectSettings,
    } from "./../../utils/models/Projects";
    import { fade } from "svelte/transition";
    import { open } from "../../utils/VSCode";
    import HeaderLoader from "./HeaderLoader.svelte";
    import { headerLoaderStore } from "./../../utils/store/Projects";
    import { defaultEditorStore } from "./../../utils/store/Settings";

    export let projectName;
    export let canShowVSCode = false;
    export let slideoverShow = false;

    const { shell } = require("electron");
    const dispatch = createEventDispatcher();

    let notificationObject = {
        title: "",
        description: "",
        type: "error",
        show: false,
    };

    let selectedNetwork = getSelectedNetwork(projectName);
    let stackObject = getProjectDetails(projectName);

    $: {
        if (_.get($defaultEditorStore, "editor", "")) {
            canShowVSCode = window.sessionStorage.getItem(
                "canShowVSCode_" + projectName
            );

            // Remove open vs code button if app code path not found
            if (_.get(stackObject, "APP_CODE_PATH_HOST", "") === "") {
                canShowVSCode = false;
            }

            if ($isFormUpdated) {
                canShowVSCode = false;
            }
        }

        // This is return full object it will use for dropdown feature also
        stackObject = getProjectDetails(projectName);
    }

    async function save() {
        $headerLoaderStore.loading = true;
        $headerLoaderStore.message = "Rebuilding project, time elapsed";

        let settings = await getProjectSettings(projectName);
        let formFields = getFormFieldsFromSettings(settings);

        // validation
        let canFormSubmit = isValidForm($formFieldsStore, formFields);

        if (canFormSubmit) {
            updateProject(projectName, $formFieldsStore).then(
                (res) => {
                    isFormUpdated.update(() => false);
                    dispatch("stackUpdate", {
                        status: true,
                    });

                    restart(projectName, $headerLoaderStore.message).then(
                        (ptyProcess) => {
                            ptyProcess.on("exit", () => {
                                setIndicatorColor(projectName);
                                notificationObject = {
                                    title: "Rebuild complete",
                                    description:
                                        "Project has been saved & rebuilt",
                                    type: "success",
                                    show: true,
                                };
                                $headerLoaderStore.loading = false;
                                $headerLoaderStore.message = "";
                            });
                        },
                        (err) => {
                            $headerLoaderStore.loading = false;
                            $headerLoaderStore.message = "";

                            isFormUpdated.update(() => true);
                            dispatch("stackUpdate", {
                                status: false,
                            });
                        }
                    );
                },
                (err) => {
                    $headerLoaderStore.loading = false;
                    $headerLoaderStore.message = "";

                    isFormUpdated.update(() => true);
                    dispatch("stackUpdate", {
                        status: false,
                    });
                }
            );
        } else {
            $headerLoaderStore.loading = false;
            $headerLoaderStore.message = "";

            notificationObject = {
                title: "Saving failed!",
                description: "Please fill all required fields",
                type: "error",
                show: true,
            };
        }
    }

    function getFormFieldsFromSettings(settings) {
        let formFields = [];
        if (_.get(settings, "system.show_localpath_selector", false)) {
            if (settings.system.show_localpath_selector) {
                formFields = ["project_path", ...formFields];
            }
        }

        if (_.get(settings, "user", false)) {
            _.forEach(settings.user, function (obj, key) {
                if (obj.type === "select") {
                    formFields = [key, ...formFields];
                }
                if (obj.type === "input") {
                    formFields = [key, ...formFields];
                }
            });
        }
        return formFields;
    }

    function isValidForm(data, formFields) {
        let canFormSubmit = true;
        let formFieldsErrorObj = {};

        _.forEach(formFields, function (value) {
            if (_.get(data, value, false)) {
                if (data[value] == "") {
                    formFieldsErrorObj[value] = "This field is required"; //_.startCase(value)
                    canFormSubmit = false;
                } else {
                    formFieldsErrorObj[value] = "";
                }
            } else {
                canFormSubmit = false;
            }
        });
        stackUpdateErrors.update(() => formFieldsErrorObj);
        return canFormSubmit;
    }
</script>

<div class="bg-gray-50 py-4 px-6">
    <div class="w-full mx-auto flex items-center justify-between">
        <div class="flex items-center space-x-5">
            <div class="flex-shrink-0">
                <span
                    class="inline-block relative border bg-white border-gray-200 rounded-lg p-1.5 indicator"
                >
                    {#if _.get(stackObject, "image['@Logo']", false)}
                        <img
                            class="h-16 w-16 object-content"
                            src={stackObject.image["@Logo"]}
                            alt="logo"
                        />
                    {/if}

                    <!-- stack list status indicator -->
                    <Indicator {projectName} type={"single"} />
                </span>
            </div>
            <div class="flex flex-col w-full gap-1">
                <div id="__open-app-div">
                    <button
                        on:click={() => {
                            shell.openExternal(
                                `https:${projectName}.stacks.run`
                            );
                        }}
                        class="flex flex-none items-center justify-start gap-3"
                    >
                        <h1
                            class="text-xl font-semibold text-gray-700 subpixel-antialiased"
                        >
                            {projectName}
                        </h1>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class=" text-gray-500 hover:text-moreshadyazure-400 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                        </svg>
                    </button>
                </div>

                <HeaderLoader {projectName} />
            </div>
        </div>
        <div
            class=" mt-6 flex flex-col-reverse justify-stretch space-y-6 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-2 md:mt-0 md:flex-row md:space-x-3"
        >
            {#if canShowVSCode}
                <button
                    on:click={() => {
                        // open(stackObject.APP_CODE_PATH_HOST);
                        openEditor(stackObject.APP_CODE_PATH_HOST, projectName);
                    }}
                    class="
                        inline-flex
                        gap-2
                        shadow-sm
                        items-center
                        justify-center
                        w-auto
                        pl-2
                        pr-6
                        py-2
                        text-xs
                        focus:outline-none
                        transition-colors
                        duration-200
                        rounded-full
                        bg-blue-100
                        hover:bg-blue-700 hover:text-white
                        text-blue-900
                        font-semibold
                        "
                >
                    <span class="pl-2">
                        <img
                            alt=""
                            class="h-6 w-6"
                            src={getDefaultEditorLogo()}
                        />
                    </span>
                    <span>{getOpenInEditorText()}</span>
                </button>
            {:else}
                <!-- TODO : Need to add disabled class -->
                <button
                    in:fade
                    out:fade
                    on:click={save}
                    class="
                        {$isFormUpdated ? 'visible' : 'hidden'}
                        inline-flex
                        gap-2
                        shadow-sm
                        items-center
                        justify-center
                        w-auto
                        pl-2
                        pr-6
                        py-2
                        text-xs
                        focus:outline-none
                        rounded-full
                        bg-blue-100
                        hover:bg-blue-700 hover:text-white
                        text-blue-900
                        font-semibold
                    "
                >
                    <span class="p-2 rounded-full bg-blue-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 text-white"
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
                    </span>
                    <span>Save &amp; rebuild</span>
                </button>
            {/if}

            <!-- Dropdown header menu -->
            <!-- <HeaderDropdownMenu /> -->

            <button
                on:click={() => {
                    $controls.panel = false;
                    slideoverShow = !slideoverShow;
                }}
                class="text-gray-800 hover:text-gray-600 hover:bg-gray-100 p-4 rounded-full"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-azure-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>
        </div>
    </div>
</div>

<!-- Save notification on:closeNotification={closeNotification} -->
<Notification {...notificationObject} />
