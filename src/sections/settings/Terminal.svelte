<script>
    import { onMount } from "svelte";
    import _ from "lodash";

    import {
        initDefaultTerminal,
        getImageByName,
        getFirstItemClass,
        getLastItemClass,
        getActiveClass,
        onTerminalChange,
        getAvailableTerminals,
    } from "../../utils/Integrations";
    import { defaultTerminalStore } from "./../../utils/store/Settings";

    let terminalObject = [];

    /**
     *  onMount component
     */
    onMount( () => {
        initDefaultTerminal();
        getAvailableTerminals().then((res) => {
            console.log(
                "🚀 LOG | file: Terminal.svelte | line 24 | getAvailableTerminals | res",
                res
            );
            terminalObject = res;
        });
    });
</script>
{#if terminalObject.length > 0}
    <fieldset class="w-3/6">
        <legend class="mb-1 text-md font-medium text-gray-800">Shells</legend>
        <p class="mb-3 text-sm text-gray-400">
            Select a default shell for opening project path
        </p>
        <div class="bg-white rounded-md -space-y-px">
            {#each terminalObject as data, i}
                <label
                    class="relative border p-4 flex cursor-pointer focus:outline-none flex-row justify-between gap-3 {getFirstItemClass(
                        i
                    )} {getLastItemClass(i, terminalObject.length)} {getActiveClass(
                        _.get($defaultTerminalStore, 'shell', false),
                        data.shell
                    )}"
                >
                    <div class="flex flex-row gap-3">
                        <div class="w-6 h-6">
                            <img
                                src={getImageByName(data.shell, "terminalsLogo")}
                                alt={data.shell}
                            />
                        </div>
                        <span
                            id="privacy-setting-2-label"
                            class="block text-sm font-medium  {_.get(
                                $defaultTerminalStore,
                                'shell',
                                false
                            ) === data.shell
                                ? 'text-azure-900'
                                : 'text-gray-600'}"
                        >
                            {data.shell}
                        </span>
                    </div>
                    <input
                        checked={_.get(data, "shell", false) ===
                            _.get($defaultTerminalStore, "shell", false)}
                        on:change={() => {
                            onTerminalChange(data);
                        }}
                        value={i}
                        type="radio"
                        name="privacy-setting"
                        class="h-4 w-4 mt-0.5 cursor-pointer text-azure-600 border-gray-300 focus:ring-azure-500"
                        aria-labelledby="privacy-setting-2-label"
                        aria-describedby="privacy-setting-2-description"
                    />
                </label>
            {/each}
        </div>
    </fieldset>
{/if}
