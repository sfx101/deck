<script>
    import { Route, meta } from "tinro";
    //Partials
    import Options from "./Options.svelte";
    import DockerEngine from "./DockerEngine.svelte";
    import Troubleshoot from "./Troubleshoot.svelte";
    import Integrations from "./Integrations.svelte";
    import { fly } from "svelte/transition";
    import { onMount } from "svelte";

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
            <Options />
            <Route path="/" redirect="/settings/integrations" />
            <Route path="/docker-engine">
                <DockerEngine />
            </Route>
            <Route path="/troubleshoot">
                <Troubleshoot />
            </Route>
            <Route path="/integrations">
                <Integrations />
            </Route>
        </div>
    </div>
{/if}
