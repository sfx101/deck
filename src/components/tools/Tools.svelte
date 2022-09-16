<script>
    import _ from "lodash";
    import { projectStore } from "../../utils/store/Projects";
    import { isComposerDependant, hasLaravelInstalled } from "./Tools";
    import Button from "../../components/tools/Button.svelte";

    export let projectName;

    let project, hasComposer, hasLaravel, execInProgress;

    $: {
        project = $projectStore.find(
            (item) => item.COMPOSE_PROJECT_NAME === projectName
        );

        if (_.get(project, "APP_CODE_PATH_HOST", false)) {
            (async () => {
                hasComposer = await isComposerDependant(
                    project.APP_CODE_PATH_HOST
                );
                hasLaravel = await hasLaravelInstalled(
                    project.APP_CODE_PATH_HOST
                );
            })();
        }
    }

    let composerTools = [
        "composer install",
        "composer update",
        "composer dump-autoload",
        "composer clear-cache",
    ];

    let laravelTools = [
        "artisan key:generate",
        "artisan migrate",
        "artisan db:seed",
        "artisan cache:clear",
        "artisan view:clear",
        "artisan config:clear",
    ];
</script>

{#if _.get(project, "APP_CODE_PATH_HOST", false)}
    <div class={hasComposer ? "visible" : "hidden"}>
        <dl
            class="bg-gray-50 shadow-sm rounded-lg p-4 inline-flex flex-col w-full h-fit-content gap-2 break-inside mb-6"
        >
            <div class="text-gray-400 flex flex-wrap items-center">
                <span class="mr-2">Power tools</span>
                <span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 text-yellow-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </span>
            </div>
            <div class="text-gray-400 text-xs">
                Run commands in the project by clicking on the buttons
            </div>

            <div class="flex flex-wrap gap-2 py-2">
                {#each composerTools as composerTool}
                    <Button
                        cmd={composerTool}
                        containers={project.containers}
                        {projectName}
                    />
                {/each}
            </div>
            <div
                class="flex flex-wrap gap-2 py-2 {hasLaravel
                    ? 'visible'
                    : 'hidden'}"
            >
                {#each laravelTools as laravelTool}
                    <Button
                        cmd={"php " + laravelTool}
                        containers={project.containers}
                        {projectName}
                    />
                {/each}
            </div>
        </dl>
    </div>
{/if}
