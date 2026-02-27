import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import wsServer from './ws.ts';

export default defineConfig({
    plugins: [tailwindcss(), sveltekit(), wsServer],
    server: {
        allowedHosts: true
    }
});
