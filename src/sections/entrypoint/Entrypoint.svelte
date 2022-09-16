<script>
    /**
     * @author DECK Contributors
     * @description Entry point of the app for every time when start the app
     */
    import _ from "lodash";
    import { onMount } from "svelte";
    import { router } from "tinro";
    import {
        getDockerEngine,
        setSettings,
    } from "./../../utils/models/Settings";
    import {
        IsDockerDesktopRunning,
        launchDockerDesktop,
    } from "../../utils/docker/Desktop";
    import { dockerStackInitialization } from "./../../utils/project-install/RepositoryUtils";
    import { LottiePlayer } from "@lottiefiles/svelte-lottie-player";
    import { getProjects } from "../../utils/models/Projects";
    import getStoragePath from "../../utils/Utils";
    import { iSWSL2Installed } from "../../utils/WSL2";
    import { getAllAnnouncements } from "./../../utils/Announcements";

    const { ipcRenderer, remote } = require("electron");
    const os = require("os");
    const { exec } = require("child_process");
    const { app } = remote;
    const path = require("path");
    const dockerComposePath = !app.isPackaged
        ? path.join(app.getAppPath(), "bin")
        : path.join(process.resourcesPath, "bin");

    /**
     * Initialization on page load
     */
    onMount(async () => {
        // Init announcements
        await getAllAnnouncements();

        // Initialization configurations for app run
        setTimeout(() => {
            initializationBeforeStart();
        }, 500);
    });

    async function setDockerDesktopDefaults() {
        // Set "RemoteEngine": false, host: null, port: null
        // @TODO: can't set this here because host is using to open stack non secure with host
        let settings = {
            dockerEngine: {
                remoteEngine: false,
                host: "127.0.0.1",
                port: 2376,
            },
        };
        await setSettings("settings", settings);
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
    }

    /**
     * Initialization configurations for app run
     */
    async function initializationBeforeStart() {
        let dockerEngine = await getDockerEngine();
        let WSLStatus = await iSWSL2Installed();
        console.log(
            `🚀 LOG | file: Entrypoint.svelte | line 77 | initializationBeforeStart | WSLStatus`,
            WSLStatus
        );

        // .deck Initialization
        await dockerStackInitialization();

        // RemoteEngine is defined & True?
        if (
            _.get(dockerEngine, "remoteEngine", false) &&
            dockerEngine.remoteEngine === true
        ) {
            // Check host:port is accessible
            if (os.platform() === "win32") {
                setDockerHostEnv(dockerEngine);
                // Start WSL
                ipcRenderer.send("start-wsl");
            }
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
            // if (os.platform() === 'win32' && WSLStatus.wsl2 === null) router.goto("/installer/wsl-status");
            // else router.goto("/installer");

            // @TODO: support for Docker Desktop in next version
            // Docker desktop checks
            IsDockerDesktopRunning()
                .then(async (isRunning) => {
                    await setDockerDesktopDefaults();
                })
                .catch(() => {
                    launchDockerDesktop()
                        .then(async () => {
                            await setDockerDesktopDefaults();
                        })
                        .catch((err) => {
                            console.error("ERR : ", err);
                            // 1st time user
                            // Go to /installer
                            console.trace();
                            router.goto("/installer");
                        });
                });
        }
    }

    function setDockerHostEnv(dockerEngine) {
        let cmd = "";
        let terminalOpenCmd = `cmd /K`;
        let setDockerHostCmd =
            `setx DOCKER_HOST "tcp://` +
            _.get(dockerEngine, "host", false) +
            `:` +
            _.get(dockerEngine, "port", false) +
            `"`;

        //@TODO: Fix issue with setx for first run, the path doesn't get updated
        let setDockerCompose = `setx PATH "${dockerComposePath};%PATH%"`;
        // If remote engine is true
        cmd = `${terminalOpenCmd} "${setDockerHostCmd}"`; //
        exec(cmd);
    }
</script>

<!-- 
    App download
    Open app
        /entrypoint
            RemoteEngine is defined & True?
            True:
                Check host:port is accessible
                Windows:
                    Start WSL
                macOS: 
                    //Check other Multipass settings
                Go to /stacks
            False:
                Is Docker desktop installed?
                Yes:
                    Set "RemoteEngine": false, host: null, port: null
                No:
                    //1st time user
                    Go to /installer
                        Finish installation
                        Windows:
                            Set "RemoteEngine": true, host: "127.0.0.1", port: 2376
                        macOS:
                            Set "RemoteEngine": true, host: "{Get private IP of VM}", port: 2376
                        Go to /stacks
-->

<div class="flex justify-center items-center h-screen bg-chillgray-800">
    <!-- <svg
        class="h-10 w-10 animate-spin"
        fill="none"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            opacity=".5"
            d="M8 15A7 7 0 108 1a7 7 0 000 14v0z"
            stroke="#d4d4d8"
            stroke-width="2"
        />
        <path d="M15 8a7 7 0 01-7 7" stroke="#52525b" stroke-width="2" />
    </svg> -->

    <LottiePlayer
        src="lottiefiles/data.json"
        autoplay={true}
        loop={true}
        controls={false}
        renderer="svg"
        background="#252f3f"
        height={128}
        width={128}
        controlsLayout={[]}
    />
</div>
