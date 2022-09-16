import { outputIO } from './../utils/Store';

const _ = require('lodash');

export default function output(logs) {
    outputIO.set(logs);
    
}

function getCompactLog(logs) {
    let clean = logs.replace(/\[([0-9]{1,3}(;[0-9]{1,2})?)?[mGK]/g, "").split(/\r?\n/);
    if (_.isArray(clean)) {
        return _.last(clean);
    }
    
    return null;
}
