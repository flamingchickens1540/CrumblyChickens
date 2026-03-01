<script lang="ts">
    let { link } = $props();
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
    import { ArrowBigLeft } from 'lucide-svelte';
</script>

<button
    class="fixed top-2 left-2 rounded-full bg-[#4c4c4c] p-2 hover:bg-[#ff77d3]"
    onclick={() => goto(resolve(link))}
>
    <ArrowBigLeft class="text-white" />
</button>
