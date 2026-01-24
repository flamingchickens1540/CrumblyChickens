<script lang="ts">
	import ActionButton from '$lib/components/ActionButton.svelte';
	import Display from '$lib/components/Display.svelte';

	let count = $state(0);
	let activePage: GroupPage | null = $state('plusminus');
	type GroupPage = 'home' | 'login' | 'plusminus' | 'auto' | 'tele';
	type Stage = 'Pre-Match' | 'Autonomous' | 'Teleoperated' | 'Post-Match';
	const stages: Stage[] = ['Pre-Match', 'Autonomous', 'Teleoperated', 'Post-Match'];

	let stage = $state<Stage>('Pre-Match');

	function nextStage() {
		const currentIndex = stages.indexOf(stage);
		stage = stages[(currentIndex + 1) % stages.length];
	}

	function togglePage(value: GroupPage) {
		activePage = activePage === value ? null : value;
	}
</script>

<br />

{#if activePage === 'plusminus'}
	<Display currentStage={stage} />
	<div class="mx-3 mt-3 mb-0 flex justify-between p-1">
		<span class="mx-3 mt-2 font-[Poppins] text-xl text-white">
			<strong>Fuel</strong>
		</span>
		<span class="mx-3 mt-2 font-[Poppins] text-xl text-white">
			Total in {stage}: {count}
		</span>
	</div>

	<div class="grid-wrap mx-3 mt-0 mb-3 grid grid-cols-2 grid-rows-[45dvh_1fr] p-1">
		<ActionButton value={+1} bind:count classlist="col-span-1 bg-[#49A078] hover:bg-[#6DB393]" />
		<ActionButton value={+5} bind:count classlist="col-span-1 bg-[#49A078] hover:bg-[#6DB393]" />
		<ActionButton value={-1} bind:count classlist="col-span-2 bg-[#FF6663] hover:bg-[#FF8582]" />
	</div>

	<ActionButton
		label="Back"
		onClick={() => (activePage = null)}
		classlist="fixed bottom-0 left-3 right-3 p-2 bg-gray-600 hover:bg-gray-400"
	/>
{/if}

<button class="text-white" onclick={nextStage}>{stage}; admin: nextstage</button>

<style>
	:global(body) {
		background-color: #2c2c2c;
	}
</style>
