<script lang="ts">

    const { label, isYellow = false }: {label: string, isYellow: boolean} = $props()
</script>

<p class="text-3xl text-slate-400 mt-2 mb-1 text-left mx-2.5">
    {label}
</p>
<div class="rounded justify-self-start justify-self-center mx-2.5 {isYellow ? 'bg-amber-300 text-black' : 'bg-slate-900 text-white'} text-center p-3 text-xl">
    <slot/>
</div>
