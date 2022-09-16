<script>
    import { fade } from "svelte/transition";
    import _ from "lodash";
    import down from "./../../utils/docker/Down";
    import { router } from "tinro";
    import Alert from "./../../components/modals/Alert.svelte";
    import Welcome from "./Welcome.svelte";
    import { confirmNotificationStore } from "./../../utils/store/Notification"; //"./../../../utils/store/Notification";
    import Confirm from "./../../components/notification/Confirm.svelte";
    import { controls } from "./../../utils/Store";
    import List from "./List.svelte";

    export let projectName;

    let alertObject;

    let confirmObject = {
        title: "Receive notifications",
        description: "",
        successButtonText: "View Log",
        cancelButtonText: "Cancel",
        show: false,
    };

    $: {
        if (projectName) {
            alertObject = {
                title: "Power off & destroy",
                description:
                    "Are you sure you want to remove this stack?\n\nRemoving a stack cleans up the space it occupied. Your document root is not deleted in this process",
                successButtonText: "Destroy",
                cancelButtonText: "Cancel",
                show: true,
                action: "power-off-destroy",
            };
        }
    }

    // Confirm notification action
    $: {
        if (
            _.get($confirmNotificationStore, "action", false) === true &&
            _.get($confirmNotificationStore, "meta.action", false) ===
                "view-log"
        ) {
            $confirmNotificationStore.action = false;
            viewLog();
        }

        // Notification cancel action
        if (
            _.get($confirmNotificationStore, "cancel", false) === true &&
            _.get($confirmNotificationStore, "meta.action", false) ===
                "view-log"
        ) {
            $confirmNotificationStore.cancel = false;
        }
    }

    /**
     * After confirmation perform actions.
     */
    async function action() {
        let key = _.get(alertObject, "action", false);
        switch (key) {
            case "power-off-destroy":
                // "Powering off and destroying..."
                down(projectName).then(
                    (res) => {
                        // Confirm notification init
                        $confirmNotificationStore = {
                            title: "Receive notifications",
                            description: res.message,
                            successButtonText: "View Log",
                            cancelButtonText: "Cancel",
                            show: true,
                            meta: { action: "view-log" },
                        };
                    },
                    (error) => {
                        confirmObject = {
                            title: "Receive notifications",
                            description: error.message,
                            successButtonText: "View Log",
                            cancelButtonText: "Cancel",
                            show: true,
                        };
                    }
                );
                break;
            default:
                console.log(
                    "🚀 LOG | file: Slideover.svelte | line 146 | action | default"
                );
                break;
        }
    }

    function goBack() {
        router.goto("/stacks/" + projectName);
    }

    /**
     * @description Show the output bar when notification button click.
     * @param e
     */
    function viewLog(e) {
        $controls.panel = true;
        $controls.output = true;
        $controls.terminal = false;
    }

    function close(e) {
        router.goto("/stacks/");
    }
</script>

<!-- Content area -->
<div class="flex-1 flex flex-col overflow-hidden bg-gray-100">
    <!-- Main content -->
    <div class="flex-1 flex items-stretch overflow-hidden">
        <List />
        <Welcome />
    </div>
</div>
<Alert
    on:successNotification={action}
    on:closeNotification={goBack}
    {...alertObject}
/>
<Confirm
    on:successNotification={viewLog}
    on:cancelButtonText={close}
    {...confirmObject}
/>
