<script>
    import { fade, fly } from "svelte/transition";
    import { quintInOut } from "svelte/easing";
    import { controls } from "../../../utils/Store";
    import run from "../../../utils/RunCommand";
    import { Route, router, active } from "tinro";
    import Password from "./Password.svelte";
    import Done from "../progress/Done.svelte";
    import Loading from "../progress/Loading.svelte";
    import Stall from "../progress/Stall.svelte";
    import {
        setSettings,
        getDefaultSettings,
    } from "./../../../utils/models/Settings";
    import { getMultipassIP } from "../../../utils/Installer";
    import { createDefaultNetwork } from "./../../../utils/docker/Network";
    import { onMount, onDestroy } from "svelte";
    import { LottiePlayer } from "@lottiefiles/svelte-lottie-player";
    import { getProjects } from "../../../utils/models/Projects";
    import getStoragePath  from "../../../utils/Utils";

    const { remote, ipcRenderer } = require("electron");
    const { app } = remote;
    const { exec } = require("child_process");
    const path = require("path");

    let InstallInProgress = "";
    let InstallationComplete = false;
    let installStates = [Stall, Stall, Stall, Stall];
    let showPasswordPrompt = false;
    let ptyProcess;
    let showInstallerView = false;
    let tmpAuth = "";

    onMount(() => {
        showInstallerView = true;
    });

    onDestroy(() => {
        console.log(
            `🚀 LOG | file: Installer.svelte | line 37 | onDestroy | showInstallerView`,
            "Installer component destroyed"
        );
    });

    async function beginInstaller() {
        const powerSavingBlockerID = await ipcRenderer.invoke("power-saving", {
            action: "start",
        });

        // let ptyProcess = spawnPty();
        // debugger;
        InstallInProgress = "disabled";
        $controls.panel = false;
        $controls.output = true;
        $controls.terminal = false;
        installStates[0] = Loading;
        ptyProcess = await run(
            `sh ${path.join(
                app.isPackaged ? process.resourcesPath : app.getAppPath(),
                "scripts",
                "installer.sh"
            )} ${path.join(
                app.isPackaged ? process.resourcesPath : app.getAppPath(),
                "multipass",
                "multipass.pkg"
            )}`
        );
        // ptyProcess.write(
        //     `curl https://raw.githubusercontent.com/nabad600/multipass-script/master/install.sh | sh; exit\r`
        //     // `sudo ls -al && exit\r`
        // );

        ptyProcess.on("data", (data) => {
            if (data.trim() == "Password:") {
                showPasswordPrompt = true;
                ipcRenderer.send("dock-bounce", { type: "critical" });
            }

            if (data.trim().match(/yes\/no\/Later/g)) {
                ptyProcess.write("yes\r");
            }
            //yes/no/Later

            //md5: multipass launch
            if (data.trim().match(/ca7747dfcae5ee948ffee4c81099b1a4/g)) {
                installStates = [Done, Loading, Stall, Stall];
            }
            //md5: multipass exec deck-app
            if (data.trim().match(/30cc5285d6bc297b9ca633042957def0/g)) {
                installStates = [Done, Done, Loading, Stall];
            }
        });

        ptyProcess.on("exit", (code) => {
            installStates = [Done, Done, Done, Loading];
            // Try getting the Multipass IP
            getMultipassIP()
                .then(
                    async (privateIp) => {
                        // Set "RemoteEngine": true, host: "{Get private IP of VM}", port: 2376
                        await setSettings("settings", {
                            dockerEngine: {
                                remoteEngine: true,
                                host: privateIp,
                                port: "2376",
                            },
                        });

                        /**
                         * Create Default Network
                         */
                        createDefaultNetwork();

                        //Incase App.svelte has already set values
                        process.env.DOCKER_HOST =
                            "tcp://" + privateIp + ":" + 2376;
                        installStates = [Done, Done, Done, Done];

                        const cmd = `echo "/Users/${process.env.USER} -mapall=${process.env.USER} ${privateIp}" | sudo tee /etc/exports && sudo nfsd restart && multipass exec deck-app sudo service autofs restart`;
                        console.log(
                            `🚀 LOG | file: Installer.svelte | line 88 | ptyProcess.on | cmd`,
                            cmd
                        );
                        ptyProcess = await run(cmd);
                        ptyProcess.on("data", (data) => {
                            if (data.trim() == "Password:") {
                                //@TODO: Rare exception when Multipass is already installed,
                                //and tmpAuth is incorrect
                                //retries thrice and exits unexpectedly
                                if (tmpAuth.length !== 0) {
                                    ptyProcess.write(tmpAuth + "\r");
                                } else {
                                    showPasswordPrompt = true;
                                    ipcRenderer.send("dock-bounce", {
                                        type: "critical",
                                    });
                                }
                            }
                        });

                        ptyProcess.on("exit", async (code) => {
                            if (code === 0) {
                                await new Promise((resolve) =>
                                    setTimeout(resolve, 200)
                                );
                                $controls.panel = false;
                                await new Promise((resolve) =>
                                    setTimeout(resolve, 2000)
                                );
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
                                router.goto("/stacks");
                            } else {
                                console.error("NFS exited with code ", code);
                            }
                        });
                    },
                    (err) => {
                        console.error("Error retrieving Multipass IP: ", err);
                    }
                )
                .finally(() => {
                    InstallInProgress = "";
                    InstallationComplete = true;
                    ipcRenderer.invoke("power-saving", {
                        action: "stop",
                        powerSaving: powerSavingBlockerID,
                    });
                    ipcRenderer.send("dock-bounce", { type: "informational" });
                });
        });
    }

    function handleSharedPassword(event) {
        tmpAuth = event.detail.text;
        ptyProcess.write(event.detail.text + "\r");
        //Hide the password prompt
        showPasswordPrompt = false;
    }
</script>

<!-- Content area -->
{#if showInstallerView}
    <div
        in:fade
        out:fly={{ y: 200, duration: 200 }}
        class="flex-1 flex flex-col overflow-hidden bg-gray-100"
    >
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
                                        <svelte:component
                                            this={installStates[0]}
                                        />
                                        <div class="min-w-0 flex-1 py-1.5">
                                            <div class="text-sm">
                                                <span
                                                    class="font-medium text-chillgray-500 focus:outline-none focus:ring-0 focus-within:ring-0 focus-within:outline-none focus:border-opacity-0"
                                                    >Installing Multipass
                                                </span>
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
                                        <svelte:component
                                            this={installStates[1]}
                                        />
                                        <div class="min-w-0 flex-1 py-1.5">
                                            <div class="text-sm">
                                                <span
                                                    class="font-medium text-chillgray-500 focus:outline-none focus:ring-0 focus-within:ring-0 focus-within:outline-none focus:border-opacity-0"
                                                    >Extracting & configuring
                                                </span>
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
                                        <svelte:component
                                            this={installStates[2]}
                                        />
                                        <div class="min-w-0 flex-1 py-1.5">
                                            <div class="text-sm">
                                                <span
                                                    class="font-medium text-chillgray-500 focus:outline-none focus:ring-0 focus-within:ring-0 focus-within:outline-none focus:border-opacity-0"
                                                    >Finishing up
                                                </span>
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
                                        <svelte:component
                                            this={installStates[3]}
                                        />
                                        <div class="min-w-0 flex-1 py-1.5">
                                            <div class="text-sm">
                                                <span
                                                    class="font-medium text-chillgray-500 focus:outline-none focus:ring-0 focus-within:ring-0 focus-within:outline-none focus:border-opacity-0"
                                                    >All set & done
                                                </span>
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
                            <span
                                class="text-chillgray-50 flex text-3xl font-bold mb-4"
                                >Let's get started</span
                            >
                            <span
                                class="text-chillgray-50 flex text-sm font-normal"
                                >DECK requires Multipass to be installed for
                                creating & managing a lightweight VM</span
                            >
                        </div>
                    </div>

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
                                    in:fade
                                    out:fade
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
                </div>
            </main>
        </div>
    </div>
{/if}
<Password {showPasswordPrompt} on:password={handleSharedPassword} />
