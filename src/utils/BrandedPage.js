// If stack name is LAMP, LEMP, Nginx, Apache
// && the user selected directory is not empty
// then insert a default branded page at server root

import { isEmptyDir } from "./Utils";
import _ from "lodash";

const http = require('https');
const fs = require('fs');

// Ok to insert default page on path?
export function insertDefaultPage(stack, path) {
    // Name in array of defaults?
    // && selected path is empty
    // @returns boolean
    const index = _.indexOf(['LAMP', 'LEMP', 'Apache + PHP', 'Nginx + PHP'], stack);
    
    if (index === -1)
        return false;

    isEmptyDir(path).then((res) => {
        if (res) {
            downloadDefaultPage(path + '/index.html');
            
        } else {
            console.warn(`🚀 LOG | file: BrandedPage.js | line 25 | isEmptyDir | catch`, 'Not empty');
        }
    });
}

function downloadDefaultPage(path) {
    const file = fs.createWriteStream(path);
    http.get("https://raw.githubusercontent.com/deck-app/stack-preview-screen/main/default/index.html", (response) => {
        response.pipe(file);
    });
}

