import { projectStore } from "../../utils/store/Projects";
import { settingsStore } from "../../utils/store/Settings";
import { get } from "svelte/store";

import start from "../../utils/docker/Start";
import stop from "../../utils/docker/Stop";
import restart from '../../utils/docker/Restart'
import logIntoShell from "../../utils/docker/Shell";

import {
    openEditor,
    getDefaultEditorLogo,
    getOpenInEditorText,
    openTerminal,
    getOpenInTerminalText,
    getDefaultTerminalLogo
} from "../Integrations";
import { openCodePath, getStackPath } from "../../utils/Utils";

const { remote, shell } = require("electron");
const { Menu, MenuItem } = remote;
const os = require('os');

/**
 * Show context menu when right clicked on project list items
 */
export function showContextMenu(e) {
    if (e.target.classList.contains('context-menu')) {
        const projectName = e.target.innerText;
        const stack = get(projectStore).find(
            (item) => item.COMPOSE_PROJECT_NAME === projectName
        );
        console.log(`🚀 LOG | file: Projects.js | line 15 | showContextMenu | stack`, stack)
        const template = [
            {
                label: "Start project",
                click: () => {
                    start(stack.COMPOSE_PROJECT_NAME);
                }
            },
            {
                label: "Stop project",
                click: () => {
                    stop(stack.COMPOSE_PROJECT_NAME);
                }
            },
            {
                label: "Restart project",
                click: function () {
                    restart(projectName)
                }
            },
            { type: 'separator' },
            {
                label: 'Open in Browser',
                submenu: [
                    {
                        label: 'Secure',
                        click: () => {
                            shell.openExternal(`https:${projectName}.stacks.run`)
                        }
                    },
                    {
                        label: 'Non secure',
                        click: () => {
                            shell.openExternal(`http:localhost:${stack.STACK_HTTP_PORT}`)
                        }
                    }
                ]
            },
            {
                label: 'Shell access to project',
                submenu: containerActions(projectName, stack.containers, 'shell')
            },
            {
                label: 'View project logs',
                submenu: containerActions(projectName, stack.containers, 'logs')
            },

            { type: 'separator' },
            {
                label: getOpenInEditorText(),
                enabled: stack.APP_CODE_PATH_HOST.length !== 0,
                click: function () {
                    openEditor(
                        stack.APP_CODE_PATH_HOST,
                        projectName
                    );
                }
            },
            {
                label: getOpenInTerminalText(),
                enabled: stack.APP_CODE_PATH_HOST.length !== 0,
                click: function () {
                    openTerminal(
                        stack.APP_CODE_PATH_HOST,
                        projectName
                    );
                }
            },
            {
                label: `Open project in ${os.platform() === 'darwin' ? 'Finder' : 'File explorer'}`,
                enabled: stack.APP_CODE_PATH_HOST.length !== 0,
                click: function () {
                    openCodePath(stack.APP_CODE_PATH_HOST);
                }
            },

            { type: 'separator' },

            {
                label: `Edit Dockerfiles`,
                click: function () {
                    openEditor(
                        getStackPath(projectName),
                        projectName
                    );
                }
            },
            {
                label: `Stack documentation`,
                click: function () {
                }
            },
            { type: 'separator' },
            {
                label: 'Delete project',
                click: function () {
                }
            },
        ];
        const menu = Menu.buildFromTemplate(template);
        menu.popup({ window: remote.getCurrentWindow() })
    }
}

function containerActions(projectName, containers, action) {
    let submenu = []
    for (const container of containers) {
        submenu.push({
            label: container,
            click: () => {
                if (action === 'shell') {
                    logIntoShell(projectName, container);
                } else if (action === 'logs') {
                    console.log('Open logs');
                }
            }
        });
    }
    return submenu;
}
