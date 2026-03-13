<script lang="ts">
    import type { GameStage, NumKey, TeamMatch } from '$lib/types';
    import DoubleButton from './DoubleButton.svelte';
    import PlusMinus from './PlusMinus.svelte';

    let {
        matchData = $bindable(),
        stage = $bindable()
    }: { matchData: TeamMatch; stage: GameStage } = $props();
    let plusMinus: boolean = $state(false);
</script>

<div class="flex flex-col">
    <PlusMinus
        {matchData}
        bind:plusMinus
        bind:value={matchData.teleHub!}
        stage="Tele"
        label="Hub Fuel"
    />

    <div class="grid-wrap grid auto-rows-[10dvh]">
        <DoubleButton
            leftLabel="Back"
            rightLabel="Next"
            leftOnClick={() => (stage = 'Auto')}
            rightOnClick={() => (stage = 'PostMatch')}
        />
    </div>
</div>
