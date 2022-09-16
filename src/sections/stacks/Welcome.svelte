<script>
    import { LottiePlayer } from "@lottiefiles/svelte-lottie-player";
</script>

<main class="flex flex-1  justify-center w-full">
    <!-- Primary column -->
    <!-- stack details -->
    <div class="flex h-screen overflow-y-auto">
        <div class="p-8 rounded-lg text-gray-700 m-auto">
            <div class="my-8 text-center">
                <h2 class="text-3xl font-medium text-gray-600 mb-3 italic leading-loose">Hola!</h2>
                <h3 class="text-lg font-semibold text-gray-400">
                    DECK is ready to spin-up stacks for your project
                </h3>
            </div>
            <div class="w-3/6 m-auto text-center">
                <LottiePlayer
                    src="https://assets9.lottiefiles.com/private_files/lf30_du7jspky.json"
                    autoplay={true}
                    loop={true}
                    controls={false}
                    renderer="svg"
                    controlsLayout={[]}
                />
            </div>
            <!-- <div class="my-8">
                    <h2 class="text-3xl font-bold text-gray-600 mb-3">Hi there!</h2>
                    <h3 class="text-lg font-semibold text-gray-400">
                        Thank you for trying out DECK, here is a few things you can
                        do
                    </h3>
                </div>
                <div class="grid grid-cols-1 gap-10 items-center">
                    <div class="">
                        <ul role="list" class="grid grid-cols-1 gap-6">
                            <li class="flow-root wel-list">
                                <div
                                    class="relative -m-2 p-2 flex items-center space-x-4 rounded-lg transition-all duration-500 ease-in-out hover:bg-white"
                                >
                                    <div
                                        class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg border-2 border-chillblue-400 text-chillblue-500"
                                    >
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
                                                d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3
                                            class="text-sm font-medium text-gray-900"
                                        >
                                            <a
                                                href="/#/"
                                                class="focus:outline-none hover:pl-2"
                                            >
                                                <span
                                                    class="absolute inset-0"
                                                    aria-hidden="true"
                                                />
                                                Create a dev environment<span
                                                    aria-hidden="true"
                                                    class=""
                                                >
                                                    &rarr;</span
                                                >
                                            </a>
                                        </h3>
                                        <p class="mt-1 text-sm text-gray-500">
                                            Another to-do system you’ll try but
                                            eventually give up on.
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li class="flow-root wel-list">
                                <div
                                    class="relative -m-2 p-2 flex items-center space-x-4 rounded-lg transition-all duration-500 ease-in-out hover:bg-white"
                                >
                                    <div
                                        class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg border-2 border-chillblue-400 text-chillblue-500"
                                    >
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
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3
                                            class="text-sm font-medium text-gray-900"
                                        >
                                            <a
                                                href="/#/"
                                                class="focus:outline-none"
                                            >
                                                <span
                                                    class="absolute inset-0"
                                                    aria-hidden="true"
                                                />
                                                Open an issue<span
                                                    aria-hidden="true"
                                                    class="right-arrow transition-all duration-500 ease-in-out"
                                                >
                                                    &rarr;</span
                                                >
                                            </a>
                                        </h3>
                                        <p class="mt-1 text-sm text-gray-500">
                                            Stay on top of your deadlines, or
                                            don’t — it’s up to you.
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li class="flow-root wel-list">
                                <div
                                    class="relative -m-2 p-2 flex items-center space-x-4 rounded-lg transition-all duration-500 ease-in-out hover:bg-white"
                                >
                                    <div
                                        class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg border-2 border-chillblue-400 text-chillblue-500"
                                    >
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
                                                d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3
                                            class="text-sm font-medium text-gray-900"
                                        >
                                            <a
                                                href="/#/"
                                                class="focus:outline-none hover:pl-2"
                                            >
                                                <span
                                                    class="absolute inset-0"
                                                    aria-hidden="true"
                                                />
                                                Share project publically<span
                                                    aria-hidden="true"
                                                    class=""
                                                >
                                                    &rarr;</span
                                                >
                                            </a>
                                        </h3>
                                        <p class="mt-1 text-sm text-gray-500">
                                            Another to-do system you’ll try but
                                            eventually give up on.
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li class="flow-root wel-list">
                                <div
                                    class="relative -m-2 p-2 flex items-center space-x-4 rounded-lg transition-all duration-500 ease-in-out hover:bg-white"
                                >
                                    <div
                                        class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg border-2 border-chillblue-400 text-chillblue-500"
                                    >
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
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3
                                            class="text-sm font-medium text-gray-900"
                                        >
                                            <a
                                                href="/#/"
                                                class="focus:outline-none"
                                            >
                                                <span
                                                    class="absolute inset-0"
                                                    aria-hidden="true"
                                                />
                                                Suggest an improvment<span
                                                    aria-hidden="true"
                                                    class="right-arrow transition-all duration-500 ease-in-out"
                                                >
                                                    &rarr;</span
                                                >
                                            </a>
                                        </h3>
                                        <p class="mt-1 text-sm text-gray-500">
                                            Stay on top of your deadlines, or
                                            don’t — it’s up to you.
                                        </p>
                                    </div>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                </div> -->
        </div>
    </div>
</main>
