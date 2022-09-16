<script>
    import { afterUpdate } from "svelte";
    import _ from "lodash";
    import { requiredValidator } from "../../../utils/validator/Validators.js";
    import { createFieldValidator } from "../../../utils/validator/Validation";

    export let inputObject;
    export let inputField;
    export let error;
    export let value;

    const [validity, validate] = createFieldValidator(requiredValidator());

    let startValidation = false;

    // Init default value
    value = inputObject.values;

    afterUpdate(_.debounce(() => {}, 500));
</script>

<div class="pt-6">
    <p
        class="block text-sm font-medium text-gray-700 pb-2 mb-6 border-b border-gray-200"
    >
        {inputObject.label}
    </p>
    <div class="grid grid-cols-2 gap-4 items-start">
        <div class="col-span-1">
            <span class="text-gray-500 text-xs">{inputObject.hint}</span>
        </div>
        <div class="col-span-1">
            <div class="form-control relative">
                <input
                    on:keyup={() => {
                        startValidation = true;
                        if ($validity.valid) {
                            error = "";
                        }
                    }}
                    name={inputField}
                    bind:value
                    type="text"
                    placeholder={inputObject.label}
                    class="input input-bordered h-10 pr-10 focus:ring-0 text-gray-700"
                    class:focus:border-pumpkin-500={(!$validity.valid &&
                        startValidation) ||
                        error}
                    class:border-pumpkin-500={(!$validity.valid &&
                        startValidation) ||
                        error}
                    class:placeholder-pumpkin-600={(!$validity.valid &&
                        startValidation) ||
                        error}
                    class:text-pumpkin-600={(!$validity.valid &&
                        startValidation) ||
                        error}
                    use:validate={value}
                />
                <div
                    class="absolute transform -translate-y-1.5 top-4 right-4"
                />
                <!-- @TODO: Will remove this comment if we finale we don't need this.
                    <p class="mt-2 text-pumpkin-600 text-xs leading-3">
                    {#if $validity.dirty && !$validity.valid}
                        {$validity.message}
                    {:else if error}
                        {_.capitalize(error)}
                    {/if}
                    &nbsp;
                </p> -->
            </div>
        </div>
    </div>
</div>
