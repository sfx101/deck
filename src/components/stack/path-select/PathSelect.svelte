<script>
    import { afterUpdate } from "svelte";
    import { createEventDispatcher } from "svelte";

    import { requiredValidator } from "./../../../utils/validator/Validators.js";
    import { createFieldValidator } from "./../../../utils/validator/Validation.js";

    import { getWinVmPath } from "./../../../utils/VM";

    const dispatch = createEventDispatcher();
    const { ipcRenderer } = require("electron");
    const _ = require("lodash");
    const [validity, validate] = createFieldValidator(requiredValidator());

    export let inputObject;
    export let inputField;
    export let error;
    export let value;

    value = inputObject.value;

    let startValidation = false;
    let isValid = true;

    $: isValid = (!$validity.valid && startValidation) || error ? true : false;

    ipcRenderer.on("selected-directory", async (event, path) => {
        if (_.isArray(path)) {
            if (path.length > 0 && path[0] != "") {
                value = path[0];
                // 
            }
        }
    });

    function selectPath() {
        startValidation = true;
        if ($validity.valid) {
            error = "";
        }

        ipcRenderer.send("open-file-dialog");
    }
</script>

<div class="p-4 rounded-lg bg-white flex flex-col justify-center">
    <div class="flex-shrink-0 card overflow-visible rounded-none relative">
        <div class="form-control grid grid-cols-5">
            <label
                class="col-span-2 label-text text-xs text-gray-400 p-0"
                for={inputField}
                class:text-coral-600={isValid}
            >
                {inputObject.label}
            </label>
            <input
                on:click={selectPath}
                bind:value
                placeholder="Please select {inputObject.label}."
                name={inputField}
                type="text"
                class="
                    col-span-3
                    text-right text-sm
                    border-none
                    p-0
                    text-gray-500
                    font-normal
                    focus:outline-none 
                    cursor-pointer
                    "
                class:focus:border-text-coral-500={isValid}
                class:border-text-coral-500={isValid}
                class:placeholder-coral-600={isValid}
                class:text-text-coral-600={isValid}
                use:validate={value}
            />
        </div>
        <!-- <p class="text-text-coral-600 text-xs leading-3 absolute -bottom-3 left-0">
            {#if $validity.dirty && !$validity.valid}
                {$validity.message}
            {:else if error}
                {_.capitalize(error)}
            {/if}
        </p> -->
    </div>
</div>
