<script lang="ts">
    import VerticalToggleGroup from './VerticalToggleGroup.svelte';
    import HorizontalToggleGroup from './HorizontalToggleGroup.svelte';
    import BottomButton from '$lib/components/BottomButton.svelte';
    import type { GameStage, TeamMatch } from '$lib/types';

    let {
        matchData = $bindable(),
        stage = $bindable()
    }: { matchData: TeamMatch; stage: GameStage } = $props();

    let fakePlusMinus: boolean = $state(false);
</script>

<div class="grid-wrap mx-3 mt-0 mb-3 grid auto-cols-fr px-1 pt-0 pb-1">
    <VerticalToggleGroup items={['Outpost', 'Tower', 'Depot']} bind:value={matchData.autoStart} />
    <!-- TODO Bind selected values as booleans here -->
    <HorizontalToggleGroup items={['Fielded', 'Missed Match']} />
</div>

<BottomButton {matchData} bind:stage bind:plusMinus={fakePlusMinus} />
