<script>
    import { createEventDispatcher } from "svelte";
    export let showPasswordPrompt;
    
    let password = "";
    const dispatch = createEventDispatcher();

    function sharePassword() {
        dispatch("password", {
            text: password,
        });
    }
</script>

<!-- Password modal -->
{#if showPasswordPrompt}
<div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
>
    <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
        <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
            >&#8203;</span
        >

        <div
            class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
        >
            <div class="w-full">
                <div
                    class="flex flex-col mt-3 text-center sm:mt-0 sm:text-left gap-2"
                >
                    <h3
                        class="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                    >
                        Root priviledges are required
                    </h3>
                    <p class="text-gray-400 text-xs">
                        Enter your password to continue
                    </p>
                    <div class="">
                        <form on:submit|preventDefault="{sharePassword}">
                            <div class="py-2">
                                <div class="grid grid-cols-2 gap-6">
                                    <div class="col-span-12">
                                        <div class="mt-1 form-control relative">
                                            <input
                                                autofocus
                                                bind:value={password}
                                                type="password"
                                                name="password"
                                                class="input input-bordered h-10 pr-10 focus:ring-0 text-gray-700 shadow-sm block w-full sm:text-sm border-gray-300 rounded-md"
                                                placeholder="Password"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="mt-5 sm:mt-4 flex w-full justify-between">
                <span class="flex justify-center items-center">
                    <svg
                        class="animate-spin mr-3 h-5 w-5 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                        />
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <span class="text-gray-500 text-xs"
                        >Waiting for input ...</span
                    >
                </span>
                <button
                    on:click={sharePassword}
                    type="button"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                    Proceed
                </button>
            </div>
        </div>
    </div>
</div>
{/if}
