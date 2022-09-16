<script>
    import _ from "lodash";
    import { onMount } from "svelte";
    import { requiredValidator } from "./../../../utils/validator/Validators.js";
    import { createFieldValidator } from "./../../../utils/validator/Validation.js";

    export let inputObject;
    export let inputField;
    export let error;
    export let value = "";
    export let iconClass = "fas fa-code-branch";

    const [validity, validate] = createFieldValidator(requiredValidator());

    let startValidation = false,
        isInvalidInput = false;

    $: isInvalidInput =
        (!$validity.valid && startValidation) || error ? true : false;

    /**
     * @description : When component load then set value
     */
    onMount(async () => {
        value = _.get(inputObject, "default", "");
    });

    /**
     * @description : On redio input change the value of input change.
     */
    function onChange(event) {
        value = event.currentTarget.value;
        // Validate path select
        setTimeout(startValidate, 50);
    }

    /**
     * @description : Validation start function
     */
    function startValidate() {
        startValidation = true;
        if ($validity.valid) {
            error = "";
        }
    }
</script>

<div class="pt-6">
    <div role="group" aria-labelledby="label-notifications">
        <label
            for="username"
            class="block text-sm font-medium text-gray-700 pb-2 mb-6 border-b border-gray-200"
        >
            {inputObject.label}
        </label>
        <div class="grid grid-cols-2 gap-4 items-start">
            <div class="col-span-1">
                <span class="text-gray-500 text-xs">{inputObject.hint}</span>
            </div>
            <div class="col-span-1">
                <div class="w-full">
                    <div class="grid grid-flow-col auto-cols-max gap-4">
                        {#each Object.entries(inputObject.values) as [key1, value1]}
                            <div class=" custom-radio">
                                <div class="w-full">
                                    <input
                                        on:change={onChange}
                                        class="hidden"
                                        id="radio_{inputField + '_' + key1}"
                                        type="radio"
                                        name={inputField}
                                        value={value1}
                                        bind:group={value}
                                        use:validate={value}
                                    />
                                    <label
                                        class="w-full cursor-pointer bg-white border border-grey-200 px-4 h-10 rounded-lg flex items-center text-sm font-medium relative"
                                        class:border-pumpkin-500={isInvalidInput}
                                        class:placeholder-pumpkin-600={isInvalidInput}
                                        class:text-pumpkin-600={isInvalidInput}
                                        for="radio_{inputField + '_' + key1}"
                                    >
                                        <div class="flex items-center">
                                            <sapn class="h-4 w-4"
                                                ><i
                                                    class="{iconClass} text-gray-400"
                                                    class:border-pumpkin-500={isInvalidInput}
                                                    class:placeholder-pumpkin-600={isInvalidInput}
                                                    class:text-pumpkin-600={isInvalidInput}
                                                /></sapn
                                            >
                                        </div>
                                        <div
                                            class="flex w-full justify-between items-center ml-2"
                                        >
                                            <span
                                                class="font-medium text-xs text-gray-400"
                                                class:border-pumpkin-500={isInvalidInput}
                                                class:placeholder-pumpkin-600={isInvalidInput}
                                                class:text-pumpkin-600={isInvalidInput}
                                            >
                                                {value1}
                                            </span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
