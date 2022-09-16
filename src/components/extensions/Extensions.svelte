<script>
    import _ from "lodash";
    import { onMount } from "svelte";
    import MultiSelect from "./MultiSelect.svelte";
    import { fade, slide } from "svelte/transition";
    import {
        getPHPExtensionsOptions,
        getName,
    } from "./../../utils/models/PHPExtensions";
    import { getProjectEnv } from "./../../utils/models/Projects";
    import { updatePPHExtensions } from "./../../utils/project-install/FileHandlers";
    import restart from "./../../utils/docker/Restart";
    import { isFormUpdated } from "./../../utils/store/Projects";

    export let projectName;
    export let selectValue = [];
    export let saveLoader = false;

    let projectEnv,
        installedExtensions = [],
        canShowExtensions = false,
        defautExtensions = [
            "php-ctype",
            "php-ftp",
            "php-tokenizer",
            "php-pcre",
            "php-pdo_sqlite",
        ],
        defautExtensionsShow = false,
        selectInputShow = false;

    // Get project env
    $: projectEnv = getProjectEnv(projectName);

    // Check if this compnents can be show or not
    $: canShowExtensions = _.get(projectEnv, "PHP_VERSION", false)
        ? true
        : false;

    // Init installed extensions
    $: installedExtensions = getInstalledExtensions(projectEnv);

    $: {
        if (canShowExtensions) {
            // Update the status for save button should enable or disable
            isFormUpdated.update(
                () =>
                    !_.isEqual(
                        _.sortBy(installedExtensions),
                        _.sortBy(selectValue)
                    )
            );
        }
    }

    /**
     * onMount function
     */
    onMount(() => {});

    /**
     * Get Installed Extensions
     */
    function getInstalledExtensions(projectEnv) {
        let result = [],
            extensions;

        // Initialization already installed extensions
        if (_.get(projectEnv, "INSTALL_ADDITIONAL_EXTENSIONS", false)) {
            extensions = _.split(
                _.get(projectEnv, "INSTALL_ADDITIONAL_EXTENSIONS", ""),
                " "
            );
            _.forEach(extensions, function (value) {
                selectValue.push(getName(value));
                result.push(getName(value));
            });
        }

        return result;
    }

    /**
     * Save the extensions and run the project
     */
    async function save(e) {
        if (_.isArray(selectValue) && selectValue.length > 0) {
            saveLoader = true;
            // _.keys(selectValue),
            let newEnv = await updatePPHExtensions(
                projectName,
                selectValue,
                _.get(projectEnv, "PHP_VERSION", "8.0")
            );

            if (_.get(newEnv, "INSTALL_ADDITIONAL_EXTENSIONS", false)) {
                installedExtensions = _.split(
                    _.get(projectEnv, "INSTALL_ADDITIONAL_EXTENSIONS", ""),
                    " "
                );
                _.forEach(installedExtensions, function (value) {
                    selectValue.push(getName(value));
                });
            } else {
                selectValue = [];
            }

            let ptyProcess = restart(projectName);
            if (ptyProcess) {
                ptyProcess.on("exit", () => {
                    saveLoader = false;
                });
            } else {
                saveLoader = false;
            }
        }
    }
</script>

{#if canShowExtensions === true}
    <div class="">
        <dl
            class="bg-gray-50 shadow-sm rounded-lg p-4 inline-flex flex-col w-full h-fit-content gap-2 break-inside mb-6"
        >
            <div class="text-gray-400 flex flex-wrap items-center">
                <span class="mr-2">Manage PHP extensions</span>
                <span>
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                </svg> -->
                </span>
            </div>

            <div class="text-gray-400 text-xs">
                List of additional PHP extensions are shown below, see a full
                list of installed extensions by clicking here.
            </div>

            {#if _.isArray(selectValue) && selectValue.length > 0}
                <div class="flex flex-wrap gap-2 py-2">
                    {#each selectValue as ex}
                        <span
                            class="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-white text-chillgray-500 border border-chillgray-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="mr-1.5 h-3 w-3 text-chillgray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                                />
                            </svg>
                            {ex}
                        </span>
                    {/each}
                </div>
            {:else}
                <p class="gap-2 text-chillgray-600" />
            {/if}

            <div class="flex flex-wrap gap-2 pt-2">
                <label for="" class="block text-sm text-gray-400">
                    Add / remove PHP extensions
                </label>
                <!-- bind:selected={selectValue} -->
                <MultiSelect
                    id="select-extension"
                    placeholder="Search ..."
                    bind:value={selectValue}
                >
                    {#each getPHPExtensionsOptions() as ext}
                        <option
                            value={ext.name}
                            data-description={ext.description}
                        >
                            {ext.name}
                        </option>
                    {/each}
                </MultiSelect>

                <!-- Save button -->
                <!-- 
                    @TODO: We will remove this when testing success whiout button
                    <button
                    on:click={save}
                    disabled={saveLoader}
                    type="button"
                    class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    {#if saveLoader === true}
                        Saving...
                    {:else}
                        Save
                    {/if}
                </button> -->
            </div>
            <!-- <div class="flex flex-wrap gap-2 py-2">
                <span
                    class="text-gray-400 text-sm hover:text-blue-500 cursor-pointer flex flex-wrap items-center"
                    on:click={() =>
                        (defautExtensionsShow = !defautExtensionsShow)}
                >
                    Check default extensions here
                    {#if defautExtensionsShow}
                        <svg
                            in:fade={{ delay: 500 }}
                            out:fade
                            xmlns="http://www.w3.org/2000/svg"
                            class="ml-1.5 h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    {:else}
                        <svg
                            in:fade={{ delay: 500 }}
                            out:fade
                            xmlns="http://www.w3.org/2000/svg"
                            class="ml-1.5 h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    {/if}
                </span>
                {#if defautExtensionsShow}
                    <div
                        class="flex flex-wrap bg-chillgray-200 p-2 rounded gap-2"
                        transition:slide
                    >
                        {#each defautExtensions as dex}
                            <span
                                class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-chillgray-50 text-chillgray-500"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="mr-1.5 h-3 w-3 text-chillgray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z"
                                    />
                                </svg>
                                {dex}
                            </span>
                        {/each}
                    </div>
                {/if}
            </div> -->
        </dl>
    </div>
{/if}
