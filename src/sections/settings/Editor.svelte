<script>
    import { onMount } from "svelte";
    import _ from "lodash";

    import {
        initDefaultEditor,
        getImageByName,
        getFirstItemClass,
        getLastItemClass,
        getActiveClass,
        onEditorChange,
        getAvailableEditors,
    } from "../../utils/Integrations";
    import { defaultEditorStore } from "./../../utils/store/Settings";

    let editorObject = [];

    /**
     *  onMount component
     */
    onMount(async () => {
        initDefaultEditor();
        getAvailableEditors().then((res) => {
            editorObject = res;
        });
    });
</script>

{#if editorObject.length > 0}
    <fieldset class="w-3/6">
        <legend class="mb-1 text-md font-medium text-gray-800">External Editors</legend>
        <p class="mb-3 text-sm text-gray-400">
            Select a default code editor for opening projects
        </p>
        <div class="bg-white rounded-md -space-y-px">
            {#each editorObject as editor, i}
                <label
                    class="relative border p-4 flex cursor-pointer focus:outline-none flex-row justify-between gap-3  {getFirstItemClass(
                        i
                    )} {getLastItemClass(
                        i,
                        editorObject.length
                    )} {getActiveClass(
                        _.get($defaultEditorStore, 'editor', false),
                        editor.editor
                    )} "
                >
                    <div class="flex flex-row gap-3">
                        <div class="w-6 h-6">
                            <img
                                src={getImageByName(editor.editor)}
                                alt={editor.editor}
                            />
                        </div>
                        <span
                            id="privacy-setting-1-label"
                            class="block text-sm font-medium {_.get(
                                $defaultEditorStore,
                                'editor',
                                false
                            ) === editor.editor
                                ? 'text-azure-900'
                                : 'text-gray-600'}"
                        >
                            {editor.editor}
                        </span>
                    </div>
                    <input
                        checked={_.get(editor, "editor", false) ===
                            _.get($defaultEditorStore, "editor", false)}
                        on:change={() => {
                            onEditorChange(editor);
                        }}
                        value={i}
                        type="radio"
                        name="editor"
                        class="h-4 w-4 mt-0.5 cursor-pointer text-azure-600 border-gray-300 focus:ring-azure-500"
                        aria-labelledby="privacy-setting-1-label"
                        aria-describedby="privacy-setting-1-description"
                    />
                </label>
            {/each}
        </div>
    </fieldset>
{/if}
