<script>
    import { Route, router } from "tinro";
    import { onMount } from "svelte";
    import _ from "lodash";
    import Flight from "./sections/flight/Flight.svelte";
    import Sidebar from "./sections/includes/Sidebar.svelte";
    import Marketplace from "./sections/marketplace/Marketplace.svelte";
    import Output from "./sections/output/Output.svelte";
    import Stacks from "./sections/stacks/Stacks.svelte";
    import DeleteProject from "./sections/stacks/DeleteProject.svelte";
    import Installer from "./sections/installer/Installer.svelte";
    import Confirm from "./components/notification/Confirm.svelte";
    import ProcessCheckAlert from "./components/notification/ProcessCheckAlert.svelte";

    import Settings from "./sections/settings/Settings.svelte";
    import Entrypoint from "./sections/entrypoint/Entrypoint.svelte";
    import { createDefaultNetwork } from "./utils/docker/Network";
    import { getDockerEngine } from "./utils/models/Settings";
    import {
        getWinTopBorderClass,
        canOutputShow,
        canSidebarShow,
        isRootUrl,
    } from "./utils/Utils";
    import {
        initNominalStackStore,
        initStackStoreStore,
    } from "./utils/store/Marketplace";
    import {
        initDefaultEditor,
        initDefaultTerminal,
    } from "./utils/Integrations";
    import { showContextMenu } from "./utils/context-menu/Projects";

    const { remote } = require("electron");
    const { app } = remote;
    const os = require("os");
    const { ipcRenderer } = require("electron");

    let showSidebar = true;
    let state = false;

    onMount(() => {
        initDefaultEditor();
        initDefaultTerminal();

        ipcRenderer.on("auto-updater", function (event, text) {
            console.log(
                `🚀 LOG | file: App.svelte | line 47 | AUTO-UPDATER`,
                text
            );
        });
        /**
         * Create Default Network
         */
        createDefaultNetwork();

        /**
         * Initialize DOCKER_HOST if multipass is true
         */
        getDockerEngine().then((dockerEngine) => {
            if (
                _.get(dockerEngine, "remoteEngine", false) &&
                _.get(dockerEngine, "host", false) &&
                _.get(dockerEngine, "port", false)
            ) {
                process.env.DOCKER_HOST =
                    "tcp://" + dockerEngine.host + ":" + dockerEngine.port;
            }
        });
    });

    router.mode.hash();
    router.subscribe((data) => {
        state = canOutputShow(data.path);
        showSidebar = canSidebarShow(data.path);

        if (!isRootUrl(data.path)) {
            initNominalStackStore();
            initStackStoreStore();
        }

        console.log(
            "🚀 LOG | file: App.svelte | line 90 | router.subscribe | data.path",
            data.path
        );
    });
    
    window.addEventListener(
        "contextmenu",
        (e) => {
            e.preventDefault();
            console.log(`🚀 LOG | file: List.svelte | line 44 | target`, e)
            showContextMenu(e);
        },
        false
    );
</script>

{#if showSidebar}
    <Sidebar />
{/if}
<!-- Content area -->
<div class="relative flex flex-col w-screen draggable {getWinTopBorderClass()}">
    <Route>
        <Route path="/" redirect="/entrypoint" />
        <Route path="/entrypoint">
            <Entrypoint />
        </Route>
        <Route path="/stacks/*">
            <Stacks />
        </Route>
        <Route path="/project/delete/:projectName" let:meta>
            <DeleteProject projectName={meta.params.projectName} />
        </Route>
        <Route path="/marketplace/*">
            <Marketplace />
        </Route>
        <Route path="/flight">
            <Flight />
        </Route>
        <Route path="/settings/*">
            <Settings />
        </Route>
        <Route path="/installer/*">
            <Installer />
        </Route>
        <Route fallback>No page found</Route>
    </Route>

    <!-- Output -->
    <Output {state} />
</div>

<Confirm />
<ProcessCheckAlert />
