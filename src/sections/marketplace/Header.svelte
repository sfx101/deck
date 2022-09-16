<script>
    import _ from "lodash";
    import { fade } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import { openExternal } from "../../utils/Utils";

    export let dockerImage;

    const dispatch = createEventDispatcher();

    let gitHubRepoURL;
    let installClickStatus = false;
    $: {
        gitHubRepoURL = getRepoUrl(dockerImage);
        installClickStatus = false;
    }

    function openGitRepo() {
        openExternal(gitHubRepoURL);
    }

    function reportAnIssue() {
        openExternal(gitHubRepoURL + "/issues/new");
    }

    function getRepoUrl(dockerImage) {
        let gitUrl = dockerImage["@Github"];
        return `https://github.com/${gitUrl}`;
    }

    function setInstallStatus() {
        installClickStatus = !installClickStatus;
        dispatch("getInstallStatus", {
            installClickStatus: installClickStatus,
        });
    }
</script>

<!-- stack header -->
<div class="bg-gray-50 py-4 px-6">
    <div class="w-full mx-auto flex items-center justify-between">
        <div class="flex items-center space-x-5">
            <div class="flex-shrink-0">
                <span
                    class="inline-block relative border bg-white border-gray-200 rounded-lg p-1.5 indicator"
                >
                    <img
                        class="h-16 w-16 object-content"
                        src={_.get(dockerImage, "@Logo", "img/logo-dark.png")}
                        alt="Logo-{_.get(dockerImage, '@AppName', '')}"
                    />
                </span>
            </div>
            <div class="flex flex-col justify-center">
                <span class="flex flex-row gap-2 items-center">
                    <h1
                        class="text-lg font-semibold text-gray-700 subpixel-antialiased"
                    >
                        {_.get(dockerImage, "@AppName", "App name empty")}
                    </h1>
                </span>
                <p class="text-xs text-gray-500 mb-1 pr-3">
                    {_.get(dockerImage, "@Description", "")}
                </p>

                {#if _.get(dockerImage, "@Tags", false)}
                    <div class="">
                        {#each dockerImage["@Tags"] as tag, i}
                            <div
                                class="badge badge-primary border-blue-100 bg-blue-100 text-gray-800 text-2xs font-semibold {i >
                                0
                                    ? 'ml-1'
                                    : ''}"
                            >
                                {tag}
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
        <div class="flex flex-col-reverse gap-3 items-end w-64">
            {#if _.get(dockerImage, "@Github", false)}
                <div class="flex items-center gap-4">
                    <button
                        on:click={reportAnIssue}
                        class="text-xs text-blue-700 underline cursor-pointer"
                        >Report an issue
                    </button>
                    <button
                        on:click={openGitRepo}
                        class="text-xs text-blue-700 underline cursor-pointer"
                        >GitHub
                    </button>
                </div>
            {/if}
            {#if installClickStatus === false}
                <div in:fade={{ duration: 600 }}>
                    <button
                        on:click={setInstallStatus}
                        class="inline-flex gap-3 shadow-sm items-center pl-2 pr-6 py-2 text-xs focus:outline-none transition-colors duration-200 rounded-full bg-blue-100 hover:bg-blue-700 hover:text-white text-blue-900 font-semibold"
                    >
                        <span class="p-2 rounded-full bg-blue-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </span>
                        <span class="text-sm">Install</span>
                    </button>
                </div>
            {:else}
                <div in:fade={{ duration: 600 }}>
                    <button
                        on:click={setInstallStatus}
                        class="inline-flex gap-3 shadow-sm items-center pl-2 pr-6 py-2 text-xs focus:outline-none transition-colors duration-200 rounded-full bg-blue-100 hover:bg-blue-700 hover:text-white text-blue-900 font-semibold"
                    >
                        <span class="p-2 rounded-full bg-blue-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                        <span class="text-sm">Document</span>
                    </button>
                </div>
            {/if}
        </div>
    </div>
</div>
