<script>
    /**
     * @author : DECK Contributors
     * @description : For select loac path using ipc renderer
     */
    import _ from "lodash";
    import { afterUpdate, createEventDispatcher } from "svelte";
    import { requiredValidator } from "./../../../utils/validator/Validators.js";
    import { createFieldValidator } from "./../../../utils/validator/Validation.js";

    const dispatch = createEventDispatcher();
    const { ipcRenderer } = require("electron");
    const [validity, validate] = createFieldValidator(requiredValidator());

    export let error;
    export let projectPath = "";

    let canValidate = false,
        startValidation = false,
        isInvalidInput = false;

    $: isInvalidInput =
        (!$validity.valid && startValidation) || error ? true : false;

    afterUpdate(
        _.debounce(() => {
            if (canValidate) {
                dispatch("selectChange", {
                    project_path: projectPath,
                });
            } else {
                canValidate = true;
            }
        }, 500)
    );

    /**
     * @description : IPC return select path
     */
    ipcRenderer.on("selected-directory", (event, path) => {
        // Init project path
        if (_.isArray(path)) {
            if (path.length > 0 && path[0] != "") {
                projectPath = path[0];
            }
        }

        // Validate path select
        setTimeout(startValidate, 50);
    });

    /**
     * @description : Select path using ipc
     */
    function selectPath() {
        startValidate();
        ipcRenderer.send("open-file-dialog");
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
    <p
        class="block text-sm font-medium text-gray-700 pb-2 mb-6 border-b border-gray-200"
    >
        Project path
    </p>
    <div class="grid grid-cols-2 gap-4 items-start">
        <div class="col-span-1">
            <span class="text-gray-500 text-xs"
                >The selected path is where your codes are, use an existing
                project path or a new one. You may open up this path in your
                code editor to do changes in real time
            </span>
        </div>
        <div class="col-span-1">
            <div class="form-control relative">
                <input
                    on:click={selectPath}
                    bind:value={projectPath}
                    name="project_path"
                    type="text"
                    placeholder="Click to select project path"
                    class="input input-bordered h-10 pr-10 focus:ring-0 cursor-pointer text-gray-700"
                    class:focus:border-pumpkin-500={isInvalidInput}
                    class:border-pumpkin-500={isInvalidInput}
                    class:placeholder-pumpkin-600={isInvalidInput}
                    class:text-pumpkin-600={isInvalidInput}
                    use:validate={projectPath}
                />
                <div class="absolute transform -translate-y-1.5 top-4 right-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gray-400 "
                        class:focus:border-pumpkin-500={isInvalidInput}
                        class:border-pumpkin-500={isInvalidInput}
                        class:placeholder-pumpkin-600={isInvalidInput}
                        class:text-pumpkin-600={isInvalidInput}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</div>
