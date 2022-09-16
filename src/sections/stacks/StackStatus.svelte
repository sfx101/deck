<script>
    import { onMount } from "svelte";
    import _ from "lodash";
    import { nominalProjectStore } from "../../utils/store/Projects";

    // export let stack;
    export let projectName;

    /**
     * Color classes:
     * green: stack running
     * pumpkin: stack broken
     * red: Stack not build
     * gray: Docker not running
     *
     * */
    let indicatorColors = "gray";

    let nominalStackObject, stackStatusText;

    $: {
        nominalStackObject = $nominalProjectStore.find(
            (item) =>
                _.has(item, "COMPOSE_PROJECT_NAME") &&
                item["COMPOSE_PROJECT_NAME"] === projectName
        );

        if (_.get(nominalStackObject, "indicatorColors", false)) {
            indicatorColors = nominalStackObject.indicatorColors;
        } else {
            indicatorColors = "gray";
        }
    }
    $: stackStatusText = getStatusText(indicatorColors);

    onMount(() => {});

    function getStatusText(indicatorColors) {
        let text;
        if (indicatorColors === "green") {
            text = "Project is running";
        } else if (indicatorColors === "pumpkin") {
            text = "Project is unhealthy, see logs for more info";
        } else if (indicatorColors === "red") {
            text = "Project is stopped";
        } else {
            text = "Project is not started yet";
        }
        return text;
    }
</script>

<div
    id="__sub-content-app-div"
    class="flex flex-none items-center justify-start mb-4"
>
    <p class="text-xs text-gray-400 mt-0.5">
        <span class="mr-1">{stackStatusText}</span>
    </p>
</div>
