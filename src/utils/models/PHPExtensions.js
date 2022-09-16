import getStoragePath from "../Utils";
import low from "lowdb";
import _ from "lodash";

import { getProjectEnv } from "./Projects";

const fs = require("fs");
const yaml = require("js-yaml");

const FileSync = require("lowdb/adapters/FileSync");

/**
 * @Description :  Array of stack list all properties from stacks.json
 * @returns: []
 */
export function getExtensions() {
    const filePath = getStoragePath() + "/storage/php.extensions.json";

    let DB = false;
    let values = [];
    let returnData = [];

    try {
        DB = low(new FileSync(filePath));
        values = DB.get("extensions").value();
        returnData = _.uniqWith(values, _.isEqual);
        returnData = _.reverse(returnData);
    } catch (error) {
        returnData = [];
    }
    return returnData;
}

/**
 * @Description : This object for php extensions custom select form its used on install form on marketplace
 * @returns: [
 * {
 *		label: "PHP extensions",
 *		hint: "",
 *		values: ['extensions-1', 'extensions-2' ...],
 *		target: "NETWORKS_DRIVER",
 *	}
 * ]
 */
export function getPHPExtensionsFieldObject() {
    let values = getPHPExtensionsOptions();

    return {
        label: "PHP extensions",
        hint: "Select any php extensions",
        values: values,
        target: "INSTALL_ADDITIONAL_EXTENSIONS",
        default: [],
    };
}

/**
 * @description:Get the list of networks for select option
 * @returns ['network_name_1','network_name_2' ...]
 */
export function getPHPExtensionsOptions() {
    let values = [];
    _.forEach(getExtensions(), function (val) {
        values.push(val);
    });
    return values;
}

/**
 * @description : Get the major version
 *
 * @param {*} version
 * @returns {String} major version
 */
function getMajorVersion(version) {
    return _.get((version + "").split("."), "[0]", "");
}

/**
 * @description : Get the php extensions name with php version added.
 *
 * @param {String} name
 * @param {*} phpVersion
 * @returns {String}
 */
function getNameWithVersion(name, phpVersion) {
    return _.replace(name, "php-", "php" + phpVersion + "-");
}

/**
 * @description : Get the php extensions name without php version.
 *
 * @param {String} name
 * @returns {String}
 */
export function getName(name) {
    let nameArr = _.split(name, "-");
    if (nameArr.length > 0) {
        nameArr[0] = "php";
    }
    return _.join(nameArr, "-");
}

/**
 * @description : Get formatted php extensions
 *
 * @param {Array} phpExtensions
 * @param {*} phpVersion
 * @returns {String} installAdditionalExtensions
 */
export function getFormattedName(phpExtensions, phpVersion = 7.8) {
    let installAdditionalExtensions = "";
    phpVersion = getMajorVersion(phpVersion);

    if (_.isArray(phpExtensions)) {
        phpExtensions.forEach((phpExtension) => {
            installAdditionalExtensions =
                installAdditionalExtensions +
                " " +
                getNameWithVersion(phpExtension, phpVersion);
        });
        installAdditionalExtensions = _.trim(installAdditionalExtensions);
    } else {
        installAdditionalExtensions = getNameWithVersion(
            phpExtensions,
            phpVersion
        );
    }
    return installAdditionalExtensions;
}
