<script lang="ts">
    let username = $state('');
</script>

<div class="flex h-screen flex-col items-center justify-center text-white">
    <h1 class="mb-6 text-4xl font-bold">Login</h1>
    <form action="?/login" method="POST">
        <input
            type="text"
            name="username"
            placeholder="Enter your name"
            bind:value={username}
            class="mb-4 min-w-50 rounded border border-[#c3c3c3] p-2 text-white"
        />
        <button class="rounded bg-[#5C5C5C] px-6 py-2 hover:bg-[#7D7D7D]"> Log In </button>
    </form>
</div>

<style>
    :global(body) {
        background-color: #2c2c2c;
    }
</style>
