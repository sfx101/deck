<script>
    import { stackStore } from "./../../utils/store/Marketplace";
    import {
        getReadMeByImage,
        getSettingsByImage,
    } from "./../../utils/project-install/RepositoryUtils";

    // Components Imports
    import Header from "./Header.svelte";
    import InstallForm from "./InstallForm.svelte";
    import ContentLoader from "./ContentLoader.svelte";
    import ReadmeError from "./ReadmeError.svelte";

    const _ = require("lodash");

    // Declaration
    let installClickStatus = false;
    let settings = {};

    // For get value of props
    export let AppID;

    let selectedImage = {};
    let readmeResult;

    // Get Selected docker image details by id
    $: {
        selectedImage = _.isArray($stackStore)
            ? $stackStore.find((item) => item["@AppID"] === AppID)
            : [];
    }
    // Init
    $: {
        installClickStatus = false;

        // Get read me content from github using selected image
        readmeResult = getReadMeByImage(selectedImage);

        // Get settings from settings.yml
        settings = getSettingsByImage(selectedImage);
    }

    function getInstallStatus(event) {
        installClickStatus = event.detail.installClickStatus;
    }
</script>

<main class="flex-1 overflow-y-auto h-screen">
    <!-- Primary column -->
    <section
        aria-labelledby="primary-heading"
        class="bg-gray-100 min-w-0 flex-1 h-full flex flex-col relative overflow-hidden"
    >
        <!-- stack header -->
        <Header
            on:getInstallStatus={getInstallStatus}
            dockerImage={selectedImage}
        />

        <!-- stack details -->

        <div class="p-6 overflow-y-auto rounded-md">
            {#if installClickStatus}
                <!-- Installation form -->
                <div class="bg-gray-50 p-5 rounded-lg relative">
                    {#await settings}
                        <ContentLoader />
                    {:then res}
                        {#if _.get(res, "yml_data", false)}
                            <InstallForm
                                settings={res.yml_data}
                                {selectedImage}
                            />
                        {:else}
                            <h2
                                class="text-3xl font-semibold text-yellow-500 mb-4"
                            >
                                Something is wrong!
                            </h2>
                        {/if}
                    {:catch error}
                        <div class="no-readme flex items-center">
                            <div class="text-center w-full  grayscale-0">
                                <img
                                    class="mx-auto w-56 object-content"
                                    src="img/sleeping-dog.png"
                                    alt="logo"
                                />
                                <h3 class="text-gray-700">{error.message}</h3>
                            </div>
                        </div>
                    {/await}
                </div>
            {:else}
                <!-- Installation doc -->
                <div class="bg-gray-50 p-5 rounded-lg text-gray-700">
                    {#await readmeResult}
                        <ContentLoader />
                    {:then readMeData}
                        {#if readMeData === ""}
                            <ReadmeError />
                        {:else}
                            <div class="cms-content">
                                {@html readMeData}
                            </div>
                        {/if}
                    {:catch error}
                        <h2 class="text-3xl font-semibold text-yellow-500 mb-4">
                            {error.message}
                        </h2>
                    {/await}
                </div>
            {/if}
        </div>
    </section>
</main>
