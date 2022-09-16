<script>
    import _ from "lodash";
    import { requiredValidator } from "./../../../utils/validator/Validators.js";
    import { createFieldValidator } from "./../../../utils/validator/Validation.js";

    export let error;
    export let value;

    const [validity, validate] = createFieldValidator(requiredValidator());

    let startValidation = false;
    let isValid = true;
    $: {
        isValid = (!$validity.valid && startValidation) || error ? true : false;
    }
</script>

<div class="form-control relative mb-3">
    <input
        on:keyup={() => {
            startValidation = true;
            if ($validity.valid) {
                error = "";
            }
        }}
        bind:value
        name="db_name"
        type="text"
        placeholder="Database"
        class="input input-bordered h-10 focus:ring-0 text-gray-700 "
        class:focus:border-pumpkin-500={isValid}
        class:border-pumpkin-500={isValid}
        class:placeholder-pumpkin-600={isValid}
        class:text-pumpkin-600={isValid}
        use:validate={value}
    />
    <div class="absolute transform -translate-y-1.5 top-4 right-4">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400 "
            class:focus:border-pumpkin-500={isValid}
            class:border-pumpkin-500={isValid}
            class:placeholder-pumpkin-600={isValid}
            class:text-pumpkin-600={isValid}
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"
            />
            <path
                d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"
            />
            <path
                d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"
            />
        </svg>
    </div>
</div>
