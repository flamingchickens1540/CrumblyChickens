<script lang="ts">
    import { X } from "lucide-svelte"
    import ButtonBack from "$lib/components/ButtonBack.svelte";
    import VerticalToggleGroup from "$lib/components/VerticalToggleGroup.svelte";
    import LabeledContainer from "$lib/components/LabeledContainer.svelte";
    import type { PageProps } from './$types'
	import { goto } from '$app/navigation';
	import LabeledTextArea from "$lib/components/LabeledTextArea.svelte";

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
	<p class="text-3xl text-gray-400">
		Pitscout
	</p>
    <p class="text-2xl text-gray-400 mt-3 text-left mx-2.5">
        Drivetrain
    </p>
    <VerticalToggleGroup items={['Swerve', 'Tank', 'Other']} selectedValue={drivetrain}></VerticalToggleGroup>
    <LabeledContainer label="Terrain Capabilities">
        <button class="rounded-t w-full {bump ? 'bg-amber-400 text-black' : 'bg-gray-900 text-white'} p-2" onclick={() => bump = !bump}>Bump</button>
        <button class="rounded-b w-full border-t border-gray-400 {trench ? 'bg-amber-400 text-black' : 'bg-gray-900 text-white'} p-2" onclick={() => trench = !trench}>Trench</button>
    </LabeledContainer>

    <LabeledContainer label="Climb">
        <button class="rounded-t w-full {l1 ? 'bg-amber-400 text-black' : 'bg-gray-900 text-white'} p-2" onclick={() => l1 = !l1}>L1</button>
        <button class="w-full border-y border-gray-400 {l2 ? 'bg-amber-400 text-black' : 'bg-gray-900 text-white'} p-2" onclick={() => l2 = !l2}>L2</button>
        <button class="rounded-b w-full {l3 ? 'bg-amber-400 text-black' : 'bg-gray-900 text-white'} p-2" onclick={() => l3 = !l3}>L3</button>
    </LabeledContainer>

    <LabeledContainer label="Shooting Capabilities">
        <button class="rounded-t w-full {oppToNeutral ? 'bg-amber-400 text-black' : 'bg-gray-900 text-white'} p-2" onclick={() => oppToNeutral = !oppToNeutral}>Opposing to Neutral</button>
        <button class="w-full border-y border-gray-400 {oppToAlliance ? 'bg-amber-400 text-black' : 'bg-gray-900 text-white'} p-2" onclick={() => oppToAlliance = !oppToAlliance}>Opposing to Alliance</button>
        <button class="rounded-b w-full {neuToAlliance ? 'bg-amber-400 text-black' : 'bg-gray-900 text-white'} p-2" onclick={() => neuToAlliance = !neuToAlliance}>Neutral to Alliance</button>
    </LabeledContainer>

    <LabeledContainer label="Robot stuff">
        <LabeledTextArea label="Max hopper capacity">
            <textarea bind:value={hopperCapacity} class="outline-none w-full"></textarea>
        </LabeledTextArea>
        <LabeledTextArea label="Max shoot distance">
            <textarea bind:value={maxShoot} class="outline-none w-full"></textarea>
        </LabeledTextArea>
    </LabeledContainer>

    <LabeledContainer label="Misc.">
        <LabeledTextArea label="If your robot was an ice cream flavor, what would it be?">
            <textarea class="outline-none w-full"></textarea>
        </LabeledTextArea>
        <LabeledTextArea label="What are you most proud of about your robot?">
            <textarea class="outline-none w-full"></textarea>
        </LabeledTextArea>
        <LabeledTextArea label="Other notes">
            <textarea bind:value={notes} class="outline-none w-full"></textarea>
        </LabeledTextArea>
    </LabeledContainer>

    <!--Upload files-->
    <LabeledContainer label="Upload Files" isYellow={images.length > 0} padded={true}>
        <div class="w-full">
            {#if (images.length > 0)}
                {#each images as src, i}
                    <div class="w-full rounded mt-2 h-64 flex justify-end p-2 items-start" style="background: url({src}); background-size: cover; background-repeat: no-repeat; background-position: center">
                        <button class="bg-gray-900 text-white rounded-full p-1" onclick={() => splice(i)}>
                            <X class="text-white text-2xl "></X>
                        </button>
                    </div>
                {/each}
            {:else}
                Please attach a photo
            {/if}
            <label class="block {(images.length > 0) ? 'bg-amber-500 text-black' : 'bg-gray-800 text-white'} text-white rounded text-center text-2xl p-2 mt-2">
                +
                <input type="file" accept="image/png, image/jpeg, image/jpg" bind:files={inputFiles} class="w-full hidden" onchange={submitFile}>
            </label>
        </div>
    </LabeledContainer>
    <button onclick={submit} class="bg-gray-800 text-white block rounded mx-2.5 my-3 text-2xl p-3">Submit</button>
</center>

<ButtonBack label="To team list" link="/pitscout/teamlist"/>