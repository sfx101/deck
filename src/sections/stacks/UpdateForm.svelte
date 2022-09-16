<script>
    /**
     * @author : DECK Contributors
     * @description : This is custom form components which is dynamic according to settings.yml
     */

    import _ from "lodash";
    import {
        getFormValueByFormFields,
        getDefaultFormValue,
    } from "./../../utils/models/Projects";

    // Stack store import
    import {
        formFieldsStore,
        isFormUpdated,
        stackUpdateErrors,
        headerLoaderStore,
    } from "../../utils/store/Projects";

    // Input components import
    import Input from "./../../components/stack/input/Input.svelte";
    import PathSelect from "./../../components/stack/path-select/PathSelect.svelte";
    import Select from "./../../components/stack/select/Select.svelte";
    import Toggle from "../../components/stack/toggle/Toggle.svelte";
    import Tools from "../../components/tools/Tools.svelte";
    import Extensions from "../../components/extensions/Extensions.svelte";

    // This is object where form key value and options containt.
    export let formFields;
    export let isStackUpdated;
    export let projectName;

    // Here assign updated data of form
    let formValue = {};

    // Here assign default data of form
    let compareObject;

    // Init the compareObject every time when projectName value change
    $: compareObject = getFormValueByFormFields(formFields);

    let php_extensions = [];
    let php_extensions_loader;
    $: php_extensions_loader = $headerLoaderStore.loading;

    $: {
        // This condation will run when form data save success
        if (isStackUpdated) {
            isStackUpdated = false;
            getDefaultFormValue(projectName).then((res) => {
                compareObject = getFormValueByFormFields(res);
            });
        }
        // Update the status for save button should enable or disable
        isFormUpdated.update(() => !_.isEqual(compareObject, formValue));

        // Update the form value on store for save the form value using save button which is on header.
        formFieldsStore.update(() => ({
            ...formValue,
            ...{ php_extensions: php_extensions },
        }));
    }
</script>

<!-- {#if obj1.length > 0} -->
{#each Object.entries(formFields) as [key1, obj1]}
    {#if obj1.length > 0}
        <dl
            class="bg-gray-50 shadow-sm rounded-lg p-4 inline-flex flex-col w-full h-fit-content float-left gap-4 break-inside mb-6"
        >
            {#each Object.entries(obj1) as [key, obj]}
                {#if _.get(obj, "type", false)}
                    {#if obj.type === "select"}
                        <Select
                            bind:selected={formValue[obj.key]}
                            inputField={obj.key}
                            inputObject={obj}
                            error={_.get($stackUpdateErrors, key, false)
                                ? $stackUpdateErrors[key]
                                : ""}
                        />
                    {:else if obj.type === "input"}
                        <Input
                            bind:value={formValue[obj.key]}
                            inputField={obj.key}
                            inputObject={obj}
                            error={_.get($stackUpdateErrors, obj.key, false)
                                ? $stackUpdateErrors[obj.key]
                                : ""}
                        />
                    {:else if obj.type === "checkbox"}
                        {#if _.get(obj, "show_on_install", false) != true}
                            <Toggle
                                bind:value={formValue[obj.key]}
                                inputObject={obj}
                            />
                        {:else}
                            <Toggle
                                bind:value={formValue[obj.key]}
                                inputObject={obj}
                                show={false}
                            />
                        {/if}
                    {:else if obj.type === "password"}
                        <!-- <PasswordInput -->
                        <Input
                            bind:value={formValue[obj.key]}
                            inputField={obj.key}
                            inputObject={obj}
                            error={_.get($stackUpdateErrors, obj.key, false)
                                ? $stackUpdateErrors[obj.key]
                                : ""}
                        />
                    {:else if obj.type === "path"}
                        <PathSelect
                            bind:value={formValue[obj.key]}
                            inputField={obj.key}
                            inputObject={obj}
                            error={_.get($stackUpdateErrors, obj.key, false)
                                ? $stackUpdateErrors[obj.key]
                                : ""}
                        />
                    {/if}
                {/if}
            {/each}
        </dl>
    {/if}
{/each}

<Tools {projectName} />
<Extensions
    {projectName}
    bind:saveLoader={php_extensions_loader}
    bind:selectValue={php_extensions}
/>
