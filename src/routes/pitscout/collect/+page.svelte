<script lang="ts">
    import { X } from "lucide-svelte"
    import VerticalToggleGroup from "$lib/components/VerticalToggleGroup.svelte";
    import LabeledContainer from "$lib/components/LabeledContainer.svelte";
    import type { PageProps } from './$types'
	import { goto } from '$app/navigation';

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

    let teamKey = $state(data.teamKey || 1540);

    function submitFile() {
        const reader = new FileReader()
        for (let i = 0; i < inputFiles.length; i++) {
            reader.readAsDataURL(inputFiles[i])
            reader.onload = () => { images[images.length] = reader.result as string; }
        }
        inputFiles = new DataTransfer().files
    }

    function submit() {
        if (isFormComplete()) {
            console.log("Yay submitting things")
            goto('/')

        } else {
            alert("Uh oh you missed some fields")
        }
    }

    function isFormComplete(): boolean {
        if (hopperCapacity.length == 0 || maxShoot.length == 0 || images.length == 0) {
            return false
        } else {
            return true
        }
    }

    function splice(i: number) {
        images.splice(i, 1);
        console.log("spliced index "+i)
    }
</script>
<center class="font-[Poppins] font-normal">
    <p class="m-4 mb-0 text-6xl font-bold text-amber-400">{teamKey}</p>
	<p class="text-3xl text-slate-400">
		Pitscout
	</p>
    <p class="text-2xl text-slate-400 mt-3 mb-2 text-left mx-2.5">
        Drivetrain
    </p>
    <VerticalToggleGroup items={['Swerve', 'Tank', 'Other (explain in notes)']} selectedValue={drivetrain}></VerticalToggleGroup>
    <LabeledContainer label="Terrain Capabilities">
        <button class="rounded-t w-full {bump ? 'bg-amber-400 text-black' : 'bg-slate-900 text-white'} p-2" onclick={() => bump = !bump}>Bump</button>
        <button class="rounded-b w-full border-t border-slate-400 {trench ? 'bg-amber-400 text-black' : 'bg-slate-900 text-white'} p-2" onclick={() => trench = !trench}>Trench</button>
    </LabeledContainer>

    <LabeledContainer label="Climb">
        <button class="rounded-t w-full {l1 ? 'bg-amber-400 text-black' : 'bg-slate-900 text-white'} p-2" onclick={() => l1 = !l1}>L1</button>
        <button class="w-full border-y border-slate-400 {l2 ? 'bg-amber-400 text-black' : 'bg-slate-900 text-white'} p-2" onclick={() => l2 = !l2}>L2</button>
        <button class="rounded-b w-full {l3 ? 'bg-amber-400 text-black' : 'bg-slate-900 text-white'} p-2" onclick={() => l3 = !l3}>L3</button>
    </LabeledContainer>

    <LabeledContainer label="Shooting Capabilities">
        <button class="rounded-t w-full {oppToNeutral ? 'bg-amber-400 text-black' : 'bg-slate-900 text-white'} p-2" onclick={() => oppToNeutral = !oppToNeutral}>Opposing to Neutral</button>
        <button class="w-full border-y border-slate-400 {oppToAlliance ? 'bg-amber-400 text-black' : 'bg-slate-900 text-white'} p-2" onclick={() => oppToAlliance = !oppToAlliance}>Opposing to Alliance</button>
        <button class="rounded-b w-full {neuToAlliance ? 'bg-amber-400 text-black' : 'bg-slate-900 text-white'} p-2" onclick={() => neuToAlliance = !neuToAlliance}>Neutral to Alliance</button>
    </LabeledContainer>

    <LabeledContainer label="Misc.">
        <textarea class="w-full rounded p-1 bg-slate-900" placeholder="Max hopper capacity" bind:value={hopperCapacity}></textarea>
        <textarea class="w-full rounded p-1 bg-slate-900 mt-2" placeholder="Max shoot distance" bind:value={maxShoot}></textarea>
    </LabeledContainer>

    <LabeledContainer label="Misc.">
        <textarea class="w-full rounded p-1 bg-slate-900" placeholder="What would your robot be if it were an ice cream flavor?"></textarea>
        <textarea class="w-full rounded my-2 p-1 bg-slate-900" placeholder="What are you most proud of about your robot?"></textarea>
        <textarea class="w-full rounded p-1 bg-slate-900" placeholder="Anything else?" bind:value={notes}></textarea>
    </LabeledContainer>

    <!--Upload files-->
    <LabeledContainer label="Upload Files" isYellow={images.length > 0} padded={true}>
        <div class="w-full">
            {#if (images.length > 0)}
                {#each images as src, i}
                    <div class="w-full rounded mt-2 h-64 flex justify-end p-2 items-start" style="background: url({src}); background-size: cover; background-repeat: no-repeat; background-position: center">
                        <button class="bg-slate-900 text-white rounded-full p-1" onclick={() => splice(i)}>
                            <X class="text-white text-2xl "></X>
                        </button>
                    </div>
                {/each}
            {:else}
                Please attach a photo :3
            {/if}
            <label class="block {(images.length > 0) ? 'bg-amber-500 text-black' : 'bg-slate-800 text-white'} text-white rounded text-center text-2xl p-2 mt-2">
                +
                <input type="file" accept="image/png, image/jpeg, image/jpg" bind:files={inputFiles} class="w-full hidden" onchange={submitFile}>
            </label>
        </div>
    </LabeledContainer>
    <button onclick={submit} class="bg-slate-800 text-white block rounded mx-2.5 my-3 text-2xl p-3">Submit</button>
</center>