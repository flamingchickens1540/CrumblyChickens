<script lang="ts">
    const {
        items,
        selectedValue,
        bg_normal = '[#2C2C2C]',
        bg_selected = '[#E5AE32]',
        outline = true
    }: {
        items: string[];
        selectedValue?: string;
        bg_normal?: string;
        bg_selected?: string;
        outline?: boolean;
    } = $props();

    let selected = $state<string | undefined>(undefined);

    $effect(() => {
        if (selectedValue !== undefined) {
            selected = selectedValue;
        } else if (items.length && selected === undefined) {
            selected = items[0];
        }
    });

    const isFirst = (index: number) => index === 0;
    const isLast = (index: number) => index === items.length - 1;
</script>

<div class="mx-2.5 mt-3 flex flex-col">
    {#each items as item, i (item)}
        <!-- A minor amount of class-nonsense going on here -->
        <button
            type="button"
            onclick={() => {
                selected = item;
            }}
            aria-pressed={selected === item}
            class={`
				relative m-0 inline-flex items-center
				justify-start ${outline ? 'border border-[#C2C2C2]' : i != 0 ? 'border-t border-gray-400' : ''} px-8 py-2 text-left
				${selected === item ? `bg-${bg_selected} text-black` : `bg-${bg_normal} text-white`}
				${isFirst(i) ? 'rounded-t-lg' : ''}
				${isLast(i) ? 'rounded-b-lg' : ''}
			`}
        >
            {#if selected === item}
                <span class="mr-2 font-[Poppins] font-bold">✓</span>
            {/if}
            <span class="font-[Poppins] text-xl whitespace-nowrap">
                {item}
            </span>
        </button>
    {/each}
</div>
