<!---
TO-DO
- differences in scoring types (auto/hub, tele/shuffle, etc.)
- move routes/+page.svelte to /matchscout and home/+page.svelte to /routes
- custom type for [label, classlist]
- unresolved comments suggested in PR#20 reviews upon further clarification
-->

<script lang="ts">
	import Display from '$lib/components/Display.svelte';
	import PlusMinus from '$lib/components/PlusMinus.svelte';
	import AutoTele from '$lib/components/AutoTele.svelte';
	import PreMatch from '$lib/components/PreMatch.svelte';
	import PostMatch from '$lib/components/PostMatch.svelte';
	import Queue from '$lib/components/Queue.svelte';
	import type { GroupPage, Stage } from '$lib/types';

	let activePage = $state<GroupPage>('Queue'); // default page
	let stage = $state<Stage>('PreMatch');
	let count = $state(0);
	let notes = $state('');
</script>

<!-- REUSABLE GRID WRAPPER -->
{#if activePage && ['PreMatch', 'Autonomous', 'Teleoperated', 'PostMatch', 'PlusMinus'].includes(activePage)}
	<Display currentStage={stage} />
{/if}

<!-- PLUSMINUS PAGE -->
{#if activePage === 'PlusMinus'}
	<PlusMinus
		{activePage}
		{stage}
		{count}
		{notes}
		goToPage={(newPage: GroupPage) => (activePage = newPage)}
		setStage={(newStage: Stage) => (stage = newStage)}
	/>
{/if}

<!-- PREMATCH PAGE -->
{#if activePage === 'PreMatch'}
	<PreMatch
		{activePage}
		{stage}
		{count}
		{notes}
		goToPage={(newPage: GroupPage) => (activePage = newPage)}
		setStage={(newStage: Stage) => (stage = newStage)}
	/>
{/if}

<!-- AUTO / TELE -->
{#if activePage === 'Autonomous' || activePage === 'Teleoperated'}
	<AutoTele
		{activePage}
		{stage}
		{count}
		{notes}
		goToPage={(newPage: GroupPage) => (activePage = newPage)}
		setStage={(newStage: Stage) => (stage = newStage)}
	/>
{/if}

<!-- POSTMATCH -->
{#if activePage === 'PostMatch'}
	<PostMatch
		{activePage}
		{stage}
		{count}
		{notes}
		goToPage={(newPage: GroupPage) => (activePage = newPage)}
		setStage={(newStage: Stage) => (stage = newStage)}
	/>
{/if}

<!-- QUEUE -->
{#if activePage === 'Queue'}
	<Queue setActivePage={(page: GroupPage) => (activePage = page)} />
{/if}

<style>
	:global(body) {
		background-color: #2c2c2c;
	}
</style>
