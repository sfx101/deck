<script>
    import { onMount } from "svelte";

    export let inputObject;
    export let error;
    export let value = false;
    export let show = true;

    onMount(() => {
        value = inputObject.value;
    });
</script>

{#if show === true}
    <div class="p-4 bg-white rounded-lg flex flex-col justify-center">
        <div class="flex-shrink-0 card rounded-none">
            <div class="form-control">
                <label class="cursor-pointer label p-0 grid grid-cols-4">
                    <span
                        class="
                              col-span-3
                              label-text
                              text-xs text-gray-400
                              "
                    >
                        {inputObject.label}
                    </span>
                    <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
                    <button
                        on:click={() => (value = !value)}
                        type="button"
                        class="{value
                            ? 'bg-azure-600'
                            : 'bg-gray-200'} col-span-1 justify-self-end relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-0"
                        role="switch"
                        aria-checked="false"
                    >
                        <span class="sr-only">Use setting</span>
                        <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                        <span
                            class="{value
                                ? 'translate-x-5'
                                : 'translate-x-0'}  pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        >
                            <!-- Enabled: "opacity-0 ease-out duration-100", Not Enabled: "opacity-100 ease-in duration-200" -->
                            <span
                                class="{value
                                    ? 'opacity-0 ease-out duration-100'
                                    : 'opacity-100 ease-in duration-200'}  absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                aria-hidden="true"
                            >
                                <svg
                                    class="h-3 w-3 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 12 12"
                                >
                                    <path
                                        d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </span>
                            <!-- Enabled: "opacity-100 ease-in duration-200", Not Enabled: "opacity-0 ease-out duration-100" -->
                            <span
                                class="{value
                                    ? 'opacity-100 ease-in duration-200'
                                    : 'opacity-0 ease-out duration-100'} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                aria-hidden="true"
                            >
                                <svg
                                    class="h-3 w-3 text-azure-600"
                                    fill="currentColor"
                                    viewBox="0 0 12 12"
                                >
                                    <path
                                        d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
                                    />
                                </svg>
                            </span>
                        </span>
                    </button>
                </label>
                {#if error}<p class="mt-2 text-red-500 text-xs">{error}</p>{/if}
            </div>
        </div>
    </div>
{/if}
