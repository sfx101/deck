<script>
    import { Route, router } from "tinro";
    import { fly } from "svelte/transition";
    import { onMount, afterUpdate } from "svelte";
    import { getXtermInstance, fitXterm } from "./../../utils/Xterm";
    import { outputIO, controls, outputClasses } from "./../../utils/Store";
    import Terminal from "../../sections/output/Terminal.svelte";
    import _ from "lodash";

    export let state;
    let outputHeight = "outputHeight";
    let xtermContainer = null;

    const xtermInstance = getXtermInstance();
    const xterm = xtermInstance.x;
    const fitAddon = xtermInstance.f;

    onMount(() => {
        xtermContainer = document.querySelector("#xterm-output");
        if (xtermContainer) {
            xterm.open(xtermContainer);

            outputIO.subscribe((value) => {
                xterm.write(value);
            });

            controls.subscribe(
                _.debounce((value) => {
                    console.log(
                        `🚀 LOG | file: Output.svelte | line 28 | controls.subscribe | value`,
                        value
                    );
                    if ($controls.output === true) {
                        setTimeout(() => {
                            fitXterm(fitAddon, xtermContainer);
                        }, 1000);
                    }
                })
            );
        }
    });

    window.addEventListener(
        "resize",
        _.debounce(function (event) {
            fitXterm(fitAddon, xtermContainer);
        }, 2000),
        true
    );

    function showContentPanel() {
        $controls.panel = !$controls.panel;
        if ($controls.panel && $controls.terminal === false) {
            $controls.output = true;
        }
    }

    function toggleTeminal() {
        $controls.terminal = true;
        $controls.output = false;
    }

    function toggleOutput() {
        $controls.terminal = false;
        $controls.output = true;
    }

    router.subscribe((data) => {
        if (
            data.path == "/stacks" ||
            data.path == "/stacks/" ||
            data.path == "/installer" ||
            _.startsWith(data.path, "/project/delete/")
        ) {
            outputHeight = "outputHeightForWelcome";
        } else {
            outputHeight = "outputHeight";
        }
    });
</script>

<!-- Output -->
<main
    class="absolute w-3/4 overflow-y-auto bottom-0 right-0 {state
        ? 'visible'
        : 'invisible'}"
>
    <!-- Output header -->
    <div
        class="w-full flex items-center transition delay-200 justify-between {$outputClasses}"
    >
        <div class="w-full flex">
            <button
                on:click|stopPropagation={showContentPanel}
                class="flex-initial inline-flex w-auto items-center px-1"
            >
                <span class="rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="
                        {$controls.panel == false ? 'block' : 'hidden'} 
                        h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 15l7-7 7 7"
                        />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="
                        {$controls.panel == false ? 'hidden' : 'block'} 
                        h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </span>
            </button>
            <ul class="flex justify-center items-center gap-2">
                <li
                    class="cursor-pointer px-0.5 py-1.5 text-xs font-semibold 
                    {$controls.output == true ? 'text-white' : 'text-gray-300'}"
                    on:click|stopPropagation={toggleOutput}
                >
                    OUTPUT <span class="font-normal ml-1" />
                </li>
                <li
                    class="cursor-pointer px-0.5 py-1.5 mx-1 text-xs font-semibold border-gray-100 
                    {$controls.terminal == true
                        ? 'text-white'
                        : 'text-gray-300'}"
                    on:click|stopPropagation={toggleTeminal}
                >
                    TERMINAL
                </li>
            </ul>
        </div>
    </div>
    <!-- Output content -->
    <div
        class="
        {$controls.panel == true ? 'block' : 'overflow-hidden'}
        p-2.5 bg-chillgray-900 {outputHeight} overflow-x-hidden overflow-y-hidden"
    >
        <div
            id="xterm-output"
            class="
                    {$controls.output == true ? 'block' : 'hidden'} 
                    w-full h-full pb-6
                    text-chillgray-300 text-sm font-mono subpixel-antialiased leading-8"
        />
        <Terminal />
    </div>
</main>
