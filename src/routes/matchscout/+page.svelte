<script lang="ts">
	import Display from '$lib/components/Display.svelte';
	import PlusMinus from '$lib/components/PlusMinus.svelte';
	import AutoTele from '$lib/components/AutoTele.svelte';
	import PreMatch from '$lib/components/PreMatch.svelte';
	import PostMatch from '$lib/components/PostMatch.svelte';
	import Queue from '$lib/components/Queue.svelte';

	let activePage = $state('Queue');
	let stage = $state('PreMatch');
	let notes = $state('');

	const container = {
		get activePage() { return activePage },
		set activePage(v: string) { activePage = v },

		get stage() { return stage },
		set stage(v: string) { stage = v },

		get notes() { return notes },
		set notes(v: string) { notes = v },

		activeKey: null as
			| 'hub'
			| 'shuffle'
			| 'steal'
			| 'autoHub'
			| 'autoShuffle'
			| null,

		hub: 0,
		shuffle: 0,
		steal: 0,
		autoHub: 0,
		autoShuffle: 0,

		goToPage(newPage: string) {
			activePage = newPage;
		},

		setStage(newStage: string) {
			stage = newStage;
		}
	};
</script>

<!-- REUSABLE GRID WRAPPER -->
{#if activePage && ['PreMatch', 'Autonomous', 'Teleoperated', 'PostMatch', 'PlusMinus'].includes(activePage)}
	<Display currentStage={stage} />
{/if}

<!-- PLUSMINUS PAGE -->
{#if activePage === 'PlusMinus'}
	<PlusMinus
		{container}
	/>
{/if}

<!-- PREMATCH PAGE -->
{#if activePage === 'PreMatch'}
	<PreMatch
		{container}
	/>
{/if}

<!-- AUTO / TELE -->
{#if activePage === 'Autonomous' || activePage === 'Teleoperated'}
	<AutoTele
		{container}
	/>
{/if}

<!-- POSTMATCH -->
{#if activePage === 'PostMatch'}
	<PostMatch
		{container}
	/>
{/if}

<!-- QUEUE -->
{#if activePage === 'Queue'}
	<Queue setActivePage={(page: string) => (activePage = page)} />
{/if}

<style>
	:global(body) {
		background-color: #2c2c2c;
	}
</style>