<script>
    import { onMount } from "svelte";

    export let progressStatus;

    let progress = 0;
    let invervalSpeed = 10;
    let incrementSpeed = 1;

    onMount(async () => {
        let bar = document.getElementById("bar");
        let progressInterval = null;
        progressInterval = setInterval(function () {
            progress += incrementSpeed;
            bar.style.width = progress + "%";
            if (progress >= 90) {
                clearInterval(progressInterval);
            }
        }, invervalSpeed);
        bar.style.width = progressStatus + "%";
    });
</script>

<div class="w-full h-2 relative max-w-xl rounded-full overflow-hidden">
    <div class="w-full h-full bg-gray-200 absolute" />
    <div id="bar" class="h-full bg-blue-500 relative w-0" />
</div>
