<script>
    let value = false;
    let value2 = false;
    let value3 = false;
    let value4 = false;
</script>

<!-- Content area -->
<div class="flex-1 flex flex-col overflow-hidden bg-gray-100">
    <!-- Main content -->
    <div class="flex-1 flex items-stretch overflow-hidden">
        <!-- Secondary column (hidden on smaller screens) -->
        <aside class="w-1/4 bg-white shadow-smblock">
            <div class="grid grid-cols-1 items-center">
                <form
                    class="col-span-5 w-full px-4 min-h-serachHeight flex items-center"
                    action="#"
                    method="GET"
                >
                    <label for="search-field" class="sr-only"
                        >Search all files</label
                    >
                    <div
                        class="relative w-full text-gray-400 focus-within:text-gray-600"
                    >
                        <div
                            class="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                            <!-- Heroicon name: solid/search -->
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
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            name="search-field"
                            id="search-field"
                            class="h-full w-full shadow-sm focus-within:shadow border border-gray-100 rounded-lg p-3 text-base text-gray-900 placeholder-gray-200 focus:outline-none focus:ring-0 focus:border-indigo-500 focus:placeholder-gray-400 appearance-none"
                            placeholder="Search"
                            type="text"
                        />
                    </div>
                </form>
            </div>
            <div class="overflow-y-auto h-3/6">
                <ul class="flex menu gap-2">
                    <li class="cursor-pointer group">
                        <div class="px-4">
                            <div
                                class="select-none flex flex-1 items-center p-2 rounded-lg gap-0.5 hover:bg-chillgray-100"
                            >
                                <span
                                    class="inline-block relative border bg-white rounded-lg p-1.5 shadow-xs"
                                >
                                    <img
                                        class="h-4 w-4 object-cover"
                                        src="img/laravel-logo.png"
                                        alt=""
                                    />
                                </span>
                                <div class="flex-1 ml-2">
                                    <div class="grid grid-cols-5">
                                        <span
                                            class="col-span-3 label-text grid grid-cols-12 gap-0.5 items-center"
                                        >
                                            <span
                                                class="col-span-12 text-sm font-medium text-gray-700 truncate"
                                            >
                                                Laravel app
                                            </span>
                                        </span>

                                        <span
                                            class="flex items-center justify-self-end"
                                        >
                                            <div
                                                class="relative tooltip-hover group"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="h-5 w-5 text-gray-300 hover:text-gray-600"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                                                    />
                                                    <path
                                                        d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
                                                    />
                                                </svg>
                                                <div
                                                    class="absolute bottom-0 h-8 -left-2.5 hidden top-2/4 transform -translate-y-1/2 -translate-x-full group-hover:block text-center"
                                                >
                                                    <div class="relative">
                                                        <span
                                                            class="z-10 p-2 text-xs leading-none bg-white font-medium text-gray-700 rounded whitespace-pre block relative"
                                                            >Copy stack ID</span
                                                        >
                                                        <div
                                                            class="absolute w-3 h-3 -mr-1 right-0 top-2/4 transform -translate-y-1/2 rotate-45 bg-white"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </span>
                                        <label
                                            class="cursor-pointer label justify-self-end"
                                        >
                                            <button
                                                on:click={() =>
                                                    (value = !value)}
                                                type="button"
                                                class="{value
                                                    ? 'bg-azure-600'
                                                    : 'bg-gray-200'} relative justify-self-end col-span-1 inline-flex flex-shrink-0 h-4 w-7 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-0"
                                                role="switch"
                                                aria-checked="false"
                                            >
                                                <span class="sr-only"
                                                    >Use setting</span
                                                >
                                                <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                                                <span
                                                    class="{value
                                                        ? 'translate-x-3'
                                                        : 'translate-x-0'}  pointer-events-none relative inline-block h-3 w-3 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                                >
                                                    <!-- Enabled: "opacity-0 ease-out duration-100", Not Enabled: "opacity-100 ease-in duration-200" -->
                                                    <span
                                                        class="{value
                                                            ? 'opacity-0 ease-out duration-100'
                                                            : 'opacity-100 ease-in duration-200'}  absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                                        aria-hidden="true"
                                                    >
                                                        <svg
                                                            class="h-2 w-2 text-gray-400"
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
                                                            class="h-2 w-2 text-azure-600"
                                                            fill="currentColor"
                                                            viewBox="0 0 12 12"
                                                        >
                                                            <path
                                                                d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
                                                            />
                                                        </svg>
                                                    </span>
                                                </span></button
                                            >
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="cursor-pointer group">
                        <div class="px-4">
                            <div
                                class="select-none flex flex-1 items-center p-2 gap-0.5 hover:bg-chillgray-100 rounded-lg"
                            >
                                <span
                                    class="inline-block relative border bg-white rounded-lg p-1.5 shadow-xs"
                                >
                                    <img
                                        class="h-4 w-4 object-cover"
                                        src="img/docktober-logo.png"
                                        alt=""
                                    />
                                </span>
                                <div class="flex-1 ml-2">
                                    <label class="cursor-pointer label">
                                        <span
                                            class="label-tex text-sm font-medium text-gray-700 truncate"
                                            >Ocktober App</span
                                        >
                                        <button
                                            on:click={() => (value2 = !value2)}
                                            type="button"
                                            class="{value2
                                                ? 'bg-azure-600'
                                                : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-4 w-7 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-0"
                                            role="switch"
                                            aria-checked="false"
                                        >
                                            <span class="sr-only"
                                                >Use setting</span
                                            >
                                            <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                                            <span
                                                class="{value2
                                                    ? 'translate-x-3'
                                                    : 'translate-x-0'}  pointer-events-none relative inline-block h-3 w-3 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                            >
                                                <!-- Enabled: "opacity-0 ease-out duration-100", Not Enabled: "opacity-100 ease-in duration-200" -->
                                                <span
                                                    class="{value2
                                                        ? 'opacity-0 ease-out duration-100'
                                                        : 'opacity-100 ease-in duration-200'}  absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                                    aria-hidden="true"
                                                >
                                                    <svg
                                                        class="h-2 w-2 text-gray-400"
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
                                                    class="{value2
                                                        ? 'opacity-100 ease-in duration-200'
                                                        : 'opacity-0 ease-out duration-100'} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                                    aria-hidden="true"
                                                >
                                                    <svg
                                                        class="h-2 w-2 text-azure-600"
                                                        fill="currentColor"
                                                        viewBox="0 0 12 12"
                                                    >
                                                        <path
                                                            d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
                                                        />
                                                    </svg>
                                                </span>
                                            </span></button
                                        >
                                    </label>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="cursor-pointer group">
                        <div class="px-4">
                            <div
                                class="select-none flex flex-1 items-center p-2 gap-0.5 hover:bg-chillgray-100 rounded-lg"
                            >
                                <span
                                    class="inline-block relative border bg-white rounded-lg p-1.5 shadow-xs"
                                >
                                    <img
                                        class="h-4 w-4 object-cover"
                                        src="img/magento-logo.png"
                                        alt=""
                                    />
                                </span>
                                <div class="flex-1 ml-2">
                                    <label class="cursor-pointer label">
                                        <span
                                            class="label-text text-sm font-medium text-gray-700 truncate"
                                            >Magento app</span
                                        >
                                        <button
                                            on:click={() => (value3 = !value3)}
                                            type="button"
                                            class="{value3
                                                ? 'bg-azure-600'
                                                : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-4 w-7 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-0"
                                            role="switch"
                                            aria-checked="false"
                                        >
                                            <span class="sr-only"
                                                >Use setting</span
                                            >
                                            <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                                            <span
                                                class="{value3
                                                    ? 'translate-x-3'
                                                    : 'translate-x-0'}  pointer-events-none relative inline-block h-3 w-3 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                            >
                                                <!-- Enabled: "opacity-0 ease-out duration-100", Not Enabled: "opacity-100 ease-in duration-200" -->
                                                <span
                                                    class="{value3
                                                        ? 'opacity-0 ease-out duration-100'
                                                        : 'opacity-100 ease-in duration-200'}  absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                                    aria-hidden="true"
                                                >
                                                    <svg
                                                        class="h-2 w-2 text-gray-400"
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
                                                    class="{value3
                                                        ? 'opacity-100 ease-in duration-200'
                                                        : 'opacity-0 ease-out duration-100'} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                                    aria-hidden="true"
                                                >
                                                    <svg
                                                        class="h-2 w-2 text-azure-600"
                                                        fill="currentColor"
                                                        viewBox="0 0 12 12"
                                                    >
                                                        <path
                                                            d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
                                                        />
                                                    </svg>
                                                </span>
                                            </span></button
                                        >
                                    </label>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="cursor-pointer group">
                        <div class="px-4">
                            <div
                                class="select-none flex flex-1 items-center p-2 gap-0.5 hover:bg-chillgray-100 rounded-lg"
                            >
                                <span
                                    class="inline-block relative border bg-white rounded-lg p-1.5 shadow-xs"
                                >
                                    <img
                                        class="h-4 w-4 object-cover"
                                        src="img/elk-logo.png"
                                        alt=""
                                    />
                                </span>
                                <div class="flex-1 ml-2">
                                    <label class="cursor-pointer label">
                                        <span
                                            class="label-text text-sm font-medium text-gray-700 truncate"
                                            >ELK Stack App</span
                                        >
                                        <button
                                            on:click={() => (value4 = !value4)}
                                            type="button"
                                            class="{value4
                                                ? 'bg-azure-600'
                                                : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-4 w-7 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-0"
                                            role="switch"
                                            aria-checked="false"
                                        >
                                            <span class="sr-only"
                                                >Use setting</span
                                            >
                                            <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                                            <span
                                                class="{value4
                                                    ? 'translate-x-3'
                                                    : 'translate-x-0'}  pointer-events-none relative inline-block h-3 w-3 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                            >
                                                <!-- Enabled: "opacity-0 ease-out duration-100", Not Enabled: "opacity-100 ease-in duration-200" -->
                                                <span
                                                    class="{value4
                                                        ? 'opacity-0 ease-out duration-100'
                                                        : 'opacity-100 ease-in duration-200'}  absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                                    aria-hidden="true"
                                                >
                                                    <svg
                                                        class="h-2 w-2 text-gray-400"
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
                                                    class="{value4
                                                        ? 'opacity-100 ease-in duration-200'
                                                        : 'opacity-0 ease-out duration-100'} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                                    aria-hidden="true"
                                                >
                                                    <svg
                                                        class="h-2 w-2 text-azure-600"
                                                        fill="currentColor"
                                                        viewBox="0 0 12 12"
                                                    >
                                                        <path
                                                            d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
                                                        />
                                                    </svg>
                                                </span>
                                            </span></button
                                        >
                                    </label>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="cursor-pointer group">
                        <div class="px-4">
                            <div
                                class="select-none flex flex-1 items-center p-2 rounded-lg gap-0.5 hover:bg-chillgray-100"
                            >
                                <span
                                    class="inline-block relative border bg-white rounded-lg p-1.5 shadow-xs"
                                >
                                    <img
                                        class="h-4 w-4 object-cover"
                                        src="img/laravel-logo.png"
                                        alt=""
                                    />
                                </span>
                                <div class="flex-1 ml-2">
                                    <div class="grid grid-cols-5">
                                        <span
                                            class="col-span-3 label-text grid grid-cols-12 gap-0.5 items-center"
                                        >
                                            <span
                                                class="col-span-12 text-sm font-medium text-gray-700 truncate"
                                            >
                                                Laravel app
                                            </span>
                                        </span>

                                        <span
                                            class="flex items-center justify-self-end"
                                        >
                                            <div
                                                class="relative tooltip-hover group"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="h-5 w-5 text-gray-300 hover:text-gray-600"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                                                    />
                                                    <path
                                                        d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
                                                    />
                                                </svg>
                                                <div
                                                    class="absolute bottom-0 h-8 -left-2.5 hidden top-2/4 transform -translate-y-1/2 -translate-x-full group-hover:block text-center"
                                                >
                                                    <div class="relative">
                                                        <span
                                                            class="z-10 p-2 text-xs leading-none bg-white font-medium text-gray-700 rounded whitespace-pre block relative"
                                                            >Copy stack ID</span
                                                        >
                                                        <div
                                                            class="absolute w-3 h-3 -mr-1 right-0 top-2/4 transform -translate-y-1/2 rotate-45 bg-white"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </span>
                                        <label
                                            class="cursor-pointer label justify-self-end"
                                        >
                                            <button
                                                on:click={() =>
                                                    (value = !value)}
                                                type="button"
                                                class="{value
                                                    ? 'bg-azure-600'
                                                    : 'bg-gray-200'} relative justify-self-end col-span-1 inline-flex flex-shrink-0 h-4 w-7 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-0"
                                                role="switch"
                                                aria-checked="false"
                                            >
                                                <span class="sr-only"
                                                    >Use setting</span
                                                >
                                                <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                                                <span
                                                    class="{value
                                                        ? 'translate-x-3'
                                                        : 'translate-x-0'}  pointer-events-none relative inline-block h-3 w-3 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                                >
                                                    <!-- Enabled: "opacity-0 ease-out duration-100", Not Enabled: "opacity-100 ease-in duration-200" -->
                                                    <span
                                                        class="{value
                                                            ? 'opacity-0 ease-out duration-100'
                                                            : 'opacity-100 ease-in duration-200'}  absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                                        aria-hidden="true"
                                                    >
                                                        <svg
                                                            class="h-2 w-2 text-gray-400"
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
                                                            class="h-2 w-2 text-azure-600"
                                                            fill="currentColor"
                                                            viewBox="0 0 12 12"
                                                        >
                                                            <path
                                                                d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
                                                            />
                                                        </svg>
                                                    </span>
                                                </span></button
                                            >
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="cursor-pointer group">
                        <div class="px-4">
                            <div
                                class="select-none flex flex-1 items-center p-2 gap-0.5 hover:bg-chillgray-100 rounded-lg"
                            >
                                <span
                                    class="inline-block relative border bg-white rounded-lg p-1.5 shadow-xs"
                                >
                                    <img
                                        class="h-4 w-4 object-cover"
                                        src="img/docktober-logo.png"
                                        alt=""
                                    />
                                </span>
                                <div class="flex-1 ml-2">
                                    <label class="cursor-pointer label">
                                        <span
                                            class="label-tex text-sm font-medium text-gray-700 truncate"
                                            >Ocktober App</span
                                        >
                                        <button
                                            on:click={() => (value2 = !value2)}
                                            type="button"
                                            class="{value2
                                                ? 'bg-azure-600'
                                                : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-4 w-7 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-0"
                                            role="switch"
                                            aria-checked="false"
                                        >
                                            <span class="sr-only"
                                                >Use setting</span
                                            >
                                            <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                                            <span
                                                class="{value2
                                                    ? 'translate-x-3'
                                                    : 'translate-x-0'}  pointer-events-none relative inline-block h-3 w-3 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                            >
                                                <!-- Enabled: "opacity-0 ease-out duration-100", Not Enabled: "opacity-100 ease-in duration-200" -->
                                                <span
                                                    class="{value2
                                                        ? 'opacity-0 ease-out duration-100'
                                                        : 'opacity-100 ease-in duration-200'}  absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                                    aria-hidden="true"
                                                >
                                                    <svg
                                                        class="h-2 w-2 text-gray-400"
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
                                                    class="{value2
                                                        ? 'opacity-100 ease-in duration-200'
                                                        : 'opacity-0 ease-out duration-100'} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                                    aria-hidden="true"
                                                >
                                                    <svg
                                                        class="h-2 w-2 text-azure-600"
                                                        fill="currentColor"
                                                        viewBox="0 0 12 12"
                                                    >
                                                        <path
                                                            d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
                                                        />
                                                    </svg>
                                                </span>
                                            </span></button
                                        >
                                    </label>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="cursor-pointer group">
                        <div class="px-4">
                            <div
                                class="select-none flex flex-1 items-center p-2 gap-0.5 hover:bg-chillgray-100 rounded-lg"
                            >
                                <span
                                    class="inline-block relative border bg-white rounded-lg p-1.5 shadow-xs"
                                >
                                    <img
                                        class="h-4 w-4 object-cover"
                                        src="img/magento-logo.png"
                                        alt=""
                                    />
                                </span>
                                <div class="flex-1 ml-2">
                                    <label class="cursor-pointer label">
                                        <span
                                            class="label-text text-sm font-medium text-gray-700 truncate"
                                            >Magento app</span
                                        >
                                        <button
                                            on:click={() => (value3 = !value3)}
                                            type="button"
                                            class="{value3
                                                ? 'bg-azure-600'
                                                : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-4 w-7 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-0"
                                            role="switch"
                                            aria-checked="false"
                                        >
                                            <span class="sr-only"
                                                >Use setting</span
                                            >
                                            <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                                            <span
                                                class="{value3
                                                    ? 'translate-x-3'
                                                    : 'translate-x-0'}  pointer-events-none relative inline-block h-3 w-3 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                            >
                                                <!-- Enabled: "opacity-0 ease-out duration-100", Not Enabled: "opacity-100 ease-in duration-200" -->
                                                <span
                                                    class="{value3
                                                        ? 'opacity-0 ease-out duration-100'
                                                        : 'opacity-100 ease-in duration-200'}  absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                                    aria-hidden="true"
                                                >
                                                    <svg
                                                        class="h-2 w-2 text-gray-400"
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
                                                    class="{value3
                                                        ? 'opacity-100 ease-in duration-200'
                                                        : 'opacity-0 ease-out duration-100'} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                                    aria-hidden="true"
                                                >
                                                    <svg
                                                        class="h-2 w-2 text-azure-600"
                                                        fill="currentColor"
                                                        viewBox="0 0 12 12"
                                                    >
                                                        <path
                                                            d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
                                                        />
                                                    </svg>
                                                </span>
                                            </span></button
                                        >
                                    </label>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="cursor-pointer group">
                        <div class="px-4">
                            <div
                                class="select-none flex flex-1 items-center p-2 gap-0.5 hover:bg-chillgray-100 rounded-lg"
                            >
                                <span
                                    class="inline-block relative border bg-white rounded-lg p-1.5 shadow-xs"
                                >
                                    <img
                                        class="h-4 w-4 object-cover"
                                        src="img/elk-logo.png"
                                        alt=""
                                    />
                                </span>
                                <div class="flex-1 ml-2">
                                    <label class="cursor-pointer label">
                                        <span
                                            class="label-text text-sm font-medium text-gray-700 truncate"
                                            >ELK Stack App</span
                                        >
                                        <button
                                            on:click={() => (value4 = !value4)}
                                            type="button"
                                            class="{value4
                                                ? 'bg-azure-600'
                                                : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-4 w-7 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-0"
                                            role="switch"
                                            aria-checked="false"
                                        >
                                            <span class="sr-only"
                                                >Use setting</span
                                            >
                                            <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                                            <span
                                                class="{value4
                                                    ? 'translate-x-3'
                                                    : 'translate-x-0'}  pointer-events-none relative inline-block h-3 w-3 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                            >
                                                <!-- Enabled: "opacity-0 ease-out duration-100", Not Enabled: "opacity-100 ease-in duration-200" -->
                                                <span
                                                    class="{value4
                                                        ? 'opacity-0 ease-out duration-100'
                                                        : 'opacity-100 ease-in duration-200'}  absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                                    aria-hidden="true"
                                                >
                                                    <svg
                                                        class="h-2 w-2 text-gray-400"
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
                                                    class="{value4
                                                        ? 'opacity-100 ease-in duration-200'
                                                        : 'opacity-0 ease-out duration-100'} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                                                    aria-hidden="true"
                                                >
                                                    <svg
                                                        class="h-2 w-2 text-azure-600"
                                                        fill="currentColor"
                                                        viewBox="0 0 12 12"
                                                    >
                                                        <path
                                                            d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
                                                        />
                                                    </svg>
                                                </span>
                                            </span></button
                                        >
                                    </label>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="h-1/3 relative">
                <div class="p-4 absolute w-full bottom-0">
                    <div
                        class="w-full mx-auto rounded-lg bg-orange-100 pt-4 pb-2 px-4 text-gray-800"
                    >
                        <div class="w-full flex flex-col-reverse items-end">
                            <div
                                class="flex overflow-hidden rounded-full w-8 h-8 items-center"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-8 w-8 text-pumpkin-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            </div>

                            <div class="flex text-left">
                                <p class="text-xs">
                                    Lorem, ipsum dolor sit amet consectetur
                                    adipisicing elit. Nam obcaecati laudantium
                                    recusandae, debitis eum voluptatem ad, illo
                                    voluptatibus temporibus odio provident.
                                    Laboriosam accusamus necessitatibus tenetur
                                    praesentium ullam voluptates nulla
                                    reprehenderit? &#128640;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>

        <main class="flex-1 overflow-y-auto">
            <!-- Primary column -->
            <section
                aria-labelledby="primary-heading"
                class="
                bg-gray-100
                min-w-0
                flex-1
                h-full
                flex flex-col
                relative
                overflow-hidden
            "
            >
                <!-- stack header -->
                <div class="bg-gray-50 py-4 px-6">
                    <div
                        class="w-full mx-auto flex items-center justify-between"
                    >
                        <div class="flex items-center space-x-5">
                            <div class="flex-shrink-0">
                                <span
                                    class="inline-block relative rounded-lg indicator"
                                >
                                    <img
                                        class="h-32 w-32 object-cover"
                                        src="img/astronaut-rocket.png"
                                        alt=""
                                    />
                                </span>
                            </div>
                            <div class="flex flex-col justify-center">
                                <span class="flex flex-row gap-2 items-center">
                                    <h1
                                        class="text-lg font-semibold text-gray-700 subpixel-antialiased"
                                    >
                                        DECK Flights
                                    </h1>
                                </span>
                                <p class="text-xs text-gray-500 mb-1 pr-3">
                                    Preview co-worker's stack remotely on your
                                    system, enter their Stack ID below and click
                                    "Preview"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- stack details -->
                <div class="p-6 mb-8 overflow-y-auto rounded-md">
                    <!-- Open co-worker's stack -->
                    <div class="bg-gray-50 p-6 rounded-lg">
                        <div class="grid grid-cols-2 gap-6 items-start">
                            <div class="col-span-1">
                                <div class="">
                                    <p
                                        class="block text-sm font-medium text-gray-700 pb-2 mb-6 border-b border-gray-200"
                                    >
                                        Open Stack from friend
                                    </p>
                                </div>
                                <div class="mt-0">
                                    <form>
                                        <span
                                            class="text-gray-500 text-xs mb-2 block leading-6"
                                            >Your friend needs to enable Flights
                                            on stack settings and share you the
                                            stack ID</span
                                        >
                                        <div class="flex rounded-md mb-2">
                                            <span
                                                class=" inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-gray-500 sm:text-sm"
                                            >
                                                https://
                                            </span>
                                            <div class="w-full form-control">
                                                <input
                                                    type="text"
                                                    placeholder=""
                                                    value="example.stacks.run"
                                                    class="input input-bordered rounded-r-md rounded-none focus:ring-0 focus:border-indigo-500 h-10"
                                                />
                                            </div>
                                        </div>
                                        <div class="">
                                            <button
                                                class="rounded-full btn btn-md btn-primary mt-2"
                                                >Preview</button
                                            >
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="col-span-1">
                                <p
                                    class="block text-sm font-medium text-gray-700 pb-2 mb-6 border-b border-gray-200"
                                >
                                    You are previewing
                                </p>
                                <div>
                                    <ul class="grid gap-4">
                                        <li>
                                            <div>
                                                <div
                                                    class="select-none flex flex-1 items-center p-2 rounded-lg gap-1 bg-chillgray-100"
                                                >
                                                    <span
                                                        class="inline-flex bottom-0 right-0 h-4 w-4 bg-green-100 rounded-full items-center justify-center"
                                                        aria-hidden="true"
                                                    >
                                                        <span
                                                            class="bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full"
                                                        />
                                                    </span>
                                                    <div class="flex-1 mx-2">
                                                        <div
                                                            class="text-sm font-medium text-gray-700 truncate"
                                                        >
                                                            example-laravel.stacks.run
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="text-gray-600 dark:text-gray-200 text-xs"
                                                    >
                                                        <p
                                                            class="flex items-center text-sm text-gray-500"
                                                        >
                                                            <button
                                                                class="text-right flex justify-end"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    class="h-6 w-6 mr-1.5 text-coral-500 hover:text-coral-600"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                                                                        clip-rule="evenodd"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <div
                                                    class="select-none flex flex-1 items-center p-2 rounded-lg gap-1 bg-chillgray-100"
                                                >
                                                    <span
                                                        class="inline-flex bottom-0 right-0 h-4 w-4 bg-green-100 rounded-full items-center justify-center"
                                                        aria-hidden="true"
                                                    >
                                                        <span
                                                            class="bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full"
                                                        />
                                                    </span>
                                                    <div class="flex-1 mx-2">
                                                        <div
                                                            class="text-sm font-medium text-gray-700 truncate"
                                                        >
                                                            example2-laravel.stacks.run
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="text-gray-600 dark:text-gray-200 text-xs"
                                                    >
                                                        <p
                                                            class="flex items-center text-sm text-gray-500"
                                                        >
                                                            <button
                                                                class="text-right flex justify-end"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    class="h-6 w-6 mr-1.5 text-coral-500 hover:text-coral-600"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                                                                        clip-rule="evenodd"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</div>
