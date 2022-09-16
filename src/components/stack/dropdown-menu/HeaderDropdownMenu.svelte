<script>
    import { clickOutside } from "./../../../utils/ClickOutside";
    let isMenuDisplay = false;

    function showHideMenu() {
        isMenuDisplay = isMenuDisplay ? false : true;
    }

    function handleClickOutside(event) {
        isMenuDisplay = false;
    }
</script>

<div class="inline-flex items-center custom-dropdown dropdown dropdown-end">
    <div class="relative inline-block text-left">
        <div>
            <button
                on:click={showHideMenu}
                class="w-auto py-2 text-xs focus:outline-none transition-colors duration-200 rounded-full font-semibold"
            >
                <span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 text-chillgray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                    </svg>
                </span>
            </button>
        </div>
        {#if isMenuDisplay}
            <div
                use:clickOutside
                on:click_outside={handleClickOutside}
                class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white focus:outline-none z-10"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabindex="-1"
            >
                <div class="p-1" role="none">
                    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                    <a
                        href="/#/"
                        class="text-chillgray-500 group flex items-center px-4 py-2 text-sm hover:bg-chillgray-100 rounded-md"
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-0"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="mr-3 h-5 w-5 text-chillgray-400 group-hover:text-chillgray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                                clip-rule="evenodd"
                            />
                            <path
                                d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
                            />
                        </svg>
                        Open project
                    </a>
                    <a
                        href="/#/"
                        class="text-chillgray-500 group flex items-center px-4 py-2 text-sm hover:bg-chillgray-100 rounded-md"
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-1"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="mr-3 h-5 w-5 text-chillgray-400 group-hover:text-chillgray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        Documentation
                    </a>
                    <a
                        href="/#/"
                        class="text-chillgray-500 group flex items-center px-4 py-2 text-sm hover:bg-chillgray-100 rounded-md"
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="mr-3 h-5 w-5 text-chillgray-400 group-hover:text-chillgray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                            />
                        </svg>
                        Enable flight
                    </a>
                    <a
                        href="/#/"
                        class="text-chillgray-500 group flex items-center px-4 py-2 text-sm hover:bg-chillgray-100 rounded-md"
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-3"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="mr-3 h-5 w-5 text-chillgray-400 group-hover:text-chillgray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        Open in terminal
                    </a>
                    <a
                        href="/#/"
                        class="text-chillgray-500 group flex items-center px-4 py-2 text-sm hover:bg-chillgray-100 rounded-md"
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-4"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="mr-3 h-5 w-5 text-chillgray-400 group-hover:text-chillgray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        Power off & destroy
                    </a>
                </div>
            </div>
        {/if}
    </div>
</div>
