<script lang="ts">
	import Display from '$lib/components/Display.svelte';
	import PreMatch from '$lib/components/PreMatch.svelte';
	import PostMatch from '$lib/components/PostMatch.svelte';
	import Teleoperated from '$lib/components/Teleoperated.svelte';
	import Autonomous from '$lib/components/Autonomous.svelte';

	let plusMinus: boolean = $state(false);
	
	$effect(() =>
		console.log("matchscout:", plusMinus)
	);

	const match_data = $state({
		stage: 'PreMatch',
		activeKey: null,
		
		notes: '',
		hub: 0,
		shuffle: 0,
		steal: 0,
		autoHub: 0,
		autoShuffle: 0,

		setStage(newStage: string) {
			this.stage = newStage;
		}
	});
</script>

<Display currentStage={match_data.stage} />

{#if match_data.stage === 'PreMatch'}
	<PreMatch
		{match_data}
	/>
{/if}

{#if match_data.stage === 'Autonomous'}
	<Autonomous
		{match_data}
		bind:plusMinus
	/>
{/if}

{#if match_data.stage === 'Teleoperated'}
	<Teleoperated
		{match_data}
		bind:plusMinus
	/>
{/if}

{#if match_data.stage === 'PostMatch'}
	<PostMatch
		{match_data}
	/>
{/if}

<style>
	:global(body) {
		background-color: #2c2c2c;
	}
</style>