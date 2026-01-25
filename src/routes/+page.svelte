<!---
TO-DO
- differences in scoring types (auto/hub, tele/shuffle, etc.)
- rewrite stage, count, notes as local variables in +page.svelte
- move routes/+page.svelte to /matchscout and home/+page.svelte to /routes
- custom type for [label, classlist, onClick]
- unresolved comments suggested in PR#20 reviews upon further clarification
-->

<script lang="ts">
	import Display from '$lib/components/Display.svelte';
	import PlusMinus from '$lib/components/PlusMinus.svelte';
	import AutoTele from '$lib/components/AutoTele.svelte';
	import PreMatch from '$lib/components/PreMatch.svelte';
	import PostMatch from '$lib/components/PostMatch.svelte';
	import Queue from '$lib/components/Queue.svelte';
	import { activePage, stage } from '$lib/state';
</script>

<!-- Reusable Grid Wrapper -->
{#if $activePage && ['PreMatch', 'Autonomous', 'Teleoperated', 'PostMatch', 'plusminus'].includes($activePage)}
	<Display currentStage={$stage} />
{/if}

<!-- PLUSMINUS PAGE -->
{#if $activePage === 'plusminus'}
	<PlusMinus />
{/if}

<!-- PREMATCH PAGE -->
{#if $activePage === 'PreMatch'}
	<PreMatch />
{/if}

<!-- AUTO / TELE -->
{#if $activePage === 'Autonomous' || $activePage === 'Teleoperated'}
	<AutoTele />
{/if}

<!-- POSTMATCH -->
{#if $activePage === 'PostMatch'}
	<PostMatch />
{/if}

<!-- QUEUE -->
{#if $activePage === 'queue'}
	<Queue />
{/if}

<style>
	:global(body) {
		background-color: #2c2c2c;
	}
</style>
