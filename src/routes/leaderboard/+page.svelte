<script lang="ts">
    import { onMount } from "svelte";

    let users: Array<{name: string; matches: number}> = [
        {name: "SampleUser", matches: 1540},
        {name: "SampleUser2", matches: 4},
        {name: "SampleUser3", matches: 3},
        {name: "SampleUser4", matches: 2},
        {name: "SampleUser5", matches: 0}
    ]
    let totalMatches: number = users.reduce((total, data) => {
        return total+data.matches;
    }, 0)

    let you: number;
    let selectedUser: number = Math.floor(Math.random()*users.length);

    onMount(() => {
        //testing
        localStorage.setItem("nameTest", "SampleUser3")


        for (let i = 0; i < users.length; i++) {
            if (users[i].name == localStorage.getItem("nameTest")) {
                you = i;
            }
        }

        while (selectedUser == you) {
            selectedUser = Math.floor(Math.random()*users.length)
        }
    })
</script>
<center class="font-[Poppins] font-normal">
    <p class="m-4 mb-0 text-3xl font-bold text-amber-400">Leaderboard</p>
    <div class="mx-2.5 rounded bg-[#2c2c2c] text-neutral-400 text-center text-xl mt-2 p-2">
        {#if (you < 3)}
            <span class="block bg-linear-to-r from-amber-400 to-red-400 bg-clip-text text-transparent">Egg-cellent! You're on the podium!</span>
        {/if}
        {#if (you)}
            <span class="text-white">
                {users[selectedUser].name}
            </span> has scouted 
            <span class="text-white">
                {(users[selectedUser].matches/users[you].matches).toFixed(2)}x
            </span> as many matches as you!
        {/if}
    </div>
    <div class="mx-2.5 rounded bg-[#2c2c2c] text-white text-center text-xl mt-2">
        {#each users as user, i}
            <button onclick={you == i ? () => {} : () => selectedUser = i} class="w-full {(i == users.length-1) ? '' : 'border-b border-neutral-400'} {you == i ? 'bg-linear-to-r from-neutral-600 to-transparent' : ''} p-1 text-left ">
                <span class="text-amber-300">#{i+1}</span>
                <span class="{i < 3 ? 'bg-linear-to-r from-amber-400 to-red-400 bg-clip-text text-transparent':''}">{user.name}</span>
                <br>
                <span class="text-sm italic text-neutral-400">
                    <span class="text-white">
                        {user.matches}
                    </span>
                    matches scouted | 
                    <span class="text-white">
                        {(user.matches*100/totalMatches).toFixed(2)}%
                    </span>
                    of total matches
                </span>
            </button>
        {/each}
    </div>
</center>