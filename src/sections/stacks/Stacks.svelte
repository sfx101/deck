<script>
    import { Route } from "tinro";
    //Partials
    import List from "./List.svelte";
    import Main from "./Main.svelte";
    import Welcome from "./Welcome.svelte";
    import DeleteProject from "./DeleteProject.svelte";
    import { fade, fly } from "svelte/transition";
    import { onMount } from "svelte";
    let isMounted = false;

    onMount(() => {
        isMounted = true;
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
            <List />

            <Route path="/" let:meta>
                <Welcome />
            </Route>

            <Route path="/:projectName" let:meta>
                <Main projectName={meta.params.projectName} />
            </Route>

            <!-- <Route path="/delete/:projectName" let:meta>
            <DeleteProject projectName={meta.params.projectName} />
        </Route> -->
        </div>
    </div>
{/if}
