import _ from "lodash";
import run from "./../RunCommand";
import getStoragePath from "./../Utils";
import {
    initNominalStackStore,
    initStackStoreStore,
} from "./../store/Marketplace";

const fs = require("fs");
const yaml = require("js-yaml");
const download = require("download-git-repo");
const semver = require("semver");
const logger = require("electron-timber");
const request = require("request");
const path = require("path");

//Markdown JS
var hljs = require("highlight.js");
var md = require("markdown-it")({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<pre class="hljs"><code>${
                    hljs.highlight(lang, str, true).value
                }</code></pre>`;
            } catch (__) {}
        }

        return `<pre class="hljs"><code>${md.utils.escapeHtml(
            str
        )}</code></pre>`;
    },
});

/**
 * @description :  App Initialization
 * @returns Promise
 */
export function dockerStackInitialization() {
    return new Promise(async function (resolve, reject) {
        if (!fs.existsSync(getStoragePath())) {
            logger.log(`Cloning repo at ${getStoragePath()}`);
            download(
                "sfx101/docker-stacks#deck-v4",
                getStoragePath(),
                // { clone: true },
                function (err) {
                    if (err) {
                    } else {
                        // Installation of nominal stacks in store
                        initNominalStackStore();

                        // Installation of stacks in store
                        initStackStoreStore();

                        resolve({
                            code: 1,
                            message:
                                "Creating persistent storage directory at ~/.deck\n, required for storing docker projects",
                        });
                    }
                }
            );
        } else {
            if (fs.existsSync(getStoragePath() + "/.git")) {
                logger.log(`Storage path is a git repo, pulling...`);
                run(`cd .deck && git pull origin deck-v4\r`).then(
                    (ptyProcess) => {
                        resolve({
                            code: 2,
                            message: "Storage path is a git repo, pulling...",
                        });
                    },
                    (err) => {
                        reject(err);
                    }
                );
            } else {
                logger.log(
                    `Storage path is a NOT git repo, updating images...`
                );
                await downloadRepoFile(
                    "https://raw.githubusercontent.com/sfx101/docker-stacks/deck-v4/storage/stacks.json",
                    `${getStoragePath()}/storage/stacks.json`
                );
                await downloadRepoFile(
                    "https://raw.githubusercontent.com/sfx101/docker-stacks/deck-v4/storage/php.extensions.json",
                    `${getStoragePath()}/storage/php.extensions.json`
                );
                await downloadRepoFile(
                    "https://raw.githubusercontent.com/sfx101/docker-stacks/deck-v4/storage/certs/dev-cert.pem",
                    `${getStoragePath()}/storage/certs/dev-cert.pem`
                );
                await downloadRepoFile(
                    "https://raw.githubusercontent.com/sfx101/docker-stacks/deck-v4/storage/certs/dev-key.pem",
                    `${getStoragePath()}/storage/certs/dev-key.pem`
                );

                // Installation of nominal stacks in store
                initNominalStackStore();

                // Installation of stacks in store
                initStackStoreStore();

                resolve({
                    code: 3,
                    message:
                        "Storage path is a NOT git repo, updating images...",
                });
            }
        }
    });
}

/**
 * @description : Get github version Object
 * @param {*} github
 * @returns Promise
 */
export async function getGitVersionsObj(github) {
    let obj, data;
    try {
        let gitUrlArr = github.split("/");
        let gitApiUrl = `https://api.github.com/repos/${gitUrlArr[0]}/${gitUrlArr[1]}/tags`;

        obj = await new Promise(function (resolve, reject) {
            request(
                {
                    url: gitApiUrl,
                    headers: {
                        "User-Agent": "request",
                    },
                },
                function (error, response, body) {
                    data = JSON.parse(body);
                    let versions = {};
                    let latestVersion = {};
                    if (response.statusCode === 200 && data.length > 0) {
                        versions = data.sort((v1, v2) =>
                            semver.compare(v2.name, v1.name)
                        );
                        latestVersion = versions[0];
                    }

                    resolve({
                        error: error,
                        statusCode: response && response.statusCode,
                        null: _.isEmpty(_.trim(body)) ? true : false,
                        list: versions,
                        latestVersion: latestVersion,
                    });
                }
            );
        });
    } catch (error) {
        obj = "";
    }
    return obj;
}

/**
 *
 * @param {stack object} image
 * @returns Promise
 */
export async function getSettingsByImage(image) {
    let gitVersionsObj = await getGitVersionsObj(image["@Github"]);
    return new Promise(function (resolve, reject) {
        let rawSettingsYaml;
        if (_.get(image, "@LocalPath", false)) {
            rawSettingsYaml = path.join(
                _.get(image, "@LocalPath", ""),
                "settings.yml"
            );

            let body = fs.readFileSync(rawSettingsYaml, "utf8");

            resolve({
                error: "",
                statusCode: 100,
                body: body,
                yml_data: yaml.load(body),
            });
        } else {
            if (_.get(gitVersionsObj, "latestVersion.name", false)) {
                rawSettingsYaml = `https://raw.githubusercontent.com/${image["@Github"]}/${gitVersionsObj.latestVersion.name}/settings.yml`;
                request(rawSettingsYaml, function (error, response, body) {
                    resolve({
                        error: error,
                        statusCode: response && response.statusCode,
                        body: body,
                        yml_data: yaml.load(body),
                    });
                });
            } else {
                reject({
                    message: "Invalid github link.",
                });
            }
        }
    });
}

/**
 *
 * @description : Get readme data as html format.
 * @param {*} image
 * @returns {html} readmeResult
 */
export async function getReadMeByImage(image) {
    var readmeResult = "";
    try {
        let gitRepoReadmeUrl;
        if (_.get(image, "@LocalPath", false)) {
            gitRepoReadmeUrl = path.join(
                _.get(image, "@LocalPath", ""),
                "README.md"
            );
            readmeResult = md.render(fs.readFileSync(gitRepoReadmeUrl, "utf8"));
        } else {
            var gitUrl = image["@Github"];
            var gitUrlArr = gitUrl.split("/");
            var gitUser = gitUrlArr[0];
            var gitRepo = gitUrlArr[1];
            let gitVersionsObj = await getGitVersionsObj(gitUrl);
            gitRepoReadmeUrl = `https://raw.githubusercontent.com/${gitUser}/${gitRepo}/${gitVersionsObj.latestVersion.name}/README.md`;
            var getReadme = await new Promise(function (resolve, reject) {
                request(
                    gitRepoReadmeUrl,
                    { "Cache-Control": "no-cache" },
                    function (error, response, body) {
                        let res = {
                            error: error,
                            statusCode: response && response.statusCode,
                            null: _.isEmpty(_.trim(body)) ? true : false,
                            body: body,
                            html: md.render(body),
                        };
                        resolve(res);
                    }
                );
            });

            if (getReadme.statusCode == 200 && getReadme.null === false) {
                readmeResult = _.get(getReadme, "html", "").replaceAll(
                    "<a",
                    '<a class="open-external"'
                );
            }
        }
    } catch (error) {
        readmeResult = "";
    }
    return readmeResult;
}

/**
 *
 * @description : Download Repo File
 * @param {String} file
 * @param {String} writePath
 * @returns null
 */
export function downloadRepoFile(file, writePath) {
    return new Promise(function (resolve, reject) {
        request(file, function (error, response, body) {
            if (error) {
                logger.log(`Failed downloading file: ${file}`);
                reject(error);
            }

            fs.writeFileSync(writePath, body);
            logger.log(`Finished downloading file: ${file}`);
            console.log(`Finished downloading file: ${file}`);
            resolve(true);
        });
    });
}
