<script>
    import { onMount } from "svelte";
    import _ from "lodash";
    import { setIndicatorColor } from "../../utils/docker/Indicator";
    import { nominalProjectStore } from "../../utils/store/Projects";

    // export let stack;
    export let projectName;
    export let type;

    /**
     * Color classes:
     * green: stack running
     * pumpkin: stack broken
     * red: Stack not build
     * gray: Docker not running
     *
     * */
    let indicatorColors = "csgray";

    let nominalStackObject;

    $: {
        nominalStackObject = $nominalProjectStore.find(
            (item) =>
                _.has(item, "COMPOSE_PROJECT_NAME") &&
                item["COMPOSE_PROJECT_NAME"] === projectName
        );

        if (_.get(nominalStackObject, "indicatorColors", false)) {
            indicatorColors = nominalStackObject.indicatorColors;
        } else {
            indicatorColors = "csgray";
        }
    }

    onMount(() => {
        setIndicatorColor(projectName);
    });
</script>

{#if type === "list"}
    <span
        class="
        inline-flex items-center justify-center
        bottom-0 right-0
        h-4 w-4
        bg-{indicatorColors}-100 dark:bg-transparent rounded-full
        "
        aria-hidden="true"
    >
        <span
            class=" 
            bottom-0 right-0
            h-3 w-3
            bg-{indicatorColors}-400 dark:bg-{indicatorColors}-500 rounded-full
            "
        />
    </span>
{:else}
    <span
        class="
        absolute inline-flex items-center justify-center
        bottom-0 right-0
        h-4 w-4
        bg-{indicatorColors}-100 rounded-full
        "
        aria-hidden="true"
    >
        <span
            class="
                bottom-0 right-0
                h-3 w-3
                bg-{indicatorColors}-400 rounded-full
                "
        />
    </span>
{/if}
