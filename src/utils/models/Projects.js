import getStoragePath, { getStackPath, getEnvToJson } from "../Utils";
import low from "lowdb";
import _ from "lodash";
import { get } from "svelte/store";
import { getStacks } from "./Marketplace";
import { nominalStackStore } from "./../store/Marketplace";

const fs = require("fs");
const yaml = require("js-yaml");
const projectsJsonFilePath = getStoragePath() + "/storage/projects.json";
const rimraf = require("rimraf");

const FileSync = require("lowdb/adapters/FileSync");

/**
 * @Description :  Array of stack list COMPOSE_PROJECT_NAME and indicatorColors properties from stacks.json
 * @returns: [
 * 	{
 *		"COMPOSE_PROJECT_NAME":"",
 *		"indicatorColors":""
 * 	}
 * ]
 */
export function getNominalProjectList() {
    let returnData = [];
    let stacks = [];

    try {
        stacks = getProjects();
        let nominalStacks = [];
        _.forEach(stacks, function (stackObj) {
            let newObject = {
                AppID: stackObj.AppID,
                COMPOSE_PROJECT_NAME: stackObj.COMPOSE_PROJECT_NAME,
                indicatorColors: "gray",
                isButtonLoading: false,
            };
            nominalStacks.push(newObject);
        });
        returnData = _.uniqWith(nominalStacks, _.isEqual);
    } catch (error) {
        returnData = [];
    }
    return returnData;
}

/**
 * @Description :  Array of stack list all properties from stacks.json
 * @returns: []
 */
export function getProjects(projectName = false) {
    let stackDB = false;
    let stacks = [];
    let returnData = [];

    try {
        stackDB = low(new FileSync(projectsJsonFilePath));
        if (projectName) {
            stacks = stackDB
                .get("projects")
                .find({ COMPOSE_PROJECT_NAME: projectName })
                .value();
            returnData = stacks;
        } else {
            stacks = stackDB.get("projects").value();
            returnData = _.uniqWith(stacks, _.isEqual);
        }
    } catch (error) {
        returnData = [];
    }
    return returnData;
}

/**
 * @description : Add new project on project json by passing object. *
 * @param {*} projectObject
 * @returns boolean
 */
export function addNewProject(projectObject) {
    try {
        let projectDB = low(new FileSync(projectsJsonFilePath));
        projectDB.defaults({ projects: [] }).write();

        // Write everything now to stack configuration
        projectDB.get("projects").push(projectObject).write();

        return true;
    } catch (error) {
        return false;
    }
}

/**
 * @description : Update existing project info of project json file.
 * @param {*} projectName
 * @param {*} projectObject
 * @returns boolean
 */
export function updateProject(projectName, projectObject) {
    try {
        let projectDB = low(new FileSync(projectsJsonFilePath));
        // Write everything now to stack configuration
        projectDB
            .get("projects")
            .find({ COMPOSE_PROJECT_NAME: projectName })
            .assign(projectObject)
            .write();

        return true;
    } catch (error) {
        return false;
    }
}

/**
 * @Description :  Remove stack from stacks.json
 * @returns: []
 */
export function removeProject(projectName) {
    let stackDB = false;
    let returnData = false;

    try {
        stackDB = low(new FileSync(projectsJsonFilePath));
        if (projectName) {
            stackDB
                .get("projects")
                .remove({
                    COMPOSE_PROJECT_NAME: projectName,
                })
                .write();
            returnData = true;
        }
    } catch (error) {
        returnData = false;
    }
    return returnData;
}

/**
 * @description : Remove project json
 * @returns Promise
 */
export function resetProject() {
    return new Promise(function (resolve, reject) {
        rimraf(
            projectsJsonFilePath,
            function () {
                resolve(true);
            },
            function (err) {
                reject(err);
            }
        );
    });
}

/**
 * @description: Get stack env to JSOn object by project name
 * @returns : {}
 */
export function getProjectEnv(projectName) {
    let envPath = getStackPath(projectName) + "/.env";
    var env = fs.readFileSync(envPath, "utf8");
    return getEnvToJson(env);
}

/**
 * @description: Get setting yml to JSON object by project name
 * @returns : Promise to get project settings yml in json format
 */
export function getProjectSettings(projectName) {
    const settings_path = getStackPath(projectName) + "/settings.yml";

    return new Promise(function (resolve, reject) {
        try {
            let file_content = fs.readFileSync(settings_path, "utf8");
            let settings = yaml.load(file_content);
            resolve(settings);
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * @description: Get stack details like env, settings, image.
 * @returns : {}
 */
export function getProjectDetails(projectName) {
    let stack = getProjects(projectName);
    let envData = getProjectEnv(projectName);
    let image = getStacks(stack.AppID);
    return {
        ...stack,
        env: envData,
        image: image,
    };
}

/**
 * @param {*} projectName
 * @return containers array
 */
export function getContainers(projectName) {
    let stack = getProjects(projectName);
    if (_.get(stack, "containers", false)) {
        return stack.containers;
    } else {
        return [];
    }
}

/**
 * @param {*} projectName
 * @return HTTP_PORT array
 */
export function getHttpPort(projectName) {
    let stack = getProjects(projectName);
    if (_.get(stack, "STACK_HTTP_PORT", false)) {
        return stack.STACK_HTTP_PORT;
    } else {
        return [];
    }
}

/**
 * @description: Get dynamic form object by project name for update the stack
 * @returns : Promise to get project settings yml in json format
 */
export function getFormObject(projectName) {
    return new Promise(function (resolve, reject) {
        getProjectSettings(projectName).then((settings) => {
            let envData = getProjectEnv(projectName);
            let stack = getProjects(projectName);
            getFormFields(projectName, settings, envData, stack).then(
                (formFields) => {
                    let formValues = getFormValues(formFields);
                    resolve({
                        formInputFields: formFields,
                        formDefaultValues: formValues,
                    });
                },
                (err) => {
                    reject(err);
                }
            );
        });
    });
}

/**
 * @description: It's return form value's object using form fields object which generated by using getFormFields function.
 * @returns : {
 * 	stack_name:""
 * 	...
 * }
 */
function getFormValues(formFields) {
    let returnData = [];
    _.forEach(formFields, function (chankObj, chankKey) {
        _.forEach(chankObj, function (obj, key) {
            returnData[obj.key] = obj.value;
        });
    });
    return returnData;
}

/**
 * @Description : get the formated form fileds object
 * @param {*} projectName
 * @param {*} settings
 * @param {*} envData
 * @returns {}
 */
async function getFormFields(projectName, settings, envData, stack) {
    let nominalStack = get(nominalStackStore).find(
        (x) => x["@AppID"] === _.get(stack, "AppID", false)
    );
    let returnData = [
        [
            {
                key: "stack",
                label: "Stack",
                hint: "",
                type: "input",
                target: "",
                value: _.get(nominalStack, "@AppName", ""),
                disabled: true,
            },
            {
                key: "stack_name",
                label: "Host",
                hint: "",
                type: "input",
                target: "",
                value: "https://" + projectName + ".stacks.run",
                disabled: true,
            },
        ],
    ];

    if (_.get(settings, "system.show_localpath_selector", false)) {
        if (settings.system.show_localpath_selector) {
            let data = {
                key: "project_path",
                label: "Path",
                hint: "",
                type: "path",
                target: "APP_CODE_PATH_HOST",
                value: stack.APP_CODE_PATH_HOST,
            };
            returnData[0].push(data);
        }
    }

    if (_.get(settings, "user", false)) {
        let userData = [];
        _.forEach(settings.user, function (obj, key) {
            if (obj.type === "select") {
                let data = {
                    disabled_post_install: _.get(
                        obj,
                        "disabled_post_install",
                        false
                    ),
                    key: key,
                    label: obj.label,
                    hint: obj.hint,
                    type: "select",
                    target: obj.target,
                    values: obj.values,
                    value: envData[obj.target],
                };
                userData.push(data);
            }
            if (obj.type === "input") {
                let data = {
                    key: key,
                    label: obj.label,
                    hint: obj.hint,
                    type: "input",
                    target: obj.target,
                    values: obj.values,
                    value: envData[obj.target],
                };
                userData.push(data);
            }
            if (obj.type === "checkbox") {
                let data = {
                    show_on_install: _.get(obj, "show_on_install", false),
                    key: key,
                    label: obj.label,
                    hint: obj.hint,
                    type: "checkbox",
                    target: obj.target,
                    value:
                        envData[obj.target] === "true" ||
                        envData[obj.target] === true
                            ? true
                            : false,
                };
                userData.push(data);
            }
        });
        returnData.push(userData);
    }

    return returnData;
}

/**
 * @Description : get default stack form value from setting.yml using project name.
 * the perpuse to create this function to solve the compare object and save button enable and disable
 * @param {*} projectName
 * @returns {
 * 	input_key1 : input_value1,
 *  input_key2 : input_value2
 *  .
 *  .
 *  .
 * }
 */
export async function getDefaultFormValue(projectName) {
    let formObject = await getFormObject(projectName);
    return _.get(formObject, "formInputFields", false)
        ? formObject.formInputFields
        : {};
}

/**
 * @description : Create a formatted array for form values
 * @param {*} formFields
 * @returns [{field_name:value}, {field_name:value} ...]
 */
export function getFormValueByFormFields(formFields) {
    let returnData = {};
    formFields.forEach((forms) => {
        forms.forEach((form) => {
            returnData[form.key] = form.value;
        });
    });
    return returnData;
}

/**
 *
 * @param {*} projectName
 * @returns boolean
 */
export function isProjectNameAvailable(projectName) {
    let returnData = true;
    let stacks = getProjects();
    if (_.isArray(stacks)) {
        let data = stacks.find((x) => {
            return x["COMPOSE_PROJECT_NAME"] === projectName;
        });
        if (_.get(data, "COMPOSE_PROJECT_NAME", false)) {
            returnData = false;
        }
    }
    return returnData;
}
