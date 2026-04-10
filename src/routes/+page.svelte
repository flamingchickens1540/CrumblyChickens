<script lang="ts">
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';

    let { data } = $props<{
        data: {
            user: string;
        };
    }>();

    type HomeAction = {
        label: string;
        classlist?: string;
        onClick: () => void;
    };

    const actions: HomeAction[] = [
        {
            label: 'Match Scout',
            onClick: () => {
                goto(resolve('/queue'));
            }
        },
        {
            label: 'Pit Scout',
            onClick: () => goto(resolve('/pitscout/teamlist'))
        }
        // {
        //     label: 'Analysis',
        //     onClick: () => goto(resolve('/analysis'))
        // },
        // {
        //     label: 'Leaderboard',
        //     onClick: () => goto(resolve('/leaderboard'))
        // }
    ];

    // const gridClass = 'grid-wrap mx-3 mt-0 mb-3 grid px-1 pt-0 pb-1';
    // const bottomBtnClass = 'fixed bottom-2 left-3 right-3 p-2 bg-[#5C5C5C] hover:bg-[#7D7D7D]';
</script>

<div class="m-5 auto-rows-[20dvh]">
    <center>
        <p class="p-1 font-[Poppins] text-4xl font-semibold text-white">
            Hello, {data.user}
        </p>
    </center>
</div>

<div class="m-3 grid auto-rows-[30dvh] gap-5">
    {#each actions as action (action.label)}
        <button
            class="inline-flex items-center justify-center rounded-md
				bg-[#5C5C5C] p-2 px-8
				py-2 drop-shadow-xl transition-transform duration-300 hover:scale-105 hover:bg-[#7D7D7D]"
            onclick={action.onClick}
        >
            <p class="font-[Poppins] text-4xl font-semibold text-white">
                {action.label}
            </p>
        </button>
    {/each}
</div>

<div class="grid-wrap grid auto-rows-[15dvh]">
    <button
        class="m-2 justify-center
               rounded-md bg-[#5C5C5C] px-8
               py-2 drop-shadow-xl transition-transform duration-300 hover:scale-105 hover:bg-[#7D7D7D]"
        onclick={() => goto(resolve('/login'))}
    >
        <p class="font-[Poppins] text-4xl font-semibold text-white">Log Out</p>
    </button>
</div>

<style>
    :global(body) {
        background-color: #2c2c2c;
    }
</style>
