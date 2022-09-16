<script>
    import { router, active } from "tinro";
    import _ from "lodash";
    import start from "./../../utils/docker/Start";
    import stop from "./../../utils/docker/Stop";
    import Indicator from "./Indicator.svelte";
    import { nominalProjectStore } from "../../utils/store/Projects";

    export let stack;

    let isProjectStarted = false,
        nominalStackObject;
    $: {
        nominalStackObject = $nominalProjectStore.find(
            (item) =>
                item["COMPOSE_PROJECT_NAME"] === stack["COMPOSE_PROJECT_NAME"]
        );

        if (_.get(nominalStackObject, "indicatorColors", false)) {
            if (
                nominalStackObject.indicatorColors === "pumpkin" ||
                nominalStackObject.indicatorColors === "green"
            ) {
                isProjectStarted = true;
            } else {
                isProjectStarted = false;
            }
        } else {
            isProjectStarted = false;
        }
    }
</script>

<li
    class="cursor-pointer"
    on:click={() => {
        router.goto("/stacks/" + stack.COMPOSE_PROJECT_NAME);
    }}
>
    <div class="px-4">
        <div
            data-href="/stacks/{stack.COMPOSE_PROJECT_NAME}"
            use:active
            data-active-class="bg-chillgray-100"
            class="select-none flex flex-1 items-center justify-center p-2 rounded-lg hover:bg-chillgray-100 ease-transition"
        >
            <span class="inline-block relative">
                <!-- stack list status indicator -->
                <Indicator
                    projectName={stack.COMPOSE_PROJECT_NAME}
                    type={"list"}
                />
            </span>
            <div class="flex-1 ml-2">
                <div class="grid grid-cols-2">
                    <span
                        class="col-span-2 label-text grid grid-cols-12 gap-0.5 items-center"
                    >
                        <span
                            class="context-menu col-span-9 text-sm font-medium text-gray-700 truncate pr-1"
                            >{stack.COMPOSE_PROJECT_NAME}</span
                        >
                        <span class="col-span-3 flex justify-end">
                            <p
                                class="flex items-center text-sm text-gray-500 gap-x-0.5"
                            >
                                {#if stack.isButtonLoading === true}
                                    <svg
                                        class="
                                            text-pumpkin-600
                                            animate-spin
                                            mr-2
                                            h-5
                                            w-5
                                        "
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
                                {:else if isProjectStarted}
                                    <!-- <button
                                        on:click={() =>
                                            stop(stack.COMPOSE_PROJECT_NAME)}
                                        class="text-right flex justify-end"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="
                                        h-6
                                        w-6
                                        mr-1.5
                                        text-coral-500
                                        hover:text-coral-600
                                        "
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </button> -->
                                {:else}
                                    <!-- <button
                                        on:click={() =>
                                            start(stack.COMPOSE_PROJECT_NAME)}
                                        class="text-right flex justify-end"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="
                                                h-6
                                                w-6
                                                mr-1.5
                                                text-turquoise-400
                                                hover:text-turquoise-500
                                                "
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </button> -->
                                {/if}

                                <button class="text-right flex ">
                                    <svg
                                        data-href="/stacks/{stack.COMPOSE_PROJECT_NAME}"
                                        use:active
                                        data-active-class="text-blue-700"
                                        class="h-6 w-6 text-gray-300"
                                        x-description="Heroicon name: solid/chevron-right"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </p>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</li>
