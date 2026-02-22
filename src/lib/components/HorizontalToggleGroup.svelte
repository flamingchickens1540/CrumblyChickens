<script lang="ts">
    import { onMount } from 'svelte';
    let { items, value = $bindable() } = $props<{
        items: string[];
        value: string;
    }>();

    onMount(() => {
        if (!value) {
            value = items[0];
        }
    });

    const isFirst = (index: number) => index === 0;
    const isLast = (index: number) => index === items.length - 1;
</script>

<div class="mx-2.5 mt-3 grid grid-flow-col">
    {#each items as item, i (item)}
        <button
            type="button"
            onclick={() => {
                value = item;
            }}
            aria-pressed={value === item}
            class={`
				relative m-0 inline-flex flex-1
				items-center justify-center border border-[#C2C2C2] py-2 text-center
				${value === item ? 'bg-[#E5AE32] text-black' : 'bg-[#2C2C2C] text-white'}
				${isFirst(i) ? 'rounded-l-lg' : ''}
				${isLast(i) ? 'rounded-r-lg' : ''}
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
