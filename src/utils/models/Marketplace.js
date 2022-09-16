import low from "lowdb";
import _ from "lodash";
import getStoragePath from "../Utils";

const FileSync = require("lowdb/adapters/FileSync");
const stacksFilePath = getStoragePath() + "/storage/stacks.json";
const customStacksFilePath = getStoragePath() + "/storage/custom-stacks.json";

/**
 * @description: Return Docker image list. If pass app id then return single object
 * @param {*} appId (optional if we pass the appId then it's return filtered object)
 * @returns [] (Array of docker stacks)
 */
export function getStacks(appId = false) {
    let DB = false;
    let returnData = [];
    let customData = [];
    let marketPlaceStacks = [];
    try {
        DB = low(new FileSync(stacksFilePath));
        if (appId) {
            returnData = getCustomStacks(appId);
            if (_.get(returnData, "@AppID", false) === appId) {
                
                
            } else {
                returnData = DB.get("stacks").find({ "@AppID": appId }).value();
            }
        } else {
            customData = getCustomStacks(appId);
            marketPlaceStacks = DB.get("stacks").value();

            if (_.isArray(marketPlaceStacks)) {
                returnData = customData.concat(marketPlaceStacks);
            } else {
                returnData = customData;
            }
            returnData = _.uniqWith(returnData, _.isEqual);
        }
    } catch (error) {
        returnData = [];
    }
    return returnData;
}

/**
 * @description: Return Docker image list. If pass app id then return single object
 * @param {*} appId (optional if we pass the appId then it's return filtered object)
 * @returns [] (Array of docker stacks)
 */
export function getCustomStacks(appId = false) {
    let DB = false;
    let returnData = [];

    try {
        DB = low(new FileSync(customStacksFilePath));
        if (appId) {
            returnData = DB.get("stacks").find({ "@AppID": appId }).value();
        } else {
            returnData = DB.get("stacks").value();
            
            returnData = _.uniqWith(returnData, _.isEqual);
        }
    } catch (error) {
        returnData = [];
    }
    return returnData;
}

/**
 *
 * @param {*} appId
 * @returns [
 * {
 * 		"@AppID": "lamp-20012021",
 * 		"@AppName": "LAMP",
 *    	"@Logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Apache_Feather_Logo.svg/100px-Apache_Feather_Logo.svg.png",
 *     	"@Description": "Perfect web development stack built with PHP, Apache, Mysql on Alpine Linux",
 *     	"@Tags": ["apache", "mysql", "php", "alpine"],
 *     	"@Website": "https://get-deck.com",
 *     	"@Github": "deck-app/lamp-stack"
 *   }
 * ]
 */
export function getNominalStackList(appId = false) {
    let returnData = [];
    let data = [];

    try {
        data = getStacks(appId);
        let tempArray = [];
        _.forEach(data, function (obj) {
            tempArray.push({
                "@AppID": obj["@AppID"],
                "@AppName": obj["@AppName"],
                "@Logo": obj["@Logo"],
            });
        });
        returnData = tempArray;
    } catch (error) {}
    return returnData;
}
