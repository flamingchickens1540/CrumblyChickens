<script lang="ts">
	import FuelCounter from './FuelCounter.svelte';
	import PlusMinusButton from './PlusMinusButton.svelte';
	import BottomButton from './BottomButton.svelte';

	const { container } = $props();

	let stage = $derived(container.stage);
	let activeKey = $derived(container.activeKey);
	let count = $state(0);

	$effect(() => {
		if (activeKey) {
			count = container[activeKey] ?? 0;
		}
	});

	$effect(() => {
		if (activeKey) {
			container[activeKey] = count;
		}
	});
</script>

<FuelCounter label="Fuel" {stage} {count} />
<div class="grid-wrap mx-3 mt-0 mb-3 grid grid-cols-2 grid-rows-[45dvh_1fr] px-1 pt-0 pb-1">
	<PlusMinusButton value={+1} bind:count classlist="bg-[#49A078] hover:bg-[#6DB393]" />
	<PlusMinusButton value={+5} bind:count classlist="bg-[#49A078] hover:bg-[#6DB393]" />
	<PlusMinusButton value={-1} bind:count classlist="col-span-2 bg-[#FF6663] hover:bg-[#FF8582]" />
</div>
<BottomButton label="Back" {container} />