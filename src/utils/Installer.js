const { exec } = require('child_process');
/**
 * returns Promise
 */
export function getMultipassIP() {
    return new Promise((resolve, reject) => {
        exec('multipass info deck-app', (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }

            
            let match = stdout.match(/192\.168\.[0-9]{1,3}\.[0-9]{1,3}/);
            
            try {
                resolve(match[0]);
            } catch (error) {
                reject(error);
            }
        });
    });
}
