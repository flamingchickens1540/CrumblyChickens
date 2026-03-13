<script lang="ts">
    import FuelCounter from './FuelCounter.svelte';
    import PlusMinusButton from './PlusMinusButton.svelte';
    import type { GameStage, TeamMatch } from '$lib/types';
    import Button from './Button.svelte';

    let {
        matchData = $bindable(),
        plusMinus = $bindable(),
        value = $bindable(),
        label,
        stage
    }: {
        matchData: TeamMatch;
        plusMinus: boolean;
        value: number;
        label: string;
        stage: GameStage;
    } = $props();
</script>

<FuelCounter {label} {stage} count={value} />
<div class="grid-wrap mx-3 mb-3 grid grid-cols-2 grid-rows-[45dvh] px-1 pb-1">
    <PlusMinusButton value={+1} bind:count={value} classlist="bg-[#49A078] hover:bg-[#6DB393]" />
    <PlusMinusButton value={+5} bind:count={value} classlist="bg-[#49A078] hover:bg-[#6DB393]" />
    <PlusMinusButton
        value={-1}
        bind:count={value}
        classlist="col-span-2 bg-[#FF6663] hover:bg-[#FF8582]"
    />
</div>
