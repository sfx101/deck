<script>
    const { clipboard } = require("electron");

    export let value,
        copiedText = "Copied!",
        copyText = "Click to copy";

    let isCopied = false;

    /**
     * Text copy function
     */
    function copy() {
        clipboard.writeText(value);

        isCopied = true;
        setTimeout(() => {
            isCopied = false;
        }, 3000);
    }
</script>

<span
    on:click={copy}
    on:mouseleave={() => {
        // isCopied = false;
    }}
    class="hidden group-hover:block cursor-pointer text-gray-500 flex-none"
>
    <div class="relative tooltip-hover group">
        {#if isCopied}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-green-700"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                    fill-rule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                />
            </svg>
            <div
                class="absolute left-1/2 block -top-10 transform transform -translate-x-1/2 group-hover:block"
            >
                <span
                    class="relative z-10 p-2 text-xs leading-none bg-white font-medium text-gray-700 border border-chillgray-200 rounded whitespace-no-wrap block"
                    >{copiedText}</span
                >
                <div
                    class="w-3 h-3 -mt-1.5 mx-auto border border-chillgray-200 transform rotate-45 bg-white"
                />
            </div>
        {:else}
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
                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                />
            </svg>
            <div
                class="absolute left-1/2 block -top-10 transform transform -translate-x-1/2 group-hover:block"
            >
                <span
                    class="relative z-10 p-2 text-xs leading-none bg-white font-medium text-gray-700 border border-chillgray-200 rounded whitespace-nowrap block"
                    >{copyText}</span
                >
                <div
                    class="w-3 h-3 -mt-1.5 mx-auto border border-chillgray-200 transform rotate-45 bg-white"
                />
            </div>
        {/if}
    </div>
</span>
