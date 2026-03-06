<script lang="ts">
    const {
        items,
        keys,
        source = $bindable()
    }: { items: string[]; keys: string[]; source: any } = $props();
    const last = $derived(items.length - 1);
</script>

<div>
    {#each keys as key, i (key)}
        <button
            class="{i == 0
                ? 'rounded-t'
                : i == last
                  ? 'rounded-b border-t border-[#B2B2B2]'
                  : 'border-t border-[#B2B2B2]'} w-full {source[key]
                ? 'bg-[#E5AE32] text-black'
                : 'bg-[#2c2c2c] text-white'} p-2"
            onclick={() => {
                source[key] = !source[key];
            }}
        >
            {items[i]}
        </button>
    {/each}
</div>
