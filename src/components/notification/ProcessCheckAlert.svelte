<script>
    import _ from "lodash";
    import { cmdProcess } from "./../../utils/store/Notification";

    /**
     * Close button click function
     */
    function closeAction(e) {
        $cmdProcess.show = false;
    }
</script>

{#if _.get($cmdProcess, "show", false) === true}
    <!-- This example requires Tailwind CSS v2.0+ -->
    <!-- Global notification live region, render this permanently at the end of the document -->
    <div
        aria-live="assertive"
        class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
    >
        <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
            <!--
        Notification panel, dynamically insert this into the live region when it needs to be displayed
  
        Entering: "transform ease-out duration-300 transition"
          From: "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          To: "translate-y-0 opacity-100 sm:translate-x-0"
        Leaving: "transition ease-in duration-100"
          From: "opacity-100"
          To: "opacity-0"
      -->
            <div
                class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
            >
                <div class="p-4">
                    <div class="flex items-start">
                        <div class="flex-shrink-0">
                            <!-- Heroicon name: outline/exclamation -->
                            <svg
                                class="h-6 w-6 text-red-600"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                        <div class="ml-3 w-0 flex-1 pt-0.5">
                            <p class="text-sm font-medium text-gray-900">
                                {_.get($cmdProcess, "title", "")}
                            </p>
                            <p class="mt-1 text-sm text-gray-500">
                                {_.get($cmdProcess, "description", "")}
                            </p>
                        </div>
                        <div class="ml-4 flex-shrink-0 flex">
                            {#if _.get($cmdProcess, "cancelButtonText", "")}
                                <button
                                    on:click={closeAction}
                                    class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <span class="sr-only"
                                        >{_.get(
                                            $cmdProcess,
                                            "cancelButtonText",
                                            ""
                                        )}</span
                                    >
                                    <!-- Heroicon name: solid/x -->
                                    <svg
                                        class="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </button>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}
