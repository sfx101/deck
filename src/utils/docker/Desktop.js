const os = require('os');
const dockerode = require("dockerode");
const _ = require('lodash');
const { exec } = require('child_process');
const path = require('path');

export function launchDockerDesktop() {
    return new Promise((resolve, reject) => {
        let launchCmd;
        if (os.platform() === 'darwin') {
            launchCmd = `open /Applications/Docker.app`;
        } else {
            //TODO: accurate path detection on windows
            let dockerDesktopPath = path.join('C:\\', 'Program Files', 'Docker', 'Docker', 'Docker Desktop.exe');
            launchCmd = `cmd /C ${dockerDesktopPath}`;
        }

        exec(launchCmd, (error, stdout, stderr) => {
            if (error) reject(error);
            if (stderr) reject(stderr);
            resolve(stdout);
        });
    });

}

export function IsDockerDesktopRunning() {
    return new Promise((resolve, reject) => {
        // w/o any arguments to use default Docker socket
        let docker = new dockerode({});
        docker.info((error, info) => {
            if (error) {
                reject(error);
            }

            let name = _.get(info, 'Name');

            if (name === 'docker-desktop') {
                resolve(true);
            } else {
                resolve(false);
            }

        })
    });

}
