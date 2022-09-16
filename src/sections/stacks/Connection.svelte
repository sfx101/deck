<script>
    import _ from "lodash";
    import { connections } from "./../../utils/docker/Container";
    import { openExternal } from "../../utils/Utils";
    import Notification from "./../../components/notification/Notification.svelte";
    import ContentLoader from "./ContentLoader.svelte";
    export let projectName;

    let notificationObject;
    let connectionsPromissObj;
    $: connectionsPromissObj = connections(projectName);

    function copy(value) {
        navigator.clipboard.writeText(value);
        notificationObject = {
            title: "Text has been successfully copied!",
            description: "",
            type: "success",
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
</script>

{#await connectionsPromissObj}
    <div class="mb-6 space-y-4">
        <ContentLoader />
    </div>
{:then res}
    {#if res.length}
        <div class="mb-6 space-y-4">
            <h3 class="text-md font-medium text-gray-900 mb-4">Connection</h3>
            <div
                class="flex flex-col p-4 bg-gray-800 shadow-md hover:shodow-lg rounded-lg gap-1"
            >
                <!-- Info bar -->
                <!-- <div class="bg-indigo-600 rounded-md">
            <div class="max-w-7xl mx-auto py-2 px-2 sm:px-2 lg:px-2">
                <div class="flex items-center justify-between flex-wrap">
                    <div class="w-0 flex-1 flex items-center">
                        <span class="flex p-2 rounded-lg bg-indigo-800">
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
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </span>
                        <p class="ml-3 font-medium text-white truncate">
                            <span class="md:hidden">
                                We announced a new product!
                            </span>
                            <span class="hidden md:inline">
                                Big news! We're excited to announce a brand new
                                product.
                            </span>
                        </p>
                    </div>
                    <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                        <button
                            type="button"
                            class="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                        >
                            <span class="sr-only">Dismiss</span>
                            <svg
                                class="h-4 w-4 text-white"
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
        </div> -->

                <!-- Connection list -->
                <ul role="list">
                    {#each res as container}
                        <li>
                            <div
                                class="grid grid-cols-12 items-center p-4 gap-2"
                            >
                                <div class="items-center">
                                    <span
                                        class="inline-flex items-center justify-center h-3 w-3 bg-{getColorByContainer(
                                            container
                                        )}-400 rounded-full"
                                        aria-hidden="true"
                                    >
                                        <!-- <span
                                            class="h-3.5 w-3.5 bg-green-400 rounded-full"
                                        /> -->
                                    </span>
                                </div>
                                <div class="col-span-2">
                                    <p
                                        class="text-md font-medium text-gray-100 truncate"
                                    >
                                        {_.get(container, "title", false)
                                            ? container.title
                                            : "Empty"}
                                    </p>
                                    <!-- <p
                                        class="mt-2 flex items-center text-sm text-gray-500"
                                    >
                                        <span class="truncate"
                                            >Some sub text here</span
                                        >
                                    </p> -->
                                </div>
                                <div class="col-span-5">
                                    <div class=" items-center gap-2">
                                        <p class="text-sm text-white block">
                                            <!-- {Container name}-{stack-name}.deck.app -->
                                            {#if container.showPublicPort}
                                                {container.publicHostName}
                                            {:else}
                                                {container.privateHostName}
                                            {/if}
                                        </p>
                                        <p
                                            class="flex font-bold text-xs text-gray-500"
                                        >
                                            <span class="truncate">HOST</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="col-span-1">
                                    <p class="text-sm text-white block">
                                        {#if container.showPublicPort}
                                            {container.publicHostPort}
                                        {:else}
                                            {container.privateHostPort}
                                        {/if}
                                    </p>
                                    <p
                                        class="flex font-bold text-xs text-gray-500"
                                    >
                                        <span class="truncate">PORT</span>
                                    </p>
                                </div>
                                <div class="col-span-1 flex justify-end">
                                    <button
                                        on:click={() => {
                                            if (container.showPublicPort) {
                                                copy(container.publicHostName);
                                            } else {
                                                copy(
                                                    container.privateHostName +
                                                        ":" +
                                                        container.publicHostPort
                                                );
                                            }
                                        }}
                                        class="text-gray-400 hover:text-white"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="flex-shrink-0 mr-1.5 h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div class="col-span-1 flex justify-end">
                                    <button
                                        on:click={() => {
                                            container.showPublicPort =
                                                !container.showPublicPort;
                                        }}
                                        class="text-gray-400 hover:text-white"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div class="col-span-1 flex justify-end">
                                    <button
                                        on:click={() => {
                                            if (container.showPublicPort) {
                                                openExternal(
                                                    "https://" +
                                                        container.publicHostName
                                                );
                                            } else {
                                                openExternal(
                                                    "http://" +
                                                        container.privateHostName +
                                                        ":" +
                                                        container.publicHostPort
                                                );
                                            }
                                        }}
                                        class="text-gray-400 hover:text-white"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-5 w-5 "
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
                            </div>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    {/if}
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}

<Notification {...notificationObject} />
