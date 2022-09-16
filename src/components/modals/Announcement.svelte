<script>
    import _ from "lodash";
    import { createEventDispatcher } from "svelte";
    import { LottiePlayer } from "@lottiefiles/svelte-lottie-player";
    import {
        updateAnnouncementView,
        isJson,
    } from "./../../utils/Announcements";

    export let openAnnouncements = false;
    export let id = false;
    export let title = "";
    export let html = "";
    export let artwork = false;
    export let artworkColor = "green-300";

    export let canNext = false;
    export let canPrevious = false;

    // Event Dispatcher
    const dispatch = createEventDispatcher();

    $: updateAnnouncementView(id);

    /**
     * Previous announcements show
     */
    function previous() {
        dispatch("previous", {
            code: 1,
        });
    }

    /**
     * Next announcements show
     */
    function next() {
        dispatch("next", {
            code: 1,
        });
    }

    /**
     * Close announcements model
     */
    function close() {
        openAnnouncements = false;
        dispatch("close", {
            code: 1,
            data: openAnnouncements,
        });
    }
</script>

{#if openAnnouncements && id != false}
    <div
        class="fixed z-30 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
        <div
            class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
            <div
                class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
            />

            <span
                class="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true">&#8203;</span
            >
            <div
                class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
                <div
                    class="mx-auto flex items-center justify-center sm:p-6"
                    style="background-color: {artworkColor};"
                >
                    {#if artwork}
                        {#if isJson(artwork)}
                            <!-- If file type image then image tag or lottie then  LottiePlayer -->
                            <LottiePlayer
                                src={artwork}
                                autoplay={true}
                                loop={true}
                                controls={false}
                                renderer="svg"
                                background=""
                                height={300}
                                width={300}
                                controlsLayout={[]}
                            />
                        {:else}
                            <!-- If file type image then image tag or lottie then  LottiePlayer -->
                            <img src={artwork} height={300} width={300} />
                        {/if}
                    {:else}
                        <!-- If file type image then image tag or lottie then  LottiePlayer -->
                        <LottiePlayer
                            src="https://assets2.lottiefiles.com/packages/lf20_iwlmrnb5.json"
                            autoplay={true}
                            loop={true}
                            controls={false}
                            renderer="svg"
                            background=""
                            height={250}
                            width={250}
                            controlsLayout={[]}
                        />
                    {/if}
                </div>
                <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                    <button
                        on:click={close}
                        type="button"
                        class="bg-gray-100 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-0 opacity-60 hover:opacity-100"
                    >
                        <span class="sr-only">Close</span>
                        <svg
                            class="h-6 w-6"
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div class="px-4 pt-5 pb-4">
                    <div class="mt-3 text-center sm:mt-5">
                        <h3
                            class="text-lg leading-6 font-medium text-gray-900 text-left ml-2"
                            id="modal-title"
                        >
                            {@html title}
                        </h3>
                        <div class="m-2">
                            <p class="text-sm text-gray-500 text-left">
                                {@html html}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex justify-between px-4 pb-4">
                    <button
                        on:click={previous}
                        class="p-2 text-sm font-bold tracking-wide rounded-md border border-gray-300 hover:shadow-sm {canPrevious
                            ? 'bg-white'
                            : 'bg-chillgray-50 cursor-not-allowed'} text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <button
                        on:click={next}
                        class="p-2 text-sm font-bold tracking-wide rounded-md border border-gray-300 hover:shadow-sm {canNext
                            ? 'bg-white'
                            : 'bg-chillgray-50 cursor-not-allowed'} text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}
