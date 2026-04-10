<script lang="ts">
    import SoloToggleButton from './SoloToggleButton.svelte';
    import PlusMinus from './PlusMinus.svelte';
    import type { GameStage, TeamMatch } from '$lib/types';
    import DoubleButton from './DoubleButton.svelte';

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
        {stage}
        bind:value={matchData.autoHub!}
        label="Hub Fuel"
    />

    <div class="grid-wrap grid auto-rows-[10dvh]">
        <DoubleButton
            leftLabel="Back"
            rightLabel="Next"
            leftOnClick={() => (stage = 'PreMatch')}
            rightOnClick={() => (stage = 'Tele')}
        />
    </div>
</div>
