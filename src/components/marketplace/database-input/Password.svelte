<script>
    import _ from "lodash";
    import { requiredValidator } from "./../../../utils/validator/Validators.js";
    import { createFieldValidator } from "./../../../utils/validator/Validation.js";

    export let error;
    export let value;

    const [validity, validate] = createFieldValidator(requiredValidator());
    let startValidation = false;
</script>

<div class="form-control relative">
    <input
        on:keyup={() => {
            startValidation = true;
            if ($validity.valid) {
                error = "";
            }
        }}
        bind:value
        name="db_password"
        type="password"
        placeholder="Password"
        class="input input-bordered h-10 focus:ring-0  text-gray-700"
        class:focus:border-pumpkin-500={(!$validity.valid && startValidation) ||
            error}
        class:border-pumpkin-500={(!$validity.valid && startValidation) ||
            error}
        class:placeholder-pumpkin-600={(!$validity.valid && startValidation) ||
            error}
        class:text-pumpkin-600={(!$validity.valid && startValidation) || error}
        use:validate={value}
    />
    <div class="absolute transform -translate-y-1.5 top-4 right-4">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400 "
            class:focus:border-pumpkin-500={(!$validity.valid &&
                startValidation) ||
                error}
            class:border-pumpkin-500={(!$validity.valid && startValidation) ||
                error}
            class:placeholder-pumpkin-600={(!$validity.valid &&
                startValidation) ||
                error}
            class:text-pumpkin-600={(!$validity.valid && startValidation) ||
                error}
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
            />
        </svg>
    </div>
</div>
