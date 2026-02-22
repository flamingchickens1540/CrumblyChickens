<script lang="ts">
    import PreMatch from '$lib/components/PreMatch.svelte';
    import PostMatch from '$lib/components/PostMatch.svelte';
    import Teleoperated from '$lib/components/Teleoperated.svelte';
    import Autonomous from '$lib/components/Autonomous.svelte';
    import type { TeamMatch, GameStage } from '$lib/types';
    import { LocalStore, localStore } from '@/localStore.svelte';

    const { data }: { data: { allianceColor: 'red' | 'blue' } } = $props();

    let stage: GameStage = $state('PreMatch');
    // NOTE
    // This gets set in `/queue`, so we're probably always fine dw about it :P
    let match_data: LocalStore<TeamMatch> = $state(
        localStore('matchData', {})
    ) as LocalStore<TeamMatch>;
    console.log(data.allianceColor);
</script>

<center>
    <p
        class="m-4 mb-0 font-[Poppins] text-6xl font-bold"
        style={data.allianceColor === 'blue'
            ? 'color: #2196F3 !important'
            : 'color: #F44336 !important'}
    >
        {match_data.value.teamKey}
    </p>
    <p class="font-[Poppins] text-3xl text-[#C2C2C2]">
        {stage}
    </p>
</center>

{#if stage === 'PreMatch'}
    <PreMatch bind:match_data={match_data.value} bind:stage />
{/if}

{#if stage === 'Auto'}
    <Autonomous bind:match_data={match_data.value} bind:stage />
{/if}

{#if stage === 'Tele'}
    <Teleoperated bind:match_data={match_data.value} bind:stage />
{/if}

{#if stage === 'PostMatch'}
    <PostMatch bind:match_data={match_data.value} bind:stage />
{/if}

<style>
    :global(body) {
        background-color: #2c2c2c;
    }
</style>
