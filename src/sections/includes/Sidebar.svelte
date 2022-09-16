<script>
    import _ from "lodash";
    import { active, router } from "tinro";
    import { onMount } from "svelte";
    import { openExternal } from "./../../utils/Utils";
    import Announcement from "./Announcement.svelte";

    const { ipcRenderer } = require("electron");
    const reportLink = "https://github.com/sfx101/deck/issues/new";

    let appVersion = "v1.0.0";

    ipcRenderer.on("app_version", (event, data) => {
        if (_.get(data, "version", false)) {
            appVersion = "v" + data.version;
        }
    });

    onMount(async () => {
        ipcRenderer.send("app_version");
    });
</script>

<div class="flex flex-col w-20">
    <div class="flex-1 flex flex-col min-h-0 bg-chillgray-800">
        <div class="flex-1">
            <div class="bg-chillgray-800 pt-4 flex items-center justify-center">
                <img class="h-14 w-auto" src="img/DECK.png" alt="Deck Logo" />
            </div>
            <nav
                aria-label="Sidebar"
                class="py-6 flex flex-col items-center space-y-3 relative z-20"
            >
                <a
                    href="/#/stacks"
                    use:active
                    active-class="bg-chillgray-500"
                    class="p-4 rounded-lg text-chillgray-50 hover:bg-chillgray-500 focus:outline-none focus-visible:ring-0 focus-visible:outline-none relative tooltip-hover group"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                    </svg>
                    <div
                        class="absolute bottom-0 -right-2.5 hidden top-2/4 transform -translate-y-1/2 translate-x-full group-hover:block"
                    >
                        <span
                            class="relative z-10 p-2 text-xs leading-none bg-white font-medium text-gray-700 border border-chillgray-200 rounded whitespace-no-wrap block"
                            >Projects</span
                        >
                        <div
                            class="w-3 h-3 -ml-1 -mt-5 border border-chillgray-200 transform rotate-45 bg-white"
                        />
                    </div>
                </a>

                <a
                    href="/#/marketplace"
                    use:active
                    active-class="bg-chillgray-500"
                    class="p-4 rounded-lg text-chillgray-50 hover:bg-chillgray-500 focus:outline-none focus-visible:ring-0 focus-visible:outline-none relative tooltip-hover group"
                >
                    <!-- Heroicon name: outline/fire -->
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                        />
                    </svg>
                    <div
                        class="absolute bottom-0 -right-2.5 hidden top-2/4 transform -translate-y-1/2 translate-x-full group-hover:block"
                    >
                        <span
                            class="relative z-10 p-2 text-xs leading-none bg-white font-medium text-gray-700 border border-chillgray-200 rounded whitespace-no-wrap block"
                            >Marketplace</span
                        >
                        <div
                            class="w-3 h-3 -ml-1 -mt-5 border border-chillgray-200 transform rotate-45 bg-white"
                        />
                    </div>
                </a>

                <!-- <a
                    href="/#/flight"
                    use:active
                    active-class="bg-chillgray-500"
                    class="p-4 rounded-lg text-chillgray-50 hover:bg-chillgray-500 focus:outline-none focus-visible:ring-0 focus-visible:outline-none relative tooltip-hover group"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                    </svg>
                    <div
                        class="absolute bottom-0 -right-2.5 hidden top-2/4 transform -translate-y-1/2 translate-x-full group-hover:block"
                    >
                        <span
                            class="relative z-10 p-2 text-xs leading-none bg-white font-medium text-gray-700 border border-chillgray-200 rounded whitespace-no-wrap block"
                            >Flight</span
                        >
                        <div
                            class="w-3 h-3 -ml-1 -mt-5 border border-chillgray-200 transform rotate-45 bg-white"
                        />
                    </div>
                </a> -->

                <a
                    href="/#/settings"
                    use:active
                    active-class="bg-chillgray-500"
                    class="p-4 rounded-lg text-chillgray-50 hover:bg-chillgray-500 focus:outline-none focus-visible:ring-0 focus-visible:outline-none relative tooltip-hover group"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                    <div
                        class="absolute bottom-0 -right-2.5 hidden top-2/4 transform -translate-y-1/2 translate-x-full group-hover:block"
                    >
                        <span
                            class="relative z-10 p-2 text-xs leading-none bg-white font-medium text-gray-700 border border-chillgray-200 rounded whitespace-no-wrap block"
                            >Settings</span
                        >
                        <div
                            class="w-3 h-3 -ml-1 -mt-5 border border-chillgray-200 transform rotate-45 bg-white"
                        />
                    </div>
                </a>

                <button
                    on:click={() => {
                        openExternal(reportLink);
                    }}
                    class="p-4 rounded-lg text-chillgray-50 hover:bg-chillgray-500 focus:outline-none focus-visible:ring-0 focus-visible:outline-none relative tooltip-hover group"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <div
                        class="absolute bottom-0 -right-2.5 hidden top-2/4 transform -translate-y-1/2 translate-x-full group-hover:block"
                    >
                        <span
                            class="relative z-10 p-2 text-xs leading-none bg-white font-medium text-gray-400 border border-chillgray-200 rounded whitespace-no-wrap block"
                            >Report</span
                        >
                        <div
                            class="w-3 h-3 -ml-1 -mt-5 border border-chillgray-200 transform rotate-45 bg-white"
                        />
                    </div>
                </button>
            </nav>
        </div>
        <div class="flex-shrink-0 flex justify-center pb-5">
            <Announcement />
        </div>
        <!-- <div class="flex-shrink-0 flex py-1 bg-chillgray-700">
            <p class="text-center mx-auto text-xs text-white font-medium">
                {appVersion}
            </p>
        </div> -->
    </div>
</div>
