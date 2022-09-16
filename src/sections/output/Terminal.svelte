<script>
    import { onMount } from "svelte";
    import { getXtermInstance, fitXterm } from "./../../utils/Xterm";
    import { getPtyProcess } from "./../../utils/Pty";
    import {
        controls,
        terminalReader,
        terminalWriter,
    } from "./../../utils/Store";

    const _ = require("lodash");
    const xtermInstance = getXtermInstance();
    const xterm = xtermInstance.x;
    const fitAddon = xtermInstance.f;

    let xtermContainer = null;

    $: if ($controls.terminal) {
        setTimeout(() => {
            fitXterm(fitAddon, xtermContainer);
        }, 1500);
    }

    onMount(() => {
        
        xtermContainer = document.querySelector("#xterm-terminal");
        if (xtermContainer) {
            xterm.open(xtermContainer);
            let ptyProcess = getPtyProcess();

            ptyProcess.onData((data) => xterm.write(data));
            xterm.onData((data) => ptyProcess.write(data));

            ptyProcess.onExit((code) => {
                
                
            });

            // terminalReader.subscribe((value) => {
            //     xterm.write(value);
            // });

            // ptyProcess.on("exit", () => {
            //     ptyProcess = getPtyProcess();
            // });

            // xterm.onData((data) => terminalWriter.set(data));
            
        } else {
            
        }
    });

    window.addEventListener(
        "resize",
        _.debounce(function (event) {
            fitXterm(fitAddon, xtermContainer);
        }, 1500),
        true
    );
</script>

<div
    id="xterm-terminal"
    class="
        {$controls.terminal == true ? 'block' : 'hidden'} 
        w-full h-full pt-2
        text-chillgray-300 text-sm font-mono subpixel-antialiased leading-8 
        overflow-hidden"
/>
