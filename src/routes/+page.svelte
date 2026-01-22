<script lang="ts">
	import PlusMinus from '$lib/components/plus-minus.svelte';
	import Button from '$lib/components/MyButton.svelte';
	let count = $state(0);
	let activePage: GroupPage | null = $state(null);
	type GroupPage = 'home' | 'login' | 'buttons';

	function toggleA(value: GroupPage) {
		activePage = activePage === value ? null : value;
	}

	const groupPage: { label: string; value: GroupPage }[] = [
		{ label: 'Home', value: 'home' },
		{ label: 'Login', value: 'login' },
		{ label: 'Buttons', value: 'buttons' }
	];
</script>

{#each groupPage as btn}
	<Button label={btn.label} toggle={() => toggleA(btn.value)} />
{/each}

<br />

<div class="m-3 w-vw h-vh rounded-lg border-5 border-[gray-900] bg-[#2C2C2C]">
	{#if activePage === 'buttons'}
		<div class="mb-0 mt-3 mx-3 flex justify-between p-1">
			<span class="mx-3 mt-2 font-[Poppins] text-xl text-white"><strong>Fuel</strong></span>
			<span class="mx-3 mt-2 font-[Poppins] text-xl text-white">Total in tele: {count}</span>
		</div>
		<div class="grid-wrap mb-3 mx-3 mt-0 inline-grid w-110 grid-cols-2 grid-rows-[375px_1fr] p-1">
			<PlusMinus value={+1} bind:count classlist="col-span-1 bg-[#49A078] hover:bg-[#6DB393]" />
			<PlusMinus value={+5} bind:count classlist="col-span-1 bg-[#49A078] hover:bg-[#6DB393]" />
			<PlusMinus value={-1} bind:count classlist="col-span-2 bg-[#FF6663] hover:bg-[#FF8582]" />
		</div>
	{/if}
</div>
