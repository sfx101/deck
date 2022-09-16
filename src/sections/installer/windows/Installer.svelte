<script>
    import _ from "lodash";
    import { fly } from "svelte/transition";
    import { quintInOut } from "svelte/easing";
    import { Route, router, active } from "tinro";
    import run from "./../../../utils/RunCommand";
    import Stall from "./../progress/Stall.svelte";
    import Loading from "./../progress/Loading.svelte";
    import Done from "./../progress/Done.svelte";
    import { setSettings } from "./../../../utils/models/Settings";
    import { getProjects } from "./../../../utils/models/Projects";
    import getStoragePath from "./../../../utils/Utils";
    import { createDefaultNetwork } from "./../../../utils/docker/Network";
    import { LottiePlayer } from "@lottiefiles/svelte-lottie-player";
    import { onMount } from "svelte";
    import { controls } from "../../../utils/Store";
    import Notification from "../../../components/notification/Notification.svelte";

    const { remote, ipcRenderer } = require("electron");
    const { app } = remote;
    const path = require("path");
    const defaultSettings = {
        dockerEngine: {
            remoteEngine: true,
            host: "127.0.0.1",
            port: "2376",
        },
    };

    let InstallInProgress = "";
    let InstallationComplete = false;
    let installStates = [Stall, Stall, Stall, Stall];
    let Wsl2Installed = true;

    let notificationObject = {
        title: "Something went wrong",
        description:
            "An error happened while installing, view the logs for more info",
        type: "error",
        show: false,
    };

    onMount(async () => {
        console.log(
            `🚀 LOG | file: Installer.svelte | line 35 | onMount | onMount`
        );
    });

    async function beginInstaller() {
        const powerSavingBlockerID = await ipcRenderer.invoke("power-saving", {
            action: "start",
        });

        InstallInProgress = "disabled";
        installStates[0] = Loading;
        run(
            path
                .join(
                    app.isPackaged ? process.resourcesPath : app.getAppPath(),
                    "scripts",
                    "installer.bat"
                )
                .replaceAll(" ", "` ")
        ).then((ptyProcess) => {
            ptyProcess.on("data", (data) => {
                // Downloading WSL components
                if (data.trim().match(/a8f8e03ab0fe59d5afca54e60ee08340/g)) {
                    installStates = [Done, Loading, Stall, Stall];
                }

                // Extracting & configuring
                if (data.trim().match(/ab0f19608898ffcf5b0b98ce4c4b0020/g)) {
                    installStates = [Done, Done, Loading, Stall];
                }

                // Finishing up
                if (data.trim().match(/8b0d91e308eb47824c275ef16376adc9/g)) {
                    installStates = [Done, Done, Done, Loading];
                }
            });

            ptyProcess.on("exit", async (code) => {
                if (code === 0) {
                    console.log(
                        `🚀 LOG | file: Installer.svelte | line 86 | ptyProcess.on | code`,
                        code
                    );
                    // Set "RemoteEngine": true, host: "127.0.0.1", port: 2376
                    setSettings("settings", defaultSettings).then(async () => {
                        // Start WSL
                        ipcRenderer.send("start-wsl");
                        //async wait 10 secs for wsl to start
                        setTimeout(async () => {
                            /**
                             * Create Default Network
                             */
                            await createDefaultNetwork();
                        }, 10000);
                        /**
                         * Set docker host in env
                         */
                        process.env.DOCKER_HOST =
                            "tcp://" +
                            _.get(
                                defaultSettings,
                                "dockerEngine.host",
                                "127.0.0.1"
                            ) +
                            ":" +
                            _.get(defaultSettings, "dockerEngine.port", "2376");

                        /**
                         * Initialize proxy, register routes
                         */
                        ipcRenderer.send("register-proxy", {
                            action: "init",
                            args: {
                                stacks: getProjects(),
                                path: getStoragePath(),
                            },
                        });

                        installStates = [Done, Done, Done, Done];
                        InstallInProgress = "";
                        InstallationComplete = true;

                        ipcRenderer.invoke("power-saving", {
                            action: "stop",
                            powerSaving: powerSavingBlockerID,
                        });
                        $controls.panel = false;
                        await new Promise((resolve) =>
                            setTimeout(resolve, 2000)
                        );

                        router.goto("/stacks");
                    });
                } else {
                    notificationObject.show = true;
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                    $controls.panel = true;
                    $controls.output = true;
                }
            });
        });
    }
</script>

<!-- Content area -->
<div class="flex-1 flex flex-col overflow-hidden bg-gray-100">
    <!-- Main content -->
    <div class="flex-1 flex items-stretch overflow-hidden">
        <aside
            class="min-w-1/4 w-1/4 bg-chillgray-800 shadow-sm overflow-y-auto h-screen lg:block px-12"
        >
            <div class="flex flex-col justify-start h-28 py-8 -ml-2">
                <img class="object-cover w-16" src="img/DECK.png" alt="" />
            </div>
            <div class="flex flex-col h-auto justify-start py-6 gap-6">
                <div class="flex">
                    <ul role="list" class="">
                        <li>
                            <div class="relative pb-8">
                                <div
                                    class="relative flex items-start space-x-3"
                                >
                                    <svelte:component this={installStates[0]} />
                                    <div class="min-w-0 flex-1 py-1.5">
                                        <div class="text-sm">
                                            <span
                                                class="font-medium text-chillgray-500 focus:outline-none focus:ring-0 focus-within:ring-0 focus-within:outline-none focus:border-opacity-0"
                                                >Downloading distribution</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="relative pb-8">
                                <div
                                    class="relative flex items-start space-x-3"
                                >
                                    <svelte:component this={installStates[1]} />
                                    <div class="min-w-0 flex-1 py-1.5">
                                        <div class="text-sm">
                                            <span
                                                class="font-medium text-chillgray-500 focus:outline-none focus:ring-0 focus-within:ring-0 focus-within:outline-none focus:border-opacity-0"
                                                >Extracting & configuring</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="relative pb-8">
                                <div
                                    class="relative flex items-start space-x-3"
                                >
                                    <svelte:component this={installStates[2]} />
                                    <div class="min-w-0 flex-1 py-1.5">
                                        <div class="text-sm">
                                            <span
                                                class="font-medium text-chillgray-500 focus:outline-none focus:ring-0 focus-within:ring-0 focus-within:outline-none focus:border-opacity-0"
                                                >Finishing up</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="relative pb-8">
                                <div
                                    class="relative flex items-start space-x-3"
                                >
                                    <svelte:component this={installStates[3]} />
                                    <div class="min-w-0 flex-1 py-1.5">
                                        <div class="text-sm">
                                            <span
                                                class="font-medium text-chillgray-500 focus:outline-none focus:ring-0 focus-within:ring-0 focus-within:outline-none focus:border-opacity-0"
                                                >All set & done</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>

        <main
            class="flex flex-1 items-center justify-center w-full"
            style="background-image: url('img/wave.svg'); background-repeat: repeat-x;
            background-position: bottom; background-color: white;
            background-size: auto;
            background-position-x: initial;"
        >
            <div class="w-full">
                <div
                    class="flex flex-col items-center justify-center w-full gap-6 p-6"
                >
                    <div
                        class="h-72 w-72 rounded-full flex items-center justify-center"
                    >
                        <!-- <img
                            class="object-cover w-72"
                            src="img/outer-space.svg"
                            alt=""
                        /> -->
                        <LottiePlayer
                            src="https://assets4.lottiefiles.com/packages/lf20_rj4titti.json"
                            autoplay={true}
                            loop={true}
                            controls={false}
                            controlsLayout={[]}
                        />
                    </div>
                    <div class="flex flex-col items-center justify-center">
                        {#if Wsl2Installed}
                            <span
                                class="text-chillgray-50 flex text-3xl font-bold mb-4"
                                >Let's get started</span
                            >
                            <span
                                class="text-chillgray-50 flex text-sm font-normal"
                            >
                                DECK will attempt to install a light-weight
                                distribution for WSL for creating and managing
                                development environment</span
                            >
                        {:else}
                            <span
                                class="text-chillgray-50 flex text-3xl font-bold mb-4"
                                >WSL 2 is not installed</span
                            >
                            <span
                                class="text-chillgray-50 flex text-sm font-normal w-1/2"
                            >
                                DECK requires WSL 2. It looks like you have not
                                installed / enabled WSL 2, to install open
                                command prompt in Administrator mode and run wsl
                                --install</span
                            >
                        {/if}
                    </div>
                </div>
                {#if Wsl2Installed}
                    <div class="flex w-full items-center justify-center p-6">
                        <button
                            on:click|preventDefault={() => {

                                beginInstaller();
                            }}
                            type="button"
                            class="transition-all transform overflow-hidden relative {InstallInProgress
                                ? 'cursor-not-allowed '
                                : ''}inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded text-white bg-blue-600 hover:bg-blue-500"
                            disabled={InstallInProgress}
                        >
                            {#if InstallInProgress}
                                <span
                                    in:fly|local={{
                                        duration: 600,
                                        y: 30,
                                        easing: quintInOut,
                                    }}
                                    out:fly|local={{ duration: 300, y: 30 }}
                                    class="absolute left-4 top-2/4 transform -translate-y-2/4"
                                >
                                    <svg
                                        class="animate-spin h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            class="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            stroke-width="4"
                                        />
                                        <path
                                            class="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                </span>
                            {/if}
                            {#if InstallInProgress}
                                <span class="ml-4">Installing ...</span>
                            {:else}
                                <span>Install</span>
                            {/if}
                        </button>
                    </div>
                {/if}
            </div>
        </main>
    </div>
</div>
<Notification {...notificationObject} />
