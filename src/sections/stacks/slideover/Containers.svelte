<script>
    import { slide } from "svelte/transition";
    import _ from "lodash";
    import { connections } from "./../../../utils/docker/Container";
    import { openExternal } from "./../../../utils/Utils";
    import Notification from "./../../../components/notification/Notification.svelte";
    import Alert from "./../../../components/notification/Alert.svelte";
    import { getProjectEnv } from "./../../../utils/models/Projects";
    import { getHTTPConnectionStatus } from "./../../../utils/docker/Health";
    import DisabledOpenLink from "./DisabledOpenLink.svelte";
    import Copy from "./Copy.svelte";

    export let projectName;

    let notificationObject, connectionsPromissObj, alertObj;
    let stackEnv;

    alertObj = {
        title: "Stack",
        description:
            "Start the project to view informations about the stack and how to connect with them externally from 3rd party applications or internally from your codebase",
        type: "info",
    };

    $: stackEnv = getProjectEnv(projectName);
    $: connectionsPromissObj = connections(projectName);

    function showNotification(message, type) {
        notificationObject = {
            title: message,
            description: "",
            type: type,
            show: true,
        };
    }

    function getColorByContainer(container) {
        // "exited", "running", "dead", "paused"
        let color = "gray";
        if (container.indicatorStatus === "running") {
            color = "green";
        } else if (container.indicatorStatus === "exited") {
            color = "red";
        } else if (container.indicatorStatus === "dead") {
            color = "red";
        } else if (container.indicatorStatus === "paused") {
            color = "pumpkin";
        }

        return color;
    }

    /**
     * Get formated host and post string
     */
    function getFormatedHostPort(host, port) {
        let returnData = host;
        if (port) {
            returnData = port === 80 ? host : host + ":" + port;
        }
        return returnData;
    }
</script>

{#await connectionsPromissObj}
    <!-- @TODO: This loader is only for show now this need to fix by om -->
    <div
        class="border border-gray-200 shadow rounded-md p-4 max-w-sm w-full mx-auto"
    >
        <div class="animate-pulse flex space-x-4">
            <div class="flex-1 space-y-4 py-1">
                <div class="h-4 bg-gray-300 rounded w-3/4" />
                <div class="space-y-2">
                    <div class="h-4 bg-gray-300 rounded" />
                    <div class="h-4 bg-gray-300 rounded w-5/6" />
                </div>
            </div>
        </div>
    </div>
{:then res}
    {#if res.length}
        <div class="w-full">
            <div class="flex flex-wrap gap-2 mb-4">
                <h2 class="text-md font-medium text-gray-700" id="">Stack</h2>
                <span class="text-xs font-normal text-gray-400"
                    >The panel below shows individual container health status &
                    information on how to access them</span
                >
            </div>
            <div class="bg-gray-100 p-2 rounded-md">
                <ul role="list" class="flex flex-wrap gap-2">
                    {#each res as container}
                        <li
                            class="w-full flex-none bg-white rounded-md border border-gray-200"
                        >
                            <!-- svelte-ignore a11y-missing-attribute -->
                            <a class="block cursor-default">
                                <div class="flex items-center px-4 py-4 gap-2">
                                    <div class="flex-grow">
                                        <p
                                            class="text-sm font-medium text-chillgray-600 truncate"
                                        >
                                            {_.get(container, "title", false)
                                                ? container.title
                                                : "Empty"}
                                        </p>
                                    </div>
                                    <div class="flex-none">
                                        <span
                                            class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-{getColorByContainer(
                                                container
                                            )}-100 text-{getColorByContainer(
                                                container
                                            )}-800"
                                        >
                                            {container.indicatorStatus}
                                        </span>
                                    </div>

                                    <!--  -->
                                    {#await getHTTPConnectionStatus(`http://${container.privateHostName}:${container.publicHostPort}`)}
                                        <DisabledOpenLink />
                                    {:then res}
                                        {#if res.connection === true}
                                            <div
                                                on:click={() => {
                                                    // openExternal(
                                                    //     "https://" +
                                                    //         container.publicHostName +
                                                    //         ".stacks.run"
                                                    // );
                                                    openExternal(
                                                        "http://" +
                                                            container.privateHostName +
                                                            ":" +
                                                            container.publicHostPort
                                                    );
                                                }}
                                                class="flex-none p-1 rounded-md text-gray-400 hover:bg-gray-100 ease-transition cursor-pointer"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="h-4 w-4"
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
                                            </div>
                                        {:else}
                                            <DisabledOpenLink />
                                        {/if}
                                    {:catch error}
                                        <DisabledOpenLink />
                                    {/await}
                                    <!--  -->
                                    <div
                                        class="flex-none p-1 rounded-md text-gray-400 hover:bg-gray-100 ease-transition cursor-pointer"
                                        on:click={() =>
                                            (container.expanded =
                                                !container.expanded)}
                                    >
                                        {#if _.get(container, "expanded", false) && container.expanded === true}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        {:else}
                                            <svg
                                                class="h-5 w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        {/if}
                                    </div>
                                </div>
                            </a>
                            {#if _.get(container, "expanded", false) && container.expanded === true}
                                <div class="px-4 pb-4" transition:slide>
                                    <p>
                                        <span
                                            class="text-xs text-gray-600 font-normal"
                                            >Connect to {_.get(
                                                container,
                                                "title",
                                                "Empty"
                                            )}</span
                                        >
                                    </p>
                                    <p>
                                        <span
                                            class=" mt-2 block text-xs text-gray-400 font-normal leading-tight tracking-tight"
                                            >Connect from within containers in
                                            stack or other projects</span
                                        >
                                    </p>
                                    <!--  -->
                                    <div
                                        class="group my-2 p-2 rounded-md bg-chillgray-100 text-gray-700 text-sm font-normal flex flex-row gap-1 font-mono"
                                    >
                                        <div class="flex-grow flex flex-col">
                                            <p>
                                                <span>
                                                    {getFormatedHostPort(
                                                        _.get(
                                                            container,
                                                            "publicHostName",
                                                            ""
                                                        ),
                                                        _.get(
                                                            container,
                                                            "privateHostPort",
                                                            ""
                                                        )
                                                    )}
                                                </span>
                                            </p>
                                        </div>

                                        <!-- Start Copy -->
                                        <Copy
                                            value={getFormatedHostPort(
                                                _.get(
                                                    container,
                                                    "publicHostName",
                                                    ""
                                                ),
                                                _.get(
                                                    container,
                                                    "privateHostPort",
                                                    ""
                                                )
                                            )}
                                        />
                                        <!-- End Copy -->
                                    </div>
                                    <!--  -->

                                    <p>
                                        <span
                                            class="mt-2 block text-xs text-gray-400 font-normal leading-tight tracking-tight"
                                            >Connect using external applications</span
                                        >
                                    </p>

                                    <!--  -->
                                    <div
                                        class="group my-2 p-2 rounded-md bg-chillgray-100 text-gray-700 text-sm font-normal flex flex-row gap-1 font-mono"
                                    >
                                        <div class="flex-grow flex flex-col">
                                            <p>
                                                <span>
                                                    {getFormatedHostPort(
                                                        _.get(
                                                            container,
                                                            "privateHostName",
                                                            ""
                                                        ),
                                                        _.get(
                                                            container,
                                                            "publicHostPort",
                                                            ""
                                                        )
                                                    )}
                                                </span>
                                            </p>
                                        </div>

                                        <!-- Start Copy -->
                                        <Copy
                                            value={getFormatedHostPort(
                                                _.get(
                                                    container,
                                                    "privateHostName",
                                                    ""
                                                ),
                                                _.get(
                                                    container,
                                                    "publicHostPort",
                                                    ""
                                                )
                                            )}
                                        />
                                        <!-- End Copy -->
                                    </div>

                                    {#if _.get(container, "title", false) && (container.title === "mysql" || container.title === "mariadb")}
                                        <p>
                                            <span
                                                class="mt-2 block text-xs text-gray-400 font-normal leading-tight tracking-tight"
                                                >Authentication</span
                                            >
                                        </p>
                                        <div
                                            class="group my-2 p-2 rounded-md bg-chillgray-100 text-gray-700 text-sm font-normal flex flex-row gap-1 font-mono"
                                        >
                                            <div
                                                class="flex-grow flex flex-col"
                                            >
                                                <p>
                                                    <span class="text-gray-400"
                                                        >//username & password</span
                                                    >
                                                </p>
                                                <p>
                                                    {#if _.get(stackEnv, "DB_USER", false)}
                                                        <span class=""
                                                            >{stackEnv.DB_USER}</span
                                                        >
                                                    {/if}
                                                </p>
                                                <p>
                                                    {#if _.get(stackEnv, "DB_PASSWORD", false)}
                                                        <span class=""
                                                            >{stackEnv.DB_PASSWORD}</span
                                                        >
                                                    {/if}
                                                </p>
                                            </div>
                                            <!-- Copy -->
                                            <Copy
                                                value={stackEnv.DB_USER +
                                                    " " +
                                                    stackEnv.DB_PASSWORD}
                                            />
                                            <!-- End copy -->
                                        </div>

                                        <p>
                                            <span
                                                class="mt-2 block text-xs text-gray-400 font-normal leading-tight tracking-tight"
                                                >Root password</span
                                            >
                                        </p>
                                        <div
                                            class="group my-2 p-2 rounded-md bg-chillgray-100 text-gray-700 text-sm font-normal flex flex-row gap-1 font-mono"
                                        >
                                            <div
                                                class="flex-grow flex flex-col"
                                            >
                                                <p>
                                                    {#if _.get(stackEnv, "DB_ROOT_PASSWORD", false)}
                                                        <span class=""
                                                            >{stackEnv.DB_ROOT_PASSWORD}</span
                                                        >
                                                    {/if}
                                                </p>
                                            </div>
                                            <!-- Copy -->
                                            <Copy
                                                value={stackEnv.DB_ROOT_PASSWORD}
                                            />
                                            <!-- End Copy -->
                                        </div>
                                    {/if}
                                </div>
                            {/if}
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    {:else}
        <Alert {...alertObj} />
    {/if}
{:catch error}
    {showNotification(error.message, "error")}
{/await}

{#if _.has(notificationObject, "show") && notificationObject.show === true}
    <Notification {...notificationObject} />
{/if}
