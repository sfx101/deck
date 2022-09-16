<script>
    import { onMount } from "svelte";
    import { settingsStore } from "../../utils/store/Settings";
    import { getDockerEngine } from "./../../utils/models/Settings";
    const { shell } = require("electron");
    export let stack, httpPort;

    onMount(async () => {
        if ($settingsStore.host === null) {
            getDockerEngine();
        }
    });
</script>

<div
    class="dropdown dropdown-hover custom-dropdown dropdown-end cursor-pointer"
>
    <div
        class="relative bg-beach-200 p-4 shadow-sm rounded-lg overflow-hidden hover:bg-beach-300 ease-transition"
    >
        <dt>
            <div class="absolute bg-beach-400 rounded-lg p-2 right-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-beach-900"
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
            <p class="mr-16 text-lg font-medium text-beach-600 truncate">
                Open
            </p>
        </dt>
        <dd class="flex items-baseline">
            <p class="text-xs text-beach-600">Preview app on your browser</p>
        </dd>
    </div>
    <ul
        tabindex="0"
        class="text-sm text-chillgray-500 p-1 shadow menu dropdown-content bg-base-100 rounded-lg w-auto overflow-visible"
    >
        <li class="w-full dropdown dropdown-right group overflow-visible">
            <!-- svelte-ignore a11y-missing-attribute -->
            <a
                on:click={() => {
                    shell.openExternal(`https:${stack}.stacks.run`);
                }}
                class="inline-flex text-left text-sm group-hover:bg-blue-500 group-hover:text-white gap-2"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 group-hover:text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd"
                    />
                </svg>
                Secure
            </a>
            <!-- <div
                class="dropdown-content -mt-2 absolute hidden arrow_box bg-white shadow-2xl p-4 rounded-lg w-48 text-center border border-gray-100"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0"
                    y="0"
                    class="h-10 w-10 mx-auto mb-3"
                    version="1.1"
                    viewBox="0 0 128 128"
                    xml:space="preserve"
                >
                    <path
                        fill="#fff"
                        d="M89,124H39c-11.05,0-20-8.95-20-20V54c0-11.05,8.95-20,20-20h50c11.05,0,20,8.95,20,20v50 C109,115.05,100.05,124,89,124z"
                    />
                    <path
                        fill="#71c2ff"
                        d="M74,79c0-5.52-4.48-10-10-10s-10,4.48-10,10c0,4.48,2.94,8.27,7,9.54V99c0,1.66,1.34,3,3,3s3-1.34,3-3V88.54 C71.06,87.27,74,83.48,74,79z"
                    />
                    <path
                        fill="#444b54"
                        d="M95,31.8V19c0-9.93-8.07-18-18-18H51c-9.93,0-18,8.07-18,18v12.8C23.22,34.45,16,43.39,16,54v50 c0,12.68,10.32,23,23,23h50c12.68,0,23-10.32,23-23V54C112,43.39,104.78,34.45,95,31.8z M39,19c0-6.62,5.38-12,12-12h26 c6.62,0,12,5.38,12,12v12H39V19z M106,104c0,9.37-7.63,17-17,17H39c-9.37,0-17-7.63-17-17V54c0-9.37,7.63-17,17-17h50 c9.37,0,17,7.63,17,17V104z"
                    />
                </svg>
                <h4 class="text-sm text-grey-400 font-medium mb-2">
                    Secure Service
                </h4>
                <p class="text-xs text-gray-400">
                    Private services are accessible only to your own services
                    and can speak any protocol. You can connect to the m easily
                    using the provided hostname and port.
                </p>
            </div> -->
        </li>
        <li class="w-full dropdown dropdown-right group overflow-visible">
            <!-- svelte-ignore a11y-missing-attribute -->
            <a
                on:click={() => {
                    shell.openExternal(
                        `http:${$settingsStore.host}:${httpPort}`
                    );
                }}
                class="inline-flex text-left text-sm group-hover:bg-blue-500 group-hover:text-white gap-2"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 group-hover:text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z"
                    />
                </svg>
                Non secure
            </a>
            <!-- <div
                class="dropdown-content -mt-2 absolute hidden arrow_box bg-white shadow-2xl p-4 rounded-lg w-48 text-center border border-gray-100"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0"
                    y="0"
                    class="h-10 w-10 mx-auto mb-3"
                    version="1.1"
                    viewBox="0 0 128 128"
                    xml:space="preserve"
                >
                    <path
                        fill="#fff"
                        d="M89,124H39c-11.05,0-20-8.95-20-20V54c0-11.05,8.95-20,20-20h50c11.05,0,20,8.95,20,20v50 C109,115.05,100.05,124,89,124z"
                    />
                    <path
                        fill="#71c2ff"
                        d="M74,79c0-5.52-4.48-10-10-10s-10,4.48-10,10c0,4.48,2.94,8.27,7,9.54V99c0,1.66,1.34,3,3,3s3-1.34,3-3V88.54 C71.06,87.27,74,83.48,74,79z"
                    />
                    <path
                        fill="#444b54"
                        d="M95,31.8V19c0-9.93-8.07-18-18-18H51c-9.93,0-18,8.07-18,18v12.8C23.22,34.45,16,43.39,16,54v50 c0,12.68,10.32,23,23,23h50c12.68,0,23-10.32,23-23V54C112,43.39,104.78,34.45,95,31.8z M39,19c0-6.62,5.38-12,12-12h26 c6.62,0,12,5.38,12,12v12H39V19z M106,104c0,9.37-7.63,17-17,17H39c-9.37,0-17-7.63-17-17V54c0-9.37,7.63-17,17-17h50 c9.37,0,17,7.63,17,17V104z"
                    />
                </svg>
                <h4 class="text-sm text-grey-400 font-medium mb-2">
                    Secure Service
                </h4>
                <p class="text-xs text-gray-400">
                    Private services are accessible only to your own services
                    and can speak any protocol. You can connect to the m easily
                    using the provided hostname and port.
                </p>
            </div> -->
        </li>
    </ul>
</div>
