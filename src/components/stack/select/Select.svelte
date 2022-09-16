<script>
    import { onMount } from "svelte";
    import _ from "lodash";

    export let inputObject;
    export let inputField;
    export let error;
    export let selected;

    let errorClass = "";

    $: {
        if (error) {
            errorClass =
                " focus:border-pumpkin-500 border border-pumpkin-500 placeholder-pumpkin-600 text-pumpkin-600";
        } else {
            errorClass = "";
        }
    }

    onMount(() => {
        selected = inputObject.value;
    });
</script>

<div class="p-4 pr-0 bg-white rounded-lg flex flex-col justify-center">
    <div class="flex-shrink-0 card rounded-none">
        <div class="form-control grid grid-cols-5">
            <label class="col-span-2 label p-0" for="">
                <span class="label-text text-xs text-gray-400">
                    {inputObject.label}
                </span>
            </label>
            <!-- on:change={onChange} -->
            <!--  -->
            <select
                name={inputField}
                bind:value={selected}
                class="
                col-span-3 border-none justify-self-end p-0 focus:ring-0 text-gray-500  text-right focus:outline-none px-4 w-24 {errorClass}
                "
                disabled={_.get(inputObject, "disabled_post_install", false)}
            >
                {#each inputObject.values as val}
                    {#if val === selected}
                        <option value={_.toString(val)} selected="selected"
                            >{val}</option
                        >
                    {:else}
                        <option value={_.toString(val)}>{val}</option>
                    {/if}
                {/each}
            </select>

            {#if error}
                <p class="mt-1 text-pumpkin-600 text-xs leading-3">
                    {error}
                </p>
            {/if}
        </div>
    </div>
</div>
