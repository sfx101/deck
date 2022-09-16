<script>
    /**
     * @author DECK Contributors
     * @description Docker engine setttings update page
     */
    import Editor from "./Editor.svelte";
    import Terminal from "./Terminal.svelte";
</script>

<main class="flex-1 overflow-y-auto h-screen">
    <section
        aria-labelledby="primary-heading"
        class="
            bg-gray-100
            min-w-0
            flex-1
            h-full
            flex flex-col
            relative
        "
    >
        <div
            class="flex flex-col gap-4 justify-center items-center py-12 container mx-auto"
        >
            <!-- Default Editor select -->
            <Editor />

            <!-- Default Terminal select -->
            <Terminal />
        </div>
    </section>
</main>
