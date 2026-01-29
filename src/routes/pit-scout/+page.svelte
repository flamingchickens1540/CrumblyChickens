<script lang="ts">
    import { X } from "lucide-svelte"

    let inputFiles: FileList
    let images: Array<string> = $state([])

    function submit() {
        const reader = new FileReader()
        for (let i = 0; i < inputFiles.length; i++) {
            reader.readAsDataURL(inputFiles[i])
            reader.onload = () => { images[images.length] = reader.result as string; }
        }
        inputFiles = new DataTransfer().files
    }
</script>
<div class="rounded justify-self-start {(images.length > 0) ? 'bg-amber-300 text-black' : 'bg-slate-900 text-white'} text-lg w-80 text-center p-3">
    <span>Upload files:</span>
    <div class="w-full">
        {#if (images.length > 0)}
            {#each images as src, i}
                <div class="size-full rounded mt-2 h-32 flex justify-end p-2 items-start" style="background: url({src}); background-size: cover; background-repeat: no-repeat; background-position: center">
                    <button class="bg-slate-800 text-white rounded-full p-1" onclick={() => images.splice(i)}>
                        <X class="text-white"></X>
                    </button>
                </div>
            {/each}
        {:else}
            Please attach a photo :3
        {/if}
        <label class="block {(images.length > 0) ? 'bg-amber-500 text-black' : 'bg-slate-800 text-white'} text-white rounded text-center p-2 mt-2">
            +
            <input type="file" accept="image/png, image/jpeg, image/jpg" bind:files={inputFiles} class="w-full hidden" onchange={submit}>
        </label>
    </div>
</div>