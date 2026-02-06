<script lang="ts">
    import { ClipboardList } from "lucide-svelte"
    import { Camera } from "lucide-svelte"
	import type { PageProps } from "../$types";
	import { goto } from "$app/navigation";
    import ButtonBack from "$lib/components/ButtonBack.svelte";

    let { data }: PageProps = $props();

    let teams: Array<any> = [
        { number: 1844, images: true, data: false },
        { number: 1540, images: false, data: true }
    ]
</script>

<center class="font-[Poppins] font-normal">
    <p class="m-4 mb-0 text-6xl font-bold text-amber-400">Team List</p>
	<p class="text-3xl text-gray-400">
		Pitscout
	</p>

    <div class="rounded justify-self-start justify-self-center mx-2.5 bg-gray-900 text-white text-center text-xl p-1 mt-3">
        {#each teams as team, i}
            <div class="w-full p-2 flex {i == 0 ? '' : 'border-t-2 border-gray-400'}">
                <Camera class={team.images ? 'text-amber-400' : 'text-white'}/>
                <ClipboardList class={team.data ? 'text-amber-400' : 'text-white'}/>
                <button onclick={() => goto(`./collect`)} class="ml-2">{team.number}</button>
            </div>
        {/each}
    </div>

</center>

<ButtonBack link="/"/>

