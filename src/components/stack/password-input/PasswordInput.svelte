<script>
    import { afterUpdate } from "svelte";
    import { createEventDispatcher } from "svelte";
    import _ from "lodash";
    import { requiredValidator } from "./../../../utils/validator/Validators.js";
    import { createFieldValidator } from "./../../../utils/validator/Validation.js";

    const dispatch = createEventDispatcher();
    const [validity, validate] = createFieldValidator(requiredValidator());

    export let inputObject;
    export let inputField;
    export let error;
    export let value;

    value = inputObject.values;
    let errorClass = "";
    let canValidate = false;
    let startValidation = false;
    let isValid = true;

    $: isValid = (!$validity.valid && startValidation) || error ? true : false;

    afterUpdate(
        _.debounce(() => {
            
            if (canValidate) {
                dispatch("validate", {
                    validate: true,
                });
            } else {
                canValidate = true;
            }
        }, 500)
    );
</script>

<div class="p-4 bg-white rounded-lg flex flex-col justify-center">
    <div class="flex-shrink-0 card rounded-none relative">
        <div class="items-center justify-between grid grid-cols-5">
            <label class="col-span-2 cursor-pointer label p-0" for={inputField}>
                <span class="label-text text-xs text-gray-400"
                    >{inputObject.label}</span
                >
            </label>
            <input
                on:keyup={() => {
                    startValidation = true;
                    if ($validity.valid) {
                        error = "";
                    }
                }}
                type="text"
                name={inputField}
                bind:value
                placeholder={inputObject.label}
                class="filter blur-sm col-span-3 text-right border-none p-0 text-sm text-gray-500 font-normal focus:outline-none"
                class:focus:border-pumpkin-500={isValid}
                class:border-pumpkin-500={isValid}
                class:placeholder-pumpkin-600={isValid}
                class:text-pumpkin-600={isValid}
                use:validate={value}
            />
        </div>
        <p class="text-pumpkin-600 text-xs leading-3 absolute -bottom-3 left-0">
            {#if $validity.dirty && !$validity.valid}
                {$validity.message}
            {:else if error}
                {_.capitalize(error)}
            {/if}
            &nbsp;
        </p>
    </div>
</div>
