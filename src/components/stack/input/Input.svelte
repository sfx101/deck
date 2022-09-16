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
    export let isReadOnly = false;

    value = inputObject.value;

    let errorClass = "";
    let canValidate = false;
    let startValidation = false;

    $: {
        if (error) {
            errorClass =
                " focus:border-pumpkin-500 border border-pumpkin-500 placeholder-coral-600 text-coral-600";
        } else {
            errorClass = "";
        }
    }

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

<div class="p-4 rounded-lg bg-white flex flex-col justify-center">
    <div class="flex-shrink-0 card overflow-visible rounded-none relative">
        <div class="form-control grid grid-cols-5 ">
            <label
                class="col-span-2 label-text text-xs text-gray-400 p-0"
                for={inputField}
                class:text-coral-600={(!$validity.valid && startValidation) ||
                    error}
            >
                {inputObject.label}
            </label>
            <input
                on:keyup={() => {
                    startValidation = true;
                    if ($validity.valid) {
                        error = "";
                    }
                }}
                disabled={_.get(inputObject, "disabled", false)
                    ? inputObject.disabled
                    : false}
                readonly={isReadOnly}
                name={inputField}
                bind:value
                type="text"
                placeholder={inputObject.label}
                class="
                    col-span-3
                    text-right text-sm
                    border-none
                    p-0
                    text-gray-500
                    font-normal
                    focus:outline-none 
                    bg-white
                "
                class:cursor-not-allowed={_.get(
                    inputObject,
                    "disabled",
                    false
                ) && inputObject.disabled === true}
                class:focus:border-coral-500={(!$validity.valid &&
                    startValidation) ||
                    error}
                class:border-coral-500={(!$validity.valid && startValidation) ||
                    error}
                class:placeholder-coral-600={(!$validity.valid &&
                    startValidation) ||
                    error}
                class:text-coral-600={(!$validity.valid && startValidation) ||
                    error}
                use:validate={value}
            />
        </div>
        <!-- <p class="text-pumpkin-600 text-xs leading-3 absolute -bottom-3 left-0">
            {#if $validity.dirty && !$validity.valid}
                {$validity.message}
            {:else if error}
                {_.capitalize(error)}
            {/if}
            &nbsp;
        </p> -->
    </div>
</div>
