import { Terminal } from 'xterm';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { FitAddon } from 'xterm-addon-fit';
import { isElementInViewport } from "../utils/Utils";

let fitAddon = null;

export function getXtermInstance() {
    const xterm = new Terminal({
        theme: getThemeColor(),
        convertEol: true
    });

    fitAddon = new FitAddon();

    /**
     * Load xterm addons
     */
    xterm.loadAddon(new WebLinksAddon());
    xterm.loadAddon(fitAddon);

    return {
        x: xterm,
        f: fitAddon
    };
}

export function fitXterm(fitAddonInstance, el) {
    if (isElementInViewport(el)) {
        console.log(`🚀 LOG | file: Xterm.js | line 29 | fitXterm | fitAddonInstance`, 'Element in viewport, fitting xterm container')
        fitAddonInstance.fit();
    }
}

function getThemeColor() {
    return {
        background: "#161e2e",
        foreground: "#fff",
        cursor: "#fff",
        selection: "#6610f280",
    };
}
