<script>
    import { router, active } from "tinro";
</script>

<aside
    class="min-w-1/4 w-1/4 bg-white shadow-sm overflow-y-auto h-screen lg:block"
>
    <div class="overflow-y-auto">
        <ul class="flex flex-col left-side gap-2 overflow-y-auto py-16">
            <li class="cursor-pointer group px-4">
                <a
                    href="/#/settings/integrations"
                    use:active
                    active-class="bg-chillgray-100"
                    class="select-none flex flex-1 items-center p-2 rounded-lg gap-0.5 hover:bg-chillgray-100 ease-transition"
                >
                    <span
                        class="inline-block relative bg-white rounded-lg p-1.5 shadow-xs"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-azure-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                        <span class="absolute block items-center transform -translate-y-0 -translate-x-2.5 mx-1.5 px-1.5 py-0.5 rounded-full font-bold bg-chartreuse-200 text-chartreuse-900" style="font-size: .4rem;"> NEW </span>
                    </span>
                    <div class="flex-1 ml-2">
                        <div class="grid grid-cols-5">
                            <span
                                class="col-span-3 label-text grid grid-cols-12 gap-0.5 items-center"
                            >
                                <span
                                    class="col-span-12 text-sm font-medium text-gray-700"
                                >
                                    Integrations
                                </span>
                            </span>
                        </div>
                    </div>
                </a>
            </li>
            <li class="cursor-pointer group px-4">
                <a
                    href="/#/settings/docker-engine"
                    use:active
                    active-class="bg-chillgray-100"
                    class="p-2 select-none flex flex-1 items-center rounded-lg gap-0.5 hover:bg-chillgray-100 ease-transition"
                >
                    <span
                        class="inline-block relative bg-white rounded-lg p-1.5 shadow-xs"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-chillindigo-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
                            />
                        </svg>
                    </span>
                    <div class="flex-1 ml-2">
                        <div class="grid grid-cols-5">
                            <span
                                class="col-span-3 label-text grid grid-cols-12 gap-0.5 items-center"
                            >
                                <span
                                    class="col-span-12 text-sm font-medium text-gray-700"
                                >
                                    Docker engine
                                </span>
                            </span>
                        </div>
                    </div>
                </a>
            </li>
            <li class="cursor-pointer group px-4">
                <a
                    href="/#/settings/troubleshoot"
                    use:active
                    active-class="bg-chillgray-100"
                    class="select-none flex flex-1 items-center p-2 rounded-lg gap-0.5 hover:bg-chillgray-100 ease-transition"
                >
                    <span
                        class="inline-block relative bg-white rounded-lg p-1.5 shadow-xs"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-cerise-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </span>
                    <div class="flex-1 ml-2">
                        <div class="grid grid-cols-5">
                            <span
                                class="col-span-3 label-text grid grid-cols-12 gap-0.5 items-center"
                            >
                                <span
                                    class="col-span-12 text-sm font-medium text-gray-700"
                                >
                                    Troubleshoot
                                </span>
                            </span>
                        </div>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</aside>
