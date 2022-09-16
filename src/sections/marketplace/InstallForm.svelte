<script>
    import { router } from "tinro";
    import saveNewProject from "../../utils/project-install/Install";
    import { isProjectNameAvailable } from "./../../utils/models/Projects";
    import { getNetworkFieldObject } from "../../utils/models/Networks";
    import { getPHPExtensionsFieldObject } from "../../utils/models/PHPExtensions";
    import { confirmNotificationStore } from "./../../utils/store/Notification";

    // Inputs import
    import Select from "./../../components/marketplace/select/Select.svelte";
    import MultiSelect from "./../../components/marketplace/select/MultiSelect.svelte";
    import Checkbox from "./../../components/marketplace/checkbox/Checkbox.svelte";
    import Input from "./../../components/marketplace/input/Input.svelte";
    import StackDomainInput from "./../../components/marketplace/stack-domain-input/StackDomainInput.svelte";
    import PathSelect from "./../../components/marketplace/path-select/PathSelect.svelte";
    import DatabaseInput from "./../../components/marketplace/database-input/DatabaseInput.svelte";
    import Notification from "./../../components/notification/Notification.svelte";
    import NfsdPermission from "../../components/modals/NfsdPermission.svelte";

    const _ = require("lodash");

    let loading = false;
    let formFieldsObj;
    let formFieldsErrorObj;
    let networkFieldObject;
    let phpExtensionsFieldObject;
    let notificationObject = {
        title: "",
        description: "",
        type: "",
        show: false,
    };
    let stackName = "";
    let showNfsdError = false;

    // For get value of props
    export let settings;
    export let selectedImage;

    $: networkFieldObject = getNetworkFieldObject();
    $: phpExtensionsFieldObject = getPHPExtensionsFieldObject();

    formFieldsObj = getFormFieldsObj();
    formFieldsErrorObj = getFormFieldsObj();

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            loading = true;
            // e.stopPropagation();

            let formFields = getFormFieldsFromSettings();

            // validation
            let canFormSubmit = isValidForm(formFieldsObj, formFields);

            if (canFormSubmit) {
                await saveNewProject(formFieldsObj, selectedImage, settings);
                stackName = _.get(formFieldsObj, "stack_name", false)
                    ? formFieldsObj["stack_name"]
                    : "";
                // Confirm notification init
                $confirmNotificationStore = {
                    title: "Project created",
                    description: "Go ahead & start the project",
                    successButtonText: "Start",
                    cancelButtonText: "Dismiss",
                    show: true,
                    meta: {
                        project: stackName,
                        action: "start-stack",
                    },
                };
                closeNotification();
            } else {
                notificationObject = {
                    title: "Saving failed",
                    description: "Please fill all required fields and save",
                    type: "info",
                    show: true,
                };
            }
            loading = false;
        } catch (error) {
            loading = false;
            //Handle errors differently for Multipass
            if (
                _.isObject(error) &&
                _.get(error, "error") === "multipassMountError"
            ) {
                showNfsdError = true;
                console.log(
                    `🚀 LOG | file: InstallForm.svelte | line 96 | handleSubmit | showMultipassError`,
                    _.get(error, "context")
                );
            } else {
                let errorMessage = _.get(error, "message", false)
                    ? error.message
                    : error;
                notificationObject = {
                    title: "Saving failed",
                    description: errorMessage,
                    type: "info",
                    show: true,
                };
            }
        }
    }

    function getFormFieldsFromSettings() {
        let formFields = ["stack_name", "network_driver"];
        if (_.get(settings, "system.show_localpath_selector", false)) {
            if (settings.system.show_localpath_selector) {
                formFields = ["project_path", ...formFields];
            }
        }

        // if (_.get(settings, "user.php_version", false)) {
        //     formFields = ["php_extensions", ...formFields];
        // }

        if (_.get(settings, "system.db_credentials", false)) {
            if (settings.system.db_credentials) {
                formFields = [
                    "db_name",
                    "db_user",
                    "db_password",
                    ...formFields,
                ];
            }
        }

        if (_.get(settings, "user", false)) {
            _.forEach(settings.user, function (obj, key) {
                if (obj.type === "select") {
                    formFields = [key, ...formFields];
                }
                if (obj.type === "input") {
                    formFields = [key, ...formFields];
                }
            });
        }
        return formFields;
    }

    function getFormFieldsObj() {
        let obj = [];
        _.forEach(getFormFieldsFromSettings(), function (value, key) {
            obj[value] = "";
        });
        return obj;
    }

    function isValidForm(data, formFields) {
        let canFormSubmit = true;

        _.forEach(formFields, function (value) {
            if (_.has(data, value)) {
                if (data[value] == "") {
                    formFieldsErrorObj[value] = "This field is required"; //_.startCase(value)
                    canFormSubmit = false;
                } else {
                    formFieldsErrorObj[value] = "";
                }
            } else {
                canFormSubmit = false;
            }
        });

        if (!isProjectNameAvailable(formFieldsObj["stack_name"])) {
            canFormSubmit = false;
            formFieldsErrorObj["stack_name"] =
                "Stack name already taken by other app please select new Stack name.";
        }
        return canFormSubmit;
    }

    function closeNotification() {
        if (stackName != false) {
            router.goto("/stacks/" + stackName);
        }
    }
</script>

<form on:submit={handleSubmit}>
    <!-- Installation form -->
    <StackDomainInput
        bind:value={formFieldsObj["stack_name"]}
        error={formFieldsErrorObj["stack_name"]}
    />

    {#if _.get(settings, "user", false)}
        {#if _.isObject(settings.user)}
            {#each Object.entries(settings.user) as [key, obj]}
                {#if _.get(obj, "type", false)}
                    {#if obj.type === "select"}
                        <Select
                            bind:value={formFieldsObj[key]}
                            error={formFieldsErrorObj[key]}
                            inputField={key}
                            inputObject={obj}
                        />
                    {:else if obj.type === "input"}
                        <Input
                            bind:value={formFieldsObj[key]}
                            error={formFieldsErrorObj[key]}
                            inputField={key}
                            inputObject={obj}
                        />
                    {:else if obj.type === "checkbox"}
                        <Checkbox
                            bind:value={formFieldsObj[key]}
                            error={formFieldsErrorObj[key]}
                            inputField={key}
                            inputObject={obj}
                        />
                    {/if}
                {/if}
            {/each}
        {/if}
    {/if}

    {#if _.get(settings, "user.php_version", false)}
        {#if phpExtensionsFieldObject.values.length > 0}
            <MultiSelect
                bind:value={formFieldsObj["php_extensions"]}
                error={formFieldsErrorObj["php_extensions"]}
                inputField={"php_extensions"}
                inputObject={phpExtensionsFieldObject}
                iconClass="fas fa-rss"
            />
        {/if}
    {/if}

    {#if _.get(networkFieldObject, "values", false)}
        {#if networkFieldObject.values.length > 0}
            <Select
                bind:value={formFieldsObj["network_driver"]}
                error={formFieldsErrorObj["network_driver"]}
                inputField={"network_driver"}
                inputObject={networkFieldObject}
                iconClass="fas fa-rss"
            />
        {/if}
    {/if}

    {#if _.get(settings, "system.show_localpath_selector", false)}
        {#if settings.system.show_localpath_selector}
            <PathSelect
                bind:projectPath={formFieldsObj["project_path"]}
                error={formFieldsErrorObj["project_path"]}
            />
        {/if}
    {/if}

    {#if _.get(settings, "system.db_credentials", false)}
        {#if settings.system.db_credentials}
            <DatabaseInput
                bind:valueDbName={formFieldsObj["db_name"]}
                bind:valueDbUser={formFieldsObj["db_user"]}
                bind:valueDbPassword={formFieldsObj["db_password"]}
                errorDbName={formFieldsErrorObj["db_name"]}
                errorDbUser={formFieldsErrorObj["db_user"]}
                errorDbPassword={formFieldsErrorObj["db_password"]}
            />
        {/if}
    {/if}

    <div class="text-right mt-6">
        <button
            disabled={loading}
            type="submit"
            class="{loading === true
                ? 'inline-flex gap-2 shadow-sm items-center px-5 py-2.5 text-sm focus:outline-none transition rounded-full bg-blue-700 text-white font-semibold'
                : 'inline-flex items-center px-6 py-2.5 text-sm font-medium text-white transition bg-blue-600 rounded-full ripple hover:bg-blue-600 focus:outline-none'} "
        >
            <svg
                class="animate-spin h-4 w-4 text-white {loading === false
                    ? 'hidden'
                    : ''}"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                ><circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                /><path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                /></svg
            >
            <!-- Loading text  -->
            <span class="text-sm {loading === false ? 'hidden' : ''}"
                >Saving...</span
            >
            <!-- Save button text -->
            {loading === false ? "Save" : ""}
        </button>
    </div>
</form>
<NfsdPermission {showNfsdError} />
<Notification
    on:closeNotification={closeNotification}
    {...notificationObject}
/>
