<script lang="ts">
    import VerticalToggleGroup from './VerticalToggleGroup.svelte';
    import HorizontalToggleGroup from './HorizontalToggleGroup.svelte';
    import type { GameStage, TeamMatch } from '$lib/types';
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
    import Button from './Button.svelte';
    import type { Socket } from 'socket.io-client';
    import DoubleButton from './DoubleButton.svelte';

    let {
        matchData = $bindable(),
        stage = $bindable(),
        socket
    }: { matchData: TeamMatch; stage: GameStage; socket: Socket } = $props();

    let fielded = $state('Fielded');

    $effect(() => {
        matchData.fielded = fielded === 'Fielded';
    });
</script>

<div class="flex flex-col">
    <div class="grid-wrap mx-3 mt-0 mb-3 grid auto-cols-fr gap-4 px-1 pt-0 pb-1">
        <VerticalToggleGroup bind:value={fielded} items={['Fielded', 'Missed Match']} />
    </div>

    <div class="grid-wrap grid auto-rows-[10dvh]">
        <DoubleButton
            leftLabel="Exit"
            rightLabel="Next"
            leftOnClick={() => {
                socket.emit('leave_scouting');
                goto(resolve('/'));
            }}
            rightOnClick={() => (stage = 'Auto')}
        />
    </div>
</div>
