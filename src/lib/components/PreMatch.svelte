<script lang="ts">
    import VerticalToggleGroup from './VerticalToggleGroup.svelte';
    import HorizontalToggleGroup from './HorizontalToggleGroup.svelte';
    import type { GameStage, TeamMatch } from '$lib/types';
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
    import Button from './Button.svelte';

    let {
        matchData = $bindable(),
        stage = $bindable()
    }: { matchData: TeamMatch; stage: GameStage } = $props();

    let fielded = $state('Fielded');
    let autoStart = $state('Outpost');

    $effect(() => {
        matchData.fielded = fielded === 'Fielded';
        matchData.autoStart = autoStart as 'Outpost' | 'Tower' | 'Depot';
    });
</script>

<div class="grid-wrap grid auto-rows-[30dvh] gap-10 pt-2">
    <div class="grid-wrap mx-3 mt-0 mb-3 grid auto-cols-fr gap-4 px-1 pt-0 pb-1">
        <VerticalToggleGroup items={['Outpost', 'Tower', 'Depot']} bind:value={autoStart} />
        <HorizontalToggleGroup bind:value={fielded} items={['Fielded', 'Missed Match']} />
    </div>

    <div class="grid-wrap grid">
        <Button label="Next" onclick={() => (stage = 'Auto')} />
        <Button label="Exit" onclick={() => goto(resolve('/'))} />
    </div>
</div>
