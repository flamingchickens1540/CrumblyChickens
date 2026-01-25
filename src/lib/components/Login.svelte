<script lang="ts">
	import { activePage, name } from '$lib/state';
	let username = '';

	function login() {
		if (username.trim() === '') return;
		name.set(username);
		activePage.set('home');
	}
</script>

<div class="flex flex-col items-center justify-center h-screen text-white">
	<h1 class="text-4xl mb-6 font-bold">Login</h1>
	<input
		type="text"
		placeholder="Enter your name"
		bind:value={username}
		class="mb-4 p-2 rounded text-white"
	/>
	<button
		on:click={login}
		class="px-6 py-2 bg-[#5C5C5C] hover:bg-[#7D7D7D] rounded"
	>
		Log In
	</button>
</div>

<style>
	input {
		min-width: 200px;
	}
</style>
