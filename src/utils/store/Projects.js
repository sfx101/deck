/**
 * @author : DECK Contributors
 * @description : This is store file for stack all shared values are define here.
 */

import { writable, readable } from "svelte/store";
import { getNominalProjectList, getProjects } from "../models/Projects";

/**
 *
 * @returns: [
 * 	{
 *      "AppID":"",
 * 		"Logo":"",
 *		"COMPOSE_PROJECT_NAME":"",
 *		"indicatorColors":""
 * 	}
 * ]
 */
export const nominalProjectStore = writable(getNominalProjectList());

/**
 * Note : This is no useable variable need to confirmation for remove.
 * @returns  : [
 * 	{
 * 		"AppID": "",
 * 		"containers": [],
 * 		"tags": [],
 * 		"COMPOSE_PROJECT_NAME": "",
 * 		"STACK_OPEN_PORTS": [],
 * 		"APP_CODE_PATH_HOST": "",
 * 		"STACK_HTTP_PORT": 58264,
 * 		"PMA_PORT": null
 * 	}
 * ]
 */
export const projectStore = writable(getProjects());

/**
 *
 * @returns
 */
export const detailedStackStore = readable(null, function start(set) {
    // implementation goes here
    return function stop() {};
});

/**
 * @description: Stack update form values are store here
 * @returns : {
 *  customize_server_root_path: ""
 *  db_name: ""
 *  db_user: ""
 *  php_error_reporting: true
 *  php_mongodb_version: true
 *  php_version: ""
 *  project_path: ""
 *  site_type: ""
 *  stack_name: ""
 * }
 */
export const formFieldsStore = writable([]);

/**
 * @author: DECK Contributors
 * @description: This track the form is updated or not for stack update-form.
 */
export const isFormUpdated = writable(false);

/**
 * @author: DECK Contributors
 * @description: When we update and save the stack configuration form validation error
 * Store here because all input's and save button are in different components and html structure
 * level.
 */
export const stackUpdateErrors = writable({});

/**
 * @author: DECK Contributors
 * @description: Header loader store variable.
 */
export const headerLoaderStore = writable({
    loading: false,
    message: "Rebuilding project, time elapsed",
    projectName: false,
});
