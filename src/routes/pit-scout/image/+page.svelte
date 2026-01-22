<script lang="ts">
    let inputFiles: FileList
    let readFiles: Array<string> = []

    function submit() {
        const reader = new FileReader()
        const readFilesLength = readFiles.length
        for (let i = 0; i < inputFiles.length; i++) {
            reader.readAsDataURL(inputFiles[i])
            reader.onload = () => { readFiles[i+readFilesLength] = reader.result as string; }
        }
    }
</script>
<input type="file" bind:files={inputFiles}>
<button onclick={submit}>Submit</button>
{#each readFiles as fileSrc}
    <img height=100 width=100 src={fileSrc} alt="" class="m-2">
{/each}