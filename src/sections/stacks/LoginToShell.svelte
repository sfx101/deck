<script>
    import logIntoShell from "./../../utils/docker/Shell";
    export let containers, stack;
</script>

<div
    class="dropdown dropdown-hover custom-dropdown dropdown-end cursor-pointer"
>
    <div
        class="relative bg-chillindigo-200 p-4 shadow-sm rounded-lg overflow-hidden hover:bg-chillindigo-300 ease-transition"
    >
        <dt>
            <div class="absolute bg-chillindigo-400 rounded-lg p-2 right-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    class="h-6 w-6 text-chillindigo-900"
                    fill="currentColor"
                >
                    <path
                        fill="currentColor"
                        d="M257.981 272.971L63.638 467.314c-9.373 9.373-24.569 9.373-33.941 0L7.029 444.647c-9.357-9.357-9.375-24.522-.04-33.901L161.011 256 6.99 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L257.981 239.03c9.373 9.372 9.373 24.568 0 33.941zM640 456v-32c0-13.255-10.745-24-24-24H312c-13.255 0-24 10.745-24 24v32c0 13.255 10.745 24 24 24h304c13.255 0 24-10.745 24-24z"
                        clip-rule="evenodd"
                    />
                </svg>
            </div>
            <p class="mr-16 text-lg font-medium text-chillindigo-600 truncate">
                Shell
            </p>
        </dt>
        <dd class="flex items-baseline">
            <p class="text-xs text-chillindigo-600">
                Terminal access to containers
            </p>
        </dd>
    </div>
    <ul
        tabindex="0"
        class="text-sm text-chillgray-500 p-1 shadow menu dropdown-content bg-base-100 rounded-lg w-auto"
    >
        {#each containers as container}
            <li class="w-full group">
                <!-- svelte-ignore a11y-missing-attribute -->
                <a
                    on:click={() => {
                        logIntoShell(stack, container);
                    }}
                    class="inline-flex text-left text-sm group-hover:bg-blue-500 group-hover:text-white gap-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                        />
                    </svg>
                    {container}
                </a>
            </li>
        {/each}
    </ul>
</div>
