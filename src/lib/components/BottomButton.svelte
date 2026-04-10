<script lang="ts">
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
    import type { GameStage, TeamMatch } from '$lib/types';

    let {
        matchData,
        stage = $bindable(),
        plusMinus = $bindable()
    }: { matchData: TeamMatch; stage: GameStage; plusMinus: boolean } = $props();

    const label = $derived(plusMinus ? 'Back' : stage === 'PostMatch' ? 'Submit' : 'Next Stage');
    const flow = ['PreMatch', 'Auto', 'Tele', 'PostMatch'] as const;

    const handleBottomButton = async () => {
        if (plusMinus) {
            plusMinus = false;
            return;
        }

        if (stage === 'PostMatch') {
            await fetch('/api/submit/match', {
                method: 'POST',
                body: JSON.stringify(matchData)
            });
            goto(resolve('/'));

            return;
        }

        const nextStage = flow[flow.indexOf(stage) + 1];
        stage = nextStage;
    };

    function back() {
        const prevStage = flow[flow.indexOf(stage) - 1];
        stage = prevStage;
    }

    const bottomBtnClass = `m-2.5 inline-flex items-center justify-center
		rounded-md px-8 py-2 drop-shadow-xl transition-transform duration-300 hover:scale-105
		bottom-3 left-3 right-3 p-2 bg-[#5C5C5C] hover:bg-[#7D7D7D]`;
</script>

{#if (stage == "Auto" || stage == "Tele") && !plusMinus}
    <div class="flex flex-row items-center justify-center grow">
        <button class={bottomBtnClass} onclick={back}>
            <p class="font-[Poppins] text-4xl font-semibold text-white mb-1">Back</p>
        </button>
        <button class={bottomBtnClass} onclick={handleBottomButton}>
            <p class="font-[Poppins] text-4xl font-semibold text-white mb-1">Next</p>
        </button>
    </div>
{:else if stage == "PostMatch" && !plusMinus}
    <div class="flex flex-row justify-center mb-2">
        <button class={bottomBtnClass} onclick={back}>
            <p class="font-[Poppins] text-4xl font-semibold text-white mb-1">Back</p>
        </button>
        <button class={bottomBtnClass} onclick={handleBottomButton}>
            <p class="font-[Poppins] text-4xl font-semibold text-white mb-1">{label}</p>
        </button>
    </div>
{:else}
    <button class={bottomBtnClass + " fixed"} onclick={handleBottomButton}>
        <p class="font-[Poppins] text-4xl font-semibold text-white mb-1">{label}</p>
    </button>
{/if}

