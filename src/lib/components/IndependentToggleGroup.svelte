<script lang="ts">
    const { items, keys, source = $bindable(),}: { items: string[], keys: string[], source: any} = $props();
    const last = $derived(items.length - 1)
</script>

<div>
    {#each keys as key, i}
        <button class=
            '{i == 0 ? "rounded-t" : i == last ? "rounded-b border-t border-gray-400" : "border-t border-gray-400"} w-full {source[key] ? 'bg-amber-400 text-black' : 'bg-gray-900 text-white'} p-2'
            onclick={() => source[key] = !source[key]}>
            {items[i]}
        </button>
    {/each}
</div>

