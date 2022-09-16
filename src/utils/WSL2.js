const { PowerShell } = require('node-powershell');
const os = require('os');

export async function iSWSL2Installed() {
    if (os.platform() !== 'win32') return null;
    const status = await getWSL2Status();
    return {
        wsl2: status.match('Default Version: 2'),
        deck: status.match('Default Distribution: deck-app')
    };
}


async function getWSL2Status() {
    //Bug https://stackoverflow.com/questions/66127118/why-cannot-i-match-for-strings-from-wsl-exe-output
    //Same is also posted on official WSL repo in Github
    const out = await PowerShell.$`$status = (wsl --status); $status -Replace "\`0", ""`;
    if (out.hadErrors === false)
        return out.raw
    
    return false;
}
