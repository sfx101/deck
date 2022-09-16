<script>
    import { router } from "tinro";
    export let title = "No images";
    export let subTitle = "Please check your internet connection.";
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="text-center">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="mx-auto h-12 w-12 text-chillgray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
    </svg>
    <h3 class="mt-2 text-sm font-medium text-gray-900">{title}</h3>
    <p class="mt-1 text-sm text-gray-500">
        {subTitle}
    </p>
</div>
