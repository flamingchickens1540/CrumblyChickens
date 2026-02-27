<script lang="ts">
    let { link } = $props();
    import { goto } from "$app/navigation";
    import { ArrowBigLeft } from "lucide-svelte";
</script>

<button class="fixed top-2 left-2 rounded-full bg-gray-800 p-2 hover:p-3 hover:bg-gray-700 hover:top-1 hover:left-1 duration-[0.1s]" onclick={() => goto(link)}>
    <ArrowBigLeft class="text-white"/>
</button>