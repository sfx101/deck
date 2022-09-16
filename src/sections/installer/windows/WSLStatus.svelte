<script>
    import _ from "lodash";
    import { fade, fly } from "svelte/transition";
    import { onMount } from "svelte";
    const os = require("os");
    const { shell } = require("electron");
    let isMounted = false;

    onMount(() => {
        isMounted = true;
    });

    function openWSLGuide() {
        if (getBuildNumber() >= 19041)
            shell.openExternal(
                `https:docs.microsoft.com/en-us/windows/wsl/install#install`
            );
        else
            shell.openExternal(
                `https:docs.microsoft.com/en-us/windows/wsl/install-manual`
            );
    }

    function getBuildNumber() {
        let ver = os.release().split(".");
        console.log(
            `🚀 LOG | file: WSLStatus.svelte | line 7 | getBuildNumber | ver`,
            ver
        );
        return parseInt(_.last(ver));
    }
</script>

{#if isMounted}
    <div
        in:fly={{ y: 200, duration: 200 }}
        class="text-center h-full flex flex-col items-center justify-center bg-chillgray-900"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
        </svg>
        <h3 class="text-xl font-medium leading-10 text-chillgray-300 font-sans">
            WSL is not enabled
        </h3>
        <p class="mt-1 text-sm text-chillgray-400 font-sans">
            Hi there, we couldn't find WSL (Windows Subsystem for Linux) enabled
            on your system,
            <br />
            DECK requires WSL to create a light-weight VM for managing development
            environment.
            <br />
            Once enabled, restart DECK & this screen should not come again
        </p>
        <div class="mt-6">
            <button
                on:click={openWSLGuide}
                type="button"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-full text-chillgray-300 bg-chillgray-600 hover:bg-chillgray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chillgray-500"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="-ml-1 mr-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                </svg>
                <span>How to enable?</span>
            </button>
        </div>
        <div class="mt-6 text-chillgray-400 underline text-sm">
            <a href="#/installer">Proceed if you already have WSL version 2 enabled</a>
        </div>
    </div>
{/if}
