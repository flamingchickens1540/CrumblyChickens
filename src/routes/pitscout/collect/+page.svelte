<script lang="ts">
    import { X } from "lucide-svelte"
    import ButtonBack from "$lib/components/ButtonBack.svelte";
    import VerticalToggleGroup from "$lib/components/VerticalToggleGroup.svelte";
    import LabeledContainer from "$lib/components/LabeledContainer.svelte";
	import { goto } from '$app/navigation';
	import LabeledTextArea from "$lib/components/LabeledTextArea.svelte";
	import type { TeamEvent } from "$lib/types";
	import IndependentToggleGroup from "$lib/components/IndependentToggleGroup.svelte";

    let inputFiles: FileList | null = $state(null)

    let { data }: { data: TeamEvent } = $props();
    let team_event = $state(data);

    function submitFile() {
        const reader = new FileReader()
        inputFiles ??= new FileList()
        for (let i = 0; i < inputFiles.length; i++) {
            reader.readAsDataURL(inputFiles[i])
            reader.onload = () => { team_event.images[team_event.images.length] = reader.result as string; }
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
        return team_event.hopperCapacity == 0 || team_event.maxShoot == 0 || team_event.images.length == 0
    }

    function splice(i: number) {
        team_event.images.splice(i, 1);
        console.log("spliced index " + i)
    }
</script>
<center class="font-[Poppins] font-normal">
    <p class="m-4 mb-0 text-6xl font-bold text-amber-400">{team_event.teamKey}</p>
	<p class="text-3xl text-gray-400">
		Pitscout
	</p>
    <p class="text-2xl text-gray-400 mt-3 text-left mx-2.5">
        Drivetrain
    </p>
    <VerticalToggleGroup items={['Swerve', 'Tank', 'Other']} selectedValue={team_event.drivetrain} bg_selected="amber-400" bg_normal="gray-900" outline={false}/>

    <LabeledContainer label="Terrain Capabilities">
        <IndependentToggleGroup items={["Bump", "Trench"]} keys={["bump", "trench"]} bind:source={team_event}/>
    </LabeledContainer>

    <LabeledContainer label="Climb">
        <IndependentToggleGroup items={["L1", "L2", "L3"]} keys={["l1", "l2", "l3"]} bind:source={team_event}/>
    </LabeledContainer>

    <LabeledContainer label="Shooting Capabilities">
        <IndependentToggleGroup items={["Opposing to Neutral", "Opposing to Alliance", "Neutral to Alliance"]} keys={["oppToNeutral", "oppToAlliance", "neuToAlliance"]} bind:source={team_event}/>
    </LabeledContainer>

    <LabeledContainer label="Robot stuff">
        <LabeledTextArea label="Max hopper capacity">
            <input bind:value={team_event.hopperCapacity} class="outline-none w-full p-1" type="number"/>
        </LabeledTextArea>
        <LabeledTextArea label="Max shoot distance">
            <input bind:value={team_event.maxShoot} class="outline-none w-full p-1" type="number"/>
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
            <textarea bind:value={team_event.notes} class="outline-none w-full"></textarea>
        </LabeledTextArea>
    </LabeledContainer>

    <!--Upload files-->
    <LabeledContainer label="Upload Files" isYellow={team_event.images.length > 0} padded={true}>
        <div class="w-full">
            {#if (team_event.images.length > 0)}
                {#each team_event.images as src, i}
                    <div class="w-full rounded mt-2 h-64 flex justify-end p-2 items-start" style="background: url({src}); background-size: cover; background-repeat: no-repeat; background-position: center">
                        <button class="bg-gray-900 text-white rounded-full p-1" onclick={() => splice(i)}>
                            <X class="text-white text-2xl "></X>
                        </button>
                    </div>
                {/each}
            {:else}
                Please attach a photo
            {/if}
            <label class="block {(team_event.images.length > 0) ? 'bg-amber-500 text-black' : 'bg-gray-800 text-white'} text-white rounded text-center text-2xl p-2 mt-2">
                +
                <input type="file" accept="image/png, image/jpeg, image/jpg" bind:files={inputFiles} class="w-full hidden" onchange={submitFile}>
            </label>
        </div>
    </LabeledContainer>
    <button onclick={submit} class="bg-gray-800 text-white block rounded mx-2.5 my-3 text-2xl p-3">Submit</button>
</center>

<ButtonBack link="/pitscout/teamlist"/>
