<script lang="ts">
	let { link } = $props();
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { ArrowBigLeft } from 'lucide-svelte';
</script>

<button
	class="fixed top-2 left-2 rounded-full bg-gray-800 p-2 hover:bg-gray-700"
	onclick={() => goto(resolve(link))}
>
	<ArrowBigLeft class="text-white" />
</button>
