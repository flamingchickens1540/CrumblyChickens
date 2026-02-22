<script lang="ts">
    import VerticalToggleGroup from './VerticalToggleGroup.svelte';
    import HorizontalToggleGroup from './HorizontalToggleGroup.svelte';
    import StarRating from '$lib/components/StarRating.svelte';
    import BottomButton from '$lib/components/BottomButton.svelte';
    import type { GameStage, TeamMatch } from '$lib/types';

    let {
        matchData = $bindable(),
        stage = $bindable()
    }: { matchData: TeamMatch; stage: GameStage } = $props();

    let endgame: string = $state('L1');
    let broken: string = $state('Undamaged');
    let connected: string = $state('Functional');
    let rating: number = $state(1);
    let fakePlusMinus: boolean = $state(false);
    $effect(() => {
        matchData.climb = endgame === 'Not Attempted' ? 'None' : (endgame as 'L1' | 'L2' | 'L3');
        matchData.broken = broken === 'Broken';
        matchData.died = connected === 'Died';
        matchData.skill = rating;
    });
</script>

<div class="grid-wrap mx-3 mt-0 mb-3 grid auto-cols-fr px-1 pt-0 pb-1">
    <VerticalToggleGroup bind:value={endgame} items={['L1', 'L2', 'L3', 'Not Attempted']} />
    <StarRating bind:value={rating} />
    <HorizontalToggleGroup bind:value={broken} items={['Undamaged', 'Broken']} />
    <HorizontalToggleGroup bind:value={connected} items={['Functional', 'Died on Field']} />
    <textarea
        name="Notes"
        cols="40"
        rows="5"
        placeholder="Notes"
        bind:value={matchData.notes}
        class="m-2.5 rounded-lg border border-[#C2C2C2] p-3 text-[#C2C2C2]"
    ></textarea>
</div>

<BottomButton {matchData} bind:stage bind:plusMinus={fakePlusMinus} />
