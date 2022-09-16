import { getDockerodeObject } from "./../Dockerode";
const network = "deck-app";

export async function createDefaultNetwork() {
    let docker = await getDockerodeObject();
    docker
        .createNetwork({
            Name: network,
            CheckDuplicate: true,
            Driver: "bridge",
        })
        .then(
            (response) => {
                console.log(`🚀 LOG | file: Network.js | line 14 | createDefaultNetwork | response`, response)
            },
            (err) => {
                console.log(`🚀 LOG | file: Network.js | line 17 | createDefaultNetwork | err`, err)
            }
        );
}
