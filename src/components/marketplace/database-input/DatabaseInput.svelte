<script>
    import _ from "lodash";

    import DataBaseName from "./DataBaseName.svelte";
    import Password from "./Password.svelte";
    import UserName from "./UserName.svelte";

    export let errorDbName;
    export let errorDbUser;
    export let errorDbPassword;
    export let valueDbName;
    export let valueDbUser;
    export let valueDbPassword;
</script>

<div class="pt-6">
    <p
        class="block text-sm font-medium text-gray-700 pb-2 mb-6 border-b border-gray-200"
    >
        Database credentials
    </p>
    <div class="grid grid-cols-2 gap-4 items-start">
        <div class="col-span-1">
            <span class="text-gray-500 text-xs"
                >Create database, user and password</span
            >
        </div>
        <div class="col-span-1">
            <!-- Database name -->
            <DataBaseName error={errorDbName} bind:value={valueDbName} />

            <!-- User name -->
            <UserName error={errorDbUser} bind:value={valueDbUser} />

            <!-- Password -->
            <Password error={errorDbPassword} bind:value={valueDbPassword} />
        </div>
    </div>
</div>
