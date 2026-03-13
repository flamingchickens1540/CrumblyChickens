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

    <div class="grid-wrap mx-3 mt-0 mb-3 grid auto-rows-[10dvh] gap-2">
        <SoloToggleButton label="Auto Climb" />

        <DoubleButton
            leftLabel="Back"
            rightLabel="Next"
            leftOnClick={() => (stage = 'PreMatch')}
            rightOnClick={() => (stage = 'Tele')}
        />
    </div>
</div>
