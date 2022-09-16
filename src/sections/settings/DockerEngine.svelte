<script>
    /**
     * @author DECK Contributors
     * @description Docker engine setttings update page
     */

    import _ from "lodash";
    import { onMount } from "svelte";
    import { settingsStore } from "./../../utils/store/Settings";
    import { initDockerEngineSettings } from "./../../utils/models/Settings";

    const appSettings = require("electron-settings");

    /**
     * Init settings when load the page
     */
    onMount(async () => {
        await initDockerEngineSettings();
    });

    /**
     * Update the remoteEngine setting when settings change
     */
    async function setRemoteEngine() {
        $settingsStore.remoteEngine = !$settingsStore.remoteEngine;
        appSettings.set(
            "settings.dockerEngine.remoteEngine",
            $settingsStore.remoteEngine
        );
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
            class="flex flex-col gap-4 justify-center items-center py-12 container mx-auto"
        >
            <div
                class="flex items-center p-6 justify-between bg-white rounded-md border border-gray-200 gap-6 w-3/4"
            >
                <div class="min-w-0 flex-1 text-sm">
                    <label for="remote-engine" class="cursor-pointer">
                        <span class="flex-grow flex flex-col">
                            <span
                                class="text-sm font-medium text-gray-900"
                                id="availability-label">Remote engine</span
                            >
                            <span
                                class="text-sm text-gray-500"
                                id="availability-description"
                                >Use a remote engine for running Docker? Uncheck
                                this if you want to use Docker desktop.</span
                            >
                        </span>
                    </label>
                </div>
                <div class="ml-3 flex items-center h-5">
                    <input
                        on:change={setRemoteEngine}
                        bind:checked={$settingsStore.remoteEngine}
                        id="remote-engine"
                        aria-describedby="remote-engine-description"
                        name="remote-engine"
                        type="checkbox"
                        class="cursor-pointer focus:ring-blue-500 ring-0 h-5 w-5 text-blue-600 border-gray-300 rounded"
                    />
                </div>
            </div>

            {#if $settingsStore.remoteEngine === true && $settingsStore.host}
                <div
                    class="flex items-center p-6 justify-between bg-white rounded-md border border-gray-200 gap-6 w-3/4"
                >
                    <span class="flex-grow flex flex-col">
                        <span
                            class="text-sm font-medium text-gray-900"
                            id="availability-label">API endpoint</span
                        >
                        <span
                            class="text-sm text-gray-500"
                            id="availability-description"
                            >Read-only, Docker engine API</span
                        >
                    </span>
                    <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
                    <span
                        class="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-blue-600"
                    >
                        tcp://{$settingsStore.host}:{$settingsStore.port}
                    </span>
                </div>
            {/if}
        </div>
    </section>
</main>
