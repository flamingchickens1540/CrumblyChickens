<script lang="ts">
	import PlusMinus from '$lib/components/plus-minus.svelte';
    let count = $state(0);
</script>

<div
	class="m-3 inline-flex flex-row flex-wrap gap-1
	       rounded-lg border-5 border-[#1b2d48]
	       bg-[#1f3454] p-1">
<PlusMinus value={-1} bind:count />
<PlusMinus value={+1} bind:count />
<PlusMinus value={+5} bind:count />
</div>

<p class="mx-3 mt-2 font-mono text-lg">Counter: {count}</p>
