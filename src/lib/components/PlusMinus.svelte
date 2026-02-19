<script lang="ts">
    import FuelCounter from './FuelCounter.svelte';
    import PlusMinusButton from './PlusMinusButton.svelte';
    import BottomButton from './BottomButton.svelte';
    import type { GameStage, TeamMatch } from '$lib/types';

    let {
        match_data = $bindable(),
        plusMinus = $bindable(),
        value = $bindable(),
        stage
    }: { match_data: TeamMatch; plusMinus: boolean; value: number; stage: GameStage } = $props();
</script>

<FuelCounter label="Fuel" {stage} count={value} />
<div class="grid-wrap mx-3 mt-0 mb-3 grid grid-cols-2 grid-rows-[45dvh_1fr] px-1 pt-0 pb-1">
    <PlusMinusButton value={+1} bind:count={value} classlist="bg-[#49A078] hover:bg-[#6DB393]" />
    <PlusMinusButton value={+5} bind:count={value} classlist="bg-[#49A078] hover:bg-[#6DB393]" />
    <PlusMinusButton
        value={-1}
        bind:count={value}
        classlist="col-span-2 bg-[#FF6663] hover:bg-[#FF8582]"
    />
</div>

<BottomButton {match_data} bind:stage bind:plusMinus />
