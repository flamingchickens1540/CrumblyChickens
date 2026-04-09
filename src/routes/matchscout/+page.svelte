<script lang="ts">
    import PreMatch from '$lib/components/PreMatch.svelte';
    import PostMatch from '$lib/components/PostMatch.svelte';
    import Teleoperated from '$lib/components/Teleoperated.svelte';
    import Autonomous from '$lib/components/Autonomous.svelte';
    import type { TeamMatch, GameStage } from '$lib/types';
    import { LocalStore, localStore } from '@/localStore.svelte';
    import { io, Socket } from 'socket.io-client';
    import { onMount } from "svelte"

    const { data }: { data: { allianceColor: 'red' | 'blue' } } = $props();
    let stage: GameStage = $state('PreMatch');

    // NOTE
    // This gets set in `/queue`, so we're probably always fine dw about it :P
    let matchData: LocalStore<TeamMatch> | null = $state(null);
    let socket: Socket = io('/match', {
            auth: {
                username: matchData.value.scout
            }
        });

    onMount(() => {
        matchData = localStore('matchData', {}) as LocalStore<TeamMatch>;
    });

</script>

<div class="grid-wrap mb-4 grid auto-rows-[14dvh]">
    <center>
        <p
            class="m-4 mb-0 font-[Poppins] text-6xl font-bold"
            style={data.allianceColor === 'blue'
                ? 'color: #2196F3 !important'
                : 'color: #F44336 !important'}
        >
            {matchData?.value.teamKey ?? "Loading"}
        </p>
        <p class="font-[Poppins] text-3xl text-[#C2C2C2]">
            {stage}
        </p>
    </center>
</div>

<div class="h-full">
    {#if stage === 'PreMatch'}
        <PreMatch {socket} bind:matchData={matchData.value} bind:stage />
    {/if}

    {#if stage === 'Auto'}
        <Autonomous bind:matchData={matchData.value} bind:stage />
    {/if}

    {#if stage === 'Tele'}
        <Teleoperated bind:matchData={matchData.value} bind:stage />
    {/if}

    {#if stage === 'PostMatch'}
        <PostMatch bind:matchData={matchData.value} bind:stage {socket} />
    {/if}
</div>

<style>
    :global(body) {
        background-color: #2c2c2c;
    }
</style>
