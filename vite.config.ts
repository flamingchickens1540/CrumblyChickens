import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import wsConfig from './ws.ts';

export default defineConfig({
<<<<<<< HEAD
    plugins: [tailwindcss(), sveltekit(), /*wsServer*/],
    // server: {
    //     allowedHosts: true
    // }
=======
    plugins: [
        tailwindcss(),
        sveltekit(),
        {
            name: 'wsServer',
            configureServer(server) {
                if (!server.httpServer) return;
                wsConfig(server.httpServer);
            }
        }
    ],
    server: {
        allowedHosts: true
    }
>>>>>>> 2dd82845a4915de5046dd7aef87cb5e8c0e568c1
});
