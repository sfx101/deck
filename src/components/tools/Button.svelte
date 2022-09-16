<script>
    import _ from "lodash";
    import { fade } from "svelte/transition";
    import { quintInOut } from "svelte/easing";

    import { getStackPath } from "../../utils/Utils";
    import run from "../../utils/RunCommand";

    export let cmd, containers, projectName;
    let execInProgress;

    const os = require("os");
    const platform = os.platform();
    const capableContainers = ["apache", "nginx", "laravel", "symfony"];

    function executePowerTools() {
        execInProgress = true;
        //Find the right container to run
        const container = _.intersection(capableContainers, containers);

        let command = "";
        if (platform === "win32") {
            command = `cd "${getStackPath(
                projectName
            )}" ; docker-compose exec ${container} ${cmd}`;
        } else {
            command = `cd "${getStackPath(
                projectName
            )}" && docker-compose exec ${container} ${cmd}`;
        }

        run(command).then(
            (ptyProcess) => {
                ptyProcess.onExit(() => {
                    execInProgress = false;
                });
            },
            (err) => {
                execInProgress = false;
            }
        );
    }
</script>

<button
    type="button"
    class="sidebar-action-btn hover:bg-azure-600 hover:text-white hover:border-transparent border-btn-gray transition ease-in-out duration-500"
    on:click={() => {
        executePowerTools();
    }}
>
    {#if execInProgress}
        <span transition:fade={{ duration: 500, easing: quintInOut }}>
            <svg
                class="animate-spin h-4 w-4 mr-3"
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
    {cmd}
</button>
