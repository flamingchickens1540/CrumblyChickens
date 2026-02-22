<script lang="ts">
    import SoloToggleButton from './SoloToggleButton.svelte';
    import BottomButton from './BottomButton.svelte';
    import PlusMinus from './PlusMinus.svelte';
    import type { GameStage, NumKey, TeamMatch } from '$lib/types';

    let {
        matchData = $bindable(),
        stage = $bindable()
    }: { matchData: TeamMatch; stage: GameStage } = $props();
    let plusMinus: boolean = $state(false);
    let activeKey: NumKey<TeamMatch> | null = $state(null);
</script>

<div class="flex flex-col">
    {#if plusMinus}
        <PlusMinus {matchData} bind:plusMinus {stage} bind:value={matchData[activeKey!]!} />
    {:else}
        <div class="grid grid-wrap mx-3 mt-0 mb-3 auto-rows-[35dvh] px-1 pt-0 pb-1">
            <button
                class="m-2.5 inline-flex items-center justify-center
                rounded-md bg-[#315F94] py-2 drop-shadow-xl transition-transform
                duration-300 hover:scale-105"
                onclick={() => {
                    activeKey = 'autoHub';
                    plusMinus = true;
                }}
            >
                <p class="font-[Poppins] text-4xl font-semibold text-white">Hub</p>
            </button>
            <button
                class="m-2.5 inline-flex items-center justify-center
                rounded-md bg-[#315F94] drop-shadow-xl transition-transform
                duration-300 hover:scale-105"
                onclick={() => {
                    activeKey = 'autoShuffle';
                    plusMinus = true;
                }}
            >
                <p class="font-[Poppins] text-4xl font-semibold text-white">Shuffle</p>
            </button>
        </div>

        <div class="grid-wrap mx-3 mt-0 mb-2 grid auto-cols-fr px-1 pt-0 pb-1">
            <SoloToggleButton label="Auto Climb" />
        </div>

        <BottomButton {matchData} bind:stage bind:plusMinus />
    {/if}
</div>

