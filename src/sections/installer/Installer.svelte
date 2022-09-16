<script>
    import MacInstaller from "./macos/Installer.svelte";
    import WinInstaller from "./windows/Installer.svelte";
    import WSLStatus from "./windows/WSLStatus.svelte";
    import LinuxInstaller from "./linux/Installer.svelte";
    import { Route, router } from "tinro";

    const os = require("os");
</script>

{#if os.platform() === "win32"}
    <Route path="/">
        <WinInstaller />
    </Route>
    <Route path="/wsl-status">
        <WSLStatus />
    </Route>
{:else if os.platform() === "darwin"}
    <MacInstaller />
{:else}
    <LinuxInstaller />
{/if}
