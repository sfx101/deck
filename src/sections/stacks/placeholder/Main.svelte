<script>
    export let selectedStack;
</script>

<section
    aria-labelledby="primary-heading"
    class="
            {selectedStack === false ? 'block' : 'hidden'}
            bg-gray-100
            h-full
            flex justify-center flex-wrap content-center
            overflow-hidden
        "
>
    <div class="text-center">
        <img
            class="mx-auto h-36 w-36 object-content"
            src="img/cute-sloth-skateboarding.png"
            alt="logo"
        />
        <h3 class="mt-2 text-sm font-medium text-gray-900">No projects</h3>
        <p class="mt-1 text-sm text-gray-500">
            Get started by creating a new project.
        </p>
        <div class="mt-6">
            <button
                type="button"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <!-- Heroicon name: solid/plus -->
                <svg
                    class="-ml-1 mr-2 h-5 w-5"
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
                New Project
            </button>
        </div>
    </div>
</section>
