<script lang="ts">
    import PreMatch from '$lib/components/PreMatch.svelte';
    import PostMatch from '$lib/components/PostMatch.svelte';
    import Teleoperated from '$lib/components/Teleoperated.svelte';
    import Autonomous from '$lib/components/Autonomous.svelte';
    import type { TeamMatch, GameStage } from '$lib/types';

    const { data }: { data: TeamMatch } = $props();

    let stage: GameStage = $state('PreMatch');
    let match_data = $state(data);
</script>

<center>
    <p class="m-4 mb-0 font-[Poppins] text-6xl font-bold text-[#FF4848]">1540</p>
    <p class="font-[Poppins] text-3xl text-[#C2C2C2]">
        {stage}
    </p>
</center>

{#if stage === 'PreMatch'}
    <PreMatch bind:match_data bind:stage />
{/if}

{#if stage === 'Auto'}
    <Autonomous bind:match_data bind:stage />
{/if}

{#if stage === 'Tele'}
    <Teleoperated bind:match_data bind:stage />
{/if}

{#if stage === 'PostMatch'}
    <PostMatch bind:match_data bind:stage />
{/if}

<style>
    :global(body) {
        background-color: #2c2c2c;
    }
</style>
