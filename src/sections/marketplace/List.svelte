<script>
    import { onMount } from "svelte";
    import Search from "../../components/search/Search.svelte";
    import EmptyResult from "../../components/search/EmptyResult.svelte";
    import Blocks from "./Blocks.svelte";
    import EmptyImage from "./EmptyImage.svelte";
    import { nominalStackStore } from "./../../utils/store/Marketplace";

    const _ = require("lodash");

    let searchTerm = "";
    let images = $nominalStackStore;

    /**
     * Initialization on page load
     */
    onMount(async () => {});

    function search() {
        images = _.isArray(images)
            ? $nominalStackStore.filter((x) =>
                  _.lowerCase(x["@AppName"]).includes(_.lowerCase(searchTerm))
              )
            : [];
    }
</script>

<!-- Secondary column (hidden on smaller screens) -->
<aside class="w-1/4 bg-white shadow-sm lg:block">
    <Search on:termChange={search} bind:searchTerm />

    {#if _.isArray(images) && images.length > 0}
        <ul class="flex flex-col left-side menu gap-2 overflow-y-auto pb-2">
            {#each images as image}
                <Blocks {image} />
            {/each}
        </ul>
    {:else if searchTerm !== ""}
        <EmptyResult {searchTerm} />
    {:else}
        <EmptyImage />
    {/if}
</aside>
