import { router } from "tinro";
import _ from "lodash";
import { get } from "svelte/store";
import { defaultEditorStore, defaultTerminalStore } from "./store/Settings";

const os = require("os");
const appSettings = require("electron-settings");
const detectEditors = require("detect-editors");
const detectShells = require("detect-shells");
const fs = require("fs");
const { remote } = require("electron");
const { app } = remote;
const path = require("path");

const defaultEditorLogo = "img/editors/text-editor.svg";
const defaultTerminalsLogo = "img/terminals/terminal.svg";
const availableShells = detectShells.getAvailableShells();
const availableEditors = detectEditors.getAvailableEditors();

let internalLogos = {
    editorsLogo: [],
    terminalsLogo: [],
};

// Init internal editor logos from directory
getDirImages("editors").then((images) => {
    _.forEach(images, function (value, i) {
        internalLogos.editorsLogo.push("img/editors/" + value);
    });
});

// Init internal terminal logos from directory
getDirImages("terminals").then((images) => {
    _.forEach(images, function (value, i) {
        internalLogos.terminalsLogo.push("img/terminals/" + value);
    });
});

/**
 * Determine whether the given `path` points to an empty directory.
 */
export function getDirImages(lastDirName = "editors") {
    return new Promise(async function (resolve, reject) {
        if (lastDirName === 'editors') {
            resolve(["PhpStorm.svg", "atom-editor.svg", "sublime-text.svg", "text-editor.svg", "visual-studio-code-(insiders).svg", "visual-studio-code.svg"]);
        } else {
            resolve(["hyper.svg", "terminal.svg"]);
        }
    });
}

/**
 * Init
 */
export async function initDefaultEditor() {
    let defaultEditor = await appSettings.get("settings.defaultEditor");
    return defaultEditorStore.update(() => {
        return defaultEditor;
    });
}

/**
 * Get logo image by name
 */
export function getImageByName(name, type = "editorsLogo") {
    let logo;
    if (name) {
        logo = internalLogos[type].find((imgPath) => {
            let imgName = _.first(_.split(_.last(_.split(imgPath, "/")), "."));
            return _.trim(_.lowerCase(imgName)) === _.trim((_.lowerCase(name)))
        });

        if (!logo) {
            logo =
                type === "editorsLogo"
                    ? defaultEditorLogo
                    : defaultTerminalsLogo;
        }
    } else {
        logo =
            type === "editorsLogo" ? defaultEditorLogo : defaultTerminalsLogo;
    }
    return logo;
}

/**
 * Get default editor logo
 */
export function getDefaultEditorLogo() {
    return getImageByName(getDefaultEditorName());
}

/**
 * Get default terminal logo
 */
export function getDefaultTerminalLogo() {
    return getImageByName(getDefaultTerminalName(), "terminalsLogo");
}

/**
 * Get default editor logo
 */
export function getDefaultEditorName() {
    return _.get(get(defaultEditorStore), "editor", "");
}

/**
 * Get open in editor button text
 */
export function getOpenInEditorText() {
    let editorName = getDefaultEditorName();
    if (editorName) {
        editorName = "Open In " + editorName;
    } else {
        editorName = "Open In Code Editor";
    }
    return editorName;
}

/**
 * Editor change event
 */
export async function onEditorChange(editor) {
    defaultEditorStore.update(() => {
        return editor;
    });
    await appSettings.set("settings.defaultEditor", editor);
    initDefaultEditor();

    let project = await appSettings.get("settings.lastProject");

    if (
        _.get(project, "name", false) &&
        _.get(project, "backTo", false) === "editor"
    ) {
        appSettings.set("settings.lastProject", null);

        openEditor(_.get(project, "codePath", false), project);
        router.goto("/stacks/" + project.name);
    }
}

/**
 * Get available editors list
 */
export function getAvailableEditors() {
    // detectEditors.getAvailableEditors();
    return availableEditors;
}

/**
 * Open in Editor
 */
export function openEditor(codePath, project = false) {
    if (_.get(get(defaultEditorStore), "editor", false)) {
        detectEditors.launchEditor(get(defaultEditorStore), codePath);
    } else {
        if (project) {
            appSettings.set("settings.lastProject", {
                name: project,
                codePath: codePath,
                backTo: "editor",
            });
        }
        router.goto("/settings/integrations");
    }
}

/**
 * Init Default Terminal
 */
export async function initDefaultTerminal() {
    let defaultTerminal = await appSettings.get("settings.defaultTerminal");
    return defaultTerminalStore.update(() => {
        return defaultTerminal;
    });
}

/**
 * Editor change event
 */
export async function onTerminalChange(data) {
    defaultTerminalStore.update(() => {
        return data;
    });
    await appSettings.set("settings.defaultTerminal", data);
    initDefaultTerminal();

    let project = await appSettings.get("settings.lastProject");

    if (
        _.get(project, "name", false) &&
        _.get(project, "backTo", false) === "terminal"
    ) {
        appSettings.set("settings.lastProject", null);

        openTerminal(_.get(project, "codePath", false), project);
        router.goto("/stacks/" + project.name);
    }
}

/**
 * Open in Terminal
 */
export function openTerminal(codePath, project = false) {
    if (_.get(get(defaultTerminalStore), "shell", false)) {
        detectShells.launchShell(get(defaultTerminalStore), codePath);
    } else {
        if (project) {
            appSettings.set("settings.lastProject", {
                name: project,
                codePath: codePath,
                backTo: "terminal",
            });
        }
        router.goto("/settings/integrations");
    }
}

/**
 * Get available terminals list
 */
export async function getAvailableTerminals() {
    //detectShells.getAvailableShells();
    return availableShells;
}

/**
 * Get default terminal name
 */
export function getDefaultTerminalName() {
    return _.get(get(defaultTerminalStore), "shell", "");
}

/**
 * Get terminal open button text
 */
export function getOpenInTerminalText() {
    let name = getDefaultTerminalName();
    if (name) {
        name = "Open In " + name;
    } else {
        name = "Open In Terminal";
    }
    return name;
}

/**
 * Get first item class
 */
export function getFirstItemClass(index) {
    return index === 0 || index === "0" ? "rounded-tl-md rounded-tr-md" : "";
}

/**
 * Get last item class
 */
export function getLastItemClass(index, itemLength) {
    return itemLength - 1 === index ? "rounded-bl-md rounded-br-md " : "";
}

/**
 * Get active item class
 */
export function getActiveClass(selected, current) {
    return current === selected ? "bg-blue-50 border-azure-200 z-10" : "";
}
