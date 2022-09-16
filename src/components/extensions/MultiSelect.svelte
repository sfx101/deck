<script>
    import _ from "lodash";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    export let id = "";
    export let value = [];
    export let readonly = false;
    export let placeholder = "";

    export let selected = {};

    let input,
        inputValue,
        options = [],
        activeOption,
        showOptions = false,
        first = true,
        slot;

    onMount(() => {
        slot.querySelectorAll("option").forEach((o) => {
            // Commented because its select default first or last
            // o.selected &&
            //     !value.includes(o.value) &&
            //     (value = [...value, o.value]);

            options = [
                ...options,
                {
                    value: o.value,
                    name: o.textContent,
                    description: o.getAttribute("data-description"),
                },
            ];
        });

        value &&
            (selected = options.reduce(
                (obj, op) =>
                    value.includes(op.value) ? { ...obj, [op.value]: op } : obj,
                {}
            ));
        first = false;
    });

    $: if (!first) value = Object.values(selected).map((o) => o.value);
    $: filtered = options.filter((o) =>
        inputValue ? o.name.toLowerCase().includes(inputValue.toLowerCase()) : o
    );
    $: if (
        (activeOption && !filtered.includes(activeOption)) ||
        (!activeOption && inputValue)
    )
        activeOption = filtered[0];

    function add(token) {
        if (!readonly) selected[token.value] = token;
    }

    function remove(value) {
        if (!readonly) {
            const { [value]: val, ...rest } = selected;
            selected = rest;
        }
    }

    function optionsVisibility(show) {
        if (readonly) return;
        if (typeof show === "boolean") {
            showOptions = show;
            show && input.focus();
        } else {
            showOptions = !showOptions;
        }
        if (!showOptions) {
            activeOption = undefined;
        }
    }

    function handleKeyup(e) {
        if (e.keyCode === 13) {
            Object.keys(selected).includes(activeOption.value)
                ? remove(activeOption.value)
                : add(activeOption);
            inputValue = "";
        }
        if ([38, 40].includes(e.keyCode)) {
            // up and down arrows
            const increment = e.keyCode === 38 ? -1 : 1;
            const calcIndex = filtered.indexOf(activeOption) + increment;
            activeOption =
                calcIndex < 0
                    ? filtered[filtered.length - 1]
                    : calcIndex === filtered.length
                    ? filtered[0]
                    : filtered[calcIndex];
        }
    }

    function handleBlur(e) {
        optionsVisibility(false);
    }

    function handleTokenClick(e) {
        if (e.target.closest(".token-remove")) {
            e.stopPropagation();
            remove(e.target.closest(".token").dataset.id);
        } else if (e.target.closest(".remove-all")) {
            selected = [];
            inputValue = "";
        } else {
            optionsVisibility(true);
        }
    }

    function handleOptionMousedown(e) {
        const value = e.target.dataset.value;
        if (selected[value]) {
            remove(value);
        } else {
            add(options.filter((o) => o.value === value)[0]);
            input.focus();
        }
    }
</script>

<div class="multiselect relative w-full" class:readonly>
    <button
        type="button"
        class:showOptions
        on:click={handleTokenClick}
        class="tokens flex flex-wrap items-center gap-2 relative w-full bg-white border border-gray-200 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-0 sm:text-sm"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
    >
        <!-- <div class=""> -->
        {#each Object.values(selected) as s}
            <div class="token hidden" data-id={s.value}>
                <span
                    class="inline-flex items-center py-0.5 pl-2 pr-0.5 rounded text-xs font-medium bg-gray-200 text-gray-600"
                >
                    {s.name}
                    {#if !readonly}
                        <button
                            type="button"
                            class="token-remove flex-shrink-0 ml-0.5 h-4 w-4 rounded inline-flex items-center justify-center text-gray-400 hover:bg-gray-300 hover:text-gray-00 focus:outline-none focus:bg-gray-500 focus:text-white"
                        >
                            <span class="sr-only">Remove {s.name}</span>
                            <svg
                                class="h-2 w-2"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 8 8"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-width="1.5"
                                    d="M1 1l6 6m0-6L1 7"
                                />
                            </svg>
                        </button>
                    {/if}
                </span>
            </div>
        {/each}
        <div class="actions w-full">
            {#if !readonly}
                <input
                    class="w-full p-0 text-xs border-none focus:border-none outline-none focus:outline-none focus:ring-0 text-gray-400 "
                    {id}
                    autocomplete="off"
                    bind:value={inputValue}
                    bind:this={input}
                    on:keyup={handleKeyup}
                    on:blur={handleBlur}
                    {placeholder}
                    type="text"
                />
                <!-- <div
                        class="remove-all"
                        title="Remove All"
                        class:hidden={!Object.keys(selected).length}
                    >
                        <svg
                        class="h-3 w-3 text-gray-500"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 8 8"
                        >
                        <path
                            stroke-linecap="round"
                            stroke-width="1.5"
                            d="M1 1l6 6m0-6L1 7"
                        />
                        </svg>
                    </div> -->
            {/if}
        </div>
        <!-- </div> -->
        <span
            class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
            <!-- Heroicon name: solid/selector -->
            <svg
                class="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                />
            </svg>
        </span>
    </button>

    <select bind:this={slot} type="multiple" class="hidden"><slot /></select>

    {#if showOptions && filtered.length > 0}
        <ul
            transition:fly={{ duration: 200, y: 5 }}
            on:mousedown|preventDefault={handleOptionMousedown}
            class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            tabindex="-1"
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
        >
            {#each filtered as option}
                <li
                    class="options text-gray-900 cursor-default select-none relative py-3 pl-3 pr-10 hover:bg-chillgray-100"
                    class:selected={selected[option.value]}
                    class:active={activeOption === option}
                    data-value={option.value}
                >
                    <div
                        for=""
                        class="flex items-center"
                        data-value={option.value}
                    >
                        <!-- Online: "bg-green-400", Not Online: "bg-gray-200" -->
                        <span
                            class="text-gray-400 flex-shrink-0 inline-block h-4 w-4 rounded-full"
                            aria-hidden="true"
                            data-value={option.value}
                        >
                            <svg
                                data-value={option.value}
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    data-value={option.value}
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                                />
                            </svg>
                        </span>
                        <div
                            class="flex flex-col ml-3 gap-1"
                            data-value={option.value}
                        >
                            <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                            <span
                                class="text-md font-normal text-gray-600 block"
                                data-value={option.value}
                            >
                                {option.name}
                            </span>
                            <span
                                data-value={option.value}
                                class="text-xs w-full normal-case font-normal text-gray-400"
                            >
                                {option.description}
                            </span>
                        </div>
                    </div>

                    <span
                        data-value={option.value}
                        class="absolute inset-y-0 right-0 flex items-center pr-4"
                    >
                        <!--
                        Checkmark, only display for selected option
                        -->
                        {#if _.includes(value, option.value)}
                            <svg
                                data-value={option.value}
                                xmlns="http://www.w3.org/2000/svg"
                                class="fill-current w-5 h-5 text-green-500 pointer-events-none svg-bounce"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        {:else}
                            <div
                                data-value={option.value}
                                date-activeOption={activeOption}
                                class="border-2 rounded-full border-gray-300 w-5 h-5 flex flex-shrink-0 justify-center items-center"
                            />
                        {/if}
                    </span>
                </li>
            {/each}
        </ul>
    {/if}
</div>
