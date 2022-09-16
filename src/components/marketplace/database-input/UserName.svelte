<script>
    import _ from "lodash";
    import { requiredValidator } from "./../../../utils/validator/Validators.js";
    import { createFieldValidator } from "./../../../utils/validator/Validation.js";

    export let error;
    export let value;

    const [validity, validate] = createFieldValidator(requiredValidator());
    let startValidation = false;
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
        name="db_user"
        type="text"
        placeholder="User"
        class="input input-bordered h-10 focus:ring-0 text-gray-700"
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
            class="h-5 w-5 text-gray-400"
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
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
            />
        </svg>
    </div>
</div>
