<script>
    import { afterUpdate } from "svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    const _ = require("lodash");

    export let searchTerm = "";

    afterUpdate(
        _.debounce(() => {
            
            dispatch("termChange", {
                value: searchTerm,
            });
        }, 500)
    );
</script>

<div class="grid grid-cols-1 items-center">
    <form
        class="
        col-span-5
        w-full
        px-4
        min-h-serachHeight
        flex
        items-center
        "
        action="#"
        method="GET"
    >
        <label for="search-field" class="sr-only">Search all files</label>
        <div
            class="
            relative
            w-full
            text-csgray-400
            focus-within:text-csgray-600
        "
        >
            <div
                class="
            pointer-events-none
            absolute
            right-3
            top-1/2
            transform
            -translate-y-1/2
            "
            >
                <!-- Heroicon name: solid/search -->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
            <input
                bind:value={searchTerm}
                name="search-field"
                id="search-field"
                class="h-full w-full shadow-sm focus-within:shadow border-2 border-csgray-100 rounded-lg p-3 text-base text-csgray-800 dark:text-gray-500 placeholder-csgray-200 dark:placeholder-slate-50/[0.06] focus:outline-none focus:placeholder-csgray-400 appearance-none focus:ring-0 focus:border-blue-500 pr-9 dark:bg-slate-850"
                placeholder="Search"
                type="text"
            />
        </div>
    </form>
</div>
