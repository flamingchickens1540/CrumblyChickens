<script lang="ts">
    import { X } from "lucide-svelte"
    import VerticalToggleGroup from "$lib/components/VerticalToggleGroup.svelte";
    import LabeledContainer from "$lib/components/LabeledContainer.svelte";
    import type { PageProps } from './$types'

    let inputFiles: FileList


    let {data}: PageProps = $props();
    // Data
    let images: Array<string> = $state([])
    let drivetrain = $state(data.drivetrain || "Swerve") 
    let l1 = $state(data.l1 || false);
    let l2 = $state(data.l2 || false);
    let l3 = $state(data.l3 || false);
    let bump = $state(data.bump || false);
    let trench = $state(data.trench || false);
    let oppToNeutral = $state(data.oppToNeutral || false);
    let oppToAlliance = $state(data.oppToAlliance || false);
    let neuToAlliance = $state(data.neuToAlliance || false);
    let hopperCapacity = $state(data.hopperCapacity || '');
    let maxShoot = $state(data.maxShoot || '');
    let notes = $state(data.notes || '');

    let teamKey = $state(data.teamKey);

    function submit() {
        const reader = new FileReader()
        for (let i = 0; i < inputFiles.length; i++) {
            reader.readAsDataURL(inputFiles[i])
            reader.onload = () => { images[images.length] = reader.result as string; }
        }
        inputFiles = new DataTransfer().files
    }

    function splice(i: number) {
        images.splice(i, 1);
        console.log("spliced index "+i)
    }
</script>
<center>

    <VerticalToggleGroup items={['Swerve', 'Tank', 'Other (explain in notes)']} selectedValue={drivetrain}></VerticalToggleGroup>
    <LabeledContainer label="Terrain Capabilities">
        <button class="rounded-t w-full {bump ? 'bg-amber-300 text-black' : 'bg-slate-800 text-white'} p-2" onclick={() => bump = !bump}>Bump</button>
        <button class="rounded-b w-full {trench ? 'bg-amber-300 text-black' : 'bg-slate-800 text-white'} p-2" onclick={() => trench = !trench}>Trench</button>
    </LabeledContainer>

    <LabeledContainer label="Climb">
        <button class="rounded-t w-full {l1 ? 'bg-amber-300 text-black' : 'bg-slate-800 text-white'} p-2" onclick={() => l1 = !l1}>L1</button>
        <button class="w-full {l2 ? 'bg-amber-300 text-black' : 'bg-slate-800 text-white'} p-2" onclick={() => l2 = !l2}>L2</button>
        <button class="rounded-b w-full {l3 ? 'bg-amber-300 text-black' : 'bg-slate-800 text-white'} p-2" onclick={() => l3 = !l3}>L3</button>
    </LabeledContainer>

    <LabeledContainer label="Shooting Capabilities">
        <button class="rounded-t w-full {oppToNeutral ? 'bg-amber-300 text-black' : 'bg-slate-800 text-white'} p-2" onclick={() => oppToNeutral = !oppToNeutral}>Opposing to Neutral</button>
        <button class="w-full {oppToAlliance ? 'bg-amber-300 text-black' : 'bg-slate-800 text-white'} p-2" onclick={() => oppToAlliance = !oppToAlliance}>Opposing to Alliance</button>
        <button class="rounded-b w-full {neuToAlliance ? 'bg-amber-300 text-black' : 'bg-slate-800 text-white'} p-2" onclick={() => neuToAlliance = !neuToAlliance}>Neutral to Alliance</button>
    </LabeledContainer>

    <LabeledContainer label="idk what to label this">
        <textarea class="w-full rounded p-1 bg-slate-800" placeholder="What would your robot be if it were an ice cream flavor?"></textarea>
        <textarea class="w-full rounded my-2 p-1 bg-slate-800" placeholder="What are you most proud of about your robot?"></textarea>
        <textarea class="w-full rounded p-1 bg-slate-800" placeholder="Anything else?" bind:value={notes}></textarea>
    </LabeledContainer>

    <!--Upload files-->
    <LabeledContainer label="Upload Files" isYellow={images.length > 0}>
        <div class="w-full">
            {#if (images.length > 0)}
                {#each images as src, i}
                    <div class="w-full rounded mt-2 h-32 flex justify-end p-2 items-start" style="background: url({src}); background-size: cover; background-repeat: no-repeat; background-position: center">
                        <button class="bg-slate-800 text-white rounded-full p-1" onclick={() => splice(i)}>
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
    </LabeledContainer>
</center>