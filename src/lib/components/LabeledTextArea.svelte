<script>
    let { label } = $props()
    //Textarea with label
    //Create a textarea with bound value in slot with class="outline-none w-full"
</script>

<div class="w-full rounded bg-gray-900 text-white p-1 text-l text-left mb-3">
    <label class="text-left">
        <span class="text-gray-400">{label}</span>
        <hr class="p-2 mt-1 border-slate-400"/>
        <slot/>
    </label>
</div>