<script>
    import { LottiePlayer } from "@lottiefiles/svelte-lottie-player";
    export let showNfsdError;

    const { exec } = require("child_process");

    function openSystemPrefs() {
        exec(
            `open "x-apple.systempreferences:com.apple.preference.security?Privacy_AllFiles"`,
            (err, stdout, stderr) => {
                if (err) {
                    console.log(
                        `🚀 LOG | file: nfsdPermission.svelte | line 12 | exec | err`,
                        err
                    );
                }
            }
        );
    }

    function closeModal() {
        console.log(
            `🚀 LOG | file: NfsdPermission.svelte | line 22 | closeModal | closeModal`,
            showNfsdError
        );
        showNfsdError = false;
    }
</script>

<div
    class="fixed z-10 inset-0 overflow-y-auto {showNfsdError === false
        ? 'hidden'
        : 'block'}"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
>
    <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
        <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
        />

        <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">&#8203;</span
        >
        <div
            class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6"
        >
            <!-- Header with close button section -->
            <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                    on:click={closeModal}
                    type="button"
                    class="bg-gray-100 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-0 opacity-60 hover:opacity-100"
                >
                    <span class="sr-only">Close</span>
                    <svg
                        class="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            <!-- Content section -->
            <div class="flex flex-row gap-4">
                <div class="my-8 sm:my-8 w-1/2">
                    <h3
                        class="text-2xl leading-6 font-medium text-gray-900 mb-4 text-center"
                        id="modal-title"
                    >
                        Grant Full Disk Access to "nfsd"
                    </h3>
                    <div class="mt-2 px-4">
                        <p class="text-sm text-gray-500 text-center">
                            DECK uses NFS (Network file system) to keep your
                            local and VM directories in sync 
                        </p>
                        <ul class="list-decimal px-6 mt-4 space-y-2 text-gray-600 text-sm">
                            <li>Open your <button
                                on:click={openSystemPrefs}
                                class="text-blue-500 underline"
                                >System Preferences
                                </button>
                            </li>
                            <li>Unlock <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-pumpkin-300 inline-block" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                              </svg> and click <kbd class="kbd">+</kbd></li>
                            <li>Press <kbd class="kbd">command &#8984;</kbd> + <kbd class="kbd">shift</kbd> + <kbd class="kbd">G</kbd></li>
                            <li>Type <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-800 text-gray-100">/sbin/nfsd</span> and click 
                                <span class="inline-flex items-center px-4 py-0.5 rounded-md text-sm font-medium bg-blue-700 text-white">Go</span></li>
                        </ul>
                    </div>
                </div>
                <div
                    class="mx-auto rounded-md flex items-center justify-center h-auto m-auto bg-chillgray-500 p-8 w-1/2"
                >
                    <!-- If file type image then image tag or lottie then  LottiePlayer -->
                    <LottiePlayer
                        src="lottiefiles/nfsd-permission.json"
                        autoplay={true}
                        loop={true}
                        controls={false}
                        renderer="svg"
                        controlsLayout={[]}
                    />
                </div>
            </div>
        </div>
    </div>
</div>
