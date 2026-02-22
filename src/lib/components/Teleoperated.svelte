<script lang="ts">
    import type { GameStage, NumKey, TeamMatch } from '$lib/types';
    import DoubleButton from './DoubleButton.svelte';
    import PlusMinus from './PlusMinus.svelte';

    let {
        matchData = $bindable(),
        stage = $bindable()
    }: { matchData: TeamMatch; stage: GameStage } = $props();
    let plusMinus: boolean = $state(false);
    let activeKey: NumKey<TeamMatch> | null = $state(null);

    function back() {
        stage = "Auto"
    }
</script>

<div class="flex flex-col">
    {#if plusMinus}
        <PlusMinus {matchData} {plusMinus} bind:value={matchData[activeKey!]!} stage={'Tele'} />
    {:else}
        <div class="grid-wrap mx-3 mt-0 mb-3 grid auto-rows-[22dvh] px-1 pt-0 pb-1">
            <button
                class="m-2.5 inline-flex items-center justify-center
                rounded-md bg-[#6C3082] py-2 drop-shadow-xl transition-transform
                duration-300 hover:scale-105"
                onclick={() => {
                    activeKey = 'teleHub';
                    plusMinus = true;
                }}
            >
                <p class="font-[Poppins] text-4xl font-semibold text-white">Hub</p>
            </button>

            <button
                class="m-2.5 inline-flex items-center justify-center
                rounded-md bg-[#6C3082] py-2 drop-shadow-xl transition-transform
                duration-300 hover:scale-105"
                onclick={() => {
                    activeKey = 'teleShuffle';
                    plusMinus = true;
                }}
            >
                <p class="font-[Poppins] text-4xl font-semibold text-white">Shuffle</p>
            </button>

            <button
                class="m-2.5 inline-flex items-center justify-center
                rounded-md bg-[#6C3082] py-2 drop-shadow-xl transition-transform
                duration-300 hover:scale-105"
                onclick={() => {
                    activeKey = 'teleSteal';
                    plusMinus = true;
                }}
            >
                <p class="font-[Poppins] text-4xl font-semibold text-white">Steal</p>
            </button>

        </div>

        <DoubleButton leftLabel="Back" rightLabel="Next" leftOnClick={() => stage = "Auto"} rightOnClick={() => stage = "PostMatch"}/>
    {/if}

</div>

