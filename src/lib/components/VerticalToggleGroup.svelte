<script lang="ts">
    import { onMount } from 'svelte';

    let {
        items,
        value = $bindable(),
        outline = true
    }: {
        items: string[];
        value: string | null;
        outline?: boolean;
    } = $props();

    onMount(() => {
        if (!value) {
            value = items[0];
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
                value = item;
            }}
            aria-pressed={value === item}
            class={`
				relative m-0 inline-flex items-center
				justify-start ${outline ? 'border border-[#C2C2C2]' : i != 0 ? 'border-t border-gray-400' : ''} px-8 py-2 text-left
				${value === item ? `bg-[#E5AE32] text-black` : `bg-[#2c2c2c] text-white`}
				${isFirst(i) ? 'rounded-t-lg' : ''}
				${isLast(i) ? 'rounded-b-lg' : ''}
			`}
        >
            {#if value === item}
                <span class="mr-2 font-[Poppins] font-bold">✓</span>
            {/if}
            <span class="font-[Poppins] text-xl whitespace-nowrap">
                {item}
            </span>
        </button>
    {/each}
</div>
