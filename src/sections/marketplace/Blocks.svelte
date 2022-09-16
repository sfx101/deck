<script>
    import _ from "lodash";
    import { router, active } from "tinro";
    export let image;

    function open() {
        router.goto("/marketplace/" + image["@AppID"]);
    }
</script>

<li on:click={open} class="cursor-pointer group">
    <div class="px-4">
        <div
            href="/marketplace/{image['@AppID']}"
            use:active
            active-class="bg-chillgray-100"
            class="select-none flex flex-1 items-center justify-center p-2 rounded-lg hover:bg-chillgray-100 ease-transition"
        >
            <span
                class="inline-block relative border bg-white rounded-lg p-1.5 shadow-xs"
            >
                <img
                    class="h-4 w-4 object-content"
                    src={_.get(image, "@Logo", "img/logo-dark.png")}
                    alt={_.get(image, "@AppID", "Empty")}
                />
            </span>
            <div class="flex-1 ml-3">
                <div class="grid grid-cols-1">
                    <span
                        class="col-span-1 label-text grid grid-cols-12 gap-0.5 items-center"
                    >
                        <span
                            class="col-span-11 text-sm font-medium text-gray-700 truncate pr-2"
                            >{image["@AppName"]}</span
                        >
                        <span class="col-span-1 flex justify-end">
                            <p class="flex items-center text-sm text-gray-500">
                                <button class="text-right flex justify-end">
                                    <svg
                                        use:active
                                        data-href="/marketplace/{image[
                                            '@AppID'
                                        ]}"
                                        data-active-class="text-blue-700"
                                        class="h-6 w-6 text-gray-300"
                                        x-description="Heroicon name: solid/chevron-right"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </p>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</li>
