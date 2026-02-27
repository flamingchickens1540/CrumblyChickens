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
    import { browser } from '$app/environment';
    import { localStore, LocalStore } from '@/localStore.svelte';

    let inputFiles: FileList | null = $state(null);

    let teamEvent: LocalStore<TeamEvent> = $state(
        localStore('teamData', {
            teamKey: 1540,
            scout: 'Autumn',
            eventKey: '2026orco',
            drivetrain: 'Swerve',
            maxClimb: 'None',
            canBump: false,
            canTrench: false,
            canHalfSteal: false,
            canSteal: false,
            canShuffle: false,
            hopperCapacity: 0,
            maxShotDistance: 0,
            robotIceCream: '',
            biggestPride: '',
            notes: '',
            completed: false
        })
    );

    let { data }: { data: TeamEvent } = $props();
    if (browser) {
        console.log($state.snapshot(teamEvent.value));
    }
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
        console.log(`submitting`);
        console.log(teamEvent.value);
        const res = await fetch('/api/submit/pit', {
            method: 'POST',
            body: JSON.stringify({ data: teamEvent.value, images })
        });
        console.log(`res: ${res.status}`);
        goto(resolve('/'));
    }

    function splice(i: number) {
        images.splice(i, 1);
        console.log('spliced index ' + i);
    }
</script>

<center class="font-[Poppins] font-normal">
    <p class="m-4 mb-0 text-6xl font-bold text-amber-400">{teamEvent.value.teamKey}</p>
    <p class="text-3xl text-gray-400">Pitscout</p>
    <p class="mx-2.5 mt-3 text-left text-2xl text-gray-400">Drivetrain</p>
    <VerticalToggleGroup
        items={['Swerve', 'Tank', 'Other']}
        bind:value={teamEvent.value.drivetrain}
        bg_selected="amber-400"
        bg_normal="gray-900"
        outline={false}
    />

    <LabeledContainer label="Terrain Capabilities">
        <IndependentToggleGroup
            items={['Bump', 'Trench']}
            keys={['canBump', 'canTrench']}
            bind:source={teamEvent.value}
        />
    </LabeledContainer>

    <LabeledContainer label="Climb">
        <VerticalToggleGroup
            items={['None', 'L1', 'L2', 'L3']}
            bind:value={teamEvent.value.maxClimb}
            bg_selected="amber-400"
            bg_normal="gray-900"
            outline={false}
        />
    </LabeledContainer>

    <LabeledContainer label="Shooting Capabilities">
        <IndependentToggleGroup
            items={['Opposing to Alliance', 'Neutral to Alliance']}
            keys={['canSteal', 'canShuffle']}
            bind:source={teamEvent.value}
        />
    </LabeledContainer>

    <LabeledContainer label="Robot stuff">
        <LabeledTextArea label="Max hopper capacity">
            <input
                bind:value={teamEvent.value.hopperCapacity}
                class="w-full p-1 outline-none"
                type="number"
            />
        </LabeledTextArea>
        <LabeledTextArea label="Max shoot distance">
            <input
                bind:value={teamEvent.value.maxShotDistance}
                class="w-full p-1 outline-none"
                type="number"
            />
        </LabeledTextArea>
    </LabeledContainer>

    <LabeledContainer label="Misc.">
        <LabeledTextArea label="If your robot was an ice cream flavor, what would it be?">
            <textarea bind:value={teamEvent.value.robotIceCream} class="w-full outline-none"
            ></textarea>
        </LabeledTextArea>
        <LabeledTextArea label="What are you most proud of about your robot?">
            <textarea bind:value={teamEvent.value.biggestPride} class="w-full outline-none"
            ></textarea>
        </LabeledTextArea>
        <LabeledTextArea label="Other notes">
            <textarea bind:value={teamEvent.value.notes} class="w-full outline-none"></textarea>
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
