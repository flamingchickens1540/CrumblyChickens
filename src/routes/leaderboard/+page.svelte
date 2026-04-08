<script lang="ts">
    import { onMount } from 'svelte';

    let { data } = $props()

    let users: { name: string; matches: number }[] = $state([]);
    let totalMatches: number = $state(0);

    let user_idx: number = $state(0);
    let selectedUser: number = $state(0);

    onMount(async () => {
        let res = await fetch("/api/users")
        if (!res.ok) {
            console.error("Res not okay " + res)
        }

        const matches: { name: string, matches: number }[] = await res.json()
        users = matches;
        console.log(JSON.stringify(matches[0]))

        totalMatches = users.reduce((total, user) => {
            return total + user.matches;
        }, 0)


        for (let i = 0; i < users.length; i++) {
            if (users[i].name == data.user) {
                user_idx = i;
            }
        }

        while (selectedUser == user_idx) {
            selectedUser = Math.floor(Math.random() * users.length);
        }
    });
</script>

<center class="font-[Poppins] font-normal">
    <p class="m-4 mb-0 text-3xl font-bold text-amber-400">Leaderboard</p>
    <div class="mx-2.5 mt-2 rounded bg-[#2c2c2c] p-2 text-center text-xl text-neutral-400">
        {#if user_idx < 3}
            <span
                class="block bg-linear-to-r from-amber-400 to-red-400 bg-clip-text text-transparent"
                >Egg-cellent! You're on the podium!</span
            >
        {/if}
        {#if user_idx}
            <span class="text-white">
                {users[selectedUser].name}
            </span>
            has scouted
            <span class="text-white">
                {(users[selectedUser].matches / users[user_idx].matches).toFixed(2)}x
            </span> as many matches as you!
        {/if}
    </div>
    <div class="mx-2.5 mt-2 rounded bg-[#2c2c2c] text-center text-white">
        {#each users as user, i}
            <button
                onclick={user_idx == i ? () => {} : () => (selectedUser = i)}
                class="w-full {i == users.length - 1 ? '' : 'border-b border-neutral-400'} {user_idx == i
                    ? 'bg-linear-to-r from-neutral-600 to-transparent'
                    : ''} p-1 text-left"
            >
                <span style="font-size: {14 + (user.matches * 20) / totalMatches}px">
                    <span class="text-amber-300">#{i + 1}</span>
                    <span
                        class={i < 3
                            ? 'bg-linear-to-r from-amber-400 to-red-400 bg-clip-text text-transparent'
                            : ''}>{user.name}</span
                    >
                </span>
                <br />
                <span class="text-sm text-neutral-400 italic">
                    <span class="text-white">
                        {user.matches}
                    </span>
                    matches scouted |
                    <span class="text-white">
                        {((user.matches * 100) / totalMatches).toFixed(2)}%
                    </span>
                    of all TeamMatches
                </span>
            </button>
        {/each}
    </div>TeamMatches
</center>
