<script>
    import NfsdPermissionModal from "../../components/modals/NfsdPermission.svelte";
    let showModal = true;
    const handleToggleModal = () => {
        showModal = !showModal;
    };
</script>

<NfsdPermissionModal
    title="Edit your details"
    openModal={showModal}
    on:close={() => handleToggleModal()}
/>
