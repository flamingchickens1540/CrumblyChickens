<script lang="ts">
    import { X } from 'lucide-svelte';
    import ButtonBack from '$lib/components/ButtonBack.svelte';
    import VerticalToggleGroup from '$lib/components/VerticalToggleGroup.svelte';
    import LabeledContainer from '$lib/components/LabeledContainer.svelte';
    import { goto } from '$app/navigation';
    import LabeledTextArea from '$lib/components/LabeledTextArea.svelte';
    import type { TeamEvent } from '$lib/types';
    import IndependentToggleGroup from '$lib/components/IndependentToggleGroup.svelte';
    import { resolve } from '$app/paths';

    let inputFiles: FileList | null = $state(null);

    let { data }: { data: TeamEvent } = $props();
    let teamEvent: TeamEvent = $state(
        (() => {
            return data;
        })()
    );
    console.log($state.snapshot(teamEvent));
    let images: string[] = [];

    function submitFile() {
        const reader = new FileReader();
        inputFiles ??= new FileList();
        for (let i = 0; i < inputFiles.length; i++) {
            reader.readAsDataURL(inputFiles[i]);
            reader.onload = () => {
                images[images.length] = reader.result as string;
            };
        }
        inputFiles = new DataTransfer().files;
    }

    async function submit() {
        if (isFormComplete()) {
            const res = await fetch('/api/submit/pit', {
                method: 'POST',
                body: JSON.stringify({ data: teamEvent, images })
            });
            console.log(`res: ${res.status}`);
            goto(resolve('/'));
        }
    }

    function isFormComplete(): boolean {
        return (
            teamEvent.hopperCapacity == 0 || teamEvent.maxShotDistance == 0 || images.length == 0
        );
    }

    function splice(i: number) {
        images.splice(i, 1);
        console.log('spliced index ' + i);
    }
</script>

<center class="font-[Poppins] font-normal">
    <p class="m-4 mb-0 text-6xl font-bold text-amber-400">{teamEvent.teamKey}</p>
    <p class="text-3xl text-gray-400">Pitscout</p>
    <p class="mx-2.5 mt-3 text-left text-2xl text-gray-400">Drivetrain</p>
    <VerticalToggleGroup
        items={['Swerve', 'Tank', 'Other']}
        bind:value={teamEvent.drivetrain!}
        bg_selected="amber-400"
        bg_normal="gray-900"
        outline={false}
    />

    <LabeledContainer label="Terrain Capabilities">
        <IndependentToggleGroup
            items={['Bump', 'Trench']}
            keys={['canBump', 'canTrench']}
            bind:source={teamEvent}
        />
    </LabeledContainer>

    <LabeledContainer label="Climb">
        <IndependentToggleGroup
            items={['L1', 'L2', 'L3']}
            keys={['l1', 'l2', 'l3']}
            bind:source={teamEvent}
        />
    </LabeledContainer>

    <LabeledContainer label="Shooting Capabilities">
        <IndependentToggleGroup
            items={['Opposing to Neutral', 'Opposing to Alliance', 'Neutral to Alliance']}
            keys={['oppToNeutral', 'oppToAlliance', 'neuToAlliance']}
            bind:source={teamEvent}
        />
    </LabeledContainer>

    <LabeledContainer label="Robot stuff">
        <LabeledTextArea label="Max hopper capacity">
            <input
                bind:value={teamEvent.hopperCapacity}
                class="w-full p-1 outline-none"
                type="number"
            />
        </LabeledTextArea>
        <LabeledTextArea label="Max shoot distance">
            <input
                bind:value={teamEvent.maxShotDistance}
                class="w-full p-1 outline-none"
                type="number"
            />
        </LabeledTextArea>
    </LabeledContainer>

    <LabeledContainer label="Misc.">
        <LabeledTextArea label="If your robot was an ice cream flavor, what would it be?">
            <textarea class="w-full outline-none"></textarea>
        </LabeledTextArea>
        <LabeledTextArea label="What are you most proud of about your robot?">
            <textarea class="w-full outline-none"></textarea>
        </LabeledTextArea>
        <LabeledTextArea label="Other notes">
            <textarea bind:value={teamEvent.notes} class="w-full outline-none"></textarea>
        </LabeledTextArea>
    </LabeledContainer>

    <!--Upload files-->
    <LabeledContainer label="Upload Files" isYellow={images.length > 0} padded={true}>
        <div class="w-full">
            {#if images.length > 0}
                {#each images as src, i (src)}
                    <div
                        class="mt-2 flex h-64 w-full items-start justify-end rounded p-2"
                        style="background: url({src}); background-size: cover; background-repeat: no-repeat; background-position: center"
                    >
                        <button
                            class="rounded-full bg-gray-900 p-1 text-white"
                            onclick={() => splice(i)}
                        >
                            <X class="text-2xl text-white "></X>
                        </button>
                    </div>
                {/each}
            {:else}
                Please attach a photo
            {/if}
            <label
                class="block {images.length > 0
                    ? 'bg-amber-500 text-black'
                    : 'bg-gray-800 text-white'} mt-2 rounded p-2 text-center text-2xl text-white"
            >
                +
                <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    bind:files={inputFiles}
                    class="hidden w-full"
                    onchange={submitFile}
                />
            </label>
        </div>
    </LabeledContainer>
    <button onclick={submit} class="mx-2.5 my-3 block rounded bg-gray-800 p-3 text-2xl text-white"
        >Submit</button
    >
</center>

<ButtonBack link="/pitscout/teamlist" />
