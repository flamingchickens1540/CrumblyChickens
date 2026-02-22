<script lang="ts">
    import VerticalToggleGroup from './VerticalToggleGroup.svelte';
    import HorizontalToggleGroup from './HorizontalToggleGroup.svelte';
    import type { GameStage, TeamMatch } from '$lib/types';
    import Button from './Button.svelte';

    let {
        matchData = $bindable(),
        stage = $bindable()
    }: { matchData: TeamMatch; stage: GameStage } = $props();
    let fielded = $state('Feilded');
    let autoStart = $state('Outpost');
    $effect(() => {
        matchData.fielded = fielded === 'Fielded';
        matchData.autoStart = autoStart as 'Outpost' | 'Tower' | 'Depot';
    });
    let fakePlusMinus: boolean = $state(false);
</script>

<div class="flex flex-col">
    <div class="grid-wrap mx-3 mt-0 mb-3 grid auto-cols-fr px-1 pt-0 pb-1">
        <VerticalToggleGroup items={['Outpost', 'Tower', 'Depot']} bind:value={autoStart} />
        <HorizontalToggleGroup bind:value={fielded} items={['Fielded', 'Missed Match']} />
    </div>

    <Button label="Next" onclick={() => stage = "Auto"} classes="px-8"/>
</div>

