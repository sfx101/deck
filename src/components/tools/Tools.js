const fs = require('fs');

export async function isComposerDependant(path) {
    //Does the project have a compose.json?
    try {
        const composer = path + '/composer.json';
        await fs.promises.access(composer);
        
        return true;
    } catch (error) {
        return false;
    }
}

export async function hasLaravelInstalled(path) {
    //Does the project have an artisan file?
    try {
        const artisan = path + '/artisan';
        await fs.promises.access(artisan);
        
        return true;
    } catch (error) {
        return false;
    }
}
