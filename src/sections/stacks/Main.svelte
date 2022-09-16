<script>
    /**
     * @author : DECK Contributors
     * @description : This is main component of stack route.
     */

    import _ from "lodash";
    import { confirmNotificationStore } from "./../../utils/store/Notification";
    import start from "./../../utils/docker/Start";

    // components
    import Header from "./Header.svelte";
    import LoginToShell from "./LoginToShell.svelte";
    import Accesslogs from "./Accesslogs.svelte";
    import OpenInBrowser from "./OpenInBrowser.svelte";
    // import Connection from "./Connection.svelte";
    import UpdateForm from "./UpdateForm.svelte";
    import Slideover from "./slideover/Slideover.svelte";

    // Models
    import {
        getFormObject,
        getContainers,
        getHttpPort,
    } from "./../../utils/models/Projects";

    // For get value of props
    export let projectName;

    let slideoverShow = false;

    let containers,
        httpPort,
        formObject,
        isStackUpdated = false;
    $: {
        formObject = getFormObject(projectName);
        containers = getContainers(projectName);
        httpPort = getHttpPort(projectName);
    }

    // Confirm notification action
    $: {
        if (
            _.get($confirmNotificationStore, "action", false) === true &&
            _.get($confirmNotificationStore, "meta.action", false) ===
                "start-stack"
        ) {
            $confirmNotificationStore.action = false;
            start(_.get($confirmNotificationStore, "meta.project", false));
        }
    }

    function isStackUpdate(event) {
        isStackUpdated = event.detail.status;
    }
</script>

<main class="flex-1 overflow-y-auto h-screen">
    <!-- stack details -->
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
        <!-- stack header -->
        <Header
            {projectName}
            on:stackUpdate={isStackUpdate}
            bind:slideoverShow
        />

        <!-- stack details -->
        <div class="p-6 mb-8 overflow-y-auto rounded-md">
            <!-- connections -->
            <div class="mb-6">
                <dl
                    class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    <OpenInBrowser stack={projectName} {httpPort} />
                    <LoginToShell stack={projectName} {containers} />
                    <Accesslogs stack={projectName} {containers} />
                </dl>
            </div>

            <!-- Connections -->
            <!-- <Connection {projectName} /> -->

            {#await formObject}
                <!-- <ContentLoader /> -->
            {:then res}
                <div class="column-count gap-6 w-full">
                    <UpdateForm
                        bind:isStackUpdated
                        {projectName}
                        formFields={res.formInputFields}
                    />
                </div>
            {:catch error}
                <h2 class="text-3xl font-semibold text-red-700 mb-4">
                    {error.message}
                </h2>
            {/await}
        </div>
    </section>
</main>

<Slideover {projectName} bind:show={slideoverShow} />
