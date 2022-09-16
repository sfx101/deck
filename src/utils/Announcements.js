import _ from "lodash";

const appSettings = require("electron-settings");
const request = require("request");

const announcementApiEndpoint = `https://get-deck.com/announcements/announcements.json`;

// Announcement JSON data is here to use
export let announcementData = [];
export let unreadAnnouncementData = [];

/**
 * Update in localStore which announcement viewed by user
 */
export async function updateAnnouncementView(id) {
    try {
        let announcementsViewed = [];
        if (id) {
            announcementsViewed = await getAnnouncementViewed();
            if (_.isArray(announcementsViewed)) {
                announcementsViewed.push(id);
                setAnnouncementViewed(announcementsViewed);
            } else {
                setAnnouncementViewed([id]);
            }
        }
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Get announcement ids which is viewed by user
 */
export async function getAnnouncementViewed() {
    let returnObject;
    try {
        returnObject = await appSettings.get("announcements_viewed");
    } catch (error) {
        returnObject = [];
    }
    return returnObject;
}

/**
 * Set announcement ids which is viewed by user
 */
export function setAnnouncementViewed(x) {
    let result = false;
    try {
        if (_.isArray(x)) {
            appSettings.set("announcements_viewed", _.uniq(x));
            result = true;
        }
    } catch (error) {
        result = false;
    }
    return result;
}

/**
 * Get new announcements from server
 */
export async function getAnnouncements(endpoint) {
    return new Promise(async function (resolve, reject) {
        request(endpoint, function (error, response, body) {
            if (error) {
                reject(error);
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
}

/**
 * Get count announcements which is not view by user
 */
export async function getUnreadAnnouncementsCount() {
    let data =
        announcementData.length > 0
            ? announcementData
            : await getAnnouncements(announcementApiEndpoint);
    let idsViewed = await getAnnouncementViewed();
    return data.filter(function (itm) {
        return !_.includes(idsViewed, itm.id);
    }).length;
}

/**
 * Get all announcements
 */
export async function getAllAnnouncements() {
    announcementData = await getAnnouncements(announcementApiEndpoint);
    let idsViewed = await getAnnouncementViewed();

    unreadAnnouncementData = announcementData.filter(function (itm) {
        return !_.includes(idsViewed, itm.id);
    });

    return announcementData;
}

/**
 * Link check is it json or not and return boolean
 */
export function isJson(link) {
    console.log("🚀 LOG | file: Announcements.js | line 103 | isImage | link");
    if (_.toLower(_.last(_.split(link, "."))) === "json") return true;
    else return false;
}
