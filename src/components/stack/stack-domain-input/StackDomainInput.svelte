<script>
    import { afterUpdate } from "svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    const _ = require("lodash");

    export let value;
    export let error;

    let errorClass = "";
    let canValidate = false;

    $: {
        if (error) {
            errorClass = " focus:border-pumpkin-500 border border-pumpkin-500 placeholder-pumpkin-600 text-pumpkin-600";
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
    <div class="flex-shrink-0 card rounded-none">
        <div class="form-control grid grid-cols-5">
            <label class="col-span-2 label p-0" for="stack_name">
                <span class="label-text text-xs text-gray-400">Site host</span>
            </label>
            <input
                bind:value
                name="stack_name"
                type="text"
                placeholder="my-awesome-app"
                class="
                    col-span-3
                    text-right text-sm
                    border-none
                    p-0
                    text-md text-gray-500
                    font-normal
                    focus:outline-none
                    {errorClass}
                    "
            />
            {#if error}<p class="mt-1 text-pumpkin-600 text-xs leading-3">{error}</p>{/if}
        </div>
    </div>
</div>
