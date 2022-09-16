<script>
    import ProgressBar from "../../components/progress/ProgressBar.svelte";
    import StackStatus from "./StackStatus.svelte";
    import { getTimeElapsed } from "../../utils/Utils";
    import { headerLoaderStore } from "./../../utils/store/Projects";

    export let projectName;

    let timeElapsed;
    let progress = 0;

    let interval, startTime;
    $: {
        if ($headerLoaderStore.loading === true) {
            start();
        } else {
            stop();
        }
    }

    function start() {
        startTime = new Date();
        interval = setInterval(() => {
            timeElapsed = getTimeElapsed(startTime, new Date());
        }, 1000);
    }

    function stop() {
        if (interval) {
            clearInterval(interval);
        }
        timeElapsed = "";
        progress = 100;
    }
</script>

{#if $headerLoaderStore.loading && $headerLoaderStore.projectName === projectName}
    <div
        id="__sub-content-app-div"
        class=" flex flex-none items-center justify-start mt-0.5"
    >
        <p class="text-xs text-gray-400">
            <span class=""> {$headerLoaderStore.message} </span>
            <span class="font-medium text-gray-500">
                <span>
                    {timeElapsed ? timeElapsed : ""}
                </span>
            </span>
        </p>
    </div>
    <div
        id="__sub-content-app-div"
        class="flex flex-none items-center justify-start mt-1"
    >
        <ProgressBar progressStatus={progress} />
    </div>
{:else}
    <StackStatus {projectName} />
{/if}
