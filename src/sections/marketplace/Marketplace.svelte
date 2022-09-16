<script>
    import { Route, meta } from "tinro";
    import { onMount } from "svelte";
    import List from "./List.svelte";
    import Main from "./Main.svelte";
    import Welcome from "./Welcome.svelte";
    import { fade, fly } from "svelte/transition";

    const route = meta();
    let isMounted = false;

    onMount(() => {
        if (
            typeof route.from !== "undefined" &&
            route.from.match(/\/stacks\//) !== null
        ) {
            setTimeout(() => {
                isMounted = true;
            }, 300);
        } else {
            isMounted = true;
        }
    });
</script>

<!-- Content area -->
{#if isMounted}
    <div
        in:fly={{ y: 200, duration: 200 }}
        class="flex-1 flex flex-col overflow-hidden bg-gray-100"
    >
        <!-- Main content -->
        <div class="flex-1 flex items-stretch overflow-hidden">
            <!-- Secondary column (hidden on smaller screens) -->
            <List />
            <Route path="/">
                <Welcome />
            </Route>
            <Route path="/:AppID" let:meta>
                <Main AppID={meta.params.AppID} />
            </Route>
        </div>
    </div>
{/if}
