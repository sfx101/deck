<script>
    import { router } from "tinro";
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
    <div class="text-center h-full flex flex-col items-center justify-center">
        <img src="img/welcome-new.png" class="mx-auto w-24" alt="" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">No projects</h3>
        <p class="mt-1 text-sm text-gray-500">
            Get started by creating a new project.
        </p>
        <div class="mt-3">
            <button
                on:click={() => {
                    router.goto("/marketplace");
                }}
                type="button"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-0"
            >
                <!-- Heroicon name: solid/plus -->
                <svg
                    class="-ml-1 mr-1 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clip-rule="evenodd"
                    />
                </svg>
                New project
            </button>
        </div>
    </div>
