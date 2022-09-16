<script>
    import _ from "lodash";
    import { afterUpdate } from "svelte";
    import {
        requiredValidator,
        validateStackName,
    } from "./../../../utils/validator/Validators.js";
    import { createFieldValidator } from "./../../../utils/validator/Validation.js";

    export let value;
    export let error;

    const [validity, validate] = createFieldValidator(
        requiredValidator(),
        validateStackName()
    );

    let errorClass = "";
    let startValidation = false;

    afterUpdate(
        _.debounce(() => {
            value = _.trim(value).replaceAll(" ", "-"); //_.kebabCase(value);
        }, 500)
    );
</script>

<p
    class="block text-sm font-medium text-gray-700 pb-2 mb-6 border-b border-gray-200"
>
    Your stack URL
</p>
<div class="grid grid-cols-2 gap-2 items-start">
    <div class="col-span-1">
        <span class="text-gray-500 text-xs"
            >Enter a name for this stack, lowercase with dashes preferred. Make
            sure it's unique to your stacks</span
        >
    </div>
    <div class="mt-0 col-span-1">
        <div class="max-w-full">
            <div class="flex rounded-md">
                <span
                    class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-gray-500 sm:text-sm"
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
                >
                    https://
                </span>
                <div class="w-full form-control">
                    <input
                        on:keyup={() => {
                            startValidation = true;
                            if ($validity.valid) {
                                error = "";
                            }
                        }}
                        bind:value
                        name="stack_name"
                        type="text"
                        placeholder="my-awesome-app"
                        class="input input-bordered border-b border-gray-200 rounded-none focus:ring-0 h-10 text-gray-700"
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
                </div>
                <span
                    class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-200 bg-gray-50 text-gray-500 sm:text-sm {errorClass}"
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
                >
                    .stacks.run
                </span>
            </div>
            <p class="mt-2 text-pumpkin-600 text-xs leading-3">
                {#if $validity.dirty && !$validity.valid}
                    {$validity.message}
                {/if}
                &nbsp;
            </p>
        </div>
    </div>
</div>
