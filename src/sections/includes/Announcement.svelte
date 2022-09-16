<script>
    import { onMount } from "svelte";
    import _ from "lodash";
    import AnnouncementModal from "../../components/modals/Announcement.svelte";
    import {
        getAllAnnouncements,
        getUnreadAnnouncementsCount,
        announcementData,
        unreadAnnouncementData,
    } from "./../../utils/Announcements";

    let showAnnouncements = false;

    let currentData,
        index = 0,
        canNext = true,
        canPrevious = false,
        animate_ping = false;

    /**
     * On Mount components
     */
    onMount(async function () {
        await init();
    });

    /**
     * Init
     */
    async function init() {
        if (announcementData.length <= 0) {
            await getAllAnnouncements();
        }
        currentData = _.get(announcementData, "[" + index + "]", false);

        getUnreadAnnouncementsCount().then(
            (res) => {
                if (res > 0) {
                    animate_ping = true;
                } else {
                    animate_ping = false;
                }
            },
            (err) => {
                animate_ping = false;
            }
        );
    }

    async function handleToggleModal() {
        if (unreadAnnouncementData.length > 0) {
            let indexOfUnreadAnnouncementData = _.findIndex(
                announcementData,
                (e) => {
                    return unreadAnnouncementData[0] === e;
                },
                0
            );
            index = indexOfUnreadAnnouncementData;
        }

        currentData = _.get(announcementData, "[" + index + "]", false);
        showAnnouncements = !showAnnouncements;
    }

    function closePopup() {
        // Announcements popup model display false
        showAnnouncements = false;

        // Update announcements from server
        getAllAnnouncements();

        // Bell icon animation if unreaded announcements are there
        getUnreadAnnouncementsCount().then(
            (res) => {
                if (res > 0) {
                    animate_ping = true;
                } else {
                    animate_ping = false;
                }
            },
            (err) => {
                animate_ping = false;
            }
        );
    }

    /**
     * Show previous announcement
     */
    function previous() {
        if (index > 0) {
            index = index - 1;
        }
        currentData = announcementData[index];
        updateNextPreviousStatus();
    }

    /**
     * Show next announcement
     */
    function next() {
        if (announcementData.length - 1 > index) {
            index = index + 1;
        }
        currentData = announcementData[index];
        updateNextPreviousStatus();
    }

    /**
     * Update the status for can go next and previous
     */
    function updateNextPreviousStatus() {
        if (index > 0) {
            canPrevious = true;
        } else {
            canPrevious = false;
        }

        if (announcementData.length - 1 > index) {
            canNext = true;
        } else {
            canNext = false;
        }
    }
</script>

<button
    class="w-8 h-8 transform transition duration-500 bg-transparent relative"
    on:click={handleToggleModal}
>
    <span class="flex h-8 w-8 pointer-events-none">
        <span
            class="{animate_ping
                ? 'animate-ping'
                : ''} absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75"
        />
        <span class="relative inline-flex rounded-full h-8 w-8 bg-white">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-yellow-500 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
            </svg>
        </span>
    </span>
    <div class="sr-only">
        <p>Announcements</p>
    </div>
</button>

{#if showAnnouncements}
    <AnnouncementModal
        title=""
        bind:openAnnouncements={showAnnouncements}
        announcements={announcementData}
        {...currentData}
        on:close={closePopup}
        on:previous={previous}
        on:next={next}
        {canPrevious}
        {canNext}
    />
{/if}
