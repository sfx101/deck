<script>
    import _ from "lodash";
    import { onMount } from "svelte";
    import { clickOutside } from "./../../../utils/ClickOutside";

    export let inputObject;
    export let inputField;
    export let error;
    export let value = [];
    // export let iconClass = "fas fa-code-branch";

    let listShow = false,
        checkedValues = [],
        searchTerm,
        valueOptions,
        selectedText = inputObject.label;

    $: valueOptions = search(searchTerm);

    /**
     * @description : When component load then set value
     */
    onMount(async () => {
        // Init default value
        value = _.get(inputObject, "default", []);

        // Init checked value
        value.forEach((element) => {
            checkedValues[element] = true;
        });
    });

    /**
     * @description : Update value
     */
    function updateValue(val, action) {
        if (action) {
            value.push(val);
        } else {
            _.remove(value, function (n) {
                return n === val;
            });
        }

        if (value.length > 0) selectedText = "Selected: " + value.join(", ");
        else selectedText = inputObject.label;
    }

    /**
     * @description : Search and get the search result
     */
    function search() {
        return _.isArray(inputObject.values)
            ? inputObject.values.filter((x) =>
                  _.lowerCase(x["name"]).includes(_.lowerCase(searchTerm))
              )
            : [];
    }
</script>

<div class="pt-6">
    <div role="group" aria-labelledby="label-notifications">
        <label
            for="username"
            class="block text-sm font-medium text-gray-700 pb-2 mb-6 border-b border-gray-200"
        >
            {inputObject.label}
        </label>
        <div class="grid grid-cols-2 gap-4 items-start">
            <div class="col-span-1">
                <span class="text-gray-500 text-xs">{inputObject.hint}</span>
            </div>
            <div class="col-span-1">
                <div class="w-full flex flex-col items-center">
                    <div class="w-full">
                        <div class="flex flex-col items-center relative">
                            <div class="w-full">
                                <div
                                    class="my-2 p-1 h-10 bg-white flex border border-gray-200 rounded-lg"
                                >
                                    <div class="flex flex-auto flex-wrap" />
                                    <!-- placeholder={inputObject.label} -->
                                    <input
                                        on:click={() => {
                                            listShow = true;
                                        }}
                                        bind:value={searchTerm}
                                        placeholder={selectedText}
                                        class="p-1 px-2 pl-3 appearance-none outline-none w-full text-gray-800 text-sm"
                                    />
                                    <div
                                        class="text-gray-300 w-8 text-center py-1 border-l flex items-center justify-items-center border-gray-200"
                                    >
                                        <button
                                            on:click={(e) => {
                                                e.preventDefault();
                                                listShow = !listShow;
                                            }}
                                            class="cursor-pointer w-4 h-4 text-gray-600 outline-none focus:outline-none mx-auto"
                                        >
                                            {#if listShow != true}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="100%"
                                                    height="100%"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    class="feather feather-chevron-up w-4 h-4"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            {:else}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="100%"
                                                    height="100%"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    class="feather feather-chevron-up w-4 h-4"
                                                >
                                                    <polyline
                                                        points="18 15 12 9 6 15"
                                                    />
                                                </svg>
                                            {/if}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div
                                use:clickOutside
                                on:clickOutside={() => {
                                    listShow = false;
                                }}
                                class="{listShow != true
                                    ? 'hidden'
                                    : ''}  absolute shadow bg-white top-14 z-40 w-full rounded-md max-h-select overflow-y-auto max-h-60"
                            >
                                <!-- Object.entries(inputObject.values) -->
                                {#each Object.entries(valueOptions) as [key1, value1]}
                                    <div
                                        class="flex flex-row-reverse items-center relative tail-checkbox px-3 py-3 hover:bg-chillgray-100"
                                    >
                                        <div
                                            class="flex flex-wrap items-center z-10"
                                        >
                                            <input
                                                type="checkbox"
                                                id={key1}
                                                name={inputField}
                                                value={value1.name}
                                                bind:checked={checkedValues[
                                                    value1.name
                                                ]}
                                                on:change={() => {
                                                    updateValue(
                                                        value1.name,
                                                        checkedValues[
                                                            value1.name
                                                        ]
                                                    );
                                                }}
                                                class="opacity-0 absolute h-5 w-5"
                                            />
                                            <div
                                                class="border-2 rounded-full border-gray-300 w-5 h-5 flex flex-shrink-0 justify-center items-center"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="fill-current hidden w-5 h-5 text-green-500 pointer-events-none"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clip-rule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <label
                                            for={key1}
                                            class="select-none w-full"
                                        >
                                            <div
                                                class="cursor-pointer w-full border-gray-100"
                                            >
                                                <div
                                                    class="flex w-full items-center relative"
                                                >
                                                    <div
                                                        class="w-6 flex flex-col items-center"
                                                    >
                                                        <div
                                                            class="flex relative justify-center items-center m-1 mr-2 w-5 h-5 mt-1 rounded-full"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                class="h-4 w-4 text-gray-500"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="items-center flex"
                                                    >
                                                        <div class="mx-2">
                                                            <div
                                                                class="mb-1 text-md font-normal text-gray-600"
                                                            >
                                                                {value1.name}
                                                            </div>
                                                            <div
                                                                class="text-xs w-full normal-case font-normal text-gray-400"
                                                            >
                                                                {value1.description}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
