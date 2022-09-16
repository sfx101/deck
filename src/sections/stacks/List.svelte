<script>
    import Search from "../../components/search/Search.svelte";
    import EmptyResult from "../../components/search/EmptyResult.svelte";
    import Blocks from "./Blocks.svelte";
    import EmptyStack from "./EmptyStack.svelte";
    import { nominalProjectStore } from "../../utils/store/Projects";

    const _ = require("lodash");

    let searchTerm = "";
    let stacks = [];

    $: stacks = search(searchTerm, $nominalProjectStore);

    /**
     *
     * @param searchTerm
     * @param nominalProjects
     * @description : Get the search result by passing search term and the array where need to search.
     *
     */
    function search(searchTerm, nominalProjects) {
        let returnData = [];
        if (_.isArray(nominalProjects)) {
            stacks = nominalProjects.filter((x) => {
                if (_.has(x, "COMPOSE_PROJECT_NAME")) {
                    return _.lowerCase(x.COMPOSE_PROJECT_NAME).includes(
                        _.lowerCase(searchTerm)
                    );
                } else {
                    return false;
                }
            });
            returnData = _.reverse([...stacks]);
        }
        return returnData;
    }
</script>

<!-- Secondary column (hidden on smaller screens) -->
<aside
    class="min-w-1/4 w-1/4 bg-white shadow-sm overflow-y-auto h-screen lg:block"
>
    {#if stacks.length > 0 || searchTerm !== ""}
        <Search on:termChange={search} bind:searchTerm />
    {/if}
    {#if stacks.length > 0}
        <ul class="flex flex-col left-side menu gap-2 overflow-y-auto pb-2">
            {#each stacks as stack}
                <Blocks {stack} />
            {/each}
        </ul>
    {:else if searchTerm !== ""}
        <EmptyResult {searchTerm} />
    {:else}
        <EmptyStack />
    {/if}
</aside>
